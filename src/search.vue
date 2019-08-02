<template>
  <div :class="['st-search', classes.root]" :style="styles.root">
    <input
      type="search"
      :class="['text', classes.text]"
      :placeholder="placeholder"
      v-model="ui.value"
      @keyup.enter.stop="doSearch"
      @change="doChange"
    />
    <st-button
      :class="'search'"
      :classes="classes.search"
      :styles="styles.search"
      @click.native.prevent.stop="doSearch"
    >{{searchButtonText}}</st-button>
  </div>
</template>

<script>
/**
 * Events: search(value)
 */
import { gv } from "./utils";
import stButton from "./button.vue";

export default {
  components: { stButton },
  props: {
    placeholder: {
      type: String,
      required: false,
      default: () => gv("simter.search.placeholder")
    },
    value: { required: false },
    searchButtonText: {
      type: String,
      required: false,
      default: () => gv("simter.search.searchButtonText", "Go")
    },
    // all dom elements class
    classes: {
      type: Object,
      required: false,
      default: () => gv("simter.search.classes", {})
    },
    // all dom elements class
    styles: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    }
  },
  data() {
    return { ui: { value: undefined } };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value !== this.ui.value) this.ui.value = value;
      }
    }
  },
  methods: {
    doSearch() {
      this.$emit("search", this.ui.value);
    },
    doChange() {
      this.$emit("update:value", this.ui.value);
      this.$emit("change", this.ui.value);
    }
  }
};
</script>

<style>
.st-search {
  position: relative;
  display: inline-flex;
}
</style>