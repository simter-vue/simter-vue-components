<template>
  <span :class="classes.root" :style="styles.root">{{rowIndex >= 0 ? rowIndex + 1 : ""}}</span>
</template>

<script>
// 1 base row serial number cell

import cellBase from "./base";
export default { extends: cellBase };
</script>