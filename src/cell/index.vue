<template>
  <span :class="classes.root" :style="styles.root">{{index >= 0 ? index : ""}}</span>
</template>

<script>
// zero base row serial number cell

import cellBase from "./base";
export default { extends: cellBase };
</script>