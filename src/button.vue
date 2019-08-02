<template>
  <component
    :is="tag"
    :class="rootClass"
    :style="rootStyle"
    type="button"
    @mouseover="ui.hover = true"
    @mouseout="ui.hover = false"
    @click.stop.prevent="clickMe($event)"
  >
    <i v-if="iconClass || classes.icon" :class="[iconClass, classes.icon]"></i>
    <span v-if="$slots.default" :class="classes.text">
      <slot></slot>
    </span>
  </component>
</template>

<script>
/**
 * Events:
 * 1. click($event)
 * 2. "update:selected"(selected) < if selectable === true
 */
import { get, concatClasses, concatStyles } from "./utils";
export default {
  props: {
    tag: {
      type: String,
      required: false,
      default: () => get("simter.button.tag", "button")
    },
    iconClass: { type: String, required: false },
    selectable: { type: Boolean, required: false, default: false },
    // only use when selectable === true
    selected: { type: Boolean, required: false, default: false },
    // element class: { root, hover, selected, iconContainer, icon, text }
    classes: {
      type: [Array, Object],
      required: false,
      default: () => get("simter.button.classes", {})
    },
    // element style: { root, hover, selected, iconContainer, icon, text }
    styles: {
      type: Object,
      required: false,
      default: () => get("simter.button.styles", {})
    }
  },
  data() {
    return { ui: { hover: false, selected: false } };
  },
  computed: {
    rootClass() {
      return concatClasses(
        "st-button",
        this.classes.root,
        this.ui.hover ? this.classes.hover || "hover" : undefined,
        this.ui.selected ? this.classes.selected || "selected" : undefined
      );
    },
    rootStyle() {
      return concatStyles(
        this.styles.root,
        this.ui.hover ? this.styles.hover : undefined,
        this.selectable && this.ui.selected ? this.styles.selected : undefined
      );
    }
  },
  created() {
    if (this.selectable) {
      this.$watch(
        "selected",
        (newVal, _) => {
          if (this.ui.selected !== newVal) this.ui.selected = newVal;
        },
        { immediate: true }
      );
    }
  },
  methods: {
    clickMe($event) {
      if (this.selectable && this.ui.selected !== true) {
        this.ui.selected = true;
        this.$emit("update:selected", true);
      }
      this.$emit("click", $event);
    }
  }
};
</script>

<style>
.st-button {
  display: inline-flex;
  align-items: center;
  min-height: 1.8em;
}
</style>
