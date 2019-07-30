<template>
  <span :class="classes.root" :style="styles.root">{{content}}</span>
</template>

<script>
// 1 base row serial number cell

import cellBase from "./base";
export default {
  extends: cellBase,
  computed: {
    selected() {
      return this.$parent.v.selected;
    },
    content() {
      // console.log(
      //   "--dataRowIndex=%s, tableRowIndex=%s, index=%s, label=%s, pid=%s, empty=%s",
      //   this.dataRowIndex,
      //   this.tableRowIndex,
      //   this.index,
      //   this.column.label,
      //   this.column.pid,
      //   this.empty
      // );
      return this.empty
        ? ""
        : this.column && this.column.pid
        ? this.index + 1 // nested sn
        : (this.selected ? "✓" : "") + (this.dataRowIndex + 1); // dataRow sn
    }
  }
};
</script>