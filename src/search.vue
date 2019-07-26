<template>
  <div :class="rootClass">
    <input
      type="search"
      :class="['st-text', classes.input]"
      :placeholder="placeholder"
      v-model="v.value"
      @keyup.enter.stop="doSearch"
      @change="doChange"
      @mouseover="hover = true"
      @mouseout="hover = false"
      @focus="active = true"
      @blur="active = false"
    />
    <st-button @click.native.prevent.stop="doSearch">Go</st-button>
  </div>
</template>

<script>
/**
 * Events: search(value)
 */
import { get, concatClasses } from "./utils";
import stButton from "./button.vue";

export default {
  components: { stButton },
  props: {
    placeholder: { type: String, required: false },
    value: { required: false },
    // all dom elements class
    classes: {
      type: Object,
      required: false,
      default: () => get("simter.search.classes", {})
    }
  },
  data() {
    return { v: { value: undefined }, hover: false, active: false };
  },
  computed: {
    rootClass() {
      return concatClasses(
        "st-search", // always
        this.classes.root, // custom
        this.hover ? this.classes.hover || "hover" : undefined, // custom or default
        this.active ? this.classes.active || "active" : undefined // custom or default
      );
    }
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
    doSearch() {
      this.$emit("search", this.v.value);
    },
    doChange() {
      this.$emit("update:value", this.v.value);
      this.$emit("change", this.v.value);
    }
  }
};
</script>

<style>
.st-search {
  position: relative;
  display: inline-flex;
}
.st-search > input[type="search"] {
  margin-right: -1px;
}
</style>