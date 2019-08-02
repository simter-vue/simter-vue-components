<template>
  <span :class="['st-pagebar', classes.root]">
    <st-button
      :class="'first'"
      :classes="classes.first"
      :styles="styles.first"
      @click.native.prevent.stop="toPage(1)"
    >{{text.first}}</st-button>
    <st-button
      :class="'previous'"
      :classes="classes.previous"
      :styles="styles.previous"
      @click.native.prevent.stop="toPage(Math.max(v.pageNo - 1, 1))"
    >{{text.previous}}</st-button>
    <span :class="['text', classes.text]" v-if="total > 0">{{v.pageNo}}/{{pageCount}}({{total}})</span>
    <span :class="['text', classes.text]" v-else>0</span>
    <st-button
      :class="'next'"
      :classes="classes.next"
      :styles="styles.next"
      @click.native.prevent.stop="toPage(Math.min(v.pageNo + 1, pageCount))"
    >{{text.next}}</st-button>
    <st-button
      :class="'last'"
      :classes="classes.last"
      :styles="styles.last"
      @click.native.prevent.stop="toPage(pageCount)"
    >{{text.last}}</st-button>
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
    text: {
      type: Object,
      required: false,
      default: () =>
        get("simter.pagebar.text", {
          first: "First",
          previous: "Previous",
          next: "Next",
          last: "Last"
        })
    },
    /** The current 1-base page number */
    pageNo: { type: Number, required: false, default: 0 },
    /** The maximal elements count of one page */
    pageSize: {
      type: Number,
      required: false,
      default: () => get("simter.pagebar.pageSize", 25)
    },
    /** The total elements count */
    total: { type: Number, required: true },
    // All dom element class
    classes: {
      type: Object,
      required: false,
      default: () => get("simter.pagebar.classes", {})
    },
    // All dom element style
    styles: {
      type: Object,
      required: false,
      default: () => get("simter.pagebar.styles", {})
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
  align-items: center;
}
.st-pagebar > .text {
  cursor: default;
  margin: 0 0.25rem;
}
.st-pagebar > :not(.text) {
  cursor: pointer;
  margin: 0;
}
</style>