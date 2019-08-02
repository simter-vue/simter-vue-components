<template>
  <span :class="[rootClass, classes.root]">
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
import { gv, concatClasses, concatStyles } from "./utils";
import stButton from "./button.vue";
export default {
  components: { stButton },
  props: {
    rootClass: { type: String, required: false, default: "st-button-group" },
    /** buttons: [String|{text, value, ...}] */
    items: { type: Array, required: true },
    /** current value */
    value: { required: false },
    // all dom elements class
    classes: {
      type: Object,
      required: false,
      default: () =>
        gv("simter.buttonGroup.classes", {
          first: "first",
          last: "last"
        })
    },
    // all dom elements class
    styles: {
      type: Object,
      required: false,
      default: () => gv("simter.buttonGroup.styles", {})
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
    /** auto judge whether to add first, last or selected class to the relative button */
    itemClass(item, index) {
      return concatClasses(
        item == this.v.value ? this.classes.selected : undefined,
        index === 0 ? this.classes.first : undefined,
        index === this.items.length - 1 ? this.classes.last : undefined
      );
    },
    /** auto judge whether to add first, last or selected style to the relative button */
    itemStyle(item, index) {
      return concatStyles(
        item == this.v.value ? this.styles.selected : undefined,
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
  margin: 0;
}
</style>