<template>
  <div :class="['st-loader', classes.root]" :style="styles.root">
    <div
      :class="['actor', classes.actor]"
      :style="actorStyle_"
    ></div>
    <div v-if="showTimer" :class="['timer', classes.timer]" :style="styles.timer">
      {{ minutes_ }}:{{ seconds_ }}
    </div>
  </div>
</template>

<script>
import { gv, concatStyles } from "./utils";
export default {
  replace: true,
  props: {
    size: { type: Number, required: false, default: 3.2 },
    sizeUnit: { type: String, required: false, default: "em" },
    speed: { type: String, required: false, default: "1s" },
    // show timer if over this timeout second value
    timeout: { type: Number, required: false, default: 5 },
    // elements class: { root, actor, timer }
    classes: {
      type: Object,
      required: false,
      default: () => gv("simter.loader.classes", {})
    },
    // elements style: { root, actor, timer }
    styles: {
      type: Object,
      required: false,
      default: () => gv("simter.loader.styles", {})
    }
  },
  data: function () {
    return { minutes: 0, seconds: 0, totalSeconds: 0, showTimer: false, timer: null };
  },
  computed: {
    size_: function () {
      return this.size + this.sizeUnit;
    },
    minutes_: function () {
      if (this.minutes < 10) return "0" + this.minutes;
      else return "" + this.minutes;
    },
    seconds_: function () {
      if (this.seconds < 10) return "0" + this.seconds;
      else return "" + this.seconds;
    },
    actorStyle_: function () {
      return concatStyles({
        'width': this.size_,
        'height': this.size_,
        'animation-duration': this.speed,
        'margin-top': 'calc(' + this.size_ + ' / -2)',
        'margin-left': 'calc(' + this.size_ + ' / -2)',
      }, this.styles.actor);
    }
  },
  created: function () {
    const max = 60;
    this.timer = setInterval(() => {
      // show timer if timeout
      if (++this.totalSeconds >= this.timeout && !this.showTimer) this.showTimer = true;

      // calculate timer's minutes and seconds
      this.seconds++;
      if (this.seconds == max) {
        this.seconds = 0;
        this.minutes++;
        if (this.minutes == max) this.minutes = 0;
      }
    }, 1000);
  },
  destroyed: function () {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    reset: function () {
      this.minutes = 0;
      this.seconds = 0;
      if (this.timer) clearInterval(this.timer);
    },
    concatStyles: function(...styles){
      let t = concatStyles(...styles);
      console.log(t);
      return t;
    }
  }
};
</script>

<style>
.st-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;
}

.st-loader > .timer,
.st-loader > .actor {
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
}

.st-loader > .timer {
  width: 6em;
  height: 2em;
  line-height: 2em;
  text-align: center;
  margin: -1em auto auto -3em;
  border: none;
  background: none;
}

.st-loader > .actor {
  background: none;
  opacity: 0.8;
  border-width: 0.2em;
  border-radius: 50%;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: st-loader-animation-spin 1000ms infinite linear;
}

/* rotation animation */
@keyframes st-loader-animation-spin {
  100% {
    transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>