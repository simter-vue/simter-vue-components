<template>
  <span :class="classes.root" :style="styles.root">{{content}}</span>
</template>

<script>
// zero base row serial number cell

import cellBase from "./base";
export default {
  extends: cellBase,
  computed: {
    content() {
      let t = this.empty
        ? ""
        : (this.column && this.column.pid)
        ? this.index         // nested index
        : this.dataRowIndex; // dataRow index
      return t;
    }
  }
};
</script>