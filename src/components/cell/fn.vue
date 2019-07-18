<template>
  <div v-if="isHtml" v-html="content"></div>
  <span v-else>{{content}}</span>
</template>

<script>
// Render cell content by custom render function

import cellBase from "./base";
export default {
  extends: cellBase,
  props: {
    /** The render function */
    fn: {
      required: false,
      type: Function
    },
    /** Whether render to text or html */
    isHtml: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  computed: {
    /** The display content, text or html */
    content() {
      return this.fn ? this.fn(this.row, this) : this.value;
    }
  }
};
</script>