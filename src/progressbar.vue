<template>
  <div :class="['st-progressbar', classes.root]" :style="styles.root">
    <div :class="['percent', classes.percent]" :style="percentStyle"></div>
    <div v-if="showText" :class="['text', classes.text]" :style="styles.text">{{percent + '%'}}</div>
  </div>
</template>

<script>
import { gv, concatStyles } from "./utils";
export default {
  replace: true,
  props: {
    // upload percent: 0~100
    percent: { type: Number, required: false, default: 0 },
    showText: { type: Boolean, required: false, default: true },
    // elements classes: { root, percent, text }
    classes: {
      type: Object,
      required: false,
      default: () => gv("simter.progressbar.classes", {})
    },
    // elements style: { root, percent, text }
    styles: {
      type: Object,
      required: false,
      default: () => gv("simter.progressbar.styles", {})
    }
  },
  computed: {
    percentStyle: function () {
      return concatStyles({
        'width': `${this.percent}%`
      }, this.styles.percent);
    }
  },
  methods: {
    reset: function () {
      this.percent = 0;
    }
  }
};
</script>

<style>
.st-progressbar {
  position: relative;
  height: 1.2em;
  text-align: center;
}

.st-progressbar > .percent,
.st-progressbar > .text {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}
.st-progressbar > .text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 80%;
}
</style>