<template>
  <span>{{rowIndex >= 0 ? rowIndex : ""}}</span>
</template>

<script>
// zero base row serial number cell

import cellBase from "./base";
export default { extends: cellBase };
</script>