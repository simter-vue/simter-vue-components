<template>
  <div :class="['st-grid', classes.root]">
    <div :class="classes.top" v-if="$slots.top && $slots.top.length > 0">
      <slot name="top"></slot>
    </div>
    <div :class="['header', classes.header]">
      <table border="1" :class="classes.headerTable" :style="headerTableStyle">
        <st-colgroup :columns="columns"></st-colgroup>
        <st-thead :columns="columns"></st-thead>
      </table>
    </div>
    <div
      :class="['content', classes.content]"
      @scroll="v.scrollLeft = -1 * $event.target.scrollLeft"
    >
      <table border="1" :class="classes.contentTable" :style="styles.contentTable">
        <st-colgroup :columns="columns"></st-colgroup>
        <tbody>
          <template v-for="(row, index) in rows">
            <st-row
              :key="index"
              :row="row"
              :index="index"
              :columns="flattenColumns"
              :sub-columns="subColumns"
              :classes="classes.contentRow || {}"
              :styles="styles.contentRow || {}"
              v-on="rowAndCellEventListeners"
            ></st-row>
          </template>
        </tbody>
      </table>
    </div>
    <div :class="['bottom', classes.bottom]" v-if="$slots.bottom && $slots.bottom.length > 0">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
import { get, flatten, concatClasses } from "./utils";
import stRow from "./row/row";
import stColgroup from "./colgroup.vue";
import stThead from "./thead.vue";

export default {
  components: { stColgroup, stThead, stRow },
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
      default: () => get("simter.grid.classes", {})
    },
    // All dom element style
    styles: {
      type: Object,
      required: false,
      default: () => get("simter.grid.styles", {})
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
    flattenColumns() {
      return flatten(this.columns);
    },
    subColumns() {
      return this.flattenColumns.filter(c => c.pid);
    },
    headerTableStyle() {
      return concatClasses(this.styles.headerTable, {
        left: this.v.scrollLeft + "px",
        width: "calc(100% - " + this.v.scrollBarWidth + "px)"
      });
    },
    /** row and cell events to transfer */
    rowAndCellEventListeners() {
      const events = {};
      Object.keys(this.$listeners)
        .filter(key => key.startsWith("row-") || key.startsWith("cell-"))
        .forEach(key => {
          events[key] = this.$listeners[key];
        });
      return events;
    }
  },
  created() {
    // 1.1. find pid from columns config
    let pids = this.subColumns.map(c => c.pid);

    // 2.2. auto set row.rowspan = max(row[pid].length) if row.rowspan not exists
    this.rows.forEach(row => {
      let maxSize = Math.max(
        ...pids.map(pid => (row[pid] ? row[pid].length : 1))
      );
      if (maxSize > 1 && !row.hasOwnProperty("rowspan")) row.rowspan = maxSize;
    });

    // 2. auto judge the last column width config
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
    if (!this.v.lastColumnIsAutoWidth) clearInterval(this.v.timer);
  },
  methods: {
    $_watchHorizonScrollBarSize() {
      let t;
      this.v.timer = setInterval(() => {
        t = this.v.contentEl.offsetWidth - this.v.contentEl.clientWidth;
        if (t != this.v.scrollBarWidth) {
          // console.log("scrollBarWidth: %s > %s", this.v.scrollBarWidth, t);
          this.v.scrollBarWidth = t;
        }
      }, 100);
    }
  }
};
</script>

<style>
.st-grid {
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
.st-grid > .header > table > thead > tr > th,
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
.st-grid > .bottom > .st-button,
.st-grid > .bottom > .st-button-group,
.st-grid > .bottom > .st-pagebar {
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