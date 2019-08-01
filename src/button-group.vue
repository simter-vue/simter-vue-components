<template>
  <span :class="['st-button-group', classes.root]">
    <st-button
      v-for="(item, index) in items"
      :key="index"
      :classes="classes.button"
      :styles="styles.button"
      :class="itemClass(item, index)"
      :style="itemStyle(item, index)"
      :selectable="true"
      :selected="item === value"
      @click="clickItem(item, index)"
    >{{typeof item === "string" ? item : (typeof item === "object" ? item.text || item.value : item)}}</st-button>
  </span>
</template>

<script>
/**
 * Events: change(newValue, newIndex)
 */
import { get, concatClasses, concatStyles } from "./utils";
import stButton from "./button.vue";
export default {
  components: { stButton },
  props: {
    /** buttons: [String|{text, value, ...}] */
    items: { type: Array, required: true },
    /** current value */
    value: { required: false },
    // all dom elements class
    classes: {
      type: Object,
      required: false,
      default: () =>
        get("simter.buttonGroup.classes", {
          root: "st-button-group",
          first: "first",
          last: "last",
          active: "active"
        })
    },
    // all dom elements class
    styles: {
      type: Object,
      required: false,
      default: () => get("simter.buttonGroup.styles", {})
    }
  },
  data() {
    return { v: { value: undefined } };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value !== this.v.value) this.v.value = value;
      }
    }
  },
  methods: {
    /** auto judge whether to add first, last or active class to the relative button */
    itemClass(item, index) {
      return concatClasses(
        item == this.v.value ? this.classes.active : undefined,
        index === 0 ? this.classes.first : undefined,
        index === this.items.length - 1 ? this.classes.last : undefined
      );
    },
    /** auto judge whether to add first, last or active style to the relative button */
    itemStyle(item, index) {
      return concatStyles(
        item == this.v.value ? this.styles.active : undefined,
        index === 0 ? this.styles.first : undefined,
        index === this.items.length - 1 ? this.styles.last : undefined
      );
    },
    clickItem(item, index) {
      if (this.v.value !== item) {
        this.v.value = item;
        this.$emit("update:value", item);
        this.$emit("change", item, index);
      }
    }
  }
};
</script>

<style>
.st-button-group {
  display: inline-flex;
}
.st-button-group > * {
  margin: 0 -1px 0 0;
}
</style>