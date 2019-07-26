<template>
  <div :class="classes.root" :style="styles.root" v-html="value"></div>
</template>

<script>
// Html cell

import cellBase from "./base";
export default { extends: cellBase };
</script>