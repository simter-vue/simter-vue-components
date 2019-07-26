<template>
  <component
    :is="tag"
    :class="rootClass"
    type="button"
    @mouseover="hover = true"
    @mouseout="hover = false"
    @focus="active = true"
    @blur="active = false"
  >
    <i v-if="icon" :class="classes.icon"></i>
    <span v-if="$slots.default" :class="classes.text">
      <slot></slot>
    </span>
  </component>
</template>

<script>
/**
 * Events: none
 */
import { get, concatClasses } from "./utils";
export default {
  props: {
    tag: {
      type: String,
      required: false,
      default: () => get("simter.button.tag", "button")
    },
    icon: { type: String, required: false },
    // All dom element class
    classes: {
      type: Object,
      required: false,
      default: () => get("simter.button.classes", {})
    }
  },
  data() {
    return { hover: false, active: false };
  },
  computed: {
    rootClass() {
      return concatClasses(
        "st-button", // always
        this.classes.root, // custom
        this.hover ? this.classes.hover || "hover" : undefined, // custom or default
        this.active ? this.classes.active || "active" : undefined // custom or default
      );
    }
  }
};
</script>

<style>
.st-button {
  cursor: pointer;
}
</style>