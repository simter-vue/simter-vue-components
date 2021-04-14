/*!
* simter-vue-components v0.4.0
* https://github.com/simter-vue/simter-vue-components.git 
* @author RJ.Hwang <rongjihuang@gmail.com>
* @license MIT
*/
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));

var version = "0.4.0";

const g = window || global;
/**
 * Flatten all leaf object to simple object array.
 *
 * Example :
 * 1. [{id: 1}, {id: 2}]
 *    flatten to
 *    [{id: 1}, {id: 2}]
 * 2. [{id: 1}, {children: [{id: 2}, {id: 3}]}]
 *    flatten to
 *    [{id: 1}, {id: 2}, {id: 3}]
 * 3. [{id: 1}, {children: [{id: 2}, {children: [{id: 3}, {id: 4}]}]}]
 *    flatten to
 *    [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
 */

function flatten(columns) {
  return columns.reduce((a, b) => a.concat(b.children ? flatten(b.children) : b), []);
}
/** Get global key's value */


function getGlobalVariable(key, defaultValue) {
  if (g.hasOwnProperty(key)) return g[key];
  let p = g,
      value;

  for (const k of key.split(".")) {
    if (p.hasOwnProperty(k)) value = p = p[k];else {
      value = undefined;
      break;
    }
  }

  return typeof value === "undefined" ? defaultValue : value;
}
/** 
 * concat all class.
 * 
 * each class is String, Array or undefined.
 */


function concatClasses(...classes) {
  return classes.reduce((a, b) => {
    if (typeof b === "undefined") return a;else {
      a = a.concat(b);
      return a;
    }
  }, []);
}
/** 
 * concat all style.
 * 
 * each style is Json-Object or undefined.
 */


function concatStyles(...styles) {
  return styles.reduce((a, b) => {
    if (typeof b === "undefined") return a;else return Object.assign(a, b);
  }, {});
}

//
var script = {
  replace: true,
  props: {
    size: {
      type: Number,
      required: false,
      default: 3.2
    },
    sizeUnit: {
      type: String,
      required: false,
      default: "em"
    },
    speed: {
      type: String,
      required: false,
      default: "1s"
    },
    // show timer if over this timeout second value
    timeout: {
      type: Number,
      required: false,
      default: 5
    },
    // elements class: { root, actor, timer }
    classes: {
      type: Object,
      required: false,
      default: () => getGlobalVariable("simter.loader.classes", {})
    },
    // elements style: { root, actor, timer }
    styles: {
      type: Object,
      required: false,
      default: () => getGlobalVariable("simter.loader.styles", {})
    }
  },
  data: function () {
    return {
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      showTimer: false,
      timer: null
    };
  },
  computed: {
    size_: function () {
      return this.size + this.sizeUnit;
    },
    minutes_: function () {
      if (this.minutes < 10) return "0" + this.minutes;else return "" + this.minutes;
    },
    seconds_: function () {
      if (this.seconds < 10) return "0" + this.seconds;else return "" + this.seconds;
    },
    actorStyle_: function () {
      return concatStyles({
        'width': this.size_,
        'height': this.size_,
        'animation-duration': this.speed,
        'margin-top': 'calc(' + this.size_ + ' / -2)',
        'margin-left': 'calc(' + this.size_ + ' / -2)'
      }, this.styles.actor);
    }
  },
  created: function () {
    const max = 60;
    this.timer = setInterval(() => {
      // show timer if timeout
      if (++this.totalSeconds >= this.timeout && !this.showTimer) this.showTimer = true; // calculate timer's minutes and seconds

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
    concatStyles: function (...styles) {
      let t = concatStyles(...styles);
      console.log(t);
      return t;
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: ["st-loader", _vm.classes.root], style: _vm.styles.root },
    [
      _c("div", {
        class: ["actor", _vm.classes.actor],
        style: _vm.actorStyle_
      }),
      _vm._v(" "),
      _vm.showTimer
        ? _c(
            "div",
            { class: ["timer", _vm.classes.timer], style: _vm.styles.timer },
            [
              _vm._v(
                "\n    " +
                  _vm._s(_vm.minutes_) +
                  ":" +
                  _vm._s(_vm.seconds_) +
                  "\n  "
              )
            ]
          )
        : _vm._e()
    ]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-63c89424_0", { source: "\n.st-loader {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  z-index: 100000;\n}\n.st-loader > .timer,\r\n.st-loader > .actor {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  top: 50%;\r\n  left: 50%;\n}\n.st-loader > .timer {\r\n  width: 6em;\r\n  height: 2em;\r\n  line-height: 2em;\r\n  text-align: center;\r\n  margin: -1em auto auto -3em;\r\n  border: none;\r\n  background: none;\n}\n.st-loader > .actor {\r\n  background: none;\r\n  opacity: 0.8;\r\n  border-width: 0.2em;\r\n  border-radius: 50%;\r\n  border-left-color: transparent;\r\n  border-right-color: transparent;\r\n  animation: st-loader-animation-spin 1000ms infinite linear;\n}\r\n\r\n/* rotation animation */\n@keyframes st-loader-animation-spin {\n100% {\r\n    transform: rotate(360deg);\r\n    transform: rotate(360deg);\n}\n}\r\n", map: {"version":3,"sources":["D:\\work\\github-simter-vue\\simter-vue-components\\src\\loader.vue"],"names":[],"mappings":";AA8FA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,eAAA;AACA;AAEA;;EAEA,kBAAA;EACA,sBAAA;EACA,QAAA;EACA,SAAA;AACA;AAEA;EACA,UAAA;EACA,WAAA;EACA,gBAAA;EACA,kBAAA;EACA,2BAAA;EACA,YAAA;EACA,gBAAA;AACA;AAEA;EACA,gBAAA;EACA,YAAA;EACA,mBAAA;EACA,kBAAA;EACA,8BAAA;EACA,+BAAA;EACA,0DAAA;AACA;;AAEA,uBAAA;AACA;AACA;IACA,yBAAA;IACA,yBAAA;AACA;AACA","file":"loader.vue","sourcesContent":["<template>\r\n  <div :class=\"['st-loader', classes.root]\" :style=\"styles.root\">\r\n    <div\r\n      :class=\"['actor', classes.actor]\"\r\n      :style=\"actorStyle_\"\r\n    ></div>\r\n    <div v-if=\"showTimer\" :class=\"['timer', classes.timer]\" :style=\"styles.timer\">\r\n      {{ minutes_ }}:{{ seconds_ }}\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport { gv, concatStyles } from \"./utils\";\r\nexport default {\r\n  replace: true,\r\n  props: {\r\n    size: { type: Number, required: false, default: 3.2 },\r\n    sizeUnit: { type: String, required: false, default: \"em\" },\r\n    speed: { type: String, required: false, default: \"1s\" },\r\n    // show timer if over this timeout second value\r\n    timeout: { type: Number, required: false, default: 5 },\r\n    // elements class: { root, actor, timer }\r\n    classes: {\r\n      type: Object,\r\n      required: false,\r\n      default: () => gv(\"simter.loader.classes\", {})\r\n    },\r\n    // elements style: { root, actor, timer }\r\n    styles: {\r\n      type: Object,\r\n      required: false,\r\n      default: () => gv(\"simter.loader.styles\", {})\r\n    }\r\n  },\r\n  data: function () {\r\n    return { minutes: 0, seconds: 0, totalSeconds: 0, showTimer: false, timer: null };\r\n  },\r\n  computed: {\r\n    size_: function () {\r\n      return this.size + this.sizeUnit;\r\n    },\r\n    minutes_: function () {\r\n      if (this.minutes < 10) return \"0\" + this.minutes;\r\n      else return \"\" + this.minutes;\r\n    },\r\n    seconds_: function () {\r\n      if (this.seconds < 10) return \"0\" + this.seconds;\r\n      else return \"\" + this.seconds;\r\n    },\r\n    actorStyle_: function () {\r\n      return concatStyles({\r\n        'width': this.size_,\r\n        'height': this.size_,\r\n        'animation-duration': this.speed,\r\n        'margin-top': 'calc(' + this.size_ + ' / -2)',\r\n        'margin-left': 'calc(' + this.size_ + ' / -2)',\r\n      }, this.styles.actor);\r\n    }\r\n  },\r\n  created: function () {\r\n    const max = 60;\r\n    this.timer = setInterval(() => {\r\n      // show timer if timeout\r\n      if (++this.totalSeconds >= this.timeout && !this.showTimer) this.showTimer = true;\r\n\r\n      // calculate timer's minutes and seconds\r\n      this.seconds++;\r\n      if (this.seconds == max) {\r\n        this.seconds = 0;\r\n        this.minutes++;\r\n        if (this.minutes == max) this.minutes = 0;\r\n      }\r\n    }, 1000);\r\n  },\r\n  destroyed: function () {\r\n    if (this.timer) clearInterval(this.timer);\r\n  },\r\n  methods: {\r\n    reset: function () {\r\n      this.minutes = 0;\r\n      this.seconds = 0;\r\n      if (this.timer) clearInterval(this.timer);\r\n    },\r\n    concatStyles: function(...styles){\r\n      let t = concatStyles(...styles);\r\n      console.log(t);\r\n      return t;\r\n    }\r\n  }\r\n};\r\n</script>\r\n\r\n<style>\r\n.st-loader {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  z-index: 100000;\r\n}\r\n\r\n.st-loader > .timer,\r\n.st-loader > .actor {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  top: 50%;\r\n  left: 50%;\r\n}\r\n\r\n.st-loader > .timer {\r\n  width: 6em;\r\n  height: 2em;\r\n  line-height: 2em;\r\n  text-align: center;\r\n  margin: -1em auto auto -3em;\r\n  border: none;\r\n  background: none;\r\n}\r\n\r\n.st-loader > .actor {\r\n  background: none;\r\n  opacity: 0.8;\r\n  border-width: 0.2em;\r\n  border-radius: 50%;\r\n  border-left-color: transparent;\r\n  border-right-color: transparent;\r\n  animation: st-loader-animation-spin 1000ms infinite linear;\r\n}\r\n\r\n/* rotation animation */\r\n@keyframes st-loader-animation-spin {\r\n  100% {\r\n    transform: rotate(360deg);\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var stLoader = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

var cellBase = {
  props: {
    // Whether is a empty cell
    empty: {
      required: false,
      default: false
    },
    // Cell value
    value: {
      required: false
    },
    // Column option
    column: {
      type: Object,
      required: false
    },
    // All dom element class
    classes: {
      type: Object,
      required: false,

      default() {
        return {};
      }

    },
    // All dom element style
    styles: {
      type: Object,
      required: false,

      default() {
        return {};
      }

    }
  },
  computed: {
    // DataRow.value
    row() {
      return this.$parent.dataRowValue;
    },

    // TableRow.index
    index() {
      return this.$parent.index;
    },

    // TableRow.tableRowIndex
    tableRowIndex() {
      return this.$parent.tableRowIndex;
    },

    // TableRow.dataRowIndex
    dataRowIndex() {
      return this.$parent.dataRowIndex;
    }

  }
};

//
var script$1 = {
  extends: cellBase,
  computed: {
    content() {
      let t = this.empty ? "" : this.column && this.column.pid ? this.index // nested index
      : this.dataRowIndex; // dataRow index

      return t;
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("span", { class: _vm.classes.root, style: _vm.styles.root }, [
    _vm._v(_vm._s(_vm.content))
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var stCellIndex = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

//
var script$2 = {
  extends: cellBase
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("span", { class: _vm.classes.root, style: _vm.styles.root }, [
    _vm._v(_vm._s(_vm.dataRowIndex >= 0 ? _vm.dataRowIndex + 1 : ""))
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var stCellSn = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

//
var script$3 = {
  extends: cellBase,
  computed: {
    content() {
      return this.empty ? "" : this.column && this.column.pid ? this.index + 1 // nested sn
      : (this.$parent.selected ? "✓" : "") + (this.dataRowIndex + 1); // dataRow sn
    }

  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("span", { class: _vm.classes.root, style: _vm.styles.root }, [
    _vm._v(_vm._s(_vm.content))
  ])
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var stCellSnSelectable = normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

//
var script$4 = {
  extends: cellBase
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("span", { class: _vm.classes.root, style: _vm.styles.root }, [
    _vm._v(_vm._s(_vm.value))
  ])
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var stCellText = normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
    undefined
  );

//
var script$5 = {
  extends: cellBase
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    class: _vm.classes.root,
    style: _vm.styles.root,
    domProps: { innerHTML: _vm._s(_vm.value) }
  })
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var stCellHtml = normalizeComponent_1(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    undefined,
    undefined
  );

//
const DEFAULT_CELL_COMPONENT = "st-cell-text";
var script$6 = {
  // register all inner cell components
  components: {
    stCellIndex,
    stCellSn,
    stCellSnSelectable,
    stCellText,
    stCellHtml
  },
  props: {
    // DataRow.value
    row: {
      required: true,
      type: [Object, Array]
    },
    // The nested item index
    index: {
      required: true,
      type: Number
    },
    // The array index within `table.rows`. It's the `tr` index within `table` element
    tableRowIndex: {
      required: true,
      type: Number
    },
    // The row index within `grid.rows`
    dataRowIndex: {
      required: true,
      type: Number
    },
    selected: {
      required: false,
      default: false
    },
    // [{ rowspan, colspan, value }, ...]
    cells: {
      required: true,
      type: Array
    },
    // All dom element class
    classes: {
      type: Object,
      required: false,

      default() {
        return {};
      }

    },
    // All dom element style
    styles: {
      type: Object,
      required: false,

      default() {
        return {};
      }

    }
  },

  data() {
    return {
      v: {
        hover: false,
        clickTimer: null
      }
    };
  },

  computed: {
    rowClass() {
      return concatClasses("st-row", // always
      this.classes.row, // custom
      this.v.hover ? this.classes.rowHover || "hover" : undefined, // custom or default
      this.selected ? this.classes.rowSelected || "selected" : undefined // custom or default
      );
    },

    rowStyle() {
      return concatStyles(this.styles.row, // custom
      this.v.hover ? this.styles.rowHover : undefined, // custom or default
      this.selected ? this.styles.rowSelected : undefined // custom or default
      );
    },

    // refactor column.cell (String|{}|Function) to standard structure ({})
    columnCellRefactors() {
      const toStandardCell = (cell, cfg) => {
        let t = typeof cfg;
        if (t === "undefined") return {
          component: DEFAULT_CELL_COMPONENT
        };else if (t === "string") return {
          component: cfg
        };else if (t === "object") {
          if (!cfg.hasOwnProperty("component")) cfg.component = DEFAULT_CELL_COMPONENT;
          return cfg;
        } else if (t === "function") {
          if (cell.column.hasOwnProperty("pid")) {
            let nestedRow = cell.empty ? undefined : this.row[cell.column.pid][this.index];
            return toStandardCell(cell, cfg.call(this.$root, nestedRow, this.row, cell.empty));
          } else return toStandardCell(cell, cfg.call(this.$root, this.row));
        } else return {
          component: DEFAULT_CELL_COMPONENT
        };
      };

      return this.cells.map(cell => {
        if (!cell.column) return {
          component: DEFAULT_CELL_COMPONENT
        };
        return toStandardCell(cell, cell.column.cell);
      });
    }

  },
  methods: {
    cellClass(cell) {
      return concatClasses("st-cell", // always
      this.classes.cell, // define in Grid.classes.contentRow
      cell.column && cell.column.class || "text" // define in Grid.columns[index].class
      );
    },

    cellStyle(cell) {
      return concatStyles(this.styles.cell, cell.column && cell.column.style);
    },

    cellComponentProps(cell, index) {
      // { empty, column, value, classes, styles }
      let t = this.columnCellRefactors[index];
      let main = {
        empty: cell.empty,
        column: cell.column
      };
      if (!cell.empty) main.value = t.hasOwnProperty("value") ? t.value : cell.value;
      if (t.classes) main.classes = t.classes;
      if (t.styles) main.styles = t.styles;
      return main;
    },

    clickRow(targetEl) {
      // delay click event for dblclick event to clear it
      if (this.v.clickTimer) g.clearTimeout(this.v.clickTimer);
      this.v.clickTimer = g.setTimeout(() => {
        // find cell
        let td = targetEl.closest("td");

        if (!td) {
          alert("This browser not support Element.closest method");
          return;
        }

        let cell = this.cells[td.cellIndex];

        if (!cell) {
          alert("Error to find cell config");
          return;
        } // 1. do actual work for click
        // 1.1. emit row-selection-change event


        this.$emit("row-selection-change", {
          selected: !this.selected,
          index: this.dataRowIndex
        }); // 1.2. invoke column.cell.on.click function

        let t = this.columnCellRefactors[td.cellIndex];
        if (typeof t.click === "function") t.click.call(this.$root, {
          target: targetEl,
          value: t.hasOwnProperty("value") ? t.value : cell.value,
          row: this.row,
          nestedRowIndex: this.index,
          tableRowIndex: this.tableRowIndex,
          dataRowIndex: this.dataRowIndex
        }); // 1.3. emit row-click event

        this.$emit("row-click", {
          row: this.row,
          index: this.dataRowIndex,
          selected: this.selected
        });
      }, 300);
    },

    dblclickRow() {
      // clear click event
      if (this.v.clickTimer) g.clearTimeout(this.v.clickTimer); // 1. do actual work for dblclick
      // 1.1. emit row-selection-change event

      if (!this.selected) this.$emit("row-selection-change", {
        selected: this.selected,
        index: this.dataRowIndex
      }); // 1.2. emit row-dblclick event

      this.$emit("row-dblclick", {
        row: this.row,
        index: this.dataRowIndex
      });
    }

  }
};

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "tr",
    {
      class: _vm.rowClass,
      style: _vm.rowStyle,
      on: {
        mouseover: function($event) {
          _vm.v.hover = true;
        },
        mouseout: function($event) {
          _vm.v.hover = false;
        },
        click: function($event) {
          $event.stopPropagation();
          return _vm.clickRow($event.target)
        },
        dblclick: function($event) {
          $event.stopPropagation();
          $event.preventDefault();
          return _vm.dblclickRow($event)
        }
      }
    },
    _vm._l(_vm.cells, function(cell, index) {
      return _c(
        "td",
        {
          key: index,
          class: _vm.cellClass(cell),
          style: _vm.cellStyle(cell),
          attrs: { rowspan: cell.rowspan, colspan: cell.colspan }
        },
        [
          _c(
            _vm.columnCellRefactors[index].component,
            _vm._b(
              {
                tag: "component",
                class: _vm.classes.cellComponent,
                style: _vm.styles.cellComponent
              },
              "component",
              _vm.cellComponentProps(cell, index),
              false
            )
          )
        ],
        1
      )
    }),
    0
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var stTableRow = normalizeComponent_1(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    undefined,
    undefined
  );

// A functional component for renderer multiple tr element.
var stDataRow = {
  functional: true,
  props: {
    tableRows: {
      required: true,
      type: Array
    }
  },

  render(createElement, context) {
    return context.props.tableRows.map(tableRow => {
      return createElement(stTableRow, {
        props: tableRow,
        on: context.listeners
      });
    });
  }

};

//
//
//
//
//
//
const component = {
  replace: true,
  props: {
    // The column's 'width' config array, like ['20px', '40px', ...]
    columns: {
      type: Array,
      required: true
    }
  },
  computed: {
    /**
     * The result of function call flatten(this.columns).
     */
    widthArray() {
      return flatten$1(this.columns);
    }

  }
};
/**
 * Flatten complex object array to simple string array.
 *
 * Just deal with object's 'width' and 'children' key.
 *
 * Example :
 * 1. ['20px', '40px', ...] flatten to ['20px', '40px', ...]
 * 2. [{width: '20px'}, {width: '40px'}, ...] flatten to ['20px', '40px', ...]
 * 3. [{width: '20px'}, {children: [{width: '40px'}, {width: '60px'}]}, ...]
 *    flatten to ['20px', '40px', '60px', ...]
 */

const flatten$1 = columns => columns.reduce((a, b) => a.concat(b.children ? flatten$1(b.children) : b.width || b), []).map(a => typeof a === "object" ? a.width : a);

/* script */
const __vue_script__$7 = component;

/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "colgroup",
    _vm._l(_vm.widthArray, function(width, index) {
      return _c("col", { key: index, style: { width: width } })
    }),
    0
  )
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var stColgroup = normalizeComponent_1(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const component$1 = {
  replace: true,
  props: {
    // The column's 'label' config array, like ['Column1', 'Column2', ...]
    columns: {
      type: Array,
      required: true
    },
    // element class: { row, cell }
    classes: {
      type: Object,
      required: false,

      default() {
        return {};
      }

    },
    // element style: { row, cell }
    styles: {
      type: Object,
      required: false,

      default() {
        return {};
      }

    }
  },
  computed: {
    /** 
     * The result of function call transform(this.columns).
     */
    rows() {
      return transform(deepClone(this.columns));
    }

  }
};
/**
 * Transform the origin string or lable/children config to matched trs array config.
 *
 * Rules :
 * 1. rowspan
 * 1.1. if has children, it equals to 1. And just ignore setting.
 * 1.2. if has no children, it equals to the max siblings descendant depth + 1. Ignore setting if rowspan is 1.
 * 2. colspan equals to its tree leaf node count. Ignore setting if colspan is 1.
 *
 * Examples :
 * 1. ["X1", "X2"] transform to [ [{label: "X1"}, {label: "X2"}] ]
 * 2. ["X1", {label: "X2", children: ["X21", "X22"]}]
 *    transform to [
 *      [{label: "X1", rowspan: 2}, {label: "X2", colspan: 2}],
 *      [{label: "X21"}, {label: "X22"}]
 *    ]
 * 3. [
 *      "X1",
 *      {
 *        label: "X2",
 *        children: [
 *          {
 *            label: "X21",
 *            children: ["X211", "X212"]
 *          },
 *          "X22"
 *        ]
 *      }
 *    ]
 *    transform to [
 *      [{label: "X1", rowspan: 3}, {label: "X2", colspan: 3}],
 *      [{label: "X21", colspan: 2}, {label: "X22", rowspan: 2}],
 *      [{label: "X211"}, {label: "X212"}]
 *    ]
 */

function transform(columns) {
  // Polishing String item to Object item
  columns = polishing(columns);
  columns.forEach(column => {
    // set $_rowIndex and $_depth
    descendantDepth(column); // set colspan

    leafCount(column);
  }); // group by $_rowIndex

  const rows = flattenWithSelf(columns, true).reduce(function (result, column) {
    if (!result[column.$_rowIndex]) result[column.$_rowIndex] = [column];else result[column.$_rowIndex].push(column);
    return result;
  }, []); // calculate each column's rowspan

  rows.forEach(row => {
    row.forEach(column => {
      if (column.$_depth === 0) {
        // no children
        // rowspan = max(siblings.$_depth) + 1
        const depth = row.filter(c => c !== column).reduce((a, b) => Math.max(a, b.$_depth), 0);
        if (depth > 0) column.rowspan = depth + 1;
      }
    });
  }); // remove $_rowIndex and $_depth

  rows.forEach(row => {
    row.forEach(column => {
      delete column.$_rowIndex;
      delete column.$_depth;
    });
  });
  return rows;
}
/**
 * Change Array's String item to Object item.
 * All nested item in children will be changed also.
 * Attention: this method maybe change the origin array.
 *
 * Examples:
 * 1. "X1" polishing to {label: "X1"}.
 * 2. {"X1", children: ["X11", "X12"] polishing to
 *    {label: "X1", children: [{label: "X11"}, {label: "X12"}] }.
 */


function polishing(columns) {
  // Polishing String item to Object item
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];

    if (typeof column === "object") {
      if (column.children) column.children = polishing(column.children);
    } else columns[i] = {
      label: column
    };
  }

  return columns;
}
/**
 * Calculate the descendant depth and set to $_depth property.
 *
 * It equals to the nested children level.
 *
 * Example :
 * 1. {label: "X0"}.depth = 0
 * 2. {label: "X0", children: ["X1"]}.depth = 1
 * 3. {label: "X0", children: [{label: "X1", children: ["X2"]}]}.depth = 2
 */


function descendantDepth(column) {
  if (!column.hasOwnProperty("$_rowIndex")) column.$_rowIndex = 0; // parent $_rowIndex

  let d;

  if (column.children && column.children.length > 0) {
    d = 0;
    column.children.forEach(child => {
      child.$_rowIndex = column.$_rowIndex + 1; // child $_rowIndex

      d = Math.max(d, descendantDepth(child));
    });
    d++; // = maxChildDepth + 1
  } else d = 0;

  column.$_depth = d;
  return d;
}
/**
 * Calculate the leaf node count and set to colspan property.
 * If the node has no children, the leaf count equals to 1.
 *
 * Example :
 * 1. { label: "X1"}.hasOwnProperty("colspan") == false
 * 2. { label: "X1", children: [{label: "X11"}]}.hasOwnProperty("colspan") == false
 * 3. { label: "X1", children: [{label: "X11"}, {label: "X12"}]}.colspan = 2
 * 4. { label: "X1", children: [
 *      { label: "X11"},
 *      { label: "X12", children: [{label: "X121"}, {label: "X122"}]}
 *    ]}.colspan = 3
 */


function leafCount(column) {
  let count;

  if (column.children && column.children.length > 0) {
    count = 0;
    column.children.forEach(child => {
      count += leafCount(child);
    });
  } else count = 1;

  if (count > 1) column.colspan = count;
  return count;
}
/**
 * Flatten the array items with itself and its children items.
 *
 * Attention: if removeChildren is true, the origin columns param maybe changed.
 *
 * Example :
 * 1. ["a", "b"] flatten to ["a", "b"]
 * 2. ["a", {children: ["b", "c"]}] flatten to ["a", {children: ["b", "c"]}, "b", "c"]
 */


function flattenWithSelf(columns, removeChildren = true) {
  let result = columns.reduce((a, b) => {
    if (b.children) {
      return a.concat(b, flattenWithSelf(b.children, removeChildren));
    } else return a.concat(b);
  }, []);
  if (removeChildren) result.forEach(column => {
    if (column.hasOwnProperty("children")) delete column.children;
  });
  return result;
}
/**
 * Deep copy a object.
 *
 * From https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object#answer-728694
 */


function deepClone(obj) {
  let copy; // Handle the 3 simple types, and null or undefined

  if (null == obj || "object" !== typeof obj) return obj; // Handle Date

  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  } // Handle Array


  if (obj instanceof Array) {
    copy = [];

    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }

    return copy;
  } // Handle Object


  if (obj instanceof Object) {
    copy = {};

    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
    }

    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

/* script */
const __vue_script__$8 = component$1;

/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "thead",
    _vm._l(_vm.rows, function(row, rowIndex) {
      return _c(
        "tr",
        {
          key: "row-" + rowIndex,
          class: ["st-row", _vm.classes.row],
          style: _vm.styles.row
        },
        _vm._l(row, function(cell, index) {
          return _c(
            "td",
            {
              key: index,
              class: ["st-cell text", _vm.classes.cell],
              style: _vm.styles.cell,
              attrs: { colspan: cell.colspan, rowspan: cell.rowspan }
            },
            [_vm._v(_vm._s(cell.hasOwnProperty("label") ? cell.label : cell))]
          )
        }),
        0
      )
    }),
    0
  )
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var stThead = normalizeComponent_1(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    undefined,
    undefined
  );

//
/**
 * { empty, value }.
 *
 * If column has a pid, then:
 *   1. return `{ empty: false, value: row[column.pid][subRowIndex][column.id] }`
 *      if row[column.pid].length > subRowIndex,
 *   2. or return { empty: true }
 *      if row[column.pid].length <= subRowIndex.
 * Otherwise return `{ empty: false, value: row[column.id] }`.
 */

function getCellConfigInfo(row, column, subRowIndex, mainRowIndex) {
  return column.pid ? row[column.pid] && row[column.pid].length > subRowIndex ? {
    empty: false,
    value: row[column.pid][subRowIndex][column.id] // nested cell

  } : {
    empty: true // empty cell

  } : {
    empty: false,
    value: row[column.id]
  }; // top cell
}

var script$7 = {
  components: {
    stColgroup,
    stThead,
    stDataRow
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: false,

      default() {
        return [];
      }

    },
    // All dom element class
    classes: {
      type: Object,
      required: false,
      default: () => getGlobalVariable("simter.grid.classes", {})
    },
    // All dom element style
    styles: {
      type: Object,
      required: false,
      default: () => getGlobalVariable("simter.grid.styles", {})
    }
  },
  data: function () {
    return {
      // some params use in ui
      v: {
        scrollLeft: 0,
        scrollBarWidth: 0,
        timer: null,
        contentEl: null,
        lastColumnIsAutoWidth: false
      }
    };
  },
  computed: {
    // all selected rows
    selection() {
      return this.rows.filter(row => row.selected === true);
    },

    flattenColumns() {
      return flatten(this.columns);
    },

    subColumns() {
      return this.flattenColumns.filter(c => c.pid);
    },

    headerTableStyle() {
      return concatStyles(this.styles.headerTable, {
        left: this.v.scrollLeft + "px",
        width: "calc(100% - " + this.v.scrollBarWidth + "px)"
      });
    },

    /** DataRow listeners to transfer */
    dataRowListeners() {
      const events = {};
      Object.keys(this.$listeners).filter(key => key.startsWith("row-") || key.startsWith("cell-")).forEach(key => events[key] = this.$listeners[key]); // deal row-selection-change event

      let old = events["row-selection-change"]; // user define listener

      if (old) {
        events["row-selection-change"] = data => {
          this.selectRow(data.index, data.selected);
          old.call(this, data);
        };
      } else events["row-selection-change"] = data => this.selectRow(data.index, data.selected);

      return events;
    },

    // [[tableRows], ...], index follow rows
    tableRows() {
      // DataRow OneToMany TableRow
      let all = [];
      let preTableRowCount = 0;
      this.rows.forEach((dataRow, dataRowIndex) => {
        let subTableRows = this.dataRowToTableRow(dataRow, dataRowIndex, preTableRowCount);
        all.push(subTableRows);
        preTableRowCount += subTableRows.length;
      });
      return all;
    },

    // Calculate each row's rowspan by Column.pid config
    rowspans() {
      let rowspans = {}; // find pid from columns config

      let pids = this.subColumns.map(c => c.pid).filter((v, i, a) => a.indexOf(v) === i); // distinct pid
      // calculate rowspan value

      this.rows.forEach((row, index) => {
        if (typeof row.rowspan === "number") {
          // custom rowspan value
          rowspans[index] = row.rowspan;
        } else {
          // auto calculate rowspan value
          let maxSize = Math.max(...pids.map(pid => row[pid] ? row[pid].length : 1));
          if (maxSize > 1) rowspans[index] = maxSize;
        }
      });
      return rowspans;
    }

  },

  created() {
    // auto judge the last column width config
    this.v.lastColumnIsAutoWidth = !this.flattenColumns[this.flattenColumns.length - 1].width;
  },

  mounted() {
    if (!this.v.lastColumnIsAutoWidth) {
      // watch horizon scrollbar size
      this.v.contentEl = this.$el.querySelector(".content"); // cache content el

      this.$_watchHorizonScrollBarSize();
    }
  },

  destroyed() {
    if (!this.v.lastColumnIsAutoWidth) g.clearInterval(this.v.timer);
  },

  methods: {
    // DataRow OneToMany TableRow
    // TableRow: {index, cells, classes, styles}
    // TableCell: {rowspan, colspan, value, classes, styles}
    dataRowToTableRow(dataRow, dataRowIndex, preTableRowCount) {
      let tableRows = []; // main TableRow

      let nestedIndex = 0;
      tableRows.push({
        tableRowIndex: preTableRowCount,
        dataRowIndex: dataRowIndex,
        index: nestedIndex++,
        row: dataRow,
        classes: this.classes.contentRow,
        styles: this.styles.contentRow,
        selected: dataRow.selected === true,
        cells: this.flattenColumns.map((column, i) => {
          let {
            empty,
            value
          } = getCellConfigInfo(dataRow, column, 0);
          let c = {
            column: column,
            empty: empty
          };
          if (!empty) c.value = value;
          let rowspan = column.pid ? 1 : this.rowspans[dataRowIndex];
          if (rowspan > 1) c.rowspan = rowspan;
          return c;
        })
      }); // sub TableRows

      let len = this.rowspans[dataRowIndex] || 1;

      for (let i = 1; i < len; i++) {
        tableRows.push({
          tableRowIndex: preTableRowCount + nestedIndex,
          dataRowIndex: dataRowIndex,
          index: nestedIndex++,
          row: dataRow,
          classes: this.classes.contentRow,
          styles: this.styles.contentRow,
          cells: this.subColumns.map(column => {
            let {
              empty,
              value
            } = getCellConfigInfo(dataRow, column, i);
            let c = {
              column: column,
              empty: empty
            };
            if (!empty) c.value = value;
            return c;
          })
        });
      }

      return tableRows;
    },

    /** DataRow props to transfer */
    dataRowProps(row, index) {
      let props = {
        tableRows: this.tableRows[index]
      };
      return props;
    },

    $_watchHorizonScrollBarSize() {
      let t;
      this.v.timer = g.setInterval(() => {
        t = this.v.contentEl.offsetWidth - this.v.contentEl.clientWidth;

        if (t != this.v.scrollBarWidth) {
          // console.log("scrollBarWidth: %s > %s", this.v.scrollBarWidth, t);
          this.v.scrollBarWidth = t;
        }
      }, 100);
    },

    selectRow(index, selected) {
      let row = this.rows[index];
      if (row) this.$set(row, "selected", selected);
    },

    clearSelection() {
      this.selection.forEach(row => this.$set(row, "selected", false));
    },

    deleteSelection() {
      this.selection.forEach(row => this.rows.splice(this.rows.indexOf(row), 1));
    }

  }
};

/* script */
const __vue_script__$9 = script$7;

/* template */
var __vue_render__$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: ["st-grid", _vm.classes.root] }, [
    _vm.$slots.top && _vm.$slots.top.length > 0
      ? _c("div", { class: ["top", _vm.classes.top] }, [_vm._t("top")], 2)
      : _vm._e(),
    _vm._v(" "),
    _c("div", { class: ["header", _vm.classes.header] }, [
      _c(
        "table",
        { class: _vm.classes.headerTable, style: _vm.headerTableStyle },
        [
          _c("st-colgroup", { attrs: { columns: _vm.columns } }),
          _vm._v(" "),
          _c("st-thead", {
            attrs: {
              columns: _vm.columns,
              classes: _vm.classes.headerRow,
              styles: _vm.styles.headerRow
            }
          })
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        class: ["content", _vm.classes.content],
        on: {
          scroll: function($event) {
            _vm.v.scrollLeft = -1 * $event.target.scrollLeft;
          }
        }
      },
      [
        _c(
          "table",
          { class: _vm.classes.contentTable, style: _vm.styles.contentTable },
          [
            _c("st-colgroup", { attrs: { columns: _vm.columns } }),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.rows, function(row, index) {
                return _c(
                  "st-data-row",
                  _vm._g(
                    _vm._b(
                      { key: index },
                      "st-data-row",
                      _vm.dataRowProps(row, index),
                      false
                    ),
                    _vm.dataRowListeners
                  )
                )
              }),
              1
            )
          ],
          1
        )
      ]
    ),
    _vm._v(" "),
    _vm.$slots.bottom && _vm.$slots.bottom.length > 0
      ? _c(
          "div",
          { class: ["bottom", _vm.classes.bottom] },
          [_vm._t("bottom")],
          2
        )
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  const __vue_inject_styles__$9 = function (inject) {
    if (!inject) return
    inject("data-v-7ae86aff_0", { source: "\n.st-grid {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\n}\n.st-grid > .content {\r\n  flex: 1 1 0%;\r\n  overflow: auto;\n}\n.st-grid > .header {\r\n  overflow: hidden;\r\n  position: relative;\r\n  text-align: center;\n}\n.st-grid > .header > table {\r\n  position: relative;\n}\n.st-grid > .content > table,\r\n.st-grid > .header > table {\r\n  width: 100%;\r\n  table-layout: fixed;\r\n  border-collapse: collapse;\n}\n.st-grid > .header > table > thead > tr > td,\r\n.st-grid > .content > table > tbody > tr > td {\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\n}\n.st-grid > .header > table > thead > tr,\r\n.st-grid > .content > table > tbody > tr {\r\n  min-height: 2em;\n}\n.st-grid > .bottom {\r\n  display: flex;\r\n  flex-direction: row;\n}\n.st-grid > .bottom > * {\r\n  margin: 0.25rem 0 0.25rem 0.25rem;\n}\n.st-row {\r\n  cursor: default;\n}\n.st-cell {\r\n  padding: 0.25rem;\n}\n.st-cell.number {\r\n  text-align: right;\n}\r\n", map: {"version":3,"sources":["D:\\work\\github-simter-vue\\simter-vue-components\\src\\grid.vue"],"names":[],"mappings":";AA+QA;EACA,kBAAA;EACA,aAAA;EACA,sBAAA;AACA;AACA;EACA,YAAA;EACA,cAAA;AACA;AACA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;;EAEA,WAAA;EACA,mBAAA;EACA,yBAAA;AACA;AACA;;EAEA,gBAAA;EACA,uBAAA;AACA;AACA;;EAEA,eAAA;AACA;AACA;EACA,aAAA;EACA,mBAAA;AACA;AACA;EACA,iCAAA;AACA;AACA;EACA,eAAA;AACA;AACA;EACA,gBAAA;AACA;AACA;EACA,iBAAA;AACA","file":"grid.vue","sourcesContent":["<template>\r\n  <div :class=\"['st-grid', classes.root]\">\r\n    <div :class=\"['top', classes.top]\" v-if=\"$slots.top && $slots.top.length > 0\">\r\n      <slot name=\"top\"></slot>\r\n    </div>\r\n    <div :class=\"['header', classes.header]\">\r\n      <table :class=\"classes.headerTable\" :style=\"headerTableStyle\">\r\n        <st-colgroup :columns=\"columns\"></st-colgroup>\r\n        <st-thead :columns=\"columns\" :classes=\"classes.headerRow\" :styles=\"styles.headerRow\"></st-thead>\r\n      </table>\r\n    </div>\r\n    <div\r\n      :class=\"['content', classes.content]\"\r\n      @scroll=\"v.scrollLeft = -1 * $event.target.scrollLeft\"\r\n    >\r\n      <table :class=\"classes.contentTable\" :style=\"styles.contentTable\">\r\n        <st-colgroup :columns=\"columns\"></st-colgroup>\r\n        <tbody>\r\n          <st-data-row\r\n            v-for=\"(row, index) in rows\"\r\n            :key=\"index\"\r\n            v-bind=\"dataRowProps(row, index)\"\r\n            v-on=\"dataRowListeners\"\r\n          ></st-data-row>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <div :class=\"['bottom', classes.bottom]\" v-if=\"$slots.bottom && $slots.bottom.length > 0\">\r\n      <slot name=\"bottom\"></slot>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport { g, gv, flatten, concatStyles } from \"./utils\";\r\nimport stDataRow from \"./row/data-row\";\r\nimport stColgroup from \"./colgroup.vue\";\r\nimport stThead from \"./thead.vue\";\r\nimport tableRowVue from \"./row/table-row.vue\";\r\n\r\n/**\r\n * { empty, value }.\r\n *\r\n * If column has a pid, then:\r\n *   1. return `{ empty: false, value: row[column.pid][subRowIndex][column.id] }`\r\n *      if row[column.pid].length > subRowIndex,\r\n *   2. or return { empty: true }\r\n *      if row[column.pid].length <= subRowIndex.\r\n * Otherwise return `{ empty: false, value: row[column.id] }`.\r\n */\r\nfunction getCellConfigInfo(row, column, subRowIndex, mainRowIndex) {\r\n  return column.pid\r\n    ? row[column.pid] && row[column.pid].length > subRowIndex\r\n      ? { empty: false, value: row[column.pid][subRowIndex][column.id] } // nested cell\r\n      : { empty: true } // empty cell\r\n    : { empty: false, value: row[column.id] }; // top cell\r\n}\r\n\r\nexport default {\r\n  components: { stColgroup, stThead, stDataRow },\r\n  props: {\r\n    columns: { type: Array, required: true },\r\n    rows: {\r\n      type: Array,\r\n      required: false,\r\n      default() {\r\n        return [];\r\n      }\r\n    },\r\n    // All dom element class\r\n    classes: {\r\n      type: Object,\r\n      required: false,\r\n      default: () => gv(\"simter.grid.classes\", {})\r\n    },\r\n    // All dom element style\r\n    styles: {\r\n      type: Object,\r\n      required: false,\r\n      default: () => gv(\"simter.grid.styles\", {})\r\n    }\r\n  },\r\n  data: function() {\r\n    return {\r\n      // some params use in ui\r\n      v: {\r\n        scrollLeft: 0,\r\n        scrollBarWidth: 0,\r\n        timer: null,\r\n        contentEl: null,\r\n        lastColumnIsAutoWidth: false\r\n      }\r\n    };\r\n  },\r\n  computed: {\r\n    // all selected rows\r\n    selection() {\r\n      return this.rows.filter(row => row.selected === true);\r\n    },\r\n    flattenColumns() {\r\n      return flatten(this.columns);\r\n    },\r\n    subColumns() {\r\n      return this.flattenColumns.filter(c => c.pid);\r\n    },\r\n    headerTableStyle() {\r\n      return concatStyles(this.styles.headerTable, {\r\n        left: this.v.scrollLeft + \"px\",\r\n        width: \"calc(100% - \" + this.v.scrollBarWidth + \"px)\"\r\n      });\r\n    },\r\n    /** DataRow listeners to transfer */\r\n    dataRowListeners() {\r\n      const events = {};\r\n      Object.keys(this.$listeners)\r\n        .filter(key => key.startsWith(\"row-\") || key.startsWith(\"cell-\"))\r\n        .forEach(key => (events[key] = this.$listeners[key]));\r\n\r\n      // deal row-selection-change event\r\n      let old = events[\"row-selection-change\"]; // user define listener\r\n      if (old) {\r\n        events[\"row-selection-change\"] = data => {\r\n          this.selectRow(data.index, data.selected);\r\n          old.call(this, data);\r\n        }\r\n      } else events[\"row-selection-change\"] = data => this.selectRow(data.index, data.selected);\r\n\r\n      return events;\r\n    },\r\n    // [[tableRows], ...], index follow rows\r\n    tableRows() {\r\n      // DataRow OneToMany TableRow\r\n      let all = [];\r\n      let preTableRowCount = 0;\r\n      this.rows.forEach((dataRow, dataRowIndex) => {\r\n        let subTableRows = this.dataRowToTableRow(\r\n          dataRow,\r\n          dataRowIndex,\r\n          preTableRowCount\r\n        );\r\n        all.push(subTableRows);\r\n        preTableRowCount += subTableRows.length;\r\n      });\r\n      return all;\r\n    },\r\n    // Calculate each row's rowspan by Column.pid config\r\n    rowspans() {\r\n      let rowspans = {};\r\n\r\n      // find pid from columns config\r\n      let pids = this.subColumns\r\n        .map(c => c.pid)\r\n        .filter((v, i, a) => a.indexOf(v) === i); // distinct pid\r\n\r\n      // calculate rowspan value\r\n      this.rows.forEach((row, index) => {\r\n        if (typeof row.rowspan === \"number\") {\r\n          // custom rowspan value\r\n          rowspans[index] = row.rowspan;\r\n        } else {\r\n          // auto calculate rowspan value\r\n          let maxSize = Math.max(\r\n            ...pids.map(pid => (row[pid] ? row[pid].length : 1))\r\n          );\r\n          if (maxSize > 1) rowspans[index] = maxSize;\r\n        }\r\n      });\r\n\r\n      return rowspans;\r\n    }\r\n  },\r\n  created() {\r\n    // auto judge the last column width config\r\n    this.v.lastColumnIsAutoWidth = !this.flattenColumns[\r\n      this.flattenColumns.length - 1\r\n    ].width;\r\n  },\r\n  mounted() {\r\n    if (!this.v.lastColumnIsAutoWidth) {\r\n      // watch horizon scrollbar size\r\n      this.v.contentEl = this.$el.querySelector(\".content\"); // cache content el\r\n      this.$_watchHorizonScrollBarSize();\r\n    }\r\n  },\r\n  destroyed() {\r\n    if (!this.v.lastColumnIsAutoWidth) g.clearInterval(this.v.timer);\r\n  },\r\n  methods: {\r\n    // DataRow OneToMany TableRow\r\n    // TableRow: {index, cells, classes, styles}\r\n    // TableCell: {rowspan, colspan, value, classes, styles}\r\n    dataRowToTableRow(dataRow, dataRowIndex, preTableRowCount) {\r\n      let tableRows = [];\r\n\r\n      // main TableRow\r\n      let nestedIndex = 0;\r\n      tableRows.push({\r\n        tableRowIndex: preTableRowCount,\r\n        dataRowIndex: dataRowIndex,\r\n        index: nestedIndex++,\r\n        row: dataRow,\r\n        classes: this.classes.contentRow,\r\n        styles: this.styles.contentRow,\r\n        selected: dataRow.selected === true,\r\n        cells: this.flattenColumns.map((column, i) => {\r\n          let { empty, value } = getCellConfigInfo(\r\n            dataRow,\r\n            column,\r\n            0,\r\n            dataRowIndex\r\n          );\r\n          let c = { column: column, empty: empty };\r\n          if (!empty) c.value = value;\r\n          let rowspan = column.pid ? 1 : this.rowspans[dataRowIndex];\r\n          if (rowspan > 1) c.rowspan = rowspan;\r\n          return c;\r\n        })\r\n      });\r\n\r\n      // sub TableRows\r\n      let len = this.rowspans[dataRowIndex] || 1;\r\n      for (let i = 1; i < len; i++) {\r\n        tableRows.push({\r\n          tableRowIndex: preTableRowCount + nestedIndex,\r\n          dataRowIndex: dataRowIndex,\r\n          index: nestedIndex++,\r\n          row: dataRow,\r\n          classes: this.classes.contentRow,\r\n          styles: this.styles.contentRow,\r\n          cells: this.subColumns.map(column => {\r\n            let { empty, value } = getCellConfigInfo(dataRow, column, i);\r\n            let c = { column: column, empty: empty };\r\n            if (!empty) c.value = value;\r\n            return c;\r\n          })\r\n        });\r\n      }\r\n      return tableRows;\r\n    },\r\n    /** DataRow props to transfer */\r\n    dataRowProps(row, index) {\r\n      let props = {\r\n        tableRows: this.tableRows[index]\r\n      };\r\n      return props;\r\n    },\r\n    $_watchHorizonScrollBarSize() {\r\n      let t;\r\n      this.v.timer = g.setInterval(() => {\r\n        t = this.v.contentEl.offsetWidth - this.v.contentEl.clientWidth;\r\n        if (t != this.v.scrollBarWidth) {\r\n          // console.log(\"scrollBarWidth: %s > %s\", this.v.scrollBarWidth, t);\r\n          this.v.scrollBarWidth = t;\r\n        }\r\n      }, 100);\r\n    },\r\n    selectRow(index, selected) {\r\n      let row = this.rows[index];\r\n      if (row) this.$set(row, \"selected\", selected);\r\n    },\r\n    clearSelection() {\r\n      this.selection.forEach(row => this.$set(row, \"selected\", false));\r\n    },\r\n    deleteSelection() {\r\n      this.selection.forEach(row => this.rows.splice(this.rows.indexOf(row), 1));\r\n    }\r\n  }\r\n};\r\n</script>\r\n\r\n<style>\r\n.st-grid {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.st-grid > .content {\r\n  flex: 1 1 0%;\r\n  overflow: auto;\r\n}\r\n.st-grid > .header {\r\n  overflow: hidden;\r\n  position: relative;\r\n  text-align: center;\r\n}\r\n.st-grid > .header > table {\r\n  position: relative;\r\n}\r\n.st-grid > .content > table,\r\n.st-grid > .header > table {\r\n  width: 100%;\r\n  table-layout: fixed;\r\n  border-collapse: collapse;\r\n}\r\n.st-grid > .header > table > thead > tr > td,\r\n.st-grid > .content > table > tbody > tr > td {\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n.st-grid > .header > table > thead > tr,\r\n.st-grid > .content > table > tbody > tr {\r\n  min-height: 2em;\r\n}\r\n.st-grid > .bottom {\r\n  display: flex;\r\n  flex-direction: row;\r\n}\r\n.st-grid > .bottom > * {\r\n  margin: 0.25rem 0 0.25rem 0.25rem;\r\n}\r\n.st-row {\r\n  cursor: default;\r\n}\r\n.st-cell {\r\n  padding: 0.25rem;\r\n}\r\n.st-cell.number {\r\n  text-align: right;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$9 = undefined;
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* style inject SSR */
  

  
  var stGrid = normalizeComponent_1(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    browser,
    undefined
  );

//
var script$8 = {
  props: {
    tag: {
      type: String,
      required: false,
      default: () => getGlobalVariable("simter.button.tag", "button")
    },
    iconClass: {
      type: String,
      required: false
    },
    selectable: {
      type: Boolean,
      required: false,
      default: false
    },
    // only use when selectable === true
    selected: {
      type: Boolean,
      required: false,
      default: false
    },
    // element class: { root, hover, selected, iconContainer, icon, text }
    classes: {
      type: [Array, Object],
      required: false,
      default: () => getGlobalVariable("simter.button.classes", {})
    },
    // element style: { root, hover, selected, iconContainer, icon, text }
    styles: {
      type: Object,
      required: false,
      default: () => getGlobalVariable("simter.button.styles", {})
    }
  },

  data() {
    return {
      ui: {
        hover: false,
        selected: false
      }
    };
  },

  computed: {
    rootClass() {
      return concatClasses("st-button", this.classes.root, this.ui.hover ? this.classes.hover || "hover" : undefined, this.ui.selected ? this.classes.selected || "selected" : undefined);
    },

    rootStyle() {
      return concatStyles(this.styles.root, this.ui.hover ? this.styles.hover : undefined, this.selectable && this.ui.selected ? this.styles.selected : undefined);
    }

  },

  created() {
    if (this.selectable) {
      this.$watch("selected", (newVal, _) => {
        if (this.ui.selected !== newVal) this.ui.selected = newVal;
      }, {
        immediate: true
      });
    }
  },

  methods: {
    clickMe($event) {
      if (this.selectable && this.ui.selected !== true) {
        this.ui.selected = true;
        this.$emit("update:selected", true);
      }

      this.$emit("click", $event);
    }

  }
};

/* script */
const __vue_script__$a = script$8;

/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.tag,
    {
      tag: "component",
      class: _vm.rootClass,
      style: _vm.rootStyle,
      attrs: { type: "button" },
      on: {
        mouseover: function($event) {
          _vm.ui.hover = true;
        },
        mouseout: function($event) {
          _vm.ui.hover = false;
        },
        click: function($event) {
          $event.stopPropagation();
          $event.preventDefault();
          return _vm.clickMe($event)
        }
      }
    },
    [
      _vm.iconClass || _vm.classes.icon
        ? _c("i", { class: [_vm.iconClass, _vm.classes.icon] })
        : _vm._e(),
      _vm._v(" "),
      _vm.$slots.default
        ? _c("span", { class: _vm.classes.text }, [_vm._t("default")], 2)
        : _vm._e()
    ]
  )
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  const __vue_inject_styles__$a = function (inject) {
    if (!inject) return
    inject("data-v-0cab51a1_0", { source: "\n.st-button {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  min-height: 1.8em;\n}\r\n", map: {"version":3,"sources":["D:\\work\\github-simter-vue\\simter-vue-components\\src\\button.vue"],"names":[],"mappings":";AA4FA;EACA,oBAAA;EACA,mBAAA;EACA,iBAAA;AACA","file":"button.vue","sourcesContent":["<template>\r\n  <component\r\n    :is=\"tag\"\r\n    :class=\"rootClass\"\r\n    :style=\"rootStyle\"\r\n    type=\"button\"\r\n    @mouseover=\"ui.hover = true\"\r\n    @mouseout=\"ui.hover = false\"\r\n    @click.stop.prevent=\"clickMe($event)\"\r\n  >\r\n    <i v-if=\"iconClass || classes.icon\" :class=\"[iconClass, classes.icon]\"></i>\r\n    <span v-if=\"$slots.default\" :class=\"classes.text\">\r\n      <slot></slot>\r\n    </span>\r\n  </component>\r\n</template>\r\n\r\n<script>\r\n/**\r\n * Events:\r\n * 1. click($event)\r\n * 2. \"update:selected\"(selected) < if selectable === true\r\n */\r\nimport { gv, concatClasses, concatStyles } from \"./utils\";\r\nexport default {\r\n  props: {\r\n    tag: {\r\n      type: String,\r\n      required: false,\r\n      default: () => gv(\"simter.button.tag\", \"button\")\r\n    },\r\n    iconClass: { type: String, required: false },\r\n    selectable: { type: Boolean, required: false, default: false },\r\n    // only use when selectable === true\r\n    selected: { type: Boolean, required: false, default: false },\r\n    // element class: { root, hover, selected, iconContainer, icon, text }\r\n    classes: {\r\n      type: [Array, Object],\r\n      required: false,\r\n      default: () => gv(\"simter.button.classes\", {})\r\n    },\r\n    // element style: { root, hover, selected, iconContainer, icon, text }\r\n    styles: {\r\n      type: Object,\r\n      required: false,\r\n      default: () => gv(\"simter.button.styles\", {})\r\n    }\r\n  },\r\n  data() {\r\n    return { ui: { hover: false, selected: false } };\r\n  },\r\n  computed: {\r\n    rootClass() {\r\n      return concatClasses(\r\n        \"st-button\",\r\n        this.classes.root,\r\n        this.ui.hover ? this.classes.hover || \"hover\" : undefined,\r\n        this.ui.selected ? this.classes.selected || \"selected\" : undefined\r\n      );\r\n    },\r\n    rootStyle() {\r\n      return concatStyles(\r\n        this.styles.root,\r\n        this.ui.hover ? this.styles.hover : undefined,\r\n        this.selectable && this.ui.selected ? this.styles.selected : undefined\r\n      );\r\n    }\r\n  },\r\n  created() {\r\n    if (this.selectable) {\r\n      this.$watch(\r\n        \"selected\",\r\n        (newVal, _) => {\r\n          if (this.ui.selected !== newVal) this.ui.selected = newVal;\r\n        },\r\n        { immediate: true }\r\n      );\r\n    }\r\n  },\r\n  methods: {\r\n    clickMe($event) {\r\n      if (this.selectable && this.ui.selected !== true) {\r\n        this.ui.selected = true;\r\n        this.$emit(\"update:selected\", true);\r\n      }\r\n      this.$emit(\"click\", $event);\r\n    }\r\n  }\r\n};\r\n</script>\r\n\r\n<style>\r\n.st-button {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  min-height: 1.8em;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* style inject SSR */
  

  
  var stButton = normalizeComponent_1(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    browser,
    undefined
  );

//
var script$9 = {
  components: {
    stButton
  },
  props: {
    text: {
      type: Object,
      required: false,
      default: () => getGlobalVariable("simter.pagebar.text", {
        first: "First",
        previous: "Previous",
        next: "Next",
        last: "Last"
      })
    },

    /** The current 1-base page number */
    pageNo: {
      type: Number,
      required: false,
      default: 0
    },

    /** The maximal elements count of one page */
    pageSize: {
      type: Number,
      required: false,
      default: () => getGlobalVariable("simter.pagebar.pageSize", 25)
    },

    /** The total elements count */
    total: {
      type: Number,
      required: true
    },
    // All dom element class
    classes: {
      type: Object,
      required: false,
      default: () => getGlobalVariable("simter.pagebar.classes", {})
    },
    // All dom element style
    styles: {
      type: Object,
      required: false,
      default: () => getGlobalVariable("simter.pagebar.styles", {})
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.pageSize);
    }

  },

  data() {
    return {
      v: {
        pageNo: undefined
      }
    };
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

/* script */
const __vue_script__$b = script$9;

/* template */
var __vue_render__$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "span",
    { class: ["st-pagebar", _vm.classes.root] },
    [
      _c(
        "st-button",
        {
          class: "first",
          attrs: { classes: _vm.classes.first, styles: _vm.styles.first },
          nativeOn: {
            click: function($event) {
              $event.preventDefault();
              $event.stopPropagation();
              return _vm.toPage(1)
            }
          }
        },
        [_vm._v(_vm._s(_vm.text.first))]
      ),
      _vm._v(" "),
      _c(
        "st-button",
        {
          class: "previous",
          attrs: { classes: _vm.classes.previous, styles: _vm.styles.previous },
          nativeOn: {
            click: function($event) {
              $event.preventDefault();
              $event.stopPropagation();
              _vm.toPage(Math.max(_vm.v.pageNo - 1, 1));
            }
          }
        },
        [_vm._v(_vm._s(_vm.text.previous))]
      ),
      _vm._v(" "),
      _vm.total > 0
        ? _c("span", { class: ["text", _vm.classes.text] }, [
            _vm._v(
              _vm._s(_vm.v.pageNo) +
                "/" +
                _vm._s(_vm.pageCount) +
                "(" +
                _vm._s(_vm.total) +
                ")"
            )
          ])
        : _c("span", { class: ["text", _vm.classes.text] }, [_vm._v("0")]),
      _vm._v(" "),
      _c(
        "st-button",
        {
          class: "next",
          attrs: { classes: _vm.classes.next, styles: _vm.styles.next },
          nativeOn: {
            click: function($event) {
              $event.preventDefault();
              $event.stopPropagation();
              _vm.toPage(Math.min(_vm.v.pageNo + 1, _vm.pageCount));
            }
          }
        },
        [_vm._v(_vm._s(_vm.text.next))]
      ),
      _vm._v(" "),
      _c(
        "st-button",
        {
          class: "last",
          attrs: { classes: _vm.classes.last, styles: _vm.styles.last },
          nativeOn: {
            click: function($event) {
              $event.preventDefault();
              $event.stopPropagation();
              return _vm.toPage(_vm.pageCount)
            }
          }
        },
        [_vm._v(_vm._s(_vm.text.last))]
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  const __vue_inject_styles__$b = function (inject) {
    if (!inject) return
    inject("data-v-15925312_0", { source: "\n.st-pagebar {\r\n  display: inline-flex;\r\n  align-items: center;\n}\n.st-pagebar > .text {\r\n  cursor: default;\r\n  margin: 0 0.25rem;\n}\n.st-pagebar > :not(.text) {\r\n  cursor: pointer;\r\n  margin: 0;\n}\r\n", map: {"version":3,"sources":["D:\\work\\github-simter-vue\\simter-vue-components\\src\\pagebar.vue"],"names":[],"mappings":";AAuGA;EACA,oBAAA;EACA,mBAAA;AACA;AACA;EACA,eAAA;EACA,iBAAA;AACA;AACA;EACA,eAAA;EACA,SAAA;AACA","file":"pagebar.vue","sourcesContent":["<template>\r\n  <span :class=\"['st-pagebar', classes.root]\">\r\n    <st-button\r\n      :class=\"'first'\"\r\n      :classes=\"classes.first\"\r\n      :styles=\"styles.first\"\r\n      @click.native.prevent.stop=\"toPage(1)\"\r\n    >{{text.first}}</st-button>\r\n    <st-button\r\n      :class=\"'previous'\"\r\n      :classes=\"classes.previous\"\r\n      :styles=\"styles.previous\"\r\n      @click.native.prevent.stop=\"toPage(Math.max(v.pageNo - 1, 1))\"\r\n    >{{text.previous}}</st-button>\r\n    <span :class=\"['text', classes.text]\" v-if=\"total > 0\">{{v.pageNo}}/{{pageCount}}({{total}})</span>\r\n    <span :class=\"['text', classes.text]\" v-else>0</span>\r\n    <st-button\r\n      :class=\"'next'\"\r\n      :classes=\"classes.next\"\r\n      :styles=\"styles.next\"\r\n      @click.native.prevent.stop=\"toPage(Math.min(v.pageNo + 1, pageCount))\"\r\n    >{{text.next}}</st-button>\r\n    <st-button\r\n      :class=\"'last'\"\r\n      :classes=\"classes.last\"\r\n      :styles=\"styles.last\"\r\n      @click.native.prevent.stop=\"toPage(pageCount)\"\r\n    >{{text.last}}</st-button>\r\n  </span>\r\n</template>\r\n\r\n<script>\r\n/**\r\n * Events: change(newPageNo)\r\n */\r\nimport { gv } from \"./utils\";\r\nimport stButton from \"./button.vue\";\r\nexport default {\r\n  components: { stButton },\r\n  props: {\r\n    text: {\r\n      type: Object,\r\n      required: false,\r\n      default: () =>\r\n        gv(\"simter.pagebar.text\", {\r\n          first: \"First\",\r\n          previous: \"Previous\",\r\n          next: \"Next\",\r\n          last: \"Last\"\r\n        })\r\n    },\r\n    /** The current 1-base page number */\r\n    pageNo: { type: Number, required: false, default: 0 },\r\n    /** The maximal elements count of one page */\r\n    pageSize: {\r\n      type: Number,\r\n      required: false,\r\n      default: () => gv(\"simter.pagebar.pageSize\", 25)\r\n    },\r\n    /** The total elements count */\r\n    total: { type: Number, required: true },\r\n    // All dom element class\r\n    classes: {\r\n      type: Object,\r\n      required: false,\r\n      default: () => gv(\"simter.pagebar.classes\", {})\r\n    },\r\n    // All dom element style\r\n    styles: {\r\n      type: Object,\r\n      required: false,\r\n      default: () => gv(\"simter.pagebar.styles\", {})\r\n    }\r\n  },\r\n  computed: {\r\n    pageCount() {\r\n      return Math.ceil(this.total / this.pageSize);\r\n    }\r\n  },\r\n  data() {\r\n    return { v: { pageNo: undefined } };\r\n  },\r\n  watch: {\r\n    pageNo: {\r\n      immediate: true,\r\n      handler(value) {\r\n        if (value !== this.v.pageNo) this.v.pageNo = value;\r\n      }\r\n    }\r\n  },\r\n  methods: {\r\n    toPage(pageNo) {\r\n      if (pageNo !== this.v.pageNo) {\r\n        this.v.pageNo = pageNo;\r\n        this.$emit(\"update:page-no\", pageNo);\r\n        this.$emit(\"change\", pageNo);\r\n      }\r\n    }\r\n  }\r\n};\r\n</script>\r\n\r\n<style>\r\n.st-pagebar {\r\n  display: inline-flex;\r\n  align-items: center;\r\n}\r\n.st-pagebar > .text {\r\n  cursor: default;\r\n  margin: 0 0.25rem;\r\n}\r\n.st-pagebar > :not(.text) {\r\n  cursor: pointer;\r\n  margin: 0;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$b = undefined;
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* style inject SSR */
  

  
  var stPagebar = normalizeComponent_1(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    browser,
    undefined
  );

//
var script$a = {
  components: {
    stButton
  },
  props: {
    rootClass: {
      type: String,
      required: false,
      default: "st-button-group"
    },

    /** buttons: [String|{text, value, ...}] */
    items: {
      type: Array,
      required: true
    },

    /** current value */
    value: {
      required: false
    },
    // all dom elements class
    classes: {
      type: Object,
      required: false,
      default: () => getGlobalVariable("simter.buttonGroup.classes", {
        first: "first",
        last: "last"
      })
    },
    // all dom elements class
    styles: {
      type: Object,
      required: false,
      default: () => getGlobalVariable("simter.buttonGroup.styles", {})
    }
  },

  data() {
    return {
      v: {
        value: undefined
      }
    };
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
      return concatClasses(item == this.v.value ? this.classes.selected : undefined, index === 0 ? this.classes.first : undefined, index === this.items.length - 1 ? this.classes.last : undefined);
    },

    /** auto judge whether to add first, last or selected style to the relative button */
    itemStyle(item, index) {
      return concatStyles(item == this.v.value ? this.styles.selected : undefined, index === 0 ? this.styles.first : undefined, index === this.items.length - 1 ? this.styles.last : undefined);
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

/* script */
const __vue_script__$c = script$a;

/* template */
var __vue_render__$c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "span",
    { class: [_vm.rootClass, _vm.classes.root] },
    _vm._l(_vm.items, function(item, index) {
      return _c(
        "st-button",
        {
          key: index,
          class: _vm.itemClass(item, index),
          style: _vm.itemStyle(item, index),
          attrs: {
            classes: _vm.classes.button,
            styles: _vm.styles.button,
            selectable: true,
            selected: item === _vm.value
          },
          on: {
            click: function($event) {
              return _vm.clickItem(item, index)
            }
          }
        },
        [
          _vm._v(
            _vm._s(
              typeof item === "string"
                ? item
                : typeof item === "object"
                ? item.text || item.value
                : item
            )
          )
        ]
      )
    }),
    1
  )
};
var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;

  /* style */
  const __vue_inject_styles__$c = function (inject) {
    if (!inject) return
    inject("data-v-1b35d812_0", { source: "\n.st-button-group {\r\n  display: inline-flex;\n}\n.st-button-group > * {\r\n  margin: 0;\n}\r\n", map: {"version":3,"sources":["D:\\work\\github-simter-vue\\simter-vue-components\\src\\button-group.vue"],"names":[],"mappings":";AAuFA;EACA,oBAAA;AACA;AACA;EACA,SAAA;AACA","file":"button-group.vue","sourcesContent":["<template>\r\n  <span :class=\"[rootClass, classes.root]\">\r\n    <st-button\r\n      v-for=\"(item, index) in items\"\r\n      :key=\"index\"\r\n      :classes=\"classes.button\"\r\n      :styles=\"styles.button\"\r\n      :class=\"itemClass(item, index)\"\r\n      :style=\"itemStyle(item, index)\"\r\n      :selectable=\"true\"\r\n      :selected=\"item === value\"\r\n      @click=\"clickItem(item, index)\"\r\n    >{{typeof item === \"string\" ? item : (typeof item === \"object\" ? item.text || item.value : item)}}</st-button>\r\n  </span>\r\n</template>\r\n\r\n<script>\r\n/**\r\n * Events: change(newValue, newIndex)\r\n */\r\nimport { gv, concatClasses, concatStyles } from \"./utils\";\r\nimport stButton from \"./button.vue\";\r\nexport default {\r\n  components: { stButton },\r\n  props: {\r\n    rootClass: { type: String, required: false, default: \"st-button-group\" },\r\n    /** buttons: [String|{text, value, ...}] */\r\n    items: { type: Array, required: true },\r\n    /** current value */\r\n    value: { required: false },\r\n    // all dom elements class\r\n    classes: {\r\n      type: Object,\r\n      required: false,\r\n      default: () =>\r\n        gv(\"simter.buttonGroup.classes\", {\r\n          first: \"first\",\r\n          last: \"last\"\r\n        })\r\n    },\r\n    // all dom elements class\r\n    styles: {\r\n      type: Object,\r\n      required: false,\r\n      default: () => gv(\"simter.buttonGroup.styles\", {})\r\n    }\r\n  },\r\n  data() {\r\n    return { v: { value: undefined } };\r\n  },\r\n  watch: {\r\n    value: {\r\n      immediate: true,\r\n      handler(value) {\r\n        if (value !== this.v.value) this.v.value = value;\r\n      }\r\n    }\r\n  },\r\n  methods: {\r\n    /** auto judge whether to add first, last or selected class to the relative button */\r\n    itemClass(item, index) {\r\n      return concatClasses(\r\n        item == this.v.value ? this.classes.selected : undefined,\r\n        index === 0 ? this.classes.first : undefined,\r\n        index === this.items.length - 1 ? this.classes.last : undefined\r\n      );\r\n    },\r\n    /** auto judge whether to add first, last or selected style to the relative button */\r\n    itemStyle(item, index) {\r\n      return concatStyles(\r\n        item == this.v.value ? this.styles.selected : undefined,\r\n        index === 0 ? this.styles.first : undefined,\r\n        index === this.items.length - 1 ? this.styles.last : undefined\r\n      );\r\n    },\r\n    clickItem(item, index) {\r\n      if (this.v.value !== item) {\r\n        this.v.value = item;\r\n        this.$emit(\"update:value\", item);\r\n        this.$emit(\"change\", item, index);\r\n      }\r\n    }\r\n  }\r\n};\r\n</script>\r\n\r\n<style>\r\n.st-button-group {\r\n  display: inline-flex;\r\n}\r\n.st-button-group > * {\r\n  margin: 0;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$c = undefined;
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* style inject SSR */
  

  
  var stButtonGroup = normalizeComponent_1(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    browser,
    undefined
  );

/**
 * Events: change(newValue, newIndex)
 */
var script$b = {
  extends: stButtonGroup,
  props: {
    rootClass: {
      type: String,
      required: false,
      default: "st-pagebar-sizes"
    },
    items: {
      type: Array,
      required: false,
      default: () => getGlobalVariable("simter.pagebar.pageSizes", [25, 50, 100])
    },
    value: {
      required: false,
      default: () => getGlobalVariable("simter.pagebar.pageSize", 25)
    },
    classes: {
      type: Object,
      required: false,
      default: () => getGlobalVariable("simter.pagebarSizes.classes", {
        first: "first",
        last: "last"
      })
    },
    styles: {
      type: Object,
      required: false,
      default: () => getGlobalVariable("simter.pagebarSizes.styles", {})
    }
  }
};

/* script */
const __vue_script__$d = script$b;

/* template */

  /* style */
  const __vue_inject_styles__$d = function (inject) {
    if (!inject) return
    inject("data-v-0d15719a_0", { source: "\n.st-page-sizes {\r\n  display: inline-flex;\n}\n.st-page-sizes > * {\r\n  margin: 0;\n}\r\n", map: {"version":3,"sources":["D:\\work\\github-simter-vue\\simter-vue-components\\src\\pagebar-sizes.vue"],"names":[],"mappings":";AAsCA;EACA,oBAAA;AACA;AACA;EACA,SAAA;AACA","file":"pagebar-sizes.vue","sourcesContent":["<script>\r\n/**\r\n * Events: change(newValue, newIndex)\r\n */\r\nimport { gv } from \"./utils\";\r\nimport stButtonGroup from \"./button-group.vue\";\r\nexport default {\r\n  extends: stButtonGroup,\r\n  props: {\r\n    rootClass: { type: String, required: false, default: \"st-pagebar-sizes\" },\r\n    items: {\r\n      type: Array,\r\n      required: false,\r\n      default: () => gv(\"simter.pagebar.pageSizes\", [25, 50, 100])\r\n    },\r\n    value: {\r\n      required: false,\r\n      default: () => gv(\"simter.pagebar.pageSize\", 25)\r\n    },\r\n    classes: {\r\n      type: Object,\r\n      required: false,\r\n      default: () =>\r\n        gv(\"simter.pagebarSizes.classes\", {\r\n          first: \"first\",\r\n          last: \"last\"\r\n        })\r\n    },\r\n    styles: {\r\n      type: Object,\r\n      required: false,\r\n      default: () => gv(\"simter.pagebarSizes.styles\", {})\r\n    }\r\n  }\r\n};\r\n</script>\r\n\r\n<style>\r\n.st-page-sizes {\r\n  display: inline-flex;\r\n}\r\n.st-page-sizes > * {\r\n  margin: 0;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$d = undefined;
  /* module identifier */
  const __vue_module_identifier__$d = undefined;
  /* functional template */
  const __vue_is_functional_template__$d = undefined;
  /* style inject SSR */
  

  
  var stPagebarSizes = normalizeComponent_1(
    {},
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    browser,
    undefined
  );

//
var script$c = {
  props: {
    // all dom elements class
    classes: {
      type: Object,
      required: false,
      default: () => getGlobalVariable("simter.toolbar.classes", {
        root: "st-toolbar",
        default: "default",
        right: "right",
        left: "left"
      })
    }
  }
};

/* script */
const __vue_script__$e = script$c;

/* template */
var __vue_render__$d = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.classes.root },
    [
      _vm._t("default"),
      _vm._v(" "),
      _vm.$slots.left
        ? _c("div", { class: _vm.classes.left }, [_vm._t("left")], 2)
        : _vm._e(),
      _vm._v(" "),
      _vm.$slots.right
        ? _c("div", { class: _vm.classes.right }, [_vm._t("right")], 2)
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$d = [];
__vue_render__$d._withStripped = true;

  /* style */
  const __vue_inject_styles__$e = function (inject) {
    if (!inject) return
    inject("data-v-ddb28036_0", { source: "\n.st-toolbar {\r\n  display: flex;\r\n  align-items: flex-start;\n}\n.st-toolbar > *:not(.right):not(.left) {\r\n  margin: 0.25rem 0 0.25rem 0.25rem;\n}\n.st-toolbar > .left > *,\r\n.st-toolbar > .right > * {\r\n  margin: 0.25rem 0.25rem 0.25rem 0;\n}\n.st-toolbar > .right {\r\n  position: relative;\r\n  flex: 1 1 auto;\r\n  display: flex;\r\n  justify-content: flex-end;\n}\r\n", map: {"version":3,"sources":["D:\\work\\github-simter-vue\\simter-vue-components\\src\\toolbar.vue"],"names":[],"mappings":";AAiCA;EACA,aAAA;EACA,uBAAA;AACA;AACA;EACA,iCAAA;AACA;AACA;;EAEA,iCAAA;AACA;AACA;EACA,kBAAA;EACA,cAAA;EACA,aAAA;EACA,yBAAA;AACA","file":"toolbar.vue","sourcesContent":["<template>\r\n  <div :class=\"classes.root\">\r\n    <slot name=\"default\" :class=\"classes.default\"></slot>\r\n    <div v-if=\"$slots.left\" :class=\"classes.left\">\r\n      <slot name=\"left\"></slot>\r\n    </div>\r\n    <div v-if=\"$slots.right\" :class=\"classes.right\">\r\n      <slot name=\"right\"></slot>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport { gv } from \"./utils\";\r\nexport default {\r\n  props: {\r\n    // all dom elements class\r\n    classes: {\r\n      type: Object,\r\n      required: false,\r\n      default: () =>\r\n        gv(\"simter.toolbar.classes\", {\r\n          root: \"st-toolbar\",\r\n          default: \"default\",\r\n          right: \"right\",\r\n          left: \"left\"\r\n        })\r\n    }\r\n  }\r\n};\r\n</script>\r\n\r\n<style>\r\n.st-toolbar {\r\n  display: flex;\r\n  align-items: flex-start;\r\n}\r\n.st-toolbar > *:not(.right):not(.left) {\r\n  margin: 0.25rem 0 0.25rem 0.25rem;\r\n}\r\n.st-toolbar > .left > *,\r\n.st-toolbar > .right > * {\r\n  margin: 0.25rem 0.25rem 0.25rem 0;\r\n}\r\n.st-toolbar > .right {\r\n  position: relative;\r\n  flex: 1 1 auto;\r\n  display: flex;\r\n  justify-content: flex-end;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$e = undefined;
  /* module identifier */
  const __vue_module_identifier__$e = undefined;
  /* functional template */
  const __vue_is_functional_template__$e = false;
  /* style inject SSR */
  

  
  var stToolbar = normalizeComponent_1(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    browser,
    undefined
  );

//
var script$d = {
  components: {
    stButton
  },
  props: {
    placeholder: {
      type: String,
      required: false,
      default: () => getGlobalVariable("simter.search.placeholder")
    },
    value: {
      required: false
    },
    searchButtonText: {
      type: String,
      required: false,
      default: () => getGlobalVariable("simter.search.searchButtonText", "Go")
    },
    // all dom elements class
    classes: {
      type: Object,
      required: false,
      default: () => getGlobalVariable("simter.search.classes", {})
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
    return {
      ui: {
        value: undefined
      }
    };
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

/* script */
const __vue_script__$f = script$d;

/* template */
var __vue_render__$e = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: ["st-search", _vm.classes.root], style: _vm.styles.root },
    [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.ui.value,
            expression: "ui.value"
          }
        ],
        class: ["text", _vm.classes.text],
        attrs: { type: "search", placeholder: _vm.placeholder },
        domProps: { value: _vm.ui.value },
        on: {
          keyup: function($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            $event.stopPropagation();
            return _vm.doSearch($event)
          },
          change: _vm.doChange,
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.$set(_vm.ui, "value", $event.target.value);
          }
        }
      }),
      _vm._v(" "),
      _c(
        "st-button",
        {
          class: "search",
          attrs: { classes: _vm.classes.search, styles: _vm.styles.search },
          nativeOn: {
            click: function($event) {
              $event.preventDefault();
              $event.stopPropagation();
              return _vm.doSearch($event)
            }
          }
        },
        [_vm._v(_vm._s(_vm.searchButtonText))]
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$e = [];
__vue_render__$e._withStripped = true;

  /* style */
  const __vue_inject_styles__$f = function (inject) {
    if (!inject) return
    inject("data-v-5996be36_0", { source: "\n.st-search {\r\n  position: relative;\r\n  display: inline-flex;\n}\r\n", map: {"version":3,"sources":["D:\\work\\github-simter-vue\\simter-vue-components\\src\\search.vue"],"names":[],"mappings":";AA+EA;EACA,kBAAA;EACA,oBAAA;AACA","file":"search.vue","sourcesContent":["<template>\r\n  <div :class=\"['st-search', classes.root]\" :style=\"styles.root\">\r\n    <input\r\n      type=\"search\"\r\n      :class=\"['text', classes.text]\"\r\n      :placeholder=\"placeholder\"\r\n      v-model=\"ui.value\"\r\n      @keyup.enter.stop=\"doSearch\"\r\n      @change=\"doChange\"\r\n    />\r\n    <st-button\r\n      :class=\"'search'\"\r\n      :classes=\"classes.search\"\r\n      :styles=\"styles.search\"\r\n      @click.native.prevent.stop=\"doSearch\"\r\n    >{{searchButtonText}}</st-button>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\n/**\r\n * Events: search(value)\r\n */\r\nimport { gv } from \"./utils\";\r\nimport stButton from \"./button.vue\";\r\n\r\nexport default {\r\n  components: { stButton },\r\n  props: {\r\n    placeholder: {\r\n      type: String,\r\n      required: false,\r\n      default: () => gv(\"simter.search.placeholder\")\r\n    },\r\n    value: { required: false },\r\n    searchButtonText: {\r\n      type: String,\r\n      required: false,\r\n      default: () => gv(\"simter.search.searchButtonText\", \"Go\")\r\n    },\r\n    // all dom elements class\r\n    classes: {\r\n      type: Object,\r\n      required: false,\r\n      default: () => gv(\"simter.search.classes\", {})\r\n    },\r\n    // all dom elements class\r\n    styles: {\r\n      type: Object,\r\n      required: false,\r\n      default() {\r\n        return {};\r\n      }\r\n    }\r\n  },\r\n  data() {\r\n    return { ui: { value: undefined } };\r\n  },\r\n  watch: {\r\n    value: {\r\n      immediate: true,\r\n      handler(value) {\r\n        if (value !== this.ui.value) this.ui.value = value;\r\n      }\r\n    }\r\n  },\r\n  methods: {\r\n    doSearch() {\r\n      this.$emit(\"search\", this.ui.value);\r\n    },\r\n    doChange() {\r\n      this.$emit(\"update:value\", this.ui.value);\r\n      this.$emit(\"change\", this.ui.value);\r\n    }\r\n  }\r\n};\r\n</script>\r\n\r\n<style>\r\n.st-search {\r\n  position: relative;\r\n  display: inline-flex;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$f = undefined;
  /* module identifier */
  const __vue_module_identifier__$f = undefined;
  /* functional template */
  const __vue_is_functional_template__$f = false;
  /* style inject SSR */
  

  
  var stSearch = normalizeComponent_1(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    browser,
    undefined
  );

const components = {
  "st-loader": [version, stLoader],
  "st-grid": [version, stGrid],
  "st-colgroup": ["0.3.0", stColgroup],
  "st-thead": ["0.4.2", stThead],
  "st-table-row": [version, stTableRow],
  "st-data-row": [version, stDataRow],
  "st-cell-index": [version, stCellIndex],
  "st-cell-sn": [version, stCellSn],
  "st-cell-sn-selectable": [version, stCellSnSelectable],
  "st-cell-text": [version, stCellText],
  "st-cell-html": [version, stCellHtml],
  "st-pagebar": [version, stPagebar],
  "st-pagebar-sizes": [version, stPagebarSizes],
  "st-toolbar": [version, stToolbar],
  "st-button": [version, stButton],
  "st-button-group": [version, stButtonGroup],
  "st-search": [version, stSearch]
};
const keyVersions = {};
let value;

for (let key in components) {
  value = components[key];
  Vue.component(key, value[1]);
  keyVersions[key] = value[0];
}

var components$1 = {
  version,
  components: keyVersions
};

module.exports = components$1;
