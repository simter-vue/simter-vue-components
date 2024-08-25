<template>
  <span :class="[rootClass, classes.root]">
    <st-button 
      :classes="classes.button" 
      :styles="styles.button" 
      :iconClass="iconClass || classes.button.iconClass"
      :rightIconClass="rightIconClass || classes.button.rightIconClass"
      @click="clickButton">
      <slot></slot>
    </st-button>
    <ul v-if="ui.showMenu" :class="menuClass" :style="menuStyle">
      <li v-for="(item, index) in items" 
        :class="itemClass(index)" 
        :style="itemStyle(index)" 
        @mouseover="mouseoverItem(index)"
        @mouseout="mouseoutItem(index)"
        @click.stop.prevent="clickItem(item, index)">{{item.text || item}}</li>
    </ul>
  </span>
</template>

<script>
/**
 * Events: select(item, index)
 */
import { gv, concatClasses, concatStyles } from "./utils";
import stButton from "./button.vue";
export default {
  components: { stButton },
  props: {
    rootClass: { type: String, required: false, default: "st-button-menu" },
    iconClass: { type: String, required: false },
    rightIconClass: { type: String, required: false },
    /** The max-width of the menu container */
    width: { type: String, required: false, default: "20em"  },
    /** menu items: [String|{text, method, ...}] */
    items: { type: Array, required: true },
    // all dom elements class
    classes: {
      type: Object,
      required: false,
      default: () => gv("simter.buttonMenu.classes", {item: {}})
    },
    // all dom elements class
    styles: {
      type: Object,
      required: false,
      default: () => gv("simter.buttonMenu.styles", {item: {}})
    }
  },
  created() {
    this.documentEvent = () => {
      if (this.ui.showMenu) this.ui.showMenu = false;
    }
    document.addEventListener('click', this.documentEvent);
  },
  destroy() {
    document.removeEventListener('click', this.documentEvent);
  },
  data() {
    return { ui: { showMenu: false, hoverItem: {} } };
  },
  computed: {
    menuClass() {
      return concatClasses(
        "st-menu",
        this.classes.menu,
      );
    },
    menuStyle() {
      return concatStyles(
        {width: this.width},
        this.styles.menu,
      );
    }
  },
  methods: {
    mouseoverItem(index){
      this.$set(this.ui.hoverItem, index+'', true)
    },
    mouseoutItem(index){
      this.$set(this.ui.hoverItem, index+'', false)
    },
    itemClass(index) {
      return concatClasses(
        "st-menu-item",
        this.classes.item.root,
        this.ui.hoverItem[index] ? this.classes.item.hover || "hover" : undefined,
      );
    },
    itemStyle(index) {
      return concatStyles(
        this.styles.item.root,
        this.ui.hoverItem[index] ? this.styles.item.hover : undefined,
      );
    },
    /** 点击按钮 */
    clickButton() {
      this.ui.showMenu = !this.ui.showMenu;
    },
    /** 点击相应的菜单项触发 select 事件 */
    clickItem(item, index) {
      this.ui.showMenu = false;
      this.$emit("select", item, index);
    }
  }
};
</script>

<style>
.st-button-menu {
  position: relative;
}
.st-button-menu > .st-menu {
  position: absolute;
  left: 0;
  z-index: 100000;
  padding: 0;
  margin: 0;
  list-style: none;
  cursor: default;
  min-width: 5em;
}
.st-button-menu > .st-menu > .st-menu-item {
  padding: 0.25em;
  margin: 0.25em;
  border-width: 0;
}
</style>