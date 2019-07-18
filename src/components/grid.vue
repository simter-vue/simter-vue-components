<template>
  <div class="st-grid">
    <div class="top" v-if="$slots.top && $slots.top.length > 0">
      <slot name="top"></slot>
    </div>
    <div class="header">
      <table
        border="1"
        :style="{left: v.scrollLeft + 'px', width: 'calc(100% - ' + v.scrollBarWidth + 'px)'}"
      >
        <st-colgroup :columns="columns"></st-colgroup>
        <st-thead :columns="columns"></st-thead>
      </table>
    </div>
    <div class="content" @scroll="v.scrollLeft = -1 * $event.target.scrollLeft">
      <table border="1">
        <st-colgroup :columns="columns"></st-colgroup>
        <tbody>
          <template v-for="(row, index) in rows">
            <st-row
              :key="index"
              :row="row"
              :index="index"
              :columns="flattenColumns"
              :sub-columns="subColumns"
            ></st-row>
          </template>
        </tbody>
      </table>
    </div>
    <div class="bottom" v-if="$slots.bottom && $slots.bottom.length > 0">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
import { flatten } from "./utils/utils";
import stRow from "./row/row";
import stColgroup from "simter-vue-colgroup";
import stThead from "simter-vue-thead";

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
/* default grid style */
.st-grid {
  display: flex;
  flex-direction: column;
  position: relative;
}
.st-grid > * {
  flex: none;
  position: relative;
}
.st-grid > .content {
  flex: 1 1 0%;
  overflow: auto;
}
.st-grid > .header {
  overflow: hidden;
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
  padding: 0 0.4em;
  overflow: hidden;
  text-overflow: ellipsis;
}
.st-grid > .header > table > thead > tr,
.st-grid > .content > table > tbody > tr {
  height: 2em;
}
.st-grid > .bottom > * {
  display: inline-block;
}
</style>