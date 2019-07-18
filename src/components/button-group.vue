<template>
  <div :class="classes.class">
    <st-button
      v-for="(item, index) in items"
      :key="index"
      :text="item.text || item"
      :enableIcon="false"
      :class="itemClass(item, index)"
      @click.native="clickItem(item, index)"
    ></st-button>
  </div>
</template>

<script>
import { get, concatClasses } from "../utils";
import stButton from "./button.vue";

const DEFAULT_CLASSES = get("simter.buttonGroup.classes", {
  class: "st-button-group",
  firstButtonClass: "first",
  lastButtonClass: "last",
  activeButtonClass: "active"
});

export default {
  components: { stButton },
  props: {
    /** buttons: [String|{text, value, ...}|...] */
    items: { type: Array, required: true },
    /** current value */
    activeItem: { required: false, default: undefined },
    // all dom elements class
    classes: {
      type: Object,
      required: false,
      default() {
        return DEFAULT_CLASSES;
      }
    }
  },
  data() {
    return { ui: { activeItem: null } };
  },
  created() {
    this.ui.activeItem = this.activeItem;
  },
  methods: {
    /** auto judge whether to add first, last or active class to the relative button */
    itemClass(item, index) {
      return concatClasses(
        item == this.ui.activeItem ? this.classes.activeButtonClass : undefined,
        index === 0 ? this.classes.firstButtonClass : undefined,
        index === this.items.length - 1
          ? this.classes.lastButtonClass
          : undefined
      );
    },
    clickItem(item, index) {
      this.ui.activeItem = item;
      this.$emit("change", item, index);
    }
  }
};
</script>

<style>
.st-button-group {
  position: relative;
  display: inline-block;
}
</style>