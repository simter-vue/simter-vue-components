<template>
  <span :class="classes.root" :style="styles.root">{{content}}</span>
</template>

<script>
// 1 base row serial number cell

import cellBase from "./base";
export default {
  extends: cellBase,
  computed: {
    content() {
      return this.empty
        ? ""
        : this.column && this.column.pid
        ? this.index + 1 // nested sn
        : (this.$parent.selected ? "✓" : "") + (this.dataRowIndex + 1); // dataRow sn
    }
  }
};
</script>