<template>
  <tr
    :class="rootClass"
    :style="rootStyle"
    @mouseover="v.hover = true"
    @mouseout="v.hover = false"
    @click.stop="clickRow($event.target)"
    @dblclick.stop.prevent="dblclickRow"
  >
    <td
      v-for="(cell, index) in cells"
      :key="index"
      :class="tdClass(cell)"
      :style="tdStyle(cell)"
      :rowspan="cell.rowspan"
      :colspan="cell.colspan"
    >
      <component
        :class="classes.cell"
        :style="styles.cell"
        :is="columnCellRefactors[index].component"
        v-bind="cellProps(cell, index)"
      ></component>
    </td>
  </tr>
</template>

<script>
import { concatClasses } from "../utils";
// inner cell components
import stCellIndex from "../cell/index.vue";
import stCellSn from "../cell/sn.vue";
import stCellSnSelectable from "../cell/sn-selectable.vue";
import stCellText from "../cell/text.vue";
import stCellHtml from "../cell/html.vue";
import { setTimeout, clearTimeout } from "timers";
const DEFAULT_CELL_COMPONENT = "st-cell-text";

export default {
  // register all inner cell components
  components: {
    stCellIndex,
    stCellSn,
    stCellSnSelectable,
    stCellText,
    stCellHtml
  },
  props: {
    // DataRow.value
    row: { required: true, type: [Object, Array] },
    // The nested item index
    index: { required: true, type: Number },
    // The array index within `table.rows`. It's the `tr` index within `table` element
    tableRowIndex: { required: true, type: Number },
    // The row index within `grid.rows`
    dataRowIndex: { required: true, type: Number },
    selected: { required: false, default: false },
    // [{ rowspan, colspan, value }, ...]
    cells: { required: true, type: Array },
    // All dom element class
    classes: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    // All dom element style
    styles: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    }
  },
  data() {
    return { v: { hover: false, selected: false, clickTimer: null } };
  },
  computed: {
    rootClass() {
      return concatClasses(
        "st-row", // always
        this.classes.root, // custom
        this.v.hover ? this.classes.hover || "hover" : undefined, // custom or default
        this.v.selected ? this.classes.selected || "selected" : undefined // custom or default
      );
    },
    rootStyle() {
      return concatClasses(
        this.styles.root, // custom
        this.v.hover ? this.styles.hover : undefined, // custom or default
        this.v.selected ? this.styles.selected : undefined // custom or default
      );
    },
    // refactor column.cell (String|{}|Function) to standard structure ({})
    columnCellRefactors() {
      const toStandardCell = cfg => {
        let t = typeof cfg;
        if (t === "undefined") return { component: DEFAULT_CELL_COMPONENT };
        else if (t === "string") return { component: cfg };
        else if (t === "object") {
          if (!cfg.hasOwnProperty("component"))
            cfg.component = DEFAULT_CELL_COMPONENT;
          return cfg;
        } else if (t === "function") {
          return toStandardCell(cfg.call(null, this.row, this.index));
        } else return { component: DEFAULT_CELL_COMPONENT };
      };

      return this.cells.map(cell => {
        if (!cell.column) return { component: DEFAULT_CELL_COMPONENT };
        return toStandardCell(cell.column.cell);
      });
    }
  },
  methods: {
    tdClass(cell) {
      return concatClasses(
        "st-cell", // always
        this.classes.td, // define in Grid.classes.contentRow
        (cell.column && cell.column.class) || "text" // define in Grid.columns[index].class
      );
    },
    tdStyle(cell) {
      return concatClasses(this.styles.td, cell.column && cell.column.style);
    },
    cellProps(cell, index) {
      // { empty, column, value, classes, styles }
      let t = this.columnCellRefactors[index];
      let main = {
        empty: cell.empty,
        column: cell.column
      };
      if (!cell.empty)
        main.value = t.hasOwnProperty("value") ? t.value : cell.value;
      if (t.classes) main.classes = t.classes;
      if (t.styles) main.styles = t.styles;
      return main;
    },
    clickRow(targetEl) {
      // delay click event for dblclick event to clear it
      if (this.v.clickTimer) clearTimeout(this.v.clickTimer);
      this.v.clickTimer = setTimeout(() => {
        // find cell
        let td = targetEl.closest("td");
        if (!td) {
          alert("This browser not support Element.closest method");
          return;
        }
        let cell = this.cells[td.cellIndex];
        if (!cell) {
          alert("Error to find cell config");
          return;
        }

        // 1. do actual work for click
        this.v.selected = !this.v.selected;

        // 1.0. modify grid.selection
        if (typeof this.$parent.selectRow === "function")
          this.$parent.selectRow(this.row, this.v.selected);

        // 1.1. emit status change event
        this.$emit("update:selected", this.v.selected);

        // 1.2. invoke column.cell.on.click function
        let t = this.columnCellRefactors[td.cellIndex];
        if (typeof t.click === "function")
          t.click.call(null, {
            target: targetEl,
            value: t.hasOwnProperty("value") ? t.value : cell.value,
            row: this.row,
            nestedRowIndex: this.index,
            tableRowIndex: this.tableRowIndex,
            dataRowIndex: this.dataRowIndex
          });

        // 1.3. emit row-click event
        this.$emit("row-click", {
          row: this.row,
          index: this.dataRowIndex,
          selected: this.v.selected
        });
      }, 300);
    },
    dblclickRow() {
      // clear click event
      if (this.v.clickTimer) clearTimeout(this.v.clickTimer);

      // 1. do actual work for dblclick
      let old = this.v.selected;
      this.v.selected = true;

      // 1.1. emit status change event
      if (old !== this.v.selected)
        this.$emit("update:selected", this.v.selected);

      // 1.2. emit row-dblclick event
      this.$emit("row-dblclick", {
        row: this.row,
        index: this.dataRowIndex
      });
    }
  }
};
</script>