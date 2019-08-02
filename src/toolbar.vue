<template>
  <div :class="classes.root">
    <slot name="default" :class="classes.default"></slot>
    <div v-if="$slots.left" :class="classes.left">
      <slot name="left"></slot>
    </div>
    <div v-if="$slots.right" :class="classes.right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { gv } from "./utils";
export default {
  props: {
    // all dom elements class
    classes: {
      type: Object,
      required: false,
      default: () =>
        gv("simter.toolbar.classes", {
          root: "st-toolbar",
          default: "default",
          right: "right",
          left: "left"
        })
    }
  }
};
</script>

<style>
.st-toolbar {
  display: flex;
  align-items: flex-start;
}
.st-toolbar > *:not(.right):not(.left) {
  margin: 0.25rem 0 0.25rem 0.25rem;
}
.st-toolbar > .left > *,
.st-toolbar > .right > * {
  margin: 0.25rem 0.25rem 0.25rem 0;
}
.st-toolbar > .right {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  justify-content: flex-end;
}
</style>