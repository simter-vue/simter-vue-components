<template>
  <div :class="['st-grid', classes.root]">
    <div :class="['top', classes.top]" v-if="$slots.top && $slots.top.length > 0">
      <slot name="top"></slot>
    </div>
    <div :class="['header', classes.header]">
      <table :class="classes.headerTable" :style="headerTableStyle">
        <st-colgroup :columns="columns"></st-colgroup>
        <st-thead :columns="columns" :classes="classes.headerRow" :styles="styles.headerRow"
          @column-select-state-change="columnSelectStateChange"></st-thead>
      </table>
    </div>
    <div
      :class="['content', classes.content]"
      @scroll="v.scrollLeft = -1 * $event.target.scrollLeft"
    >
      <table :class="classes.contentTable" :style="styles.contentTable">
        <st-colgroup :columns="columns"></st-colgroup>
        <tbody>
          <st-data-row
            v-for="(row, index) in rows"
            :key="index"
            v-bind="dataRowProps(row, index)"
            v-on="dataRowListeners"
          ></st-data-row>
        </tbody>
      </table>
    </div>
    <div :class="['bottom', classes.bottom]" v-if="$slots.bottom && $slots.bottom.length > 0">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
import { g, gv, flatten, concatStyles } from "./utils";
import stDataRow from "./row/data-row";
import stColgroup from "./colgroup.vue";
import stThead from "./thead.vue";
import tableRowVue from "./row/table-row.vue";

/**
 * { empty, value }.
 *
 * If column has a pid, then:
 *   1. return `{ empty: false, value: row[column.pid][subRowIndex][column.id] }`
 *      if row[column.pid].length > subRowIndex,
 *   2. or return { empty: true }
 *      if row[column.pid].length <= subRowIndex.
 * Otherwise return `{ empty: false, value: row[column.id] }`.
 */
function getCellConfigInfo(row, column, subRowIndex, mainRowIndex) {
  return column.pid
    ? row[column.pid] && row[column.pid].length > subRowIndex
      ? { empty: false, value: row[column.pid][subRowIndex][column.id] } // nested cell
      : { empty: true } // empty cell
    : { empty: false, value: row[column.id] }; // top cell
}

export default {
  components: { stColgroup, stThead, stDataRow },
  props: {
    columns: { type: Array, required: true },
    rows: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    // All dom element class
    classes: {
      type: Object,
      required: false,
      default: () => gv("simter.grid.classes", {})
    },
    // All dom element style
    styles: {
      type: Object,
      required: false,
      default: () => gv("simter.grid.styles", {})
    }
  },
  data: function() {
    return {
      // some params use in ui
      v: {
        scrollLeft: 0,
        scrollBarWidth: 0,
        timer: null,
        contentEl: null,
        lastColumnIsAutoWidth: false
      }
    };
  },
  computed: {
    // all selected rows
    selection() {
      return this.rows.filter(row => row.selected === true);
    },
    flattenColumns() {
      return flatten(this.columns);
    },
    subColumns() {
      return this.flattenColumns.filter(c => c.pid);
    },
    headerTableStyle() {
      return concatStyles(this.styles.headerTable, {
        left: this.v.scrollLeft + "px",
        width: "calc(100% - " + this.v.scrollBarWidth + "px)"
      });
    },
    /** DataRow listeners to transfer */
    dataRowListeners() {
      const events = {};
      Object.keys(this.$listeners)
        .filter(key => key.startsWith("row-") || key.startsWith("cell-"))
        .forEach(key => (events[key] = this.$listeners[key]));

      // deal row-selection-change event
      let old = events["row-selection-change"]; // user define listener
      if (old) {
        events["row-selection-change"] = data => {
          this.selectRow(data.index, data.selected);
          old.call(this, data);
        }
      } else events["row-selection-change"] = data => this.selectRow(data.index, data.selected);

      return events;
    },
    // [[tableRows], ...], index follow rows
    tableRows() {
      // DataRow OneToMany TableRow
      let all = [];
      let preTableRowCount = 0;
      this.rows.forEach((dataRow, dataRowIndex) => {
        let subTableRows = this.dataRowToTableRow(
          dataRow,
          dataRowIndex,
          preTableRowCount
        );
        all.push(subTableRows);
        preTableRowCount += subTableRows.length;
      });
      return all;
    },
    // Calculate each row's rowspan by Column.pid config
    rowspans() {
      let rowspans = {};

      // find pid from columns config
      let pids = this.subColumns
        .map(c => c.pid)
        .filter((v, i, a) => a.indexOf(v) === i); // distinct pid

      // calculate rowspan value
      this.rows.forEach((row, index) => {
        if (typeof row.rowspan === "number") {
          // custom rowspan value
          rowspans[index] = row.rowspan;
        } else {
          // auto calculate rowspan value
          let maxSize = Math.max(
            ...pids.map(pid => (row[pid] ? row[pid].length : 1))
          );
          if (maxSize > 1) rowspans[index] = maxSize;
        }
      });

      return rowspans;
    }
  },
  created() {
    // auto judge the last column width config
    this.v.lastColumnIsAutoWidth = !this.flattenColumns[
      this.flattenColumns.length - 1
    ].width;
  },
  mounted() {
    if (!this.v.lastColumnIsAutoWidth) {
      // watch horizon scrollbar size
      this.v.contentEl = this.$el.querySelector(".content"); // cache content el
      this.$_watchHorizonScrollBarSize();
    }
  },
  destroyed() {
    if (!this.v.lastColumnIsAutoWidth) g.clearInterval(this.v.timer);
  },
  methods: {
    columnSelectStateChange(selected, index, column) {
      if (index === 0) { // add full selection to the first column
        this.rows.forEach(row => this.$set(row, "selected", selected));
      }
      // emit column-select-state-change event
      this.$emit('column-select-state-change', selected, index, column);
    },
    // DataRow OneToMany TableRow
    // TableRow: {index, cells, classes, styles}
    // TableCell: {rowspan, colspan, value, classes, styles}
    dataRowToTableRow(dataRow, dataRowIndex, preTableRowCount) {
      let tableRows = [];

      // main TableRow
      let nestedIndex = 0;
      tableRows.push({
        tableRowIndex: preTableRowCount,
        dataRowIndex: dataRowIndex,
        index: nestedIndex++,
        row: dataRow,
        classes: this.classes.contentRow,
        styles: this.styles.contentRow,
        selected: dataRow.selected === true,
        cells: this.flattenColumns.map((column, i) => {
          let { empty, value } = getCellConfigInfo(
            dataRow,
            column,
            0,
            dataRowIndex
          );
          let c = { column: column, empty: empty };
          if (!empty) c.value = value;
          let rowspan = column.pid ? 1 : this.rowspans[dataRowIndex];
          if (rowspan > 1) c.rowspan = rowspan;
          return c;
        })
      });

      // sub TableRows
      let len = this.rowspans[dataRowIndex] || 1;
      for (let i = 1; i < len; i++) {
        tableRows.push({
          tableRowIndex: preTableRowCount + nestedIndex,
          dataRowIndex: dataRowIndex,
          index: nestedIndex++,
          row: dataRow,
          classes: this.classes.contentRow,
          styles: this.styles.contentRow,
          cells: this.subColumns.map(column => {
            let { empty, value } = getCellConfigInfo(dataRow, column, i);
            let c = { column: column, empty: empty };
            if (!empty) c.value = value;
            return c;
          })
        });
      }
      return tableRows;
    },
    /** DataRow props to transfer */
    dataRowProps(row, index) {
      let props = {
        tableRows: this.tableRows[index]
      };
      return props;
    },
    $_watchHorizonScrollBarSize() {
      let t;
      this.v.timer = g.setInterval(() => {
        t = this.v.contentEl.offsetWidth - this.v.contentEl.clientWidth;
        if (t != this.v.scrollBarWidth) {
          // console.log("scrollBarWidth: %s > %s", this.v.scrollBarWidth, t);
          this.v.scrollBarWidth = t;
        }
      }, 100);
    },
    selectRow(index, selected) {
      let row = this.rows[index];
      if (row) this.$set(row, "selected", selected);
    },
    clearSelection() {
      this.selection.forEach(row => this.$set(row, "selected", false));
    },
    deleteSelection() {
      this.selection.forEach(row => this.rows.splice(this.rows.indexOf(row), 1));
    }
  }
};
</script>

<style>
.st-grid {
  position: relative;
  display: flex;
  flex-direction: column;
}
.st-grid > .content {
  flex: 1 1 0%;
  overflow: auto;
}
.st-grid > .header {
  overflow: hidden;
  position: relative;
  text-align: center;
}
.st-grid > .header > table {
  position: relative;
}
.st-grid > .content > table,
.st-grid > .header > table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}
.st-grid > .header > table > thead > tr > td,
.st-grid > .content > table > tbody > tr > td {
  overflow: hidden;
  text-overflow: ellipsis;
}
.st-grid > .header > table > thead > tr,
.st-grid > .content > table > tbody > tr {
  min-height: 2em;
}
.st-grid > .bottom {
  display: flex;
  flex-direction: row;
}
.st-grid > .bottom > * {
  margin: 0.25rem 0 0.25rem 0.25rem;
}
.st-row {
  cursor: default;
}
.st-cell {
  padding: 0.25rem;
}
.st-cell.number {
  text-align: right;
}
</style>