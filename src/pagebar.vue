<template>
  <span :class="classes.root">
    <st-button :class="classes.first" @click.native.prevent.stop="toPage(1)">First</st-button>
    <st-button
      :class="classes.previous"
      @click.native.prevent.stop="toPage(Math.max(v.pageNo - 1, 1))"
    >Previous</st-button>
    <span :class="classes.text" v-if="total > 0">{{v.pageNo}}/{{pageCount}}({{total}})</span>
    <span :class="classes.text" v-else>0</span>
    <st-button
      :class="classes.next"
      @click.native.prevent.stop="toPage(Math.min(v.pageNo + 1, pageCount))"
    >Next</st-button>
    <st-button :class="classes.last" @click.native.prevent.stop="toPage(pageCount)">Last</st-button>
  </span>
</template>

<script>
/**
 * Events: change(newPageNo)
 */
import { get } from "./utils";
import stButton from "./button.vue";
export default {
  components: { stButton },
  props: {
    /** The current 1-base page number */
    pageNo: { type: Number, required: false, default: 0 },
    /** The maximal elements count of one page */
    pageSize: {
      type: Number,
      required: false,
      default: () => get("simter.pagebar.pageSize", 25)
    },
    /** The candidate page-size */
    pageSizes: {
      type: Array,
      required: false,
      default: () => get("simter.pagebar.pageSizes", [25, 50, 100])
    },
    /** The total elements count */
    total: { type: Number, required: true },
    // All dom element class
    classes: {
      type: Object,
      required: false,
      default: () =>
        get("simter.pagebar.classes", {
          root: "st-pagebar",
          first: "icon first",
          previous: "icon previous",
          text: "text",
          next: "icon next",
          last: "icon last"
        })
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.pageSize);
    }
  },
  data() {
    return { v: { pageNo: undefined } };
  },
  watch: {
    pageNo: {
      immediate: true,
      handler(value) {
        if (value !== this.v.pageNo) this.v.pageNo = value;
      }
    }
  },
  methods: {
    toPage(pageNo) {
      if (pageNo !== this.v.pageNo) {
        this.v.pageNo = pageNo;
        this.$emit("update:page-no", pageNo);
        this.$emit("change", pageNo);
      }
    }
  }
};
</script>

<style>
.st-pagebar {
  display: inline-flex;
}
.st-pagebar > .text {
  cursor: default;
  margin: 0 0.25rem;
}
.st-pagebar > :not(.text) {
  cursor: pointer;
  margin: 0 -1px 0 0;
}
</style>