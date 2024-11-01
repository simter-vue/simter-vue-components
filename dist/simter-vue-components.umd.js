/*!
* simter-vue-components v1.4.0
* https://github.com/simter-vue/simter-vue-components.git 
* @author RJ.Hwang <rongjihuang@gmail.com>
* @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = global || self, global['simter-vue-components'] = factory(global.Vue));
}(this, function (Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  var version = "1.4.0";

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: !0
            } : {
              done: !1,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      u = !1;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = !0, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var g = window || global;

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
    return columns.reduce(function (a, b) {
      return a.concat(b.children ? flatten(b.children) : b);
    }, []);
  }

  /** Get global key's value */
  function getGlobalVariable(key, defaultValue) {
    if (g.hasOwnProperty(key)) return g[key];
    var p = g,
      value;
    var _iterator = _createForOfIteratorHelper(key.split(".")),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var k = _step.value;
        if (p.hasOwnProperty(k)) value = p = p[k];else {
          value = undefined;
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return typeof value === "undefined" ? defaultValue : value;
  }

  /** 
   * concat all class.
   * 
   * each class is String, Array or undefined.
   */
  function concatClasses() {
    for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
      classes[_key] = arguments[_key];
    }
    return classes.reduce(function (a, b) {
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
  function concatStyles() {
    for (var _len2 = arguments.length, styles = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      styles[_key2] = arguments[_key2];
    }
    return styles.reduce(function (a, b) {
      if (typeof b === "undefined") return a;else return Object.assign(a, b);
    }, {});
  }

  /**
   * Get the file extension.
   * 
   * @param {String} filename the file name with extension, sucs as 'my.png'.
   * @returns the extension, such as 'png'
   */
  function getFileExtension(filename) {
    var i = filename.lastIndexOf(".");
    if (i !== -1) return filename.substring(i + 1);else return '';
  }

  /**
   * Format the byte size to a human reading size.
   * 
   * @param {Number} size the byte size
   * @returns human reading size, such as '2 KB'
   */
  function getPrettySize(size) {
    if (size < 1024) return "".concat(size, " B");else if (size < 1024 * 1024) return "".concat(Math.round(size / 1024), " KB");else if (size < 1024 * 1024 * 1024) return "".concat(Math.round(size / 1024 / 1024), " MB");else return "".concat(Math.round(size / 1024 / 1024 / 1024), " GB");
  }

  /**
   * Upload one file.
   *  
   * @param {Object} options 
   * @options {String} url - upload file to this server
   * @options {String} method - default POST
   * @options {Array} headers - external headers to send
   * @returns {Promise}
   */
  function uploadOneFile(options) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();

      // upload progress
      // don't use `xhr.addEventListener("progress", function (e) {...})`
      xhr.upload.addEventListener("progress", function (e) {
        var percent = Math.round(e.loaded / e.total * 100); // 0~100
        if (options.progress) options.progress.call(this, {
          index: options.index,
          dir: options.dir,
          name: options.file.name,
          size: options.file.size,
          percent: percent
        });
      });

      // cancel upload
      xhr.addEventListener("abort", function (e) {
        reject(e);
      });

      // upload finished
      xhr.addEventListener("load", function (e) {
        var contentType = xhr.getResponseHeader('Content-Type');
        var result;
        if (contentType) {
          contentType = contentType.toLowerCase();
          if (contentType.indexOf('application/json') !== -1) {
              // json
              if (xhr.responseText) result = JSON.parse(xhr.responseText);else result = null;
          } else if (contentType.startsWith('text/'))
            // text/plain、text/html
            result = xhr.responseText;else
            // default text
            result = xhr.responseText;
        } else result = xhr.responseText; // default text

        if (xhr.readyState === 4) resolve(result);else reject(result);
      });

      // upload error
      xhr.addEventListener("error", function (e) {
        reject(e);
      });

      // start upload
      xhr.open(options.method || "POST", options.url);
      if (options.headers) {
        options.headers.forEach(function (h) {
          return xhr.setRequestHeader(h.name, h.value);
        });
      } else {
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
      }
      xhr.send(options.file);
    });
  }

  //
  var script = {
    replace: true,
    props: {
      size: {
        type: Number,
        required: false,
        "default": 3.2
      },
      sizeUnit: {
        type: String,
        required: false,
        "default": "em"
      },
      speed: {
        type: String,
        required: false,
        "default": "1s"
      },
      // show timer if over this timeout second value
      timeout: {
        type: Number,
        required: false,
        "default": 5
      },
      // elements class: { root, actor, timer }
      classes: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.loader.classes", {});
        }
      },
      // elements style: { root, actor, timer }
      styles: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.loader.styles", {});
        }
      }
    },
    data: function data() {
      return {
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        showTimer: false,
        timer: null
      };
    },
    computed: {
      size_: function size_() {
        return this.size + this.sizeUnit;
      },
      minutes_: function minutes_() {
        if (this.minutes < 10) return "0" + this.minutes;else return "" + this.minutes;
      },
      seconds_: function seconds_() {
        if (this.seconds < 10) return "0" + this.seconds;else return "" + this.seconds;
      },
      actorStyle_: function actorStyle_() {
        return concatStyles({
          'width': this.size_,
          'height': this.size_,
          'animation-duration': this.speed,
          'margin-top': 'calc(' + this.size_ + ' / -2)',
          'margin-left': 'calc(' + this.size_ + ' / -2)'
        }, this.styles.actor);
      }
    },
    created: function created() {
      var _this = this;
      var max = 60;
      this.timer = setInterval(function () {
        // show timer if timeout
        if (++_this.totalSeconds >= _this.timeout && !_this.showTimer) _this.showTimer = true;

        // calculate timer's minutes and seconds
        _this.seconds++;
        if (_this.seconds == max) {
          _this.seconds = 0;
          _this.minutes++;
          if (_this.minutes == max) _this.minutes = 0;
        }
      }, 1000);
    },
    destroyed: function destroyed() {
      if (this.timer) clearInterval(this.timer);
    },
    methods: {
      reset: function reset() {
        this.minutes = 0;
        this.seconds = 0;
        if (this.timer) clearInterval(this.timer);
      },
      concatStyles: function concatStyles$1() {
        var t = concatStyles.apply(void 0, arguments);
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
      inject("data-v-674eec30_0", { source: "\n.st-loader {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 100000;\n}\n.st-loader > .timer,\n.st-loader > .actor {\n  position: absolute;\n  box-sizing: border-box;\n  top: 50%;\n  left: 50%;\n}\n.st-loader > .timer {\n  width: 6em;\n  height: 2em;\n  line-height: 2em;\n  text-align: center;\n  margin: -1em auto auto -3em;\n  border: none;\n  background: none;\n}\n.st-loader > .actor {\n  background: none;\n  opacity: 0.8;\n  border-width: 0.2em;\n  border-radius: 50%;\n  border-left-color: transparent;\n  border-right-color: transparent;\n  animation: st-loader-animation-spin 1000ms infinite linear;\n}\n\n/* rotation animation */\n@keyframes st-loader-animation-spin {\n100% {\n    transform: rotate(360deg);\n    transform: rotate(360deg);\n}\n}\n", map: {"version":3,"sources":["/Volumes/macdata/work/simter/simter-vue-components/src/loader.vue"],"names":[],"mappings":";AA8FA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,eAAA;AACA;AAEA;;EAEA,kBAAA;EACA,sBAAA;EACA,QAAA;EACA,SAAA;AACA;AAEA;EACA,UAAA;EACA,WAAA;EACA,gBAAA;EACA,kBAAA;EACA,2BAAA;EACA,YAAA;EACA,gBAAA;AACA;AAEA;EACA,gBAAA;EACA,YAAA;EACA,mBAAA;EACA,kBAAA;EACA,8BAAA;EACA,+BAAA;EACA,0DAAA;AACA;;AAEA,uBAAA;AACA;AACA;IACA,yBAAA;IACA,yBAAA;AACA;AACA","file":"loader.vue","sourcesContent":["<template>\n  <div :class=\"['st-loader', classes.root]\" :style=\"styles.root\">\n    <div\n      :class=\"['actor', classes.actor]\"\n      :style=\"actorStyle_\"\n    ></div>\n    <div v-if=\"showTimer\" :class=\"['timer', classes.timer]\" :style=\"styles.timer\">\n      {{ minutes_ }}:{{ seconds_ }}\n    </div>\n  </div>\n</template>\n\n<script>\nimport { gv, concatStyles } from \"./utils\";\nexport default {\n  replace: true,\n  props: {\n    size: { type: Number, required: false, default: 3.2 },\n    sizeUnit: { type: String, required: false, default: \"em\" },\n    speed: { type: String, required: false, default: \"1s\" },\n    // show timer if over this timeout second value\n    timeout: { type: Number, required: false, default: 5 },\n    // elements class: { root, actor, timer }\n    classes: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.loader.classes\", {})\n    },\n    // elements style: { root, actor, timer }\n    styles: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.loader.styles\", {})\n    }\n  },\n  data: function () {\n    return { minutes: 0, seconds: 0, totalSeconds: 0, showTimer: false, timer: null };\n  },\n  computed: {\n    size_: function () {\n      return this.size + this.sizeUnit;\n    },\n    minutes_: function () {\n      if (this.minutes < 10) return \"0\" + this.minutes;\n      else return \"\" + this.minutes;\n    },\n    seconds_: function () {\n      if (this.seconds < 10) return \"0\" + this.seconds;\n      else return \"\" + this.seconds;\n    },\n    actorStyle_: function () {\n      return concatStyles({\n        'width': this.size_,\n        'height': this.size_,\n        'animation-duration': this.speed,\n        'margin-top': 'calc(' + this.size_ + ' / -2)',\n        'margin-left': 'calc(' + this.size_ + ' / -2)',\n      }, this.styles.actor);\n    }\n  },\n  created: function () {\n    const max = 60;\n    this.timer = setInterval(() => {\n      // show timer if timeout\n      if (++this.totalSeconds >= this.timeout && !this.showTimer) this.showTimer = true;\n\n      // calculate timer's minutes and seconds\n      this.seconds++;\n      if (this.seconds == max) {\n        this.seconds = 0;\n        this.minutes++;\n        if (this.minutes == max) this.minutes = 0;\n      }\n    }, 1000);\n  },\n  destroyed: function () {\n    if (this.timer) clearInterval(this.timer);\n  },\n  methods: {\n    reset: function () {\n      this.minutes = 0;\n      this.seconds = 0;\n      if (this.timer) clearInterval(this.timer);\n    },\n    concatStyles: function(...styles){\n      let t = concatStyles(...styles);\n      console.log(t);\n      return t;\n    }\n  }\n};\n</script>\n\n<style>\n.st-loader {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 100000;\n}\n\n.st-loader > .timer,\n.st-loader > .actor {\n  position: absolute;\n  box-sizing: border-box;\n  top: 50%;\n  left: 50%;\n}\n\n.st-loader > .timer {\n  width: 6em;\n  height: 2em;\n  line-height: 2em;\n  text-align: center;\n  margin: -1em auto auto -3em;\n  border: none;\n  background: none;\n}\n\n.st-loader > .actor {\n  background: none;\n  opacity: 0.8;\n  border-width: 0.2em;\n  border-radius: 50%;\n  border-left-color: transparent;\n  border-right-color: transparent;\n  animation: st-loader-animation-spin 1000ms infinite linear;\n}\n\n/* rotation animation */\n@keyframes st-loader-animation-spin {\n  100% {\n    transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      browser,
      undefined,
      undefined
    );

  var cellBase = {
    props: {
      // Whether is a empty cell
      empty: {
        required: false,
        "default": false
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
        "default": function _default() {
          return {};
        }
      },
      // All dom element style
      styles: {
        type: Object,
        required: false,
        "default": function _default() {
          return {};
        }
      }
    },
    computed: {
      // DataRow.value
      row: function row() {
        return this.$parent.dataRowValue;
      },
      // TableRow.index
      index: function index() {
        return this.$parent.index;
      },
      // TableRow.tableRowIndex
      tableRowIndex: function tableRowIndex() {
        return this.$parent.tableRowIndex;
      },
      // TableRow.dataRowIndex
      dataRowIndex: function dataRowIndex() {
        return this.$parent.dataRowIndex;
      }
    }
  };

  //
  var script$1 = {
    "extends": cellBase,
    computed: {
      content: function content() {
        var t = this.empty ? "" : this.column && this.column.pid ? this.index // nested index
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
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$2 = {
    "extends": cellBase
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
    
    /* style inject shadow dom */
    

    
    const __vue_component__$2 = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$3 = {
    "extends": cellBase,
    computed: {
      content: function content() {
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
    
    /* style inject shadow dom */
    

    
    const __vue_component__$3 = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$4 = {
    "extends": cellBase
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
    
    /* style inject shadow dom */
    

    
    const __vue_component__$4 = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$5 = {
    "extends": cellBase
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
    
    /* style inject shadow dom */
    

    
    const __vue_component__$5 = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      false,
      undefined,
      undefined,
      undefined
    );

  var DEFAULT_CELL_COMPONENT = "st-cell-text";
  var script$6 = {
    // register all inner cell components
    components: {
      stCellIndex: __vue_component__$1,
      stCellSn: __vue_component__$2,
      stCellSnSelectable: __vue_component__$3,
      stCellText: __vue_component__$4,
      stCellHtml: __vue_component__$5
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
        "default": false
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
        "default": function _default() {
          return {};
        }
      },
      // All dom element style
      styles: {
        type: Object,
        required: false,
        "default": function _default() {
          return {};
        }
      }
    },
    data: function data() {
      return {
        v: {
          hover: false,
          clickTimer: null
        }
      };
    },
    computed: {
      rowClass: function rowClass() {
        return concatClasses("st-row",
        // always
        this.classes.row,
        // custom
        this.v.hover ? this.classes.rowHover || "hover" : undefined,
        // custom or default
        this.selected ? this.classes.rowSelected || "selected" : undefined // custom or default
        );
      },
      rowStyle: function rowStyle() {
        return concatStyles(this.styles.row,
        // custom
        this.v.hover ? this.styles.rowHover : undefined,
        // custom or default
        this.selected ? this.styles.rowSelected : undefined // custom or default
        );
      },
      // refactor column.cell (String|{}|Function) to standard structure ({})
      columnCellRefactors: function columnCellRefactors() {
        var _this = this;
        var _toStandardCell = function toStandardCell(cell, cfg) {
          var t = _typeof(cfg);
          if (t === "undefined") return {
            component: DEFAULT_CELL_COMPONENT
          };else if (t === "string") return {
            component: cfg
          };else if (t === "object") {
            if (!cfg.hasOwnProperty("component")) cfg.component = DEFAULT_CELL_COMPONENT;
            return cfg;
          } else if (t === "function") {
            if (cell.column.hasOwnProperty("pid")) {
              var nestedRow = cell.empty ? undefined : _this.row[cell.column.pid][_this.index];
              return _toStandardCell(cell, cfg.call(_this.$root, nestedRow, _this.row, cell.empty));
            } else return _toStandardCell(cell, cfg.call(_this.$root, _this.row));
          } else return {
            component: DEFAULT_CELL_COMPONENT
          };
        };
        return this.cells.map(function (cell) {
          if (!cell.column) return {
            component: DEFAULT_CELL_COMPONENT
          };
          return _toStandardCell(cell, cell.column.cell);
        });
      }
    },
    methods: {
      cellClass: function cellClass(cell) {
        return concatClasses("st-cell",
        // always
        this.classes.cell,
        // define in Grid.classes.contentRow
        cell.column && cell.column["class"] || "text" // define in Grid.columns[index].class
        );
      },
      cellStyle: function cellStyle(cell) {
        return concatStyles(this.styles.cell, cell.column && cell.column.style);
      },
      cellComponentProps: function cellComponentProps(cell, index) {
        // { empty, column, value, classes, styles }
        var t = this.columnCellRefactors[index];
        var main = {
          empty: cell.empty,
          column: cell.column
        };
        if (!cell.empty) main.value = t.hasOwnProperty("value") ? t.value : cell.value;
        if (t.classes) main.classes = t.classes;
        if (t.styles) main.styles = t.styles;
        return main;
      },
      clickRow: function clickRow(targetEl) {
        var _this2 = this;
        // delay click event for dblclick event to clear it
        if (this.v.clickTimer) g.clearTimeout(this.v.clickTimer);
        this.v.clickTimer = g.setTimeout(function () {
          // find cell
          var td = targetEl.closest("td");
          if (!td) {
            alert("This browser not support Element.closest method");
            return;
          }
          var cell = _this2.cells[td.cellIndex];
          if (!cell) {
            alert("Error to find cell config");
            return;
          }

          // 1. do actual work for click

          // 1.1. emit row-selection-change event
          _this2.$emit("row-selection-change", {
            selected: !_this2.selected,
            index: _this2.dataRowIndex
          });

          // 1.2. invoke column.cell.on.click function
          var t = _this2.columnCellRefactors[td.cellIndex];
          if (typeof t.click === "function") t.click.call(_this2.$root, {
            target: targetEl,
            value: t.hasOwnProperty("value") ? t.value : cell.value,
            row: _this2.row,
            nestedRowIndex: _this2.index,
            tableRowIndex: _this2.tableRowIndex,
            dataRowIndex: _this2.dataRowIndex
          });

          // 1.3. emit row-click event
          _this2.$emit("row-click", {
            row: _this2.row,
            index: _this2.dataRowIndex,
            selected: _this2.selected
          });
        }, 300);
      },
      dblclickRow: function dblclickRow() {
        // clear click event
        if (this.v.clickTimer) g.clearTimeout(this.v.clickTimer);

        // 1. do actual work for dblclick

        // 1.1. emit row-selection-change event
        if (!this.selected) this.$emit("row-selection-change", {
          selected: this.selected,
          index: this.dataRowIndex
        });

        // 1.2. emit row-dblclick event
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
            return _vm.dblclickRow.apply(null, arguments)
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
    
    /* style inject shadow dom */
    

    
    const __vue_component__$6 = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      false,
      undefined,
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
    render: function render(createElement, context) {
      return context.props.tableRows.map(function (tableRow) {
        return createElement(__vue_component__$6, {
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

  var component = {
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
      widthArray: function widthArray() {
        return _flatten(this.columns);
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
  var _flatten = function flatten(columns) {
    return columns.reduce(function (a, b) {
      return a.concat(b.children ? _flatten(b.children) : b.width || b);
    }, []).map(function (a) {
      return _typeof(a) === "object" ? a.width : a;
    });
  };

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
    
    /* style inject shadow dom */
    

    
    const __vue_component__$7 = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      false,
      undefined,
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
  //
  //
  //
  //

  var component$1 = {
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
        "default": function _default() {
          return {};
        }
      },
      // element style: { row, cell }
      styles: {
        type: Object,
        required: false,
        "default": function _default() {
          return {};
        }
      }
    },
    computed: {
      /** 
       * The result of function call transform(this.columns).
       */
      rows: function rows() {
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
    columns.forEach(function (column) {
      // set $_rowIndex and $_depth
      descendantDepth(column);

      // set colspan
      leafCount(column);
    });

    // group by $_rowIndex
    var rows = flattenWithSelf(columns, true).reduce(function (result, column) {
      if (!result[column.$_rowIndex]) result[column.$_rowIndex] = [column];else result[column.$_rowIndex].push(column);
      return result;
    }, []);

    // calculate each column's rowspan
    rows.forEach(function (row) {
      row.forEach(function (column) {
        if (column.$_depth === 0) {
          // no children
          // rowspan = max(siblings.$_depth) + 1
          var depth = row.filter(function (c) {
            return c !== column;
          }).reduce(function (a, b) {
            return Math.max(a, b.$_depth);
          }, 0);
          if (depth > 0) column.rowspan = depth + 1;
        }
      });
    });

    // remove $_rowIndex and $_depth
    rows.forEach(function (row) {
      row.forEach(function (column) {
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
    for (var i = 0; i < columns.length; i++) {
      var column = columns[i];
      if (_typeof(column) === "object") {
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

    var d;
    if (column.children && column.children.length > 0) {
      d = 0;
      column.children.forEach(function (child) {
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
    var count;
    if (column.children && column.children.length > 0) {
      count = 0;
      column.children.forEach(function (child) {
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
  function flattenWithSelf(columns) {
    var removeChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var result = columns.reduce(function (a, b) {
      if (b.children) {
        return a.concat(b, flattenWithSelf(b.children, removeChildren));
      } else return a.concat(b);
    }, []);
    if (removeChildren) result.forEach(function (column) {
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
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" !== _typeof(obj)) return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = deepClone(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
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
              [
                cell.selectable
                  ? _c("input", {
                      key: index,
                      attrs: { type: "checkbox" },
                      on: {
                        change: function($event) {
                          return _vm.$emit(
                            "column-select-state-change",
                            $event.target.checked,
                            index,
                            cell
                          )
                        }
                      }
                    })
                  : _vm._e(),
                _vm._v(" "),
                cell.hasOwnProperty("label")
                  ? _c("span", { domProps: { innerHTML: _vm._s(cell.label) } })
                  : _c("span", { domProps: { innerHTML: _vm._s(cell) } })
              ]
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
    
    /* style inject shadow dom */
    

    
    const __vue_component__$8 = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      false,
      undefined,
      undefined,
      undefined
    );

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
      value: row[column.pid][subRowIndex][column.id]
    } // nested cell
    : {
      empty: true
    } // empty cell
    : {
      empty: false,
      value: row[column.id]
    }; // top cell
  }
  var script$7 = {
    components: {
      stColgroup: __vue_component__$7,
      stThead: __vue_component__$8,
      stDataRow: stDataRow
    },
    props: {
      columns: {
        type: Array,
        required: true
      },
      rows: {
        type: Array,
        required: false,
        "default": function _default() {
          return [];
        }
      },
      // All dom element class
      classes: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.grid.classes", {});
        }
      },
      // All dom element style
      styles: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.grid.styles", {});
        }
      }
    },
    data: function data() {
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
      selection: function selection() {
        return this.rows.filter(function (row) {
          return row.selected === true;
        });
      },
      flattenColumns: function flattenColumns() {
        return flatten(this.columns);
      },
      subColumns: function subColumns() {
        return this.flattenColumns.filter(function (c) {
          return c.pid;
        });
      },
      headerTableStyle: function headerTableStyle() {
        return concatStyles(this.styles.headerTable, {
          left: this.v.scrollLeft + "px",
          width: "calc(100% - " + this.v.scrollBarWidth + "px)"
        });
      },
      /** DataRow listeners to transfer */dataRowListeners: function dataRowListeners() {
        var _this = this;
        var events = {};
        Object.keys(this.$listeners).filter(function (key) {
          return key.startsWith("row-") || key.startsWith("cell-");
        }).forEach(function (key) {
          return events[key] = _this.$listeners[key];
        });

        // deal row-selection-change event
        var old = events["row-selection-change"]; // user define listener
        if (old) {
          events["row-selection-change"] = function (data) {
            _this.selectRow(data.index, data.selected);
            old.call(_this, data);
          };
        } else events["row-selection-change"] = function (data) {
          return _this.selectRow(data.index, data.selected);
        };
        return events;
      },
      // [[tableRows], ...], index follow rows
      tableRows: function tableRows() {
        var _this2 = this;
        // DataRow OneToMany TableRow
        var all = [];
        var preTableRowCount = 0;
        this.rows.forEach(function (dataRow, dataRowIndex) {
          var subTableRows = _this2.dataRowToTableRow(dataRow, dataRowIndex, preTableRowCount);
          all.push(subTableRows);
          preTableRowCount += subTableRows.length;
        });
        return all;
      },
      // Calculate each row's rowspan by Column.pid config
      rowspans: function rowspans() {
        var rowspans = {};

        // find pid from columns config
        var pids = this.subColumns.map(function (c) {
          return c.pid;
        }).filter(function (v, i, a) {
          return a.indexOf(v) === i;
        }); // distinct pid

        // calculate rowspan value
        this.rows.forEach(function (row, index) {
          if (typeof row.rowspan === "number") {
            // custom rowspan value
            rowspans[index] = row.rowspan;
          } else {
            // auto calculate rowspan value
            var maxSize = Math.max.apply(Math, _toConsumableArray(pids.map(function (pid) {
              return row[pid] ? row[pid].length : 1;
            })));
            if (maxSize > 1) rowspans[index] = maxSize;
          }
        });
        return rowspans;
      }
    },
    created: function created() {
      // auto judge the last column width config
      this.v.lastColumnIsAutoWidth = !this.flattenColumns[this.flattenColumns.length - 1].width;
    },
    mounted: function mounted() {
      if (!this.v.lastColumnIsAutoWidth) {
        // watch horizon scrollbar size
        this.v.contentEl = this.$el.querySelector(".content"); // cache content el
        this.$_watchHorizonScrollBarSize();
      }
    },
    destroyed: function destroyed() {
      if (!this.v.lastColumnIsAutoWidth) g.clearInterval(this.v.timer);
    },
    methods: {
      columnSelectStateChange: function columnSelectStateChange(selected, index, column) {
        var _this3 = this;
        if (index === 0) {
          // add full selection to the first column
          this.rows.forEach(function (row) {
            return _this3.$set(row, "selected", selected);
          });
        }
        // emit column-select-state-change event
        this.$emit('column-select-state-change', selected, index, column);
      },
      // DataRow OneToMany TableRow
      // TableRow: {index, cells, classes, styles}
      // TableCell: {rowspan, colspan, value, classes, styles}
      dataRowToTableRow: function dataRowToTableRow(dataRow, dataRowIndex, preTableRowCount) {
        var _this4 = this;
        var tableRows = [];

        // main TableRow
        var nestedIndex = 0;
        tableRows.push({
          tableRowIndex: preTableRowCount,
          dataRowIndex: dataRowIndex,
          index: nestedIndex++,
          row: dataRow,
          classes: this.classes.contentRow,
          styles: this.styles.contentRow,
          selected: dataRow.selected === true,
          cells: this.flattenColumns.map(function (column, i) {
            var _getCellConfigInfo = getCellConfigInfo(dataRow, column, 0),
              empty = _getCellConfigInfo.empty,
              value = _getCellConfigInfo.value;
            var c = {
              column: column,
              empty: empty
            };
            if (!empty) c.value = value;
            var rowspan = column.pid ? 1 : _this4.rowspans[dataRowIndex];
            if (rowspan > 1) c.rowspan = rowspan;
            return c;
          })
        });

        // sub TableRows
        var len = this.rowspans[dataRowIndex] || 1;
        var _loop = function _loop(i) {
          tableRows.push({
            tableRowIndex: preTableRowCount + nestedIndex,
            dataRowIndex: dataRowIndex,
            index: nestedIndex++,
            row: dataRow,
            classes: _this4.classes.contentRow,
            styles: _this4.styles.contentRow,
            cells: _this4.subColumns.map(function (column) {
              var _getCellConfigInfo2 = getCellConfigInfo(dataRow, column, i),
                empty = _getCellConfigInfo2.empty,
                value = _getCellConfigInfo2.value;
              var c = {
                column: column,
                empty: empty
              };
              if (!empty) c.value = value;
              return c;
            })
          });
        };
        for (var i = 1; i < len; i++) {
          _loop(i);
        }
        return tableRows;
      },
      /** DataRow props to transfer */dataRowProps: function dataRowProps(row, index) {
        var props = {
          tableRows: this.tableRows[index]
        };
        return props;
      },
      $_watchHorizonScrollBarSize: function $_watchHorizonScrollBarSize() {
        var _this5 = this;
        var t;
        this.v.timer = g.setInterval(function () {
          t = _this5.v.contentEl.offsetWidth - _this5.v.contentEl.clientWidth;
          if (t != _this5.v.scrollBarWidth) {
            // console.log("scrollBarWidth: %s > %s", this.v.scrollBarWidth, t);
            _this5.v.scrollBarWidth = t;
          }
        }, 100);
      },
      selectRow: function selectRow(index, selected) {
        var row = this.rows[index];
        if (row) this.$set(row, "selected", selected);
      },
      clearSelection: function clearSelection() {
        var _this6 = this;
        this.selection.forEach(function (row) {
          return _this6.$set(row, "selected", false);
        });
      },
      deleteSelection: function deleteSelection() {
        var _this7 = this;
        this.selection.forEach(function (row) {
          return _this7.rows.splice(_this7.rows.indexOf(row), 1);
        });
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
              },
              on: { "column-select-state-change": _vm.columnSelectStateChange }
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
      inject("data-v-dfb37f64_0", { source: "\n.st-grid {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n.st-grid > .content {\n  flex: 1 1 0%;\n  overflow: auto;\n}\n.st-grid > .header {\n  overflow: hidden;\n  position: relative;\n  text-align: center;\n}\n.st-grid > .header > table {\n  position: relative;\n}\n.st-grid > .content > table,\n.st-grid > .header > table {\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: collapse;\n}\n.st-grid > .header > table > thead > tr > td,\n.st-grid > .content > table > tbody > tr > td {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.st-grid > .header > table > thead > tr,\n.st-grid > .content > table > tbody > tr {\n  min-height: 2em;\n}\n.st-grid > .bottom {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n.st-grid > .bottom > * {\n  margin: 0.25rem 0 0.25rem 0.25rem;\n}\n.st-row {\n  cursor: default;\n}\n.st-cell {\n  padding: 0.25rem;\n}\n.st-cell.number {\n  text-align: right;\n}\n", map: {"version":3,"sources":["/Volumes/macdata/work/simter/simter-vue-components/src/grid.vue"],"names":[],"mappings":";AAuRA;EACA,kBAAA;EACA,aAAA;EACA,sBAAA;AACA;AACA;EACA,YAAA;EACA,cAAA;AACA;AACA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;;EAEA,WAAA;EACA,mBAAA;EACA,yBAAA;AACA;AACA;;EAEA,gBAAA;EACA,uBAAA;AACA;AACA;;EAEA,eAAA;AACA;AACA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;AACA;AACA;EACA,iCAAA;AACA;AACA;EACA,eAAA;AACA;AACA;EACA,gBAAA;AACA;AACA;EACA,iBAAA;AACA","file":"grid.vue","sourcesContent":["<template>\n  <div :class=\"['st-grid', classes.root]\">\n    <div :class=\"['top', classes.top]\" v-if=\"$slots.top && $slots.top.length > 0\">\n      <slot name=\"top\"></slot>\n    </div>\n    <div :class=\"['header', classes.header]\">\n      <table :class=\"classes.headerTable\" :style=\"headerTableStyle\">\n        <st-colgroup :columns=\"columns\"></st-colgroup>\n        <st-thead :columns=\"columns\" :classes=\"classes.headerRow\" :styles=\"styles.headerRow\"\n          @column-select-state-change=\"columnSelectStateChange\"></st-thead>\n      </table>\n    </div>\n    <div\n      :class=\"['content', classes.content]\"\n      @scroll=\"v.scrollLeft = -1 * $event.target.scrollLeft\"\n    >\n      <table :class=\"classes.contentTable\" :style=\"styles.contentTable\">\n        <st-colgroup :columns=\"columns\"></st-colgroup>\n        <tbody>\n          <st-data-row\n            v-for=\"(row, index) in rows\"\n            :key=\"index\"\n            v-bind=\"dataRowProps(row, index)\"\n            v-on=\"dataRowListeners\"\n          ></st-data-row>\n        </tbody>\n      </table>\n    </div>\n    <div :class=\"['bottom', classes.bottom]\" v-if=\"$slots.bottom && $slots.bottom.length > 0\">\n      <slot name=\"bottom\"></slot>\n    </div>\n  </div>\n</template>\n\n<script>\nimport { g, gv, flatten, concatStyles } from \"./utils\";\nimport stDataRow from \"./row/data-row\";\nimport stColgroup from \"./colgroup.vue\";\nimport stThead from \"./thead.vue\";\nimport tableRowVue from \"./row/table-row.vue\";\n\n/**\n * { empty, value }.\n *\n * If column has a pid, then:\n *   1. return `{ empty: false, value: row[column.pid][subRowIndex][column.id] }`\n *      if row[column.pid].length > subRowIndex,\n *   2. or return { empty: true }\n *      if row[column.pid].length <= subRowIndex.\n * Otherwise return `{ empty: false, value: row[column.id] }`.\n */\nfunction getCellConfigInfo(row, column, subRowIndex, mainRowIndex) {\n  return column.pid\n    ? row[column.pid] && row[column.pid].length > subRowIndex\n      ? { empty: false, value: row[column.pid][subRowIndex][column.id] } // nested cell\n      : { empty: true } // empty cell\n    : { empty: false, value: row[column.id] }; // top cell\n}\n\nexport default {\n  components: { stColgroup, stThead, stDataRow },\n  props: {\n    columns: { type: Array, required: true },\n    rows: {\n      type: Array,\n      required: false,\n      default() {\n        return [];\n      }\n    },\n    // All dom element class\n    classes: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.grid.classes\", {})\n    },\n    // All dom element style\n    styles: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.grid.styles\", {})\n    }\n  },\n  data: function() {\n    return {\n      // some params use in ui\n      v: {\n        scrollLeft: 0,\n        scrollBarWidth: 0,\n        timer: null,\n        contentEl: null,\n        lastColumnIsAutoWidth: false\n      }\n    };\n  },\n  computed: {\n    // all selected rows\n    selection() {\n      return this.rows.filter(row => row.selected === true);\n    },\n    flattenColumns() {\n      return flatten(this.columns);\n    },\n    subColumns() {\n      return this.flattenColumns.filter(c => c.pid);\n    },\n    headerTableStyle() {\n      return concatStyles(this.styles.headerTable, {\n        left: this.v.scrollLeft + \"px\",\n        width: \"calc(100% - \" + this.v.scrollBarWidth + \"px)\"\n      });\n    },\n    /** DataRow listeners to transfer */\n    dataRowListeners() {\n      const events = {};\n      Object.keys(this.$listeners)\n        .filter(key => key.startsWith(\"row-\") || key.startsWith(\"cell-\"))\n        .forEach(key => (events[key] = this.$listeners[key]));\n\n      // deal row-selection-change event\n      let old = events[\"row-selection-change\"]; // user define listener\n      if (old) {\n        events[\"row-selection-change\"] = data => {\n          this.selectRow(data.index, data.selected);\n          old.call(this, data);\n        }\n      } else events[\"row-selection-change\"] = data => this.selectRow(data.index, data.selected);\n\n      return events;\n    },\n    // [[tableRows], ...], index follow rows\n    tableRows() {\n      // DataRow OneToMany TableRow\n      let all = [];\n      let preTableRowCount = 0;\n      this.rows.forEach((dataRow, dataRowIndex) => {\n        let subTableRows = this.dataRowToTableRow(\n          dataRow,\n          dataRowIndex,\n          preTableRowCount\n        );\n        all.push(subTableRows);\n        preTableRowCount += subTableRows.length;\n      });\n      return all;\n    },\n    // Calculate each row's rowspan by Column.pid config\n    rowspans() {\n      let rowspans = {};\n\n      // find pid from columns config\n      let pids = this.subColumns\n        .map(c => c.pid)\n        .filter((v, i, a) => a.indexOf(v) === i); // distinct pid\n\n      // calculate rowspan value\n      this.rows.forEach((row, index) => {\n        if (typeof row.rowspan === \"number\") {\n          // custom rowspan value\n          rowspans[index] = row.rowspan;\n        } else {\n          // auto calculate rowspan value\n          let maxSize = Math.max(\n            ...pids.map(pid => (row[pid] ? row[pid].length : 1))\n          );\n          if (maxSize > 1) rowspans[index] = maxSize;\n        }\n      });\n\n      return rowspans;\n    }\n  },\n  created() {\n    // auto judge the last column width config\n    this.v.lastColumnIsAutoWidth = !this.flattenColumns[\n      this.flattenColumns.length - 1\n    ].width;\n  },\n  mounted() {\n    if (!this.v.lastColumnIsAutoWidth) {\n      // watch horizon scrollbar size\n      this.v.contentEl = this.$el.querySelector(\".content\"); // cache content el\n      this.$_watchHorizonScrollBarSize();\n    }\n  },\n  destroyed() {\n    if (!this.v.lastColumnIsAutoWidth) g.clearInterval(this.v.timer);\n  },\n  methods: {\n    columnSelectStateChange(selected, index, column) {\n      if (index === 0) { // add full selection to the first column\n        this.rows.forEach(row => this.$set(row, \"selected\", selected));\n      }\n      // emit column-select-state-change event\n      this.$emit('column-select-state-change', selected, index, column);\n    },\n    // DataRow OneToMany TableRow\n    // TableRow: {index, cells, classes, styles}\n    // TableCell: {rowspan, colspan, value, classes, styles}\n    dataRowToTableRow(dataRow, dataRowIndex, preTableRowCount) {\n      let tableRows = [];\n\n      // main TableRow\n      let nestedIndex = 0;\n      tableRows.push({\n        tableRowIndex: preTableRowCount,\n        dataRowIndex: dataRowIndex,\n        index: nestedIndex++,\n        row: dataRow,\n        classes: this.classes.contentRow,\n        styles: this.styles.contentRow,\n        selected: dataRow.selected === true,\n        cells: this.flattenColumns.map((column, i) => {\n          let { empty, value } = getCellConfigInfo(\n            dataRow,\n            column,\n            0,\n            dataRowIndex\n          );\n          let c = { column: column, empty: empty };\n          if (!empty) c.value = value;\n          let rowspan = column.pid ? 1 : this.rowspans[dataRowIndex];\n          if (rowspan > 1) c.rowspan = rowspan;\n          return c;\n        })\n      });\n\n      // sub TableRows\n      let len = this.rowspans[dataRowIndex] || 1;\n      for (let i = 1; i < len; i++) {\n        tableRows.push({\n          tableRowIndex: preTableRowCount + nestedIndex,\n          dataRowIndex: dataRowIndex,\n          index: nestedIndex++,\n          row: dataRow,\n          classes: this.classes.contentRow,\n          styles: this.styles.contentRow,\n          cells: this.subColumns.map(column => {\n            let { empty, value } = getCellConfigInfo(dataRow, column, i);\n            let c = { column: column, empty: empty };\n            if (!empty) c.value = value;\n            return c;\n          })\n        });\n      }\n      return tableRows;\n    },\n    /** DataRow props to transfer */\n    dataRowProps(row, index) {\n      let props = {\n        tableRows: this.tableRows[index]\n      };\n      return props;\n    },\n    $_watchHorizonScrollBarSize() {\n      let t;\n      this.v.timer = g.setInterval(() => {\n        t = this.v.contentEl.offsetWidth - this.v.contentEl.clientWidth;\n        if (t != this.v.scrollBarWidth) {\n          // console.log(\"scrollBarWidth: %s > %s\", this.v.scrollBarWidth, t);\n          this.v.scrollBarWidth = t;\n        }\n      }, 100);\n    },\n    selectRow(index, selected) {\n      let row = this.rows[index];\n      if (row) this.$set(row, \"selected\", selected);\n    },\n    clearSelection() {\n      this.selection.forEach(row => this.$set(row, \"selected\", false));\n    },\n    deleteSelection() {\n      this.selection.forEach(row => this.rows.splice(this.rows.indexOf(row), 1));\n    }\n  }\n};\n</script>\n\n<style>\n.st-grid {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n.st-grid > .content {\n  flex: 1 1 0%;\n  overflow: auto;\n}\n.st-grid > .header {\n  overflow: hidden;\n  position: relative;\n  text-align: center;\n}\n.st-grid > .header > table {\n  position: relative;\n}\n.st-grid > .content > table,\n.st-grid > .header > table {\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: collapse;\n}\n.st-grid > .header > table > thead > tr > td,\n.st-grid > .content > table > tbody > tr > td {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.st-grid > .header > table > thead > tr,\n.st-grid > .content > table > tbody > tr {\n  min-height: 2em;\n}\n.st-grid > .bottom {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n.st-grid > .bottom > * {\n  margin: 0.25rem 0 0.25rem 0.25rem;\n}\n.st-row {\n  cursor: default;\n}\n.st-cell {\n  padding: 0.25rem;\n}\n.st-cell.number {\n  text-align: right;\n}\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$9 = undefined;
    /* module identifier */
    const __vue_module_identifier__$9 = undefined;
    /* functional template */
    const __vue_is_functional_template__$9 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$9 = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
      __vue_inject_styles__$9,
      __vue_script__$9,
      __vue_scope_id__$9,
      __vue_is_functional_template__$9,
      __vue_module_identifier__$9,
      false,
      browser,
      undefined,
      undefined
    );

  //
  var script$8 = {
    props: {
      tag: {
        type: String,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.button.tag", "button");
        }
      },
      iconClass: {
        type: String,
        required: false
      },
      rightIconClass: {
        type: String,
        required: false
      },
      selectable: {
        type: Boolean,
        required: false,
        "default": false
      },
      // only use when selectable === true
      selected: {
        type: Boolean,
        required: false,
        "default": false
      },
      // element class: { root, hover, selected, iconContainer, icon, text }
      classes: {
        type: [Array, Object],
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.button.classes", {});
        }
      },
      // element style: { root, hover, selected, iconContainer, icon, text }
      styles: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.button.styles", {});
        }
      }
    },
    data: function data() {
      return {
        ui: {
          hover: false,
          selected: false
        }
      };
    },
    computed: {
      rootClass: function rootClass() {
        return concatClasses("st-button", this.classes.root, this.ui.hover ? this.classes.hover || "hover" : undefined, this.ui.selected ? this.classes.selected || "selected" : undefined);
      },
      rootStyle: function rootStyle() {
        return concatStyles(this.styles.root, this.ui.hover ? this.styles.hover : undefined, this.selectable && this.ui.selected ? this.styles.selected : undefined);
      }
    },
    created: function created() {
      var _this = this;
      if (this.selectable) {
        this.$watch("selected", function (newVal, _) {
          if (_this.ui.selected !== newVal) _this.ui.selected = newVal;
        }, {
          immediate: true
        });
      }
    },
    methods: {
      clickMe: function clickMe($event) {
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
          : _vm._e(),
        _vm._v(" "),
        _vm.rightIconClass || _vm.classes.rightIcon
          ? _c("i", { class: [_vm.rightIconClass, _vm.classes.rightIcon] })
          : _vm._e()
      ]
    )
  };
  var __vue_staticRenderFns__$a = [];
  __vue_render__$a._withStripped = true;

    /* style */
    const __vue_inject_styles__$a = function (inject) {
      if (!inject) return
      inject("data-v-dda579c0_0", { source: "\n.st-button {\n  display: inline-flex;\n  align-items: center;\n  min-height: 1.8em;\n}\n", map: {"version":3,"sources":["/Volumes/macdata/work/simter/simter-vue-components/src/button.vue"],"names":[],"mappings":";AA8FA;EACA,oBAAA;EACA,mBAAA;EACA,iBAAA;AACA","file":"button.vue","sourcesContent":["<template>\n  <component\n    :is=\"tag\"\n    :class=\"rootClass\"\n    :style=\"rootStyle\"\n    type=\"button\"\n    @mouseover=\"ui.hover = true\"\n    @mouseout=\"ui.hover = false\"\n    @click.stop.prevent=\"clickMe($event)\"\n  >\n    <i v-if=\"iconClass || classes.icon\" :class=\"[iconClass, classes.icon]\"></i>\n    <span v-if=\"$slots.default\" :class=\"classes.text\">\n      <slot></slot>\n    </span>\n    <i v-if=\"rightIconClass || classes.rightIcon\" :class=\"[rightIconClass, classes.rightIcon]\"></i>\n  </component>\n</template>\n\n<script>\n/**\n * Events:\n * 1. click($event)\n * 2. \"update:selected\"(selected) < if selectable === true\n */\nimport { gv, concatClasses, concatStyles } from \"./utils\";\nexport default {\n  props: {\n    tag: {\n      type: String,\n      required: false,\n      default: () => gv(\"simter.button.tag\", \"button\")\n    },\n    iconClass: { type: String, required: false },\n    rightIconClass: { type: String, required: false },\n    selectable: { type: Boolean, required: false, default: false },\n    // only use when selectable === true\n    selected: { type: Boolean, required: false, default: false },\n    // element class: { root, hover, selected, iconContainer, icon, text }\n    classes: {\n      type: [Array, Object],\n      required: false,\n      default: () => gv(\"simter.button.classes\", {})\n    },\n    // element style: { root, hover, selected, iconContainer, icon, text }\n    styles: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.button.styles\", {})\n    }\n  },\n  data() {\n    return { ui: { hover: false, selected: false } };\n  },\n  computed: {\n    rootClass() {\n      return concatClasses(\n        \"st-button\",\n        this.classes.root,\n        this.ui.hover ? this.classes.hover || \"hover\" : undefined,\n        this.ui.selected ? this.classes.selected || \"selected\" : undefined\n      );\n    },\n    rootStyle() {\n      return concatStyles(\n        this.styles.root,\n        this.ui.hover ? this.styles.hover : undefined,\n        this.selectable && this.ui.selected ? this.styles.selected : undefined\n      );\n    }\n  },\n  created() {\n    if (this.selectable) {\n      this.$watch(\n        \"selected\",\n        (newVal, _) => {\n          if (this.ui.selected !== newVal) this.ui.selected = newVal;\n        },\n        { immediate: true }\n      );\n    }\n  },\n  methods: {\n    clickMe($event) {\n      if (this.selectable && this.ui.selected !== true) {\n        this.ui.selected = true;\n        this.$emit(\"update:selected\", true);\n      }\n      this.$emit(\"click\", $event);\n    }\n  }\n};\n</script>\n\n<style>\n.st-button {\n  display: inline-flex;\n  align-items: center;\n  min-height: 1.8em;\n}\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$a = undefined;
    /* module identifier */
    const __vue_module_identifier__$a = undefined;
    /* functional template */
    const __vue_is_functional_template__$a = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$a = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
      __vue_inject_styles__$a,
      __vue_script__$a,
      __vue_scope_id__$a,
      __vue_is_functional_template__$a,
      __vue_module_identifier__$a,
      false,
      browser,
      undefined,
      undefined
    );

  //
  var script$9 = {
    components: {
      stButton: __vue_component__$a
    },
    props: {
      text: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.pagebar.text", {
            first: "First",
            previous: "Previous",
            next: "Next",
            last: "Last"
          });
        }
      },
      /** The current 1-base page number */
      pageNo: {
        type: Number,
        required: false,
        "default": 0
      },
      /** The maximal elements count of one page */
      pageSize: {
        type: Number,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.pagebar.pageSize", 25);
        }
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
        "default": function _default() {
          return getGlobalVariable("simter.pagebar.classes", {});
        }
      },
      // All dom element style
      styles: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.pagebar.styles", {});
        }
      }
    },
    computed: {
      pageCount: function pageCount() {
        return Math.ceil(this.total / this.pageSize);
      }
    },
    data: function data() {
      return {
        v: {
          pageNo: undefined
        }
      };
    },
    watch: {
      pageNo: {
        immediate: true,
        handler: function handler(value) {
          if (value !== this.v.pageNo) this.v.pageNo = value;
        }
      }
    },
    methods: {
      toPage: function toPage(pageNo) {
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
      inject("data-v-13fff5ca_0", { source: "\n.st-pagebar {\n  display: inline-flex;\n  align-items: center;\n}\n.st-pagebar > .text {\n  cursor: default;\n  margin: 0 0.25rem;\n}\n.st-pagebar > :not(.text) {\n  cursor: pointer;\n  margin: 0;\n}\n", map: {"version":3,"sources":["/Volumes/macdata/work/simter/simter-vue-components/src/pagebar.vue"],"names":[],"mappings":";AAuGA;EACA,oBAAA;EACA,mBAAA;AACA;AACA;EACA,eAAA;EACA,iBAAA;AACA;AACA;EACA,eAAA;EACA,SAAA;AACA","file":"pagebar.vue","sourcesContent":["<template>\n  <span :class=\"['st-pagebar', classes.root]\">\n    <st-button\n      :class=\"'first'\"\n      :classes=\"classes.first\"\n      :styles=\"styles.first\"\n      @click.native.prevent.stop=\"toPage(1)\"\n    >{{text.first}}</st-button>\n    <st-button\n      :class=\"'previous'\"\n      :classes=\"classes.previous\"\n      :styles=\"styles.previous\"\n      @click.native.prevent.stop=\"toPage(Math.max(v.pageNo - 1, 1))\"\n    >{{text.previous}}</st-button>\n    <span :class=\"['text', classes.text]\" v-if=\"total > 0\">{{v.pageNo}}/{{pageCount}}({{total}})</span>\n    <span :class=\"['text', classes.text]\" v-else>0</span>\n    <st-button\n      :class=\"'next'\"\n      :classes=\"classes.next\"\n      :styles=\"styles.next\"\n      @click.native.prevent.stop=\"toPage(Math.min(v.pageNo + 1, pageCount))\"\n    >{{text.next}}</st-button>\n    <st-button\n      :class=\"'last'\"\n      :classes=\"classes.last\"\n      :styles=\"styles.last\"\n      @click.native.prevent.stop=\"toPage(pageCount)\"\n    >{{text.last}}</st-button>\n  </span>\n</template>\n\n<script>\n/**\n * Events: change(newPageNo)\n */\nimport { gv } from \"./utils\";\nimport stButton from \"./button.vue\";\nexport default {\n  components: { stButton },\n  props: {\n    text: {\n      type: Object,\n      required: false,\n      default: () =>\n        gv(\"simter.pagebar.text\", {\n          first: \"First\",\n          previous: \"Previous\",\n          next: \"Next\",\n          last: \"Last\"\n        })\n    },\n    /** The current 1-base page number */\n    pageNo: { type: Number, required: false, default: 0 },\n    /** The maximal elements count of one page */\n    pageSize: {\n      type: Number,\n      required: false,\n      default: () => gv(\"simter.pagebar.pageSize\", 25)\n    },\n    /** The total elements count */\n    total: { type: Number, required: true },\n    // All dom element class\n    classes: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.pagebar.classes\", {})\n    },\n    // All dom element style\n    styles: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.pagebar.styles\", {})\n    }\n  },\n  computed: {\n    pageCount() {\n      return Math.ceil(this.total / this.pageSize);\n    }\n  },\n  data() {\n    return { v: { pageNo: undefined } };\n  },\n  watch: {\n    pageNo: {\n      immediate: true,\n      handler(value) {\n        if (value !== this.v.pageNo) this.v.pageNo = value;\n      }\n    }\n  },\n  methods: {\n    toPage(pageNo) {\n      if (pageNo !== this.v.pageNo) {\n        this.v.pageNo = pageNo;\n        this.$emit(\"update:page-no\", pageNo);\n        this.$emit(\"change\", pageNo);\n      }\n    }\n  }\n};\n</script>\n\n<style>\n.st-pagebar {\n  display: inline-flex;\n  align-items: center;\n}\n.st-pagebar > .text {\n  cursor: default;\n  margin: 0 0.25rem;\n}\n.st-pagebar > :not(.text) {\n  cursor: pointer;\n  margin: 0;\n}\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$b = undefined;
    /* module identifier */
    const __vue_module_identifier__$b = undefined;
    /* functional template */
    const __vue_is_functional_template__$b = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$b = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
      __vue_inject_styles__$b,
      __vue_script__$b,
      __vue_scope_id__$b,
      __vue_is_functional_template__$b,
      __vue_module_identifier__$b,
      false,
      browser,
      undefined,
      undefined
    );

  //
  var script$a = {
    components: {
      stButton: __vue_component__$a
    },
    props: {
      rootClass: {
        type: String,
        required: false,
        "default": "st-button-group"
      },
      /** buttons: [String|{text, value, ...}] */
      items: {
        type: Array,
        required: true
      },
      /** is multiple selected */
      multiple: {
        type: Boolean,
        required: false
      },
      /** current value */
      value: {
        required: false
      },
      // all dom elements class
      classes: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.buttonGroup.classes", {
            first: "first",
            last: "last"
          });
        }
      },
      // all dom elements class
      styles: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.buttonGroup.styles", {});
        }
      }
    },
    data: function data() {
      return {
        v: {
          value: undefined
        }
      };
    },
    watch: {
      value: {
        immediate: true,
        handler: function handler(value) {
          if (value !== this.v.value) this.v.value = value;
        }
      }
    },
    methods: {
      /** auto judge whether to add first, last or selected class to the relative button */itemClass: function itemClass(item, index) {
        return concatClasses(item == this.v.value ? this.classes.selected : undefined, index === 0 ? this.classes.first : undefined, index === this.items.length - 1 ? this.classes.last : undefined);
      },
      /** auto judge whether to add first, last or selected style to the relative button */itemStyle: function itemStyle(item, index) {
        return concatStyles(item == this.v.value ? this.styles.selected : undefined, index === 0 ? this.styles.first : undefined, index === this.items.length - 1 ? this.styles.last : undefined);
      },
      clickItem: function clickItem(item, index) {
        if (!this.multiple) {
          if (this.v.value !== item) {
            this.v.value = item;
            this.$emit("update:value", item);
            this.$emit("change", item, index);
          }
        } else {
          var i = this.value.findIndex(function (t) {
            return t == item;
          });
          if (i != -1) this.value.splice(i, 1);else this.value.push(item);
          this.$emit("update:value", this.value);
          this.$emit("change", this.value, index);
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
              selected: _vm.multiple
                ? (_vm.value || []).includes(item)
                : item === _vm.value
            },
            on: {
              click: function($event) {
                return _vm.clickItem(item, index)
              }
            }
          },
          [
            _c("span", { staticStyle: { position: "relative" } }, [
              _vm.multiple
                ? _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.value,
                        expression: "value"
                      }
                    ],
                    staticClass: "ui-widget-content",
                    attrs: { type: "checkbox" },
                    domProps: {
                      value: item,
                      checked: Array.isArray(_vm.value)
                        ? _vm._i(_vm.value, item) > -1
                        : _vm.value
                    },
                    on: {
                      change: function($event) {
                        var $$a = _vm.value,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false;
                        if (Array.isArray($$a)) {
                          var $$v = item,
                            $$i = _vm._i($$a, $$v);
                          if ($$el.checked) {
                            $$i < 0 && (_vm.value = $$a.concat([$$v]));
                          } else {
                            $$i > -1 &&
                              (_vm.value = $$a
                                .slice(0, $$i)
                                .concat($$a.slice($$i + 1)));
                          }
                        } else {
                          _vm.value = $$c;
                        }
                      }
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _c("span", {
                staticStyle: {
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  left: "0",
                  top: "0"
                }
              })
            ]),
            _vm._v(
              "\n    " +
                _vm._s(
                  typeof item === "string"
                    ? item
                    : typeof item === "object"
                    ? item.text || item.value
                    : item
                ) +
                "\n  "
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
      inject("data-v-ac4d31dc_0", { source: "\n.st-button-group {\n  display: inline-flex;\n}\n.st-button-group > * {\n  margin: 0;\n}\n", map: {"version":3,"sources":["/Volumes/macdata/work/simter/simter-vue-components/src/button-group.vue"],"names":[],"mappings":";AAsGA;EACA,oBAAA;AACA;AACA;EACA,SAAA;AACA","file":"button-group.vue","sourcesContent":["<template>\n  <span :class=\"[rootClass, classes.root]\">\n    <st-button\n      v-for=\"(item, index) in items\"\n      :key=\"index\"\n      :classes=\"classes.button\"\n      :styles=\"styles.button\"\n      :class=\"itemClass(item, index)\"\n      :style=\"itemStyle(item, index)\"\n      :selectable=\"true\"\n      :selected=\"multiple ? (value || []).includes(item) : item === value\"\n      @click=\"clickItem(item, index)\">\n      <span style=\"position:relative\">\n        <input v-if=\"multiple\" type=\"checkbox\" class=\"ui-widget-content\" :value=\"item\" v-model=\"value\">\n        <span style=\"position:absolute;width:100%;height:100%;left:0;top:0;\"></span>\n      </span>\n      {{typeof item === \"string\" ? item : (typeof item === \"object\" ? item.text || item.value : item)}}\n    </st-button>\n  </span>\n</template>\n\n<script>\n/**\n * Events: change(newValue, newIndex)\n */\nimport { gv, concatClasses, concatStyles } from \"./utils\";\nimport stButton from \"./button.vue\";\nexport default {\n  components: { stButton },\n  props: {\n    rootClass: { type: String, required: false, default: \"st-button-group\" },\n    /** buttons: [String|{text, value, ...}] */\n    items: { type: Array, required: true },\n    /** is multiple selected */\n    multiple: { type: Boolean, required: false },\n    /** current value */\n    value: { required: false },\n    // all dom elements class\n    classes: {\n      type: Object,\n      required: false,\n      default: () =>\n        gv(\"simter.buttonGroup.classes\", {\n          first: \"first\",\n          last: \"last\"\n        })\n    },\n    // all dom elements class\n    styles: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.buttonGroup.styles\", {})\n    }\n  },\n  data() {\n    return { v: { value: undefined } };\n  },\n  watch: {\n    value: {\n      immediate: true,\n      handler(value) {\n        if (value !== this.v.value) this.v.value = value;\n      }\n    }\n  },\n  methods: {\n    /** auto judge whether to add first, last or selected class to the relative button */\n    itemClass(item, index) {\n      return concatClasses(\n        item == this.v.value ? this.classes.selected : undefined,\n        index === 0 ? this.classes.first : undefined,\n        index === this.items.length - 1 ? this.classes.last : undefined\n      );\n    },\n    /** auto judge whether to add first, last or selected style to the relative button */\n    itemStyle(item, index) {\n      return concatStyles(\n        item == this.v.value ? this.styles.selected : undefined,\n        index === 0 ? this.styles.first : undefined,\n        index === this.items.length - 1 ? this.styles.last : undefined\n      );\n    },\n    clickItem(item, index) {\n      if (!this.multiple){\n        if (this.v.value !== item) {\n          this.v.value = item;\n          this.$emit(\"update:value\", item);\n          this.$emit(\"change\", item, index);\n        }\n      } else {\n        const i = this.value.findIndex(t => t == item)\n        if (i != -1) this.value.splice(i, 1)\n        else this.value.push(item)\n        this.$emit(\"update:value\", this.value);\n        this.$emit(\"change\", this.value, index);\n      }\n    }\n  }\n};\n</script>\n\n<style>\n.st-button-group {\n  display: inline-flex;\n}\n.st-button-group > * {\n  margin: 0;\n}\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$c = undefined;
    /* module identifier */
    const __vue_module_identifier__$c = undefined;
    /* functional template */
    const __vue_is_functional_template__$c = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$c = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
      __vue_inject_styles__$c,
      __vue_script__$c,
      __vue_scope_id__$c,
      __vue_is_functional_template__$c,
      __vue_module_identifier__$c,
      false,
      browser,
      undefined,
      undefined
    );

  /**
   * Events: change(newValue, newIndex)
   */
  var script$b = {
    "extends": __vue_component__$c,
    props: {
      rootClass: {
        type: String,
        required: false,
        "default": "st-pagebar-sizes"
      },
      items: {
        type: Array,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.pagebar.pageSizes", [25, 50, 100]);
        }
      },
      value: {
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.pagebar.pageSize", 25);
        }
      },
      classes: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.pagebarSizes.classes", {
            first: "first",
            last: "last"
          });
        }
      },
      styles: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.pagebarSizes.styles", {});
        }
      }
    }
  };

  /* script */
  const __vue_script__$d = script$b;

  /* template */

    /* style */
    const __vue_inject_styles__$d = function (inject) {
      if (!inject) return
      inject("data-v-ec5993b8_0", { source: "\n.st-page-sizes {\n  display: inline-flex;\n}\n.st-page-sizes > * {\n  margin: 0;\n}\n", map: {"version":3,"sources":["/Volumes/macdata/work/simter/simter-vue-components/src/pagebar-sizes.vue"],"names":[],"mappings":";AAsCA;EACA,oBAAA;AACA;AACA;EACA,SAAA;AACA","file":"pagebar-sizes.vue","sourcesContent":["<script>\n/**\n * Events: change(newValue, newIndex)\n */\nimport { gv } from \"./utils\";\nimport stButtonGroup from \"./button-group.vue\";\nexport default {\n  extends: stButtonGroup,\n  props: {\n    rootClass: { type: String, required: false, default: \"st-pagebar-sizes\" },\n    items: {\n      type: Array,\n      required: false,\n      default: () => gv(\"simter.pagebar.pageSizes\", [25, 50, 100])\n    },\n    value: {\n      required: false,\n      default: () => gv(\"simter.pagebar.pageSize\", 25)\n    },\n    classes: {\n      type: Object,\n      required: false,\n      default: () =>\n        gv(\"simter.pagebarSizes.classes\", {\n          first: \"first\",\n          last: \"last\"\n        })\n    },\n    styles: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.pagebarSizes.styles\", {})\n    }\n  }\n};\n</script>\n\n<style>\n.st-page-sizes {\n  display: inline-flex;\n}\n.st-page-sizes > * {\n  margin: 0;\n}\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$d = undefined;
    /* module identifier */
    const __vue_module_identifier__$d = undefined;
    /* functional template */
    const __vue_is_functional_template__$d = undefined;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$d = /*#__PURE__*/normalizeComponent_1(
      {},
      __vue_inject_styles__$d,
      __vue_script__$d,
      __vue_scope_id__$d,
      __vue_is_functional_template__$d,
      __vue_module_identifier__$d,
      false,
      browser,
      undefined,
      undefined
    );

  //
  var script$c = {
    props: {
      // all dom elements class
      classes: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.toolbar.classes", {
            root: "st-toolbar",
            "default": "default",
            right: "right",
            left: "left"
          });
        }
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
      inject("data-v-2c1f12f3_0", { source: "\n.st-toolbar {\n  display: flex;\n  align-items: flex-start;\n}\n.st-toolbar > *:not(.right):not(.left) {\n  margin: 0.25rem 0 0.25rem 0.25rem;\n}\n.st-toolbar > .left > *,\n.st-toolbar > .right > * {\n  margin: 0.25rem 0.25rem 0.25rem 0;\n}\n.st-toolbar > .right {\n  position: relative;\n  flex: 1 1 auto;\n  display: flex;\n  justify-content: flex-end;\n}\n", map: {"version":3,"sources":["/Volumes/macdata/work/simter/simter-vue-components/src/toolbar.vue"],"names":[],"mappings":";AAiCA;EACA,aAAA;EACA,uBAAA;AACA;AACA;EACA,iCAAA;AACA;AACA;;EAEA,iCAAA;AACA;AACA;EACA,kBAAA;EACA,cAAA;EACA,aAAA;EACA,yBAAA;AACA","file":"toolbar.vue","sourcesContent":["<template>\n  <div :class=\"classes.root\">\n    <slot name=\"default\" :class=\"classes.default\"></slot>\n    <div v-if=\"$slots.left\" :class=\"classes.left\">\n      <slot name=\"left\"></slot>\n    </div>\n    <div v-if=\"$slots.right\" :class=\"classes.right\">\n      <slot name=\"right\"></slot>\n    </div>\n  </div>\n</template>\n\n<script>\nimport { gv } from \"./utils\";\nexport default {\n  props: {\n    // all dom elements class\n    classes: {\n      type: Object,\n      required: false,\n      default: () =>\n        gv(\"simter.toolbar.classes\", {\n          root: \"st-toolbar\",\n          default: \"default\",\n          right: \"right\",\n          left: \"left\"\n        })\n    }\n  }\n};\n</script>\n\n<style>\n.st-toolbar {\n  display: flex;\n  align-items: flex-start;\n}\n.st-toolbar > *:not(.right):not(.left) {\n  margin: 0.25rem 0 0.25rem 0.25rem;\n}\n.st-toolbar > .left > *,\n.st-toolbar > .right > * {\n  margin: 0.25rem 0.25rem 0.25rem 0;\n}\n.st-toolbar > .right {\n  position: relative;\n  flex: 1 1 auto;\n  display: flex;\n  justify-content: flex-end;\n}\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$e = undefined;
    /* module identifier */
    const __vue_module_identifier__$e = undefined;
    /* functional template */
    const __vue_is_functional_template__$e = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$e = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
      __vue_inject_styles__$e,
      __vue_script__$e,
      __vue_scope_id__$e,
      __vue_is_functional_template__$e,
      __vue_module_identifier__$e,
      false,
      browser,
      undefined,
      undefined
    );

  //
  var script$d = {
    components: {
      stButton: __vue_component__$a
    },
    props: {
      rootClass: {
        type: String,
        required: false,
        "default": "st-button-menu"
      },
      iconClass: {
        type: String,
        required: false
      },
      rightIconClass: {
        type: String,
        required: false
      },
      /** The max-width of the menu container */
      width: {
        type: String,
        required: false,
        "default": "20em"
      },
      /** menu items: [String|{text, method, ...}] */
      items: {
        type: Array,
        required: true
      },
      // all dom elements class
      classes: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.buttonMenu.classes", {
            item: {}
          });
        }
      },
      // all dom elements class
      styles: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.buttonMenu.styles", {
            item: {}
          });
        }
      }
    },
    created: function created() {
      var _this = this;
      this.documentEvent = function () {
        if (_this.ui.showMenu) _this.ui.showMenu = false;
      };
      document.addEventListener('click', this.documentEvent);
    },
    destroy: function destroy() {
      document.removeEventListener('click', this.documentEvent);
    },
    data: function data() {
      return {
        ui: {
          showMenu: false,
          hoverItem: {}
        }
      };
    },
    computed: {
      menuClass: function menuClass() {
        return concatClasses("st-menu", this.classes.menu);
      },
      menuStyle: function menuStyle() {
        return concatStyles({
          width: this.width
        }, this.styles.menu);
      }
    },
    methods: {
      mouseoverItem: function mouseoverItem(index) {
        this.$set(this.ui.hoverItem, index + '', true);
      },
      mouseoutItem: function mouseoutItem(index) {
        this.$set(this.ui.hoverItem, index + '', false);
      },
      itemClass: function itemClass(index) {
        return concatClasses("st-menu-item", this.classes.item.root, this.ui.hoverItem[index] ? this.classes.item.hover || "hover" : undefined);
      },
      itemStyle: function itemStyle(index) {
        return concatStyles(this.styles.item.root, this.ui.hoverItem[index] ? this.styles.item.hover : undefined);
      },
      /** 点击按钮 */clickButton: function clickButton() {
        this.ui.showMenu = !this.ui.showMenu;
      },
      /** 点击相应的菜单项触发 select 事件 */clickItem: function clickItem(item, index) {
        this.ui.showMenu = false;
        this.$emit("select", item, index);
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
      "span",
      { class: [_vm.rootClass, _vm.classes.root] },
      [
        _c(
          "st-button",
          {
            attrs: {
              classes: _vm.classes.button,
              styles: _vm.styles.button,
              iconClass: _vm.iconClass || _vm.classes.button.iconClass,
              rightIconClass:
                _vm.rightIconClass || _vm.classes.button.rightIconClass
            },
            on: { click: _vm.clickButton }
          },
          [_vm._t("default")],
          2
        ),
        _vm._v(" "),
        _vm.ui.showMenu
          ? _c(
              "ul",
              { class: _vm.menuClass, style: _vm.menuStyle },
              _vm._l(_vm.items, function(item, index) {
                return _c(
                  "li",
                  {
                    class: _vm.itemClass(index),
                    style: _vm.itemStyle(index),
                    on: {
                      mouseover: function($event) {
                        return _vm.mouseoverItem(index)
                      },
                      mouseout: function($event) {
                        return _vm.mouseoutItem(index)
                      },
                      click: function($event) {
                        $event.stopPropagation();
                        $event.preventDefault();
                        return _vm.clickItem(item, index)
                      }
                    }
                  },
                  [_vm._v(_vm._s(item.text || item))]
                )
              }),
              0
            )
          : _vm._e()
      ],
      1
    )
  };
  var __vue_staticRenderFns__$e = [];
  __vue_render__$e._withStripped = true;

    /* style */
    const __vue_inject_styles__$f = function (inject) {
      if (!inject) return
      inject("data-v-5e94196b_0", { source: "\n.st-button-menu {\n  position: relative;\n}\n.st-button-menu > .st-menu {\n  position: absolute;\n  left: 0;\n  z-index: 100000;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  cursor: default;\n  min-width: 5em;\n}\n.st-button-menu > .st-menu > .st-menu-item {\n  padding: 0.25em;\n  margin: 0.25em;\n  border-width: 0;\n}\n", map: {"version":3,"sources":["/Volumes/macdata/work/simter/simter-vue-components/src/button-menu.vue"],"names":[],"mappings":";AA8GA;EACA,kBAAA;AACA;AACA;EACA,kBAAA;EACA,OAAA;EACA,eAAA;EACA,UAAA;EACA,SAAA;EACA,gBAAA;EACA,eAAA;EACA,cAAA;AACA;AACA;EACA,eAAA;EACA,cAAA;EACA,eAAA;AACA","file":"button-menu.vue","sourcesContent":["<template>\n  <span :class=\"[rootClass, classes.root]\">\n    <st-button \n      :classes=\"classes.button\" \n      :styles=\"styles.button\" \n      :iconClass=\"iconClass || classes.button.iconClass\"\n      :rightIconClass=\"rightIconClass || classes.button.rightIconClass\"\n      @click=\"clickButton\">\n      <slot></slot>\n    </st-button>\n    <ul v-if=\"ui.showMenu\" :class=\"menuClass\" :style=\"menuStyle\">\n      <li v-for=\"(item, index) in items\" \n        :class=\"itemClass(index)\" \n        :style=\"itemStyle(index)\" \n        @mouseover=\"mouseoverItem(index)\"\n        @mouseout=\"mouseoutItem(index)\"\n        @click.stop.prevent=\"clickItem(item, index)\">{{item.text || item}}</li>\n    </ul>\n  </span>\n</template>\n\n<script>\n/**\n * Events: select(item, index)\n */\nimport { gv, concatClasses, concatStyles } from \"./utils\";\nimport stButton from \"./button.vue\";\nexport default {\n  components: { stButton },\n  props: {\n    rootClass: { type: String, required: false, default: \"st-button-menu\" },\n    iconClass: { type: String, required: false },\n    rightIconClass: { type: String, required: false },\n    /** The max-width of the menu container */\n    width: { type: String, required: false, default: \"20em\"  },\n    /** menu items: [String|{text, method, ...}] */\n    items: { type: Array, required: true },\n    // all dom elements class\n    classes: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.buttonMenu.classes\", {item: {}})\n    },\n    // all dom elements class\n    styles: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.buttonMenu.styles\", {item: {}})\n    }\n  },\n  created() {\n    this.documentEvent = () => {\n      if (this.ui.showMenu) this.ui.showMenu = false;\n    }\n    document.addEventListener('click', this.documentEvent);\n  },\n  destroy() {\n    document.removeEventListener('click', this.documentEvent);\n  },\n  data() {\n    return { ui: { showMenu: false, hoverItem: {} } };\n  },\n  computed: {\n    menuClass() {\n      return concatClasses(\n        \"st-menu\",\n        this.classes.menu,\n      );\n    },\n    menuStyle() {\n      return concatStyles(\n        {width: this.width},\n        this.styles.menu,\n      );\n    }\n  },\n  methods: {\n    mouseoverItem(index){\n      this.$set(this.ui.hoverItem, index+'', true)\n    },\n    mouseoutItem(index){\n      this.$set(this.ui.hoverItem, index+'', false)\n    },\n    itemClass(index) {\n      return concatClasses(\n        \"st-menu-item\",\n        this.classes.item.root,\n        this.ui.hoverItem[index] ? this.classes.item.hover || \"hover\" : undefined,\n      );\n    },\n    itemStyle(index) {\n      return concatStyles(\n        this.styles.item.root,\n        this.ui.hoverItem[index] ? this.styles.item.hover : undefined,\n      );\n    },\n    /** 点击按钮 */\n    clickButton() {\n      this.ui.showMenu = !this.ui.showMenu;\n    },\n    /** 点击相应的菜单项触发 select 事件 */\n    clickItem(item, index) {\n      this.ui.showMenu = false;\n      this.$emit(\"select\", item, index);\n    }\n  }\n};\n</script>\n\n<style>\n.st-button-menu {\n  position: relative;\n}\n.st-button-menu > .st-menu {\n  position: absolute;\n  left: 0;\n  z-index: 100000;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  cursor: default;\n  min-width: 5em;\n}\n.st-button-menu > .st-menu > .st-menu-item {\n  padding: 0.25em;\n  margin: 0.25em;\n  border-width: 0;\n}\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$f = undefined;
    /* module identifier */
    const __vue_module_identifier__$f = undefined;
    /* functional template */
    const __vue_is_functional_template__$f = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$f = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
      __vue_inject_styles__$f,
      __vue_script__$f,
      __vue_scope_id__$f,
      __vue_is_functional_template__$f,
      __vue_module_identifier__$f,
      false,
      browser,
      undefined,
      undefined
    );

  //
  var script$e = {
    components: {
      stButton: __vue_component__$a
    },
    props: {
      /** Whether immediately trigger 'search' event when condition value changed */
      quick: {
        type: Boolean,
        required: false,
        "default": false
      },
      /** Whether trigger 'search' event when click clean button */
      cleanToSearch: {
        type: Boolean,
        required: false,
        "default": true
      },
      /** Whether clean condition when click close button */
      closeToClean: {
        type: Boolean,
        required: false,
        "default": false
      },
      placeholder: {
        type: String,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.search.placeholder", "Please input key word");
        }
      },
      value: {
        type: String,
        required: false
      },
      searchButtonText: {
        type: String,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.search.searchButtonText", "Go");
        }
      },
      advanceButtonText: {
        type: String,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.search.advanceButtonText", "More");
        }
      },
      runButtonText: {
        type: String,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.search.operations.runButtonText", "Search");
        }
      },
      cleanButtonText: {
        type: String,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.search.operations.cleanButtonText", "Clean");
        }
      },
      closeButtonText: {
        type: String,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.search.operations.closeButtonText", "Close");
        }
      },
      clickToShowAdvanceButtonText: {
        type: String,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.search.clickToShowAdvanceButtonText", "Click to show advance box");
        }
      },
      clickToHideAdvanceButtonText: {
        type: String,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.search.clickToHideAdvanceButtonText", "Click to hide advance box");
        }
      },
      // all dom elements class
      classes: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.search.classes", {
            advance: {}
          });
        }
      },
      // all dom elements class
      styles: {
        type: Object,
        required: false,
        "default": function _default() {
          return {};
        }
      },
      /** Advance condition config json.
       * 
       * value format:
       * ```json
       * {
       *   conditions: [
       *     {
       *       id: string, 
       *       label: string,
       *       [hidden]: boolean, // whether ignore this condition, default false
       *       [value]: string,   // default value, for multiple values need init to []
       *       [type]: string,    // backend value type, string|boolean|number|date|month|time|datetime|money|..., default string
       *       [operator]: string, // compare type, "[]" | "[)" | "=" |..., default "="
       *       [options]: string[] | [{text: string, value: string}], // extra config for multiple values
       *       [ui]: string,  // when tag=input set its type attribute value, text|number|datetime-local|date|time|month|radio|checkout, default text
       *       [tag]: string, // html control type, "input" | "select", default "input"
       *     },
       *     ...
       *   ],
       *   height: string,    // the box height, "auto" | "15em" | ..., default "auto" fo scroll
       *   maxHeight: string, // the box height, "15em" | ...
       *   width: string,
       *   minWidth: string,
       * }
       * ```
       */
      advanceConfig: {
        type: Object,
        required: false
      }
    },
    data: function data() {
      return {
        // for radio, checkout control's unique name
        instanceId: Date.now(),
        advanceVisable: false,
        value_: undefined
      };
    },
    created: function created() {
      var _this = this;
      // copy value prop's value
      this.value_ = this.value;

      // init default advanceConfig value to avoid failed reactive
      // console.log(this.advanceConfig?.conditions)
      if (this.advanceConfig && this.advanceConfig.conditions) {
        this.advanceConfig.conditions.forEach(function (c) {
          if (!c.hasOwnProperty("value")) {
            _this.$set(c, "value", ["in", "not in", "[]", "[)", "(]", "()"].includes(c.operator) ? [] : "");
          }
        });
      }
    },
    computed: {
      /**
       * The advance condition values, has this format:
       * 
       * [[$id, $value, $type, $operator], ...]
       */
      advanceValue: function advanceValue() {
        var all = this.advanceConfig ? this.advanceConfig.conditions.filter(function (c) {
          return c.value && (Array.isArray(c.value) ? c.value.some(function (v) {
            return v;
          }) : true);
        }).map(function (c) {
          return [c.id, c.value, c.type || "string", c.operator || "="];
        }) : [];
        return all.length ? all : undefined;
      },
      /** Mix advanceValue and fuzzyValue */mixValue: function mixValue() {
        var fuzzyValue = this.value_ ? ["fuzzy", this.value_] : undefined;
        var v;
        if (!this.advanceValue) {
          // no advance value
          v = fuzzyValue ? [fuzzyValue] : undefined;
        } else {
          // has advance value
          v = fuzzyValue ? [fuzzyValue].concat(this.advanceValue) : this.advanceValue;
        }
        return v;
      }
    },
    watch: {
      value_: function value_(newValue) {
        // for <st-search v-model="myVar" ...>
        this.$emit("input", newValue);
        // for <st-search :value.sync="myVar" ...>
        this.$emit("update:value", newValue);
      },
      mixValue: function mixValue(newValue) {
        // console.log("watch: mixValue=" + JSON.stringify(newValue))
        this.$emit("change", this.value_, this.advanceValue, this.mixValue);
        if (this.quick) this.$emit("search", this.value_, this.advanceValue, this.mixValue);
      }
    },
    methods: {
      doSearch: function doSearch() {
        var _this2 = this;
        // console.log("st-search: ")
        // console.log("  value=%s", this.value)
        // console.log("  value_=%s", this.value_)
        // console.log("  advanceValue=%s", JSON.stringify(this.advanceValue))
        // console.log("  mixValue=%s", JSON.stringify(this.mixValue))
        this.$nextTick(function () {
          return _this2.$emit("search", _this2.value_, _this2.advanceValue, _this2.mixValue);
        });
      },
      cleanCondition: function cleanCondition() {
        this.advanceConfig.conditions.forEach(function (c) {
          return c.value = Array.isArray(c.value) ? [] : undefined;
        });
        if (this.cleanToSearch) this.doSearch();
      },
      closeCondition: function closeCondition() {
        this.advanceVisable = false;
        if (this.closeToClean) this.cleanCondition();
      }
    }
  };

  /* script */
  const __vue_script__$g = script$e;

  /* template */
  var __vue_render__$f = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { class: ["st-search", _vm.classes.root], style: _vm.styles.root },
      [
        _c(
          "div",
          {
            class: ["fuzzy-box", _vm.classes.fuzzyBox],
            style: _vm.styles.fuzzyBox
          },
          [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.value_,
                  expression: "value_"
                }
              ],
              class: ["text", _vm.classes.text],
              attrs: { type: "search", placeholder: _vm.placeholder },
              domProps: { value: _vm.value_ },
              on: {
                keyup: function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  $event.stopPropagation();
                  return _vm.doSearch.apply(null, arguments)
                },
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.value_ = $event.target.value;
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
                    return _vm.doSearch.apply(null, arguments)
                  }
                }
              },
              [_vm._v(_vm._s(_vm.searchButtonText))]
            ),
            _vm._v(" "),
            _vm.advanceConfig && _vm.advanceConfig.conditions.length
              ? _c(
                  "st-button",
                  {
                    class: "advance",
                    attrs: {
                      iconClass: _vm.advanceVisable
                        ? _vm.classes.advance.upIcon
                        : _vm.classes.advance.downIcon,
                      classes: _vm.classes.advance,
                      styles: _vm.styles.advance,
                      title: _vm.advanceVisable
                        ? _vm.clickToHideAdvanceButtonText
                        : _vm.clickToShowAdvanceButtonText
                    },
                    nativeOn: {
                      click: function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        _vm.advanceVisable = !_vm.advanceVisable;
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.advanceButtonText))]
                )
              : _vm._e()
          ],
          1
        ),
        _vm._v(" "),
        _vm.advanceVisable
          ? _c(
              "div",
              {
                class: ["advance-box", _vm.classes.advanceBox],
                style: [
                  _vm.styles.advanceBox,
                  {
                    width: _vm.advanceConfig.width,
                    minWidth: _vm.advanceConfig.minWidth,
                    height: _vm.advanceConfig.height,
                    maxHeight: _vm.advanceConfig.maxHeight
                  }
                ]
              },
              [
                _c(
                  "div",
                  { staticClass: "conditions" },
                  _vm._l(_vm.advanceConfig.conditions, function(c) {
                    return _c(
                      "div",
                      { staticClass: "condition" },
                      [
                        _c("div", { staticClass: "label" }, [
                          _vm._v(_vm._s(c.label))
                        ]),
                        _vm._v(" "),
                        !c.operator ||
                        ["=", ">", ">=", "<", "<=", "!=", "<>"].includes(
                          c.operator
                        )
                          ? [
                              "checkbox" == c.ui
                                ? _c("label", [
                                    c.ui === "checkbox"
                                      ? _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: c.value,
                                              expression: "c.value"
                                            }
                                          ],
                                          class: ["value", _vm.classes.value],
                                          attrs: {
                                            name: c.id + "_" + _vm.instanceId,
                                            type: "checkbox"
                                          },
                                          domProps: {
                                            value: c.options.value || c.options,
                                            checked: Array.isArray(c.value)
                                              ? _vm._i(
                                                  c.value,
                                                  c.options.value || c.options
                                                ) > -1
                                              : c.value
                                          },
                                          on: {
                                            change: function($event) {
                                              var $$a = c.value,
                                                $$el = $event.target,
                                                $$c = $$el.checked ? true : false;
                                              if (Array.isArray($$a)) {
                                                var $$v =
                                                    c.options.value || c.options,
                                                  $$i = _vm._i($$a, $$v);
                                                if ($$el.checked) {
                                                  $$i < 0 &&
                                                    _vm.$set(
                                                      c,
                                                      "value",
                                                      $$a.concat([$$v])
                                                    );
                                                } else {
                                                  $$i > -1 &&
                                                    _vm.$set(
                                                      c,
                                                      "value",
                                                      $$a
                                                        .slice(0, $$i)
                                                        .concat(
                                                          $$a.slice($$i + 1)
                                                        )
                                                    );
                                                }
                                              } else {
                                                _vm.$set(c, "value", $$c);
                                              }
                                            }
                                          }
                                        })
                                      : c.ui === "radio"
                                      ? _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: c.value,
                                              expression: "c.value"
                                            }
                                          ],
                                          class: ["value", _vm.classes.value],
                                          attrs: {
                                            name: c.id + "_" + _vm.instanceId,
                                            type: "radio"
                                          },
                                          domProps: {
                                            value: c.options.value || c.options,
                                            checked: _vm._q(
                                              c.value,
                                              c.options.value || c.options
                                            )
                                          },
                                          on: {
                                            change: function($event) {
                                              return _vm.$set(
                                                c,
                                                "value",
                                                c.options.value || c.options
                                              )
                                            }
                                          }
                                        })
                                      : _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: c.value,
                                              expression: "c.value"
                                            }
                                          ],
                                          class: ["value", _vm.classes.value],
                                          attrs: {
                                            name: c.id + "_" + _vm.instanceId,
                                            type: c.ui
                                          },
                                          domProps: {
                                            value: c.options.value || c.options,
                                            value: c.value
                                          },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                c,
                                                "value",
                                                $event.target.value
                                              );
                                            }
                                          }
                                        }),
                                    _vm._v(" "),
                                    _c("span", [
                                      _vm._v(_vm._s(c.options.text || c.options))
                                    ])
                                  ])
                                : "radio" == c.ui
                                ? _vm._l(c.options, function(o) {
                                    return _c("label", [
                                      _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: c.value,
                                            expression: "c.value"
                                          }
                                        ],
                                        class: ["value", _vm.classes.value],
                                        attrs: {
                                          type: "radio",
                                          name: c.id + "_" + _vm.instanceId
                                        },
                                        domProps: {
                                          value: o.value || o,
                                          checked: _vm._q(c.value, o.value || o)
                                        },
                                        on: {
                                          change: function($event) {
                                            return _vm.$set(
                                              c,
                                              "value",
                                              o.value || o
                                            )
                                          }
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c("span", [_vm._v(_vm._s(o.text || o))])
                                    ])
                                  })
                                : c.tag === "select"
                                ? _c(
                                    "select",
                                    {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: c.value,
                                          expression: "c.value"
                                        }
                                      ],
                                      class: ["value", _vm.classes.value],
                                      on: {
                                        change: function($event) {
                                          var $$selectedVal = Array.prototype.filter
                                            .call($event.target.options, function(
                                              o
                                            ) {
                                              return o.selected
                                            })
                                            .map(function(o) {
                                              var val =
                                                "_value" in o ? o._value : o.value;
                                              return val
                                            });
                                          _vm.$set(
                                            c,
                                            "value",
                                            $event.target.multiple
                                              ? $$selectedVal
                                              : $$selectedVal[0]
                                          );
                                        }
                                      }
                                    },
                                    [
                                      _c("option", { attrs: { value: "" } }),
                                      _vm._v(" "),
                                      _vm._l(c.options, function(o) {
                                        return _c(
                                          "option",
                                          { domProps: { value: o.value || o } },
                                          [_vm._v(_vm._s(o.text || o))]
                                        )
                                      })
                                    ],
                                    2
                                  )
                                : (c.ui || "text") === "checkbox"
                                ? _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: c.value,
                                        expression: "c.value"
                                      }
                                    ],
                                    class: ["value", _vm.classes.value],
                                    attrs: {
                                      step: c.step,
                                      min: c.min,
                                      max: c.max,
                                      type: "checkbox"
                                    },
                                    domProps: {
                                      checked: Array.isArray(c.value)
                                        ? _vm._i(c.value, null) > -1
                                        : c.value
                                    },
                                    on: {
                                      change: function($event) {
                                        var $$a = c.value,
                                          $$el = $event.target,
                                          $$c = $$el.checked ? true : false;
                                        if (Array.isArray($$a)) {
                                          var $$v = null,
                                            $$i = _vm._i($$a, $$v);
                                          if ($$el.checked) {
                                            $$i < 0 &&
                                              _vm.$set(
                                                c,
                                                "value",
                                                $$a.concat([$$v])
                                              );
                                          } else {
                                            $$i > -1 &&
                                              _vm.$set(
                                                c,
                                                "value",
                                                $$a
                                                  .slice(0, $$i)
                                                  .concat($$a.slice($$i + 1))
                                              );
                                          }
                                        } else {
                                          _vm.$set(c, "value", $$c);
                                        }
                                      }
                                    }
                                  })
                                : (c.ui || "text") === "radio"
                                ? _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: c.value,
                                        expression: "c.value"
                                      }
                                    ],
                                    class: ["value", _vm.classes.value],
                                    attrs: {
                                      step: c.step,
                                      min: c.min,
                                      max: c.max,
                                      type: "radio"
                                    },
                                    domProps: { checked: _vm._q(c.value, null) },
                                    on: {
                                      change: function($event) {
                                        return _vm.$set(c, "value", null)
                                      }
                                    }
                                  })
                                : _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: c.value,
                                        expression: "c.value"
                                      }
                                    ],
                                    class: ["value", _vm.classes.value],
                                    attrs: {
                                      step: c.step,
                                      min: c.min,
                                      max: c.max,
                                      type: c.ui || "text"
                                    },
                                    domProps: { value: c.value },
                                    on: {
                                      input: function($event) {
                                        if ($event.target.composing) {
                                          return
                                        }
                                        _vm.$set(c, "value", $event.target.value);
                                      }
                                    }
                                  })
                            ]
                          : ["in", "not in"].includes(c.operator)
                          ? [
                              c.tag === "select"
                                ? _c(
                                    "select",
                                    {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: c.value,
                                          expression: "c.value"
                                        }
                                      ],
                                      class: ["value", _vm.classes.value],
                                      style: c.style,
                                      attrs: { multiple: "" },
                                      on: {
                                        change: function($event) {
                                          var $$selectedVal = Array.prototype.filter
                                            .call($event.target.options, function(
                                              o
                                            ) {
                                              return o.selected
                                            })
                                            .map(function(o) {
                                              var val =
                                                "_value" in o ? o._value : o.value;
                                              return val
                                            });
                                          _vm.$set(
                                            c,
                                            "value",
                                            $event.target.multiple
                                              ? $$selectedVal
                                              : $$selectedVal[0]
                                          );
                                        }
                                      }
                                    },
                                    _vm._l(c.options, function(o) {
                                      return _c(
                                        "option",
                                        { domProps: { value: o.value || o } },
                                        [_vm._v(_vm._s(o.text || o))]
                                      )
                                    }),
                                    0
                                  )
                                : "checkbox" == c.ui
                                ? _vm._l(c.options, function(o) {
                                    return _c("label", [
                                      _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: c.value,
                                            expression: "c.value"
                                          }
                                        ],
                                        class: ["value", _vm.classes.value],
                                        attrs: {
                                          type: "checkbox",
                                          name: c.id + "_" + _vm.instanceId
                                        },
                                        domProps: {
                                          value: o.value || o,
                                          checked: Array.isArray(c.value)
                                            ? _vm._i(c.value, o.value || o) > -1
                                            : c.value
                                        },
                                        on: {
                                          change: function($event) {
                                            var $$a = c.value,
                                              $$el = $event.target,
                                              $$c = $$el.checked ? true : false;
                                            if (Array.isArray($$a)) {
                                              var $$v = o.value || o,
                                                $$i = _vm._i($$a, $$v);
                                              if ($$el.checked) {
                                                $$i < 0 &&
                                                  _vm.$set(
                                                    c,
                                                    "value",
                                                    $$a.concat([$$v])
                                                  );
                                              } else {
                                                $$i > -1 &&
                                                  _vm.$set(
                                                    c,
                                                    "value",
                                                    $$a
                                                      .slice(0, $$i)
                                                      .concat($$a.slice($$i + 1))
                                                  );
                                              }
                                            } else {
                                              _vm.$set(c, "value", $$c);
                                            }
                                          }
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c("span", [_vm._v(_vm._s(o.text || o))])
                                    ])
                                  })
                                : _vm._e()
                            ]
                          : ["[]", "[)", "(]", "()"].includes(c.operator)
                          ? [
                              _c("div", { staticClass: "range" }, [
                                _c("div", { staticClass: "left" }, [
                                  c.tag === "select"
                                    ? _c(
                                        "select",
                                        {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: c.value[0],
                                              expression: "c.value[0]"
                                            }
                                          ],
                                          class: ["value", _vm.classes.value],
                                          on: {
                                            change: function($event) {
                                              var $$selectedVal = Array.prototype.filter
                                                .call(
                                                  $event.target.options,
                                                  function(o) {
                                                    return o.selected
                                                  }
                                                )
                                                .map(function(o) {
                                                  var val =
                                                    "_value" in o
                                                      ? o._value
                                                      : o.value;
                                                  return val
                                                });
                                              _vm.$set(
                                                c.value,
                                                0,
                                                $event.target.multiple
                                                  ? $$selectedVal
                                                  : $$selectedVal[0]
                                              );
                                            }
                                          }
                                        },
                                        _vm._l(c.options, function(o) {
                                          return _c(
                                            "option",
                                            { domProps: { value: o.value || o } },
                                            [_vm._v(_vm._s(o.text || o))]
                                          )
                                        }),
                                        0
                                      )
                                    : (c.ui || "text") === "checkbox"
                                    ? _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: c.value[0],
                                            expression: "c.value[0]"
                                          }
                                        ],
                                        class: ["value", _vm.classes.value],
                                        attrs: {
                                          step: c.step,
                                          min: c.min,
                                          max: c.max,
                                          type: "checkbox"
                                        },
                                        domProps: {
                                          checked: Array.isArray(c.value[0])
                                            ? _vm._i(c.value[0], null) > -1
                                            : c.value[0]
                                        },
                                        on: {
                                          change: function($event) {
                                            var $$a = c.value[0],
                                              $$el = $event.target,
                                              $$c = $$el.checked ? true : false;
                                            if (Array.isArray($$a)) {
                                              var $$v = null,
                                                $$i = _vm._i($$a, $$v);
                                              if ($$el.checked) {
                                                $$i < 0 &&
                                                  _vm.$set(
                                                    c.value,
                                                    0,
                                                    $$a.concat([$$v])
                                                  );
                                              } else {
                                                $$i > -1 &&
                                                  _vm.$set(
                                                    c.value,
                                                    0,
                                                    $$a
                                                      .slice(0, $$i)
                                                      .concat($$a.slice($$i + 1))
                                                  );
                                              }
                                            } else {
                                              _vm.$set(c.value, 0, $$c);
                                            }
                                          }
                                        }
                                      })
                                    : (c.ui || "text") === "radio"
                                    ? _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: c.value[0],
                                            expression: "c.value[0]"
                                          }
                                        ],
                                        class: ["value", _vm.classes.value],
                                        attrs: {
                                          step: c.step,
                                          min: c.min,
                                          max: c.max,
                                          type: "radio"
                                        },
                                        domProps: {
                                          checked: _vm._q(c.value[0], null)
                                        },
                                        on: {
                                          change: function($event) {
                                            return _vm.$set(c.value, 0, null)
                                          }
                                        }
                                      })
                                    : _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: c.value[0],
                                            expression: "c.value[0]"
                                          }
                                        ],
                                        class: ["value", _vm.classes.value],
                                        attrs: {
                                          step: c.step,
                                          min: c.min,
                                          max: c.max,
                                          type: c.ui || "text"
                                        },
                                        domProps: { value: c.value[0] },
                                        on: {
                                          input: function($event) {
                                            if ($event.target.composing) {
                                              return
                                            }
                                            _vm.$set(
                                              c.value,
                                              0,
                                              $event.target.value
                                            );
                                          }
                                        }
                                      })
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "center" }, [
                                  _vm._v("～")
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "right" }, [
                                  c.tag === "select"
                                    ? _c(
                                        "select",
                                        {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: c.value[1],
                                              expression: "c.value[1]"
                                            }
                                          ],
                                          class: ["value", _vm.classes.value],
                                          on: {
                                            change: function($event) {
                                              var $$selectedVal = Array.prototype.filter
                                                .call(
                                                  $event.target.options,
                                                  function(o) {
                                                    return o.selected
                                                  }
                                                )
                                                .map(function(o) {
                                                  var val =
                                                    "_value" in o
                                                      ? o._value
                                                      : o.value;
                                                  return val
                                                });
                                              _vm.$set(
                                                c.value,
                                                1,
                                                $event.target.multiple
                                                  ? $$selectedVal
                                                  : $$selectedVal[0]
                                              );
                                            }
                                          }
                                        },
                                        _vm._l(c.options, function(o) {
                                          return _c(
                                            "option",
                                            { domProps: { value: o.value || o } },
                                            [_vm._v(_vm._s(o.text || o))]
                                          )
                                        }),
                                        0
                                      )
                                    : (c.ui || "text") === "checkbox"
                                    ? _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: c.value[1],
                                            expression: "c.value[1]"
                                          }
                                        ],
                                        class: ["value", _vm.classes.value],
                                        attrs: {
                                          step: c.step,
                                          min: c.min,
                                          max: c.max,
                                          type: "checkbox"
                                        },
                                        domProps: {
                                          checked: Array.isArray(c.value[1])
                                            ? _vm._i(c.value[1], null) > -1
                                            : c.value[1]
                                        },
                                        on: {
                                          change: function($event) {
                                            var $$a = c.value[1],
                                              $$el = $event.target,
                                              $$c = $$el.checked ? true : false;
                                            if (Array.isArray($$a)) {
                                              var $$v = null,
                                                $$i = _vm._i($$a, $$v);
                                              if ($$el.checked) {
                                                $$i < 0 &&
                                                  _vm.$set(
                                                    c.value,
                                                    1,
                                                    $$a.concat([$$v])
                                                  );
                                              } else {
                                                $$i > -1 &&
                                                  _vm.$set(
                                                    c.value,
                                                    1,
                                                    $$a
                                                      .slice(0, $$i)
                                                      .concat($$a.slice($$i + 1))
                                                  );
                                              }
                                            } else {
                                              _vm.$set(c.value, 1, $$c);
                                            }
                                          }
                                        }
                                      })
                                    : (c.ui || "text") === "radio"
                                    ? _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: c.value[1],
                                            expression: "c.value[1]"
                                          }
                                        ],
                                        class: ["value", _vm.classes.value],
                                        attrs: {
                                          step: c.step,
                                          min: c.min,
                                          max: c.max,
                                          type: "radio"
                                        },
                                        domProps: {
                                          checked: _vm._q(c.value[1], null)
                                        },
                                        on: {
                                          change: function($event) {
                                            return _vm.$set(c.value, 1, null)
                                          }
                                        }
                                      })
                                    : _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: c.value[1],
                                            expression: "c.value[1]"
                                          }
                                        ],
                                        class: ["value", _vm.classes.value],
                                        attrs: {
                                          step: c.step,
                                          min: c.min,
                                          max: c.max,
                                          type: c.ui || "text"
                                        },
                                        domProps: { value: c.value[1] },
                                        on: {
                                          input: function($event) {
                                            if ($event.target.composing) {
                                              return
                                            }
                                            _vm.$set(
                                              c.value,
                                              1,
                                              $event.target.value
                                            );
                                          }
                                        }
                                      })
                                ])
                              ])
                            ]
                          : _vm._e()
                      ],
                      2
                    )
                  }),
                  0
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { class: ["operations", _vm.classes.operations.class] },
                  [
                    _c(
                      "st-button",
                      {
                        attrs: { iconClass: _vm.classes.operations.runIcon },
                        nativeOn: {
                          click: function($event) {
                            $event.preventDefault();
                            $event.stopPropagation();
                            return _vm.doSearch.apply(null, arguments)
                          }
                        }
                      },
                      [_vm._v(_vm._s(_vm.runButtonText))]
                    ),
                    _vm._v(" "),
                    _c(
                      "st-button",
                      {
                        attrs: { iconClass: _vm.classes.operations.cleanIcon },
                        nativeOn: {
                          click: function($event) {
                            $event.preventDefault();
                            $event.stopPropagation();
                            return _vm.cleanCondition.apply(null, arguments)
                          }
                        }
                      },
                      [_vm._v(_vm._s(_vm.cleanButtonText))]
                    ),
                    _vm._v(" "),
                    _c(
                      "st-button",
                      {
                        attrs: { iconClass: _vm.classes.operations.closeIcon },
                        nativeOn: {
                          click: function($event) {
                            $event.preventDefault();
                            $event.stopPropagation();
                            return _vm.closeCondition.apply(null, arguments)
                          }
                        }
                      },
                      [_vm._v(_vm._s(_vm.closeButtonText))]
                    )
                  ],
                  1
                )
              ]
            )
          : _vm._e()
      ]
    )
  };
  var __vue_staticRenderFns__$f = [];
  __vue_render__$f._withStripped = true;

    /* style */
    const __vue_inject_styles__$g = function (inject) {
      if (!inject) return
      inject("data-v-2e1aafcc_0", { source: "\n.st-search {\n  position: relative;\n}\n.st-search>.fuzzy-box {\n  position: relative;\n  display: inline-flex;\n}\n.st-search>.advance-box {\n  position: absolute;\n  z-index: 100000;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  right: 0;\n  padding: 0;\n  margin: 0;\n}\n.st-search>.advance-box>.conditions {\n  flex-grow: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 0.4em;\n}\n.st-search>.advance-box>.operations {\n  border-width: 1px 0 0 0;\n  padding: 0.4em;\n}\n.st-search>.advance-box>.conditions>.condition>.range {\n  display: flex;\n  flex-direction: row;\n}\n.st-search>.advance-box>.conditions>.condition>.range>:nth-child(odd) {\n  flex-grow: 1;\n}\n.st-search>.advance-box>.conditions>.condition>input.value,\n.st-search>.advance-box>.conditions>.condition>select.value,\n.st-search>.advance-box>.conditions>.condition>.range>.left>input,\n.st-search>.advance-box>.conditions>.condition>.range>.right>input {\n  box-sizing: border-box;\n  padding: 0.45em 0.45em 0.35em 0.45em;\n  width: 100%;\n}\n.st-search>.advance-box>.conditions>.condition>label {\n  width: fit-content;\n}\n", map: {"version":3,"sources":["/Volumes/macdata/work/simter/simter-vue-components/src/search.vue"],"names":[],"mappings":";AAuSA;EACA,kBAAA;AACA;AACA;EACA,kBAAA;EACA,oBAAA;AACA;AACA;EACA,kBAAA;EACA,eAAA;EACA,aAAA;EACA,sBAAA;EACA,gBAAA;EACA,QAAA;EACA,UAAA;EACA,SAAA;AACA;AACA;EACA,YAAA;EACA,kBAAA;EACA,gBAAA;EACA,cAAA;AACA;AACA;EACA,uBAAA;EACA,cAAA;AACA;AAEA;EACA,aAAA;EACA,mBAAA;AACA;AACA;EACA,YAAA;AACA;AAEA;;;;EAIA,sBAAA;EACA,oCAAA;EACA,WAAA;AACA;AACA;EACA,kBAAA;AACA","file":"search.vue","sourcesContent":["<template>\n  <div :class=\"['st-search', classes.root]\" :style=\"styles.root\">\n    <div :class=\"['fuzzy-box', classes.fuzzyBox]\" :style=\"styles.fuzzyBox\">\n      <input\n        type=\"search\"\n        :class=\"['text', classes.text]\"\n        :placeholder=\"placeholder\"\n        v-model=\"value_\"\n        @keyup.enter.stop=\"doSearch\"\n      />\n      <st-button\n        :class=\"'search'\"\n        :classes=\"classes.search\"\n        :styles=\"styles.search\"\n        @click.native.prevent.stop=\"doSearch\"\n      >{{searchButtonText}}</st-button>\n      <st-button v-if=\"advanceConfig && advanceConfig.conditions.length\"\n        :class=\"'advance'\"\n        :iconClass=\"advanceVisable ? classes.advance.upIcon : classes.advance.downIcon\"\n        :classes=\"classes.advance\"\n        :styles=\"styles.advance\"\n        :title=\"advanceVisable ? clickToHideAdvanceButtonText : clickToShowAdvanceButtonText\"\n        @click.native.prevent.stop=\"advanceVisable = !advanceVisable\"\n      >{{advanceButtonText}}</st-button>\n    </div>\n    <div v-if=\"advanceVisable\" \n      :class=\"['advance-box', classes.advanceBox]\" \n      :style=\"[styles.advanceBox, {\n        width: advanceConfig.width,\n        minWidth: advanceConfig.minWidth,\n        height: advanceConfig.height,\n        maxHeight: advanceConfig.maxHeight,\n      }]\">\n      <div class=\"conditions\">\n        <div v-for=\"c of advanceConfig.conditions\" class=\"condition\">\n          <div class=\"label\">{{c.label}}</div>\n          <!-- single value：string, number, date, time, ... -->\n          <template v-if=\"!c.operator || ['=', '>', '>=', '<', '<=', '!=', '<>'].includes(c.operator)\">\n            <label v-if=\"'checkbox' == c.ui\">\n              <input :type=\"c.ui\" :name=\"c.id + '_' + instanceId\" v-model=\"c.value\" :class=\"['value', classes.value]\"\n                :value=\"c.options.value || c.options\"/>\n              <span>{{c.options.text || c.options}}</span>\n            </label>\n            <label v-else-if=\"'radio' == c.ui\" v-for=\"o of c.options\">\n              <input type=\"radio\" :name=\"c.id + '_' + instanceId\" v-model=\"c.value\" :class=\"['value', classes.value]\"\n                :value=\"o.value || o\"/>\n              <span>{{o.text || o}}</span>\n            </label>\n            <select v-else-if=\"c.tag === 'select'\" v-model=\"c.value\" :class=\"['value', classes.value]\">\n              <option value=\"\"></option>\n              <option v-for=\"o of c.options\" :value=\"o.value || o\">{{o.text || o}}</option>\n            </select>\n            <input v-else \n              :type=\"c.ui || 'text'\" v-model=\"c.value\" :class=\"['value', classes.value]\"\n              :step=\"c.step\" :min=\"c.min\" :max=\"c.max\"/>\n          </template>\n          <!-- multiple value for checkout and select -->\n          <template v-else-if=\"['in', 'not in'].includes(c.operator)\">\n            <select v-if=\"c.tag === 'select'\" multiple v-model=\"c.value\" :class=\"['value', classes.value]\" :style=\"c.style\">\n              <option v-for=\"o of c.options\" :value=\"o.value || o\">{{o.text || o}}</option>\n            </select>\n            <label v-else-if=\"'checkbox' == c.ui\" v-for=\"o of c.options\">\n              <input type=\"checkbox\" :name=\"c.id + '_' + instanceId\" v-model=\"c.value\" :class=\"['value', classes.value]\"\n                :value=\"o.value || o\"/>\n              <span>{{o.text || o}}</span>\n            </label>\n          </template>\n          <!-- range value for [], [), (], () -->\n          <template v-else-if=\"['[]', '[)', '(]', '()'].includes(c.operator)\">\n            <div class=\"range\">\n              <div class=\"left\">\n                <select v-if=\"c.tag === 'select'\" v-model=\"c.value[0]\" :class=\"['value', classes.value]\">\n                  <option v-for=\"o of c.options\" :value=\"o.value || o\">{{o.text || o}}</option>\n                </select>\n                <input v-else \n                  :type=\"c.ui || 'text'\" v-model=\"c.value[0]\" :class=\"['value', classes.value]\"\n                  :step=\"c.step\" :min=\"c.min\" :max=\"c.max\"/>\n              </div>\n              <div class=\"center\">～</div>\n              <div class=\"right\">\n                <select v-if=\"c.tag === 'select'\" v-model=\"c.value[1]\" :class=\"['value', classes.value]\">\n                  <option v-for=\"o of c.options\" :value=\"o.value || o\">{{o.text || o}}</option>\n                </select>\n                <input v-else \n                  :type=\"c.ui || 'text'\" v-model=\"c.value[1]\" :class=\"['value', classes.value]\"\n                  :step=\"c.step\" :min=\"c.min\" :max=\"c.max\"/>\n              </div>\n            </div>\n          </template>\n        </div>\n      </div>\n      <div :class=\"['operations', classes.operations.class]\">\n        <st-button\n          :iconClass=\"classes.operations.runIcon\"\n          @click.native.prevent.stop=\"doSearch\"\n        >{{runButtonText}}</st-button>\n        <st-button\n          :iconClass=\"classes.operations.cleanIcon\"\n          @click.native.prevent.stop=\"cleanCondition\"\n        >{{cleanButtonText}}</st-button>\n        <st-button\n          :iconClass=\"classes.operations.closeIcon\"\n          @click.native.prevent.stop=\"closeCondition\"\n        >{{closeButtonText}}</st-button>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\n/**\n * Events: search(value)\n */\nimport { gv } from \"./utils\";\nimport stButton from \"./button.vue\";\n\nexport default {\n  components: { stButton },\n  props: {\n    /** Whether immediately trigger 'search' event when condition value changed */\n    quick: { type: Boolean, required: false, default: false },\n    /** Whether trigger 'search' event when click clean button */\n    cleanToSearch: { type: Boolean, required: false, default: true },\n    /** Whether clean condition when click close button */\n    closeToClean: { type: Boolean, required: false, default: false },\n    placeholder: {\n      type: String,\n      required: false,\n      default: () => gv(\"simter.search.placeholder\", \"Please input key word\")\n    },\n    value: {\n      type: String,\n      required: false\n    },\n    searchButtonText: {\n      type: String,\n      required: false,\n      default: () => gv(\"simter.search.searchButtonText\", \"Go\")\n    },\n    advanceButtonText: {\n      type: String,\n      required: false,\n      default: () => gv(\"simter.search.advanceButtonText\", \"More\")\n    },\n    runButtonText: {\n      type: String,\n      required: false,\n      default: () => gv(\"simter.search.operations.runButtonText\", \"Search\")\n    },\n    cleanButtonText: {\n      type: String,\n      required: false,\n      default: () => gv(\"simter.search.operations.cleanButtonText\", \"Clean\")\n    },\n    closeButtonText: {\n      type: String,\n      required: false,\n      default: () => gv(\"simter.search.operations.closeButtonText\", \"Close\")\n    },\n    clickToShowAdvanceButtonText: {\n      type: String,\n      required: false,\n      default: () => gv(\"simter.search.clickToShowAdvanceButtonText\", \"Click to show advance box\")\n    },\n    clickToHideAdvanceButtonText: {\n      type: String,\n      required: false,\n      default: () => gv(\"simter.search.clickToHideAdvanceButtonText\", \"Click to hide advance box\")\n    },\n    // all dom elements class\n    classes: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.search.classes\", { advance: {}})\n    },\n    // all dom elements class\n    styles: {\n      type: Object,\n      required: false,\n      default() {\n        return {};\n      }\n    },\n    /** Advance condition config json.\n     * \n     * value format:\n     * ```json\n     * {\n     *   conditions: [\n     *     {\n     *       id: string, \n     *       label: string,\n     *       [hidden]: boolean, // whether ignore this condition, default false\n     *       [value]: string,   // default value, for multiple values need init to []\n     *       [type]: string,    // backend value type, string|boolean|number|date|month|time|datetime|money|..., default string\n     *       [operator]: string, // compare type, \"[]\" | \"[)\" | \"=\" |..., default \"=\"\n     *       [options]: string[] | [{text: string, value: string}], // extra config for multiple values\n     *       [ui]: string,  // when tag=input set its type attribute value, text|number|datetime-local|date|time|month|radio|checkout, default text\n     *       [tag]: string, // html control type, \"input\" | \"select\", default \"input\"\n     *     },\n     *     ...\n     *   ],\n     *   height: string,    // the box height, \"auto\" | \"15em\" | ..., default \"auto\" fo scroll\n     *   maxHeight: string, // the box height, \"15em\" | ...\n     *   width: string,\n     *   minWidth: string,\n     * }\n     * ```\n     */\n    advanceConfig: {\n      type: Object,\n      required: false\n    }\n  },\n  data() {\n    return {\n      // for radio, checkout control's unique name\n      instanceId: Date.now(),\n      advanceVisable: false,\n      value_: undefined\n    };\n  },\n  created() {\n    // copy value prop's value\n    this.value_ = this.value\n\n    // init default advanceConfig value to avoid failed reactive\n    // console.log(this.advanceConfig?.conditions)\n    if (this.advanceConfig && this.advanceConfig.conditions) {\n      this.advanceConfig.conditions.forEach((c) => {\n        if (!c.hasOwnProperty(\"value\")) {\n          this.$set(c, \"value\", [\"in\", \"not in\", \"[]\", \"[)\", \"(]\", \"()\"].includes(c.operator) ? [] : \"\")\n        }\n      })\n    }\n  },\n  computed: {\n    /**\n     * The advance condition values, has this format:\n     * \n     * [[$id, $value, $type, $operator], ...]\n     */\n    advanceValue() {\n      const all = this.advanceConfig ? this.advanceConfig.conditions\n        .filter((c) => c.value && (Array.isArray(c.value) ? c.value.some((v) => v) : true))\n        .map((c) => [c.id, c.value, c.type || \"string\", c.operator || \"=\"]) : [];\n      return all.length ? all : undefined;\n    },\n    /** Mix advanceValue and fuzzyValue */\n    mixValue() {\n      const fuzzyValue = this.value_ ? [\"fuzzy\", this.value_] : undefined;\n      let v;\n      if (!this.advanceValue) {\t// no advance value\n        v = fuzzyValue ? [fuzzyValue] : undefined;\n      } else {                  // has advance value\n        v = fuzzyValue ? [fuzzyValue].concat(this.advanceValue) : this.advanceValue;\n      }\n      return v;\n    }\n  },\n  watch: {\n    value_(newValue) {\n      // for <st-search v-model=\"myVar\" ...>\n      this.$emit(\"input\", newValue);\n      // for <st-search :value.sync=\"myVar\" ...>\n      this.$emit(\"update:value\", newValue);\n    },\n    mixValue(newValue) {\n      // console.log(\"watch: mixValue=\" + JSON.stringify(newValue))\n      this.$emit(\"change\", this.value_, this.advanceValue, this.mixValue);\n      if (this.quick) this.$emit(\"search\", this.value_, this.advanceValue, this.mixValue);\n    }\n  },\n  methods: {\n    doSearch() {\n      // console.log(\"st-search: \")\n      // console.log(\"  value=%s\", this.value)\n      // console.log(\"  value_=%s\", this.value_)\n      // console.log(\"  advanceValue=%s\", JSON.stringify(this.advanceValue))\n      // console.log(\"  mixValue=%s\", JSON.stringify(this.mixValue))\n      this.$nextTick(() => this.$emit(\"search\", this.value_, this.advanceValue, this.mixValue));\n    },\n    cleanCondition() {\n      this.advanceConfig.conditions.forEach((c) => c.value = Array.isArray(c.value) ? [] : undefined);\n      if (this.cleanToSearch) this.doSearch();\n    },\n    closeCondition() {\n      this.advanceVisable = false;\n      if (this.closeToClean) this.cleanCondition();\n    }\n  }\n};\n</script>\n\n<style>\n.st-search {\n  position: relative;\n}\n.st-search>.fuzzy-box {\n  position: relative;\n  display: inline-flex;\n}\n.st-search>.advance-box {\n  position: absolute;\n  z-index: 100000;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  right: 0;\n  padding: 0;\n  margin: 0;\n}\n.st-search>.advance-box>.conditions {\n  flex-grow: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 0.4em;\n}\n.st-search>.advance-box>.operations {\n  border-width: 1px 0 0 0;\n  padding: 0.4em;\n}\n\n.st-search>.advance-box>.conditions>.condition>.range {\n  display: flex;\n  flex-direction: row;\n}\n.st-search>.advance-box>.conditions>.condition>.range>:nth-child(odd) {\n  flex-grow: 1;\n}\n\n.st-search>.advance-box>.conditions>.condition>input.value,\n.st-search>.advance-box>.conditions>.condition>select.value,\n.st-search>.advance-box>.conditions>.condition>.range>.left>input,\n.st-search>.advance-box>.conditions>.condition>.range>.right>input {\n  box-sizing: border-box;\n  padding: 0.45em 0.45em 0.35em 0.45em;\n  width: 100%;\n}\n.st-search>.advance-box>.conditions>.condition>label {\n  width: fit-content;\n}\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$g = undefined;
    /* module identifier */
    const __vue_module_identifier__$g = undefined;
    /* functional template */
    const __vue_is_functional_template__$g = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$g = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
      __vue_inject_styles__$g,
      __vue_script__$g,
      __vue_scope_id__$g,
      __vue_is_functional_template__$g,
      __vue_module_identifier__$g,
      false,
      browser,
      undefined,
      undefined
    );

  //
  var script$f = {
    replace: true,
    props: {
      // upload percent: 0~100
      percent: {
        type: Number,
        required: false,
        "default": 0
      },
      showText: {
        type: Boolean,
        required: false,
        "default": true
      },
      // elements classes: { root, percent, text }
      classes: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.progressbar.classes", {});
        }
      },
      // elements style: { root, percent, text }
      styles: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.progressbar.styles", {});
        }
      }
    },
    computed: {
      percentStyle: function percentStyle() {
        return concatStyles({
          'width': "".concat(this.percent, "%")
        }, this.styles.percent);
      }
    },
    methods: {
      reset: function reset() {
        this.percent = 0;
      }
    }
  };

  /* script */
  const __vue_script__$h = script$f;

  /* template */
  var __vue_render__$g = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { class: ["st-progressbar", _vm.classes.root], style: _vm.styles.root },
      [
        _c("div", {
          class: ["percent", _vm.classes.percent],
          style: _vm.percentStyle
        }),
        _vm._v(" "),
        _vm.showText
          ? _c(
              "div",
              { class: ["text", _vm.classes.text], style: _vm.styles.text },
              [_vm._v(_vm._s(_vm.percent + "%"))]
            )
          : _vm._e()
      ]
    )
  };
  var __vue_staticRenderFns__$g = [];
  __vue_render__$g._withStripped = true;

    /* style */
    const __vue_inject_styles__$h = function (inject) {
      if (!inject) return
      inject("data-v-98971fce_0", { source: "\n.st-progressbar {\n  position: relative;\n  height: 1.2em;\n  text-align: center;\n}\n.st-progressbar > .percent,\n.st-progressbar > .text {\n  position: absolute;\n  left: 0;\n  top: 0;\n  height: 100%;\n}\n.st-progressbar > .text {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  font-size: 80%;\n}\n", map: {"version":3,"sources":["/Volumes/macdata/work/simter/simter-vue-components/src/progressbar.vue"],"names":[],"mappings":";AA4CA;EACA,kBAAA;EACA,aAAA;EACA,kBAAA;AACA;AAEA;;EAEA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,YAAA;AACA;AACA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,WAAA;EACA,cAAA;AACA","file":"progressbar.vue","sourcesContent":["<template>\n  <div :class=\"['st-progressbar', classes.root]\" :style=\"styles.root\">\n    <div :class=\"['percent', classes.percent]\" :style=\"percentStyle\"></div>\n    <div v-if=\"showText\" :class=\"['text', classes.text]\" :style=\"styles.text\">{{percent + '%'}}</div>\n  </div>\n</template>\n\n<script>\nimport { gv, concatStyles } from \"./utils\";\nexport default {\n  replace: true,\n  props: {\n    // upload percent: 0~100\n    percent: { type: Number, required: false, default: 0 },\n    showText: { type: Boolean, required: false, default: true },\n    // elements classes: { root, percent, text }\n    classes: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.progressbar.classes\", {})\n    },\n    // elements style: { root, percent, text }\n    styles: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.progressbar.styles\", {})\n    }\n  },\n  computed: {\n    percentStyle: function () {\n      return concatStyles({\n        'width': `${this.percent}%`\n      }, this.styles.percent);\n    }\n  },\n  methods: {\n    reset: function () {\n      this.percent = 0;\n    }\n  }\n};\n</script>\n\n<style>\n.st-progressbar {\n  position: relative;\n  height: 1.2em;\n  text-align: center;\n}\n\n.st-progressbar > .percent,\n.st-progressbar > .text {\n  position: absolute;\n  left: 0;\n  top: 0;\n  height: 100%;\n}\n.st-progressbar > .text {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  font-size: 80%;\n}\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$h = undefined;
    /* module identifier */
    const __vue_module_identifier__$h = undefined;
    /* functional template */
    const __vue_is_functional_template__$h = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$h = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
      __vue_inject_styles__$h,
      __vue_script__$h,
      __vue_scope_id__$h,
      __vue_is_functional_template__$h,
      __vue_module_identifier__$h,
      false,
      browser,
      undefined,
      undefined
    );

  //
  function entryToFiles(entry) {
    var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return new Promise(function (resolve, recject) {
      if (entry.isFile) {
        entry.file(function (file) {
          file.dir = dir; // mark full dir
          resolve(file);
        });
      } else if (entry.isDirectory) {
        var dirReader = entry.createReader();
        dirReader.readEntries(function (entries) {
          var promises = [];
          for (var i = 0; i < entries.length; i++) {
            promises.push(entryToFiles(entries[i], dir ? dir + "/" + entry.name : entry.name));
          }
          resolve(Promise.all(promises));
        });
      }
    });
  }
  function dataTransferItemsToFiles(items) {
    return new Promise(function (resolve, reject) {
      var promises = [];
      for (var i = 0; i < items.length; i++) promises.push(entryToFiles(items[i].webkitGetAsEntry()));
      Promise.all(promises).then(function (files) {
        return resolve(files);
      });
    });
  }

  // [a, [b, c]] flatten to [a, b, c]
  function flattenArray(array) {
    return array.reduce(function (a, b) {
      return a.concat(Array.isArray(b) ? flattenArray(b) : b);
    }, []);
  }
  var script$g = {
    components: {
      stProgressbar: __vue_component__$h
    },
    props: {
      /**
       * the server upload to.
       * 1. String - fixed server url
       * 2. Function - generate the server url with option '{index, name, size, type}'
       */
      url: {
        type: [String, Function],
        required: true
      },
      // Whether allow edit file name
      editable: {
        type: Boolean,
        required: false,
        "default": true
      },
      // Whether allow select multiple files
      multiple: {
        type: Boolean,
        required: false,
        "default": true
      },
      // Whether allow auto start upload after selected files
      auto: {
        type: Boolean,
        required: false,
        "default": true
      },
      // the limitation of file types, default no limitation
      accept: {
        type: String,
        required: false,
        "default": '*.*'
      },
      // element class: { root, header, files, file, name, size, other, operation, progress }
      classes: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.upload.classes", {});
        }
      },
      // element style: { dropArea }
      styles: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.upload.styles", {});
        }
      },
      text: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.upload.text", {
            selectFileFirst: "Please select file first.",
            selectFile: "Select file",
            "delete": "Delete",
            dropInfo: "Please click \"Select...\" to choose the files, or just drop the files to here."
          });
        }
      },
      summary: {
        type: Function,
        required: false,
        "default": getGlobalVariable("simter.upload.summary", function (count, _size, prettySize) {
          return "".concat(count, " files ").concat(prettySize);
        })
      },
      // the extras options for XMLHttpRequest
      requestOptions: {
        type: Object,
        required: false
      }
    },
    data: function data() {
      return {
        // the selected files
        files: []
      };
    },
    computed: {
      count: function count() {
        return this.files.length;
      },
      toUploadFiles: function toUploadFiles() {
        return this.files.filter(function (f) {
          return f.percent === 0;
        });
      },
      toUploadCount: function toUploadCount() {
        return this.toUploadFiles.length;
      },
      size: function size() {
        return this.files.reduce(function (previousValue, currentValue) {
          return previousValue + currentValue.size;
        }, 0);
      },
      prettySize: function prettySize() {
        return getPrettySize(this.size);
      }
    },
    methods: {
      selectFile: function selectFile() {
        this.$el.querySelector('input[type="file"]').click();
      },
      afterSelectedFile: function afterSelectedFile(files) {
        var _this = this;
        // cache files
        Array.from(files).forEach(function (file) {
          if (_this.files.every(function (f) {
            return f.name !== file.name;
          })) _this.files.push({
            name: file.name,
            dir: file.dir || '',
            // original file
            file: file,
            size: file.size,
            // pretty file size, such as '1KB'
            prettySize: getPrettySize(file.size),
            // get file extension, such as 'png'
            type: getFileExtension(file.name),
            // upload percent: 0~100
            percent: 0
          });
        });

        // auto upload
        if (this.auto) this.startUpload();
      },
      removeFile: function removeFile(index) {
        this.files.splice(index, 1);
      },
      // manual start the upload
      startUpload: function startUpload() {
        var _this2 = this;
        if (this.toUploadCount === 0) {
          if (this.count === 0) {
            return alert(this.text.selectFileFirst);
          } else return; // no file to upload
        }

        // emits upload start event
        this.$emit("start", this.toUploadFiles.map(function (f) {
          return {
            dir: f.dir,
            name: f.name,
            size: f.size,
            percent: f.percent
          };
        }));

        // upload file one by one
        var p = Promise.resolve();
        var results = [];
        var _loop = function _loop(i) {
          var f = _this2.toUploadFiles[i];

          // get server url
          var serverUrl;
          if (typeof _this2.url === 'function') {
            serverUrl = _this2.url.call(_this2, {
              index: i,
              dir: f.dir,
              name: f.name,
              size: f.size,
              type: getFileExtension(f.name)
            });
          } else serverUrl = _this2.url;
          p = p.then(function () {
            return uploadOneFile.call(null, Object.assign({
              index: i,
              dir: f.dir,
              file: f.file,
              url: serverUrl,
              progress: function progress(data) {
                f.percent = data.percent;
                // emits upload progress event
                _this2.$emit("progress", data);
              },
              start: function start(xhr) {
                console.log("start");
              }
            }, _this2.requestOptions)).then(function (result) {
              results.push(result);
            });
          });
        };
        for (var i = 0; i < this.toUploadFiles.length; i++) {
          _loop(i);
        }
        p.then(function (result) {
          // emits upload success event
          _this2.$emit("success", results);
        })["catch"](function (e) {
          return _this2.$emit("error", e);
        }); // emits upload failed event
      },
      dropFiles: function dropFiles(e) {
        var _this3 = this;
        if (e.dataTransfer.items === null || e.dataTransfer.items.length === 0) {
          console.log("upload: No dropped items");
          return;
        }
        dataTransferItemsToFiles(e.dataTransfer.items).then(function (files) {
          _this3.afterSelectedFile(flattenArray(files));
        });
      }
    }
  };

  /* script */
  const __vue_script__$i = script$g;

  /* template */
  var __vue_render__$h = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { class: ["st-upload", _vm.classes.root] }, [
      _c("div", { class: ["header", _vm.classes.header] }, [
        _c("span", { staticClass: "summary" }, [
          _vm._v(_vm._s(_vm.summary(_vm.count, _vm.size, _vm.prettySize)))
        ]),
        _vm._v(" "),
        _c(
          "a",
          {
            class: ["operation", _vm.classes.operation],
            attrs: { href: "#" },
            on: {
              click: function($event) {
                $event.stopPropagation();
                return _vm.selectFile.apply(null, arguments)
              }
            }
          },
          [_vm._v(_vm._s(_vm.text.selectFile))]
        )
      ]),
      _vm._v(" "),
      _vm.count > 0
        ? _c(
            "ul",
            { class: ["files", _vm.classes.files] },
            _vm._l(_vm.files, function(file, index) {
              return _c("li", { class: ["file", _vm.classes.file] }, [
                _c("span", { class: "file-icon " + file.type }),
                _vm._v(" "),
                _c("div", [
                  _vm.editable
                    ? _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: file.name,
                            expression: "file.name"
                          }
                        ],
                        class: ["name", _vm.classes.name],
                        attrs: { type: "text" },
                        domProps: { value: file.name },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(file, "name", $event.target.value);
                          }
                        }
                      })
                    : _c("div", { class: ["name", _vm.classes.name] }, [
                        _vm._v(_vm._s(file.name))
                      ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { class: ["other", _vm.classes.other] },
                    [
                      _c("div", { class: ["size", _vm.classes.size] }, [
                        _vm._v(_vm._s(file.prettySize))
                      ]),
                      _vm._v(" "),
                      _c("st-progressbar", { attrs: { percent: file.percent } }),
                      _vm._v(" "),
                      file.percent === 0
                        ? _c(
                            "a",
                            {
                              class: ["operation", _vm.classes.operation],
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  $event.stopPropagation();
                                  return _vm.removeFile(file)
                                }
                              }
                            },
                            [_vm._v(_vm._s(_vm.text.delete))]
                          )
                        : _vm._e()
                    ],
                    1
                  )
                ])
              ])
            }),
            0
          )
        : _c(
            "div",
            {
              class: ["drop-area", _vm.classes.dropArea],
              style: _vm.styles.dropArea,
              on: {
                drop: function($event) {
                  $event.preventDefault();
                  return _vm.dropFiles($event)
                },
                dragover: function($event) {
                  $event.preventDefault();
                }
              }
            },
            [_vm._v(_vm._s(_vm.text.dropInfo))]
          ),
      _vm._v(" "),
      _vm.multiple
        ? _c("input", {
            staticStyle: { display: "none" },
            attrs: {
              type: "file",
              name: "file",
              multiple: "",
              accept: _vm.accept
            },
            on: {
              change: function($event) {
                return _vm.afterSelectedFile($event.target.files)
              }
            }
          })
        : _c("input", {
            staticStyle: { display: "none" },
            attrs: { type: "file", name: "file", accept: _vm.accept },
            on: {
              change: function($event) {
                return _vm.afterSelectedFile($event.target.files)
              }
            }
          })
    ])
  };
  var __vue_staticRenderFns__$h = [];
  __vue_render__$h._withStripped = true;

    /* style */
    const __vue_inject_styles__$i = function (inject) {
      if (!inject) return
      inject("data-v-092186f3_0", { source: "\n.st-upload {\n  display: flex;\n  flex-direction: column;\n}\n.st-upload .st-progressbar {\n  min-width: 10em;\n  flex-grow: 1;\n}\n.st-upload .operation {\n  margin: auto 6px;\n}\n.st-upload > .header {\n  margin: 0.25em 0.5em;\n}\n.st-upload > .files {\n  overflow: auto;\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  margin: 0 0 0.5em 0;\n  padding: 0;\n}\n.st-upload > .drop-area {\n  overflow: hidden;\n  flex-grow: 1;\n  margin: 0.5em;\n  padding: 0.5em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 200%;\n}\n.st-upload > .files > .file {\n  list-style: none;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin: 8px 0 0 5px;\n}\n.st-upload > .files > .file > .file-icon {\n  display: block;\n  text-indent: -99999px;\n  overflow: hidden;\n  width: 32px;\n  height: 32px;\n}\n.st-upload > .files > .file > div {\n  margin-left: 5px;\n  flex-grow: 1;\n}\n.st-upload > .files > .file > div > input {\n  font: inherit;\n  border: none;\n  width: auto;\n}\n.st-upload > .files > .file > div > .other {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n.st-upload > .files > .file > div > .other > .size {\n  min-width: 5em;\n}\n", map: {"version":3,"sources":["/Volumes/macdata/work/simter/simter-vue-components/src/upload.vue"],"names":[],"mappings":";AAkQA;EACA,aAAA;EACA,sBAAA;AACA;AACA;EACA,eAAA;EACA,YAAA;AACA;AACA;EACA,gBAAA;AACA;AAEA;EACA,oBAAA;AACA;AAEA;EACA,cAAA;EACA,YAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,UAAA;AACA;AAEA;EACA,gBAAA;EACA,YAAA;EACA,aAAA;EACA,cAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;AACA;AAEA;EACA,gBAAA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;AACA;AAEA;EACA,cAAA;EACA,qBAAA;EACA,gBAAA;EACA,WAAA;EACA,YAAA;AACA;AAEA;EACA,gBAAA;EACA,YAAA;AACA;AAEA;EACA,aAAA;EACA,YAAA;EACA,WAAA;AACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;AACA;AAEA;EACA,cAAA;AACA","file":"upload.vue","sourcesContent":["<template>\n  <div :class=\"['st-upload', classes.root]\">\n    <!-- header -->\n    <div :class=\"['header', classes.header]\">\n      <span class=\"summary\">{{summary(count, size, prettySize)}}</span>\n      <a href=\"#\" :class=\"['operation', classes.operation]\" @click.stop=\"selectFile\">{{text.selectFile}}</a>\n    </div>\n    <!-- files -->\n    <ul v-if=\"count > 0\" :class=\"['files', classes.files]\">\n      <li :class=\"['file', classes.file]\" v-for=\"(file, index) in files\">\n        <span :class=\"'file-icon ' + file.type\"></span>\n        <div>\n          <input v-if=\"editable\" type=\"text\" :class=\"['name', classes.name]\" v-model=\"file.name\">\n          <div v-else :class=\"['name', classes.name]\">{{file.name}}</div>\n\n          <div :class=\"['other', classes.other]\">\n            <div :class=\"['size', classes.size]\">{{file.prettySize}}</div>\n            <st-progressbar :percent=\"file.percent\"></st-progressbar>\n            <a v-if=\"file.percent === 0\" href=\"#\" :class=\"['operation', classes.operation]\" @click.stop=\"removeFile(file)\">{{text.delete}}</a>\n          </div>\n        </div>\n      </li>\n    </ul>\n    <div v-else :class=\"['drop-area', classes.dropArea]\" :style=\"styles.dropArea\" \n      @drop.prevent=\"dropFiles($event)\" @dragover.prevent>{{ text.dropInfo }}</div>\n    <!-- hidden -->\n    <input v-if=\"multiple\" type=\"file\" name=\"file\" style=\"display:none\" multiple\n      :accept=\"accept\" @change=\"afterSelectedFile($event.target.files)\">\n    <input v-else type=\"file\" name=\"file\" style=\"display:none\"\n      :accept=\"accept\" @change=\"afterSelectedFile($event.target.files)\">\n  </div>\n</template>\n\n<script>\n/**\n * File upload component.\n *\n * Events:\n * 1. progress({index, name, size, percent})\n * 2. start([{name, size, percent}, ...])\n * 3. success([result, ...])\n * 4. error(e)\n */\nimport { gv, getFileExtension, getPrettySize, uploadOneFile } from \"./utils\";\nimport stProgressbar from \"./progressbar.vue\";\n\nfunction entryToFiles(entry, dir = '') {\n  return new Promise((resolve, recject) => {\n    if (entry.isFile) {\n      entry.file(file => {\n        file.dir = dir // mark full dir\n        resolve(file);\n      })\n    } else if (entry.isDirectory) {\n      let dirReader = entry.createReader();\n      dirReader.readEntries(entries => {\n        let promises = [];\n        for (let i = 0; i < entries.length; i++){\n          promises.push(entryToFiles(entries[i], dir ? dir + \"/\" + entry.name : entry.name));\n        }\n        resolve(Promise.all(promises));\n      });\n    }\n  });\n}\n\nfunction dataTransferItemsToFiles(items) {\n  return new Promise((resolve, reject) => {\n    let promises = [];\n    for (let i = 0; i < items.length; i++) promises.push(entryToFiles(items[i].webkitGetAsEntry()));\n    Promise.all(promises).then(files => resolve(files));\n  });\n}\n\n// [a, [b, c]] flatten to [a, b, c]\nfunction flattenArray(array) {\n  return array.reduce(\n    (a, b) => a.concat(Array.isArray(b) ? flattenArray(b) : b),\n    []\n  );\n}\n\nexport default {\n  components: { stProgressbar },\n  props: {\n    /**\n     * the server upload to.\n     * 1. String - fixed server url\n     * 2. Function - generate the server url with option '{index, name, size, type}'\n     */\n    url: {type: [String, Function], required: true},\n    // Whether allow edit file name\n    editable: {type: Boolean, required: false, default: true},\n    // Whether allow select multiple files\n    multiple: {type: Boolean, required: false, default: true},\n    // Whether allow auto start upload after selected files\n    auto: {type: Boolean, required: false, default: true},\n    // the limitation of file types, default no limitation\n    accept: {type: String, required: false, default: '*.*'},\n    // element class: { root, header, files, file, name, size, other, operation, progress }\n    classes: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.upload.classes\", {})\n    },\n    // element style: { dropArea }\n    styles: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.upload.styles\", {})\n    },\n    text: {\n      type: Object,\n      required: false,\n      default: () =>\n        gv(\"simter.upload.text\", {\n          selectFileFirst: \"Please select file first.\",\n          selectFile: \"Select file\",\n          delete: \"Delete\",\n          dropInfo: \"Please click \\\"Select...\\\" to choose the files, or just drop the files to here.\"\n        }),\n    },\n    summary: {\n      type: Function,\n      required: false,\n      default: gv(\"simter.upload.summary\", function(count, _size, prettySize) {\n        return `${count} files ${prettySize}`;\n      })\n    },\n    // the extras options for XMLHttpRequest\n    requestOptions: {\n      type: Object,\n      required: false\n    }\n  },\n  data: function () {\n    return {\n      // the selected files\n      files: []\n    }\n  },\n  computed: {\n    count: function () {\n      return this.files.length;\n    },\n    toUploadFiles: function () {\n      return this.files.filter(f => f.percent === 0);\n    },\n    toUploadCount: function () {\n      return this.toUploadFiles.length;\n    },\n    size: function () {\n      return this.files.reduce((previousValue, currentValue) => previousValue + currentValue.size, 0);\n    },\n    prettySize: function () {\n      return getPrettySize(this.size);\n    }\n  },\n  methods: {\n    selectFile: function () {\n      this.$el.querySelector('input[type=\"file\"]').click();\n    },\n    afterSelectedFile: function (files) {\n      // cache files\n      Array.from(files).forEach((file) => {\n        if (this.files.every((f) => f.name !== file.name))\n          this.files.push({\n            name: file.name,\n            dir: file.dir || '',\n            // original file\n            file: file,\n            size: file.size,\n            // pretty file size, such as '1KB'\n            prettySize: getPrettySize(file.size),\n            // get file extension, such as 'png'\n            type: getFileExtension(file.name),\n            // upload percent: 0~100\n            percent: 0,\n          });\n      });\n\n      // auto upload\n      if (this.auto) this.startUpload();\n    },\n    removeFile(index) {\n      this.files.splice(index, 1);\n    },\n    // manual start the upload\n    startUpload() {\n      if (this.toUploadCount === 0) {\n        if (this.count === 0) {\n          return alert(this.text.selectFileFirst);\n        } else return; // no file to upload\n      }\n\n      // emits upload start event\n      this.$emit(\"start\", this.toUploadFiles.map(f => ({\n        dir: f.dir,\n        name: f.name,\n        size: f.size,\n        percent: f.percent\n      })));\n\n      // upload file one by one\n      let p = Promise.resolve();\n      let results = []\n      for (let i = 0; i < this.toUploadFiles.length; i++) {\n        let f = this.toUploadFiles[i];\n\n        // get server url\n        let serverUrl;\n        if (typeof this.url === 'function') {\n          serverUrl = this.url.call(this, {\n            index: i,\n            dir: f.dir,\n            name: f.name,\n            size: f.size,\n            type: getFileExtension(f.name)\n          });\n        } else serverUrl = this.url;\n\n        p = p.then(() => uploadOneFile.call(null, Object.assign({\n          index: i,\n          dir: f.dir,\n          file: f.file,\n          url: serverUrl,\n          progress: data => {\n            f.percent = data.percent;\n            // emits upload progress event\n            this.$emit(\"progress\", data);\n          },\n          start: xhr => {\n            console.log(\"start\");\n          }\n        }, this.requestOptions)).then(result => {\n          results.push(result);\n        }));\n      }\n      p.then(result => {\n        // emits upload success event\n        this.$emit(\"success\", results);\n      }).catch(e => this.$emit(\"error\", e)); // emits upload failed event\n    },\n    dropFiles: function (e) {\n      if (e.dataTransfer.items === null || e.dataTransfer.items.length === 0) {\n        console.log(\"upload: No dropped items\");\n        return;\n      }\n\n      dataTransferItemsToFiles(e.dataTransfer.items).then(files => {\n        this.afterSelectedFile(flattenArray(files));\n      });\n    },\n  },\n};\n</script>\n\n<style>\n.st-upload {\n  display: flex;\n  flex-direction: column;\n}\n.st-upload .st-progressbar {\n  min-width: 10em;\n  flex-grow: 1;\n}\n.st-upload .operation {\n  margin: auto 6px;\n}\n\n.st-upload > .header {\n  margin: 0.25em 0.5em;\n}\n\n.st-upload > .files {\n  overflow: auto;\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  margin: 0 0 0.5em 0;\n  padding: 0;\n}\n\n.st-upload > .drop-area {\n  overflow: hidden;\n  flex-grow: 1;\n  margin: 0.5em;\n  padding: 0.5em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 200%;\n}\n\n.st-upload > .files > .file {\n  list-style: none;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin: 8px 0 0 5px;\n}\n\n.st-upload > .files > .file > .file-icon {\n  display: block;\n  text-indent: -99999px;\n  overflow: hidden;\n  width: 32px;\n  height: 32px;\n}\n\n.st-upload > .files > .file > div {\n  margin-left: 5px;\n  flex-grow: 1;\n}\n\n.st-upload > .files > .file > div > input {\n  font: inherit;\n  border: none;\n  width: auto;\n}\n\n.st-upload > .files > .file > div > .other {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.st-upload > .files > .file > div > .other > .size {\n  min-width: 5em;\n}\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$i = undefined;
    /* module identifier */
    const __vue_module_identifier__$i = undefined;
    /* functional template */
    const __vue_is_functional_template__$i = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$i = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
      __vue_inject_styles__$i,
      __vue_script__$i,
      __vue_scope_id__$i,
      __vue_is_functional_template__$i,
      __vue_module_identifier__$i,
      false,
      browser,
      undefined,
      undefined
    );

  //

  /** 递归计算节点的深度：顶层节点的深度为 0 */
  function caculateDepth(node) {
    if (node.$parent && node.$parent.isNode) return 1 + caculateDepth(node.$parent);else return 0;
  }

  /** 获取节点所在树的根节点 */
  function getRoot(node) {
    var p = node.$parent;
    if (p && p.isNode) return getRoot(p);else return node;
  }

  // node-structure: {id, label, leaf, collapsed, selected, children: [node1, node2, ..., nodeN]}
  var script$h = {
    name: 'st-tree',
    props: {
      node: {
        type: Object,
        required: true
      },
      defaultCollapsed: {
        type: Boolean,
        "default": true
      },
      childrenKey: {
        type: String,
        "default": 'children'
      },
      // All dom element class
      classes: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.tree.classes", {});
        }
      },
      // All dom element style
      styles: {
        type: Object,
        required: false,
        "default": function _default() {
          return getGlobalVariable("simter.tree.styles", {});
        }
      }
    },
    data: function data() {
      return {
        hover: false,
        // 节点是否处于鼠标悬停状态
        isNode: true,
        isRootNode: false,
        selectedNode: null
      };
    },
    created: function created() {
      // 标记自身是否是根节点
      this.isRootNode = !this.$parent || this.$parent && !this.$parent.isNode;

      // 如果设置为选中，则在树根上记录此节点
      var root = getRoot(this);
      if (this.node.selected) this.$set(root, 'selectedNode', this.node);
    },
    computed: {
      /** 是否是叶子节点 */leaf: function leaf() {
        return Object.hasOwn(this.node, 'leaf') ? this.node.leaf : !Array.isArray(this.node[this.childrenKey]);
      },
      /** 是否展开节点 */collapsed: function collapsed() {
        return Object.hasOwn(this.node, 'collapsed') ? this.node.collapsed : this.defaultCollapsed;
      },
      /** 节点图标  */icon: function icon() {
        return this.node.icon ? this.node.icon : this.leaf ? "ui-icon-document" : this.collapsed ? "ui-icon-folder-collapsed" : "ui-icon-folder-open";
      },
      /** 节点所在的深度：顶层节点的深度为 0 */depth: function depth() {
        return caculateDepth(this);
      }
    },
    methods: {
      /** 折叠展开节点 */toggle: function toggle() {
        this.$set(this.node, 'collapsed', !this.collapsed);
      },
      /** 用户点击节点的处理：选中节点并触发 change 事件 */clickMe: function clickMe($event) {
        // 避免重复触发 change 事件
        if (this.node.selected) return;

        // 设置当前节点选中
        this.$set(this.node, 'selected', true);

        // 解除前一选中节点的选择
        var treeRoot = getRoot(this);
        var preSelectedNode = treeRoot.selectedNode;
        if (preSelectedNode) this.$set(preSelectedNode, 'selected', false);
        if (this !== treeRoot && treeRoot.node.selected) treeRoot.$set(treeRoot.node, 'selected', false);

        // 记录当前节点为新的选择节点
        treeRoot.selectedNode = this.node;

        // 在跟节点触发 change 事件
        treeRoot.$emit("change", this.node, preSelectedNode);
      }
    }
  };

  /* script */
  const __vue_script__$j = script$h;

  /* template */
  var __vue_render__$i = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { class: ["st-tree", _vm.classes.root] }, [
      _c(
        "div",
        {
          class: {
            self: true,
            "ui-state-hover": _vm.hover,
            "ui-state-focus": _vm.node.selected
          },
          on: {
            mouseenter: function($event) {
              _vm.hover = true;
            },
            mouseleave: function($event) {
              _vm.hover = false;
            },
            click: function($event) {
              $event.stopPropagation();
              $event.preventDefault();
              return _vm.clickMe($event)
            }
          }
        },
        [
          _c("span", {
            staticClass: "indent",
            style: { width: _vm.depth * 16 + "px" }
          }),
          _vm._v(" "),
          _c("span", {
            staticClass: "toggle ui-icon",
            class: _vm.collapsed
              ? "ui-icon-triangle-1-e"
              : "ui-icon-triangle-1-se",
            style: { visibility: _vm.leaf ? "hidden" : "visible" },
            on: {
              click: function($event) {
                $event.stopPropagation();
                return _vm.toggle.apply(null, arguments)
              }
            }
          }),
          _vm._v(" "),
          _c("span", { class: ["icon", "ui-icon", _vm.icon] }),
          _vm._v(" "),
          _c("span", { staticClass: "label" }, [
            _vm._v(_vm._s(_vm.node.label || _vm.node.id))
          ])
        ]
      ),
      _vm._v(" "),
      !_vm.leaf && !_vm.collapsed
        ? _c(
            "div",
            { staticClass: "children" },
            _vm._l(_vm.node[_vm.childrenKey], function(child) {
              return _c("st-tree", {
                key: child.id || child.label,
                attrs: { node: child }
              })
            }),
            1
          )
        : _vm._e()
    ])
  };
  var __vue_staticRenderFns__$i = [];
  __vue_render__$i._withStripped = true;

    /* style */
    const __vue_inject_styles__$j = function (inject) {
      if (!inject) return
      inject("data-v-4f8d605f_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/** 树节点样式 */\n.st-tree {\n  min-width: 8em;\n  overflow: auto;\n}\n.st-tree > div.self {\n\tposition: relative;\n\tdisplay: flex;\n\tflex-direction: row;\n\tborder-width: 0;\n\tcursor: default;\n\tline-height: 1.8em;\n}\n.st-tree > .self > span {\n\tdisplay: inline-block;\n\tflex: none;\n}\n.st-tree > .self > span:last-child {\n\tflex: 1 1 0%;\n\tpadding-right: 0.25em;\n}\n.st-tree > .self > span.ui-icon {\n\tmargin: calc((1.8em - 16px) / 2) 0;\n}\n\n/** 带树视图的样式 */\n.st-tree-view {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  border: none;\n  font-weight: normal;\n}\n.st-tree-view > .content {\n  overflow: hidden;\n  flex: 1 1 0%;\n  display: flex;\n  flex-direction: row;\n}\n.st-tree-view > .content > .st-tree {\n  flex: none;\n  overflow: auto;\n}\n.st-tree-view > .content > .st-grid {\n  flex: 1 1 0%;\n  overflow: auto;\n}\n.st-tree-view > .st-toolbar.ui-widget-content {\n  border-width: 0 0 1px 0;\n}\n.st-tree-view > .content > .st-tree.ui-widget-content {\n  border-width: 0 1px 0 0;\n}\n", map: {"version":3,"sources":["/Volumes/macdata/work/simter/simter-vue-components/src/tree.vue"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAwHA,WAAA;AACA;EACA,cAAA;EACA,cAAA;AACA;AACA;CACA,kBAAA;CACA,aAAA;CACA,mBAAA;CACA,eAAA;CACA,eAAA;CACA,kBAAA;AACA;AACA;CACA,qBAAA;CACA,UAAA;AACA;AACA;CACA,YAAA;CACA,qBAAA;AACA;AACA;CACA,kCAAA;AACA;;AAEA,aAAA;AACA;EACA,aAAA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,mBAAA;AACA;AACA;EACA,gBAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;AACA;AACA;EACA,UAAA;EACA,cAAA;AACA;AACA;EACA,YAAA;EACA,cAAA;AACA;AACA;EACA,uBAAA;AACA;AACA;EACA,uBAAA;AACA","file":"tree.vue","sourcesContent":["<template>\n  <div :class=\"['st-tree', classes.root]\">\n    <div :class=\"{self: true, 'ui-state-hover': hover, 'ui-state-focus': node.selected}\"\n      @mouseenter=\"hover = true\" @mouseleave=\"hover = false\" @click.stop.prevent=\"clickMe($event)\">\n\t  \t<span class=\"indent\" :style=\"{width: (depth * 16) + 'px'}\"></span>\n      <span @click.stop=\"toggle\" class=\"toggle ui-icon\"\n        :class=\"collapsed ? 'ui-icon-triangle-1-e' : 'ui-icon-triangle-1-se'\"\n        :style=\"{visibility: leaf ? 'hidden' : 'visible'}\">\n      </span>\n      <span :class=\"['icon', 'ui-icon', icon]\"></span>\n      <span class=\"label\">{{node.label || node.id}}</span>\n    </div>\n    <div v-if=\"!leaf && !collapsed\" class=\"children\">\n      <st-tree v-for=\"child in node[childrenKey]\" :key=\"child.id || child.label\" :node=\"child\"></st-tree>\n    </div>\n  </div>\n</template>\n\n<script>\nimport { gv, concatClasses, concatStyles } from \"./utils\";\n\n/** 递归计算节点的深度：顶层节点的深度为 0 */\nfunction caculateDepth(node) {\n  if (node.$parent && node.$parent.isNode)\n    return 1 + caculateDepth(node.$parent);\n  else return 0;\n}\n\n/** 获取节点所在树的根节点 */\nfunction getRoot(node) {\n  const p = node.$parent;\n  if (p && p.isNode) return getRoot(p);\n  else return node;\n}\n\n// node-structure: {id, label, leaf, collapsed, selected, children: [node1, node2, ..., nodeN]}\nexport default {\n  name: 'st-tree',\n  props: {\n    node: { type: Object, required: true },\n    defaultCollapsed: { type: Boolean, default: true },\n    childrenKey: { type: String, default: 'children' },\n    // All dom element class\n    classes: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.tree.classes\", {})\n    },\n    // All dom element style\n    styles: {\n      type: Object,\n      required: false,\n      default: () => gv(\"simter.tree.styles\", {})\n    }\n  },\n  data: function() {\n    return {\n      hover: false, // 节点是否处于鼠标悬停状态\n      isNode: true,\n      isRootNode: false,\n      selectedNode: null\n    };\n  },\n  created(){\n    // 标记自身是否是根节点\n    this.isRootNode = !this.$parent || (this.$parent && !this.$parent.isNode);\n\n    // 如果设置为选中，则在树根上记录此节点\n    const root = getRoot(this);\n    if (this.node.selected) this.$set(root, 'selectedNode', this.node);\n  },\n  computed: {\n    /** 是否是叶子节点 */\n    leaf() {\n      return Object.hasOwn(this.node, 'leaf') ? this.node.leaf : !Array.isArray(this.node[this.childrenKey]);\n    },\n    /** 是否展开节点 */\n    collapsed() {\n      return Object.hasOwn(this.node, 'collapsed') ? this.node.collapsed : this.defaultCollapsed;\n    },\n    /** 节点图标  */\n    icon() {\n      return this.node.icon ? this.node.icon : this.leaf ? \"ui-icon-document\" \n      : this.collapsed ? \"ui-icon-folder-collapsed\" : \"ui-icon-folder-open\";\n    },\n    /** 节点所在的深度：顶层节点的深度为 0 */\n    depth() {\n      return caculateDepth(this);\n    }\n  },\n  methods: {\t\t\t\n    /** 折叠展开节点 */\n    toggle() {\n      this.$set(this.node, 'collapsed', !this.collapsed);\n    },\n    /** 用户点击节点的处理：选中节点并触发 change 事件 */\n    clickMe($event) {\n      // 避免重复触发 change 事件\n      if (this.node.selected) return; \n\n      // 设置当前节点选中\n      this.$set(this.node, 'selected', true);\n\n      // 解除前一选中节点的选择\n      const treeRoot = getRoot(this);\n      const preSelectedNode = treeRoot.selectedNode;\n      if (preSelectedNode) this.$set(preSelectedNode, 'selected', false);\n      if (this !== treeRoot && treeRoot.node.selected) treeRoot.$set(treeRoot.node, 'selected', false);\n\n      // 记录当前节点为新的选择节点\n      treeRoot.selectedNode = this.node;\n\n      // 在跟节点触发 change 事件\n      treeRoot.$emit(\"change\", this.node, preSelectedNode);\n    }\n  }\n};\n</script>\n\n<style>\n/** 树节点样式 */\n.st-tree {\n  min-width: 8em;\n  overflow: auto;\n}\n.st-tree > div.self {\n\tposition: relative;\n\tdisplay: flex;\n\tflex-direction: row;\n\tborder-width: 0;\n\tcursor: default;\n\tline-height: 1.8em;\n}\n.st-tree > .self > span {\n\tdisplay: inline-block;\n\tflex: none;\n}\n.st-tree > .self > span:last-child {\n\tflex: 1 1 0%;\n\tpadding-right: 0.25em;\n}\n.st-tree > .self > span.ui-icon {\n\tmargin: calc((1.8em - 16px) / 2) 0;\n}\n\n/** 带树视图的样式 */\n.st-tree-view {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  border: none;\n  font-weight: normal;\n}\n.st-tree-view > .content {\n  overflow: hidden;\n  flex: 1 1 0%;\n  display: flex;\n  flex-direction: row;\n}\n.st-tree-view > .content > .st-tree {\n  flex: none;\n  overflow: auto;\n}\n.st-tree-view > .content > .st-grid {\n  flex: 1 1 0%;\n  overflow: auto;\n}\n.st-tree-view > .st-toolbar.ui-widget-content {\n  border-width: 0 0 1px 0;\n}\n.st-tree-view > .content > .st-tree.ui-widget-content {\n  border-width: 0 1px 0 0;\n}\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$j = undefined;
    /* module identifier */
    const __vue_module_identifier__$j = undefined;
    /* functional template */
    const __vue_is_functional_template__$j = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$j = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
      __vue_inject_styles__$j,
      __vue_script__$j,
      __vue_scope_id__$j,
      __vue_is_functional_template__$j,
      __vue_module_identifier__$j,
      false,
      browser,
      undefined,
      undefined
    );

  // global register all components
  var components = {
    "st-loader": [version, __vue_component__],
    "st-grid": [version, __vue_component__$9],
    "st-colgroup": ["0.3.0", __vue_component__$7],
    "st-thead": ["0.4.2", __vue_component__$8],
    "st-table-row": [version, __vue_component__$6],
    "st-data-row": [version, stDataRow],
    "st-cell-index": [version, __vue_component__$1],
    "st-cell-sn": [version, __vue_component__$2],
    "st-cell-sn-selectable": [version, __vue_component__$3],
    "st-cell-text": [version, __vue_component__$4],
    "st-cell-html": [version, __vue_component__$5],
    "st-pagebar": [version, __vue_component__$b],
    "st-pagebar-sizes": [version, __vue_component__$d],
    "st-toolbar": [version, __vue_component__$e],
    "st-button": [version, __vue_component__$a],
    "st-button-group": [version, __vue_component__$c],
    "st-button-menu": [version, __vue_component__$f],
    "st-search": [version, __vue_component__$g],
    "st-upload": [version, __vue_component__$i],
    "st-progress-bar": [version, __vue_component__$h],
    "st-tree": [version, __vue_component__$j]
  };
  var keyVersions = {};
  var value;
  for (var key in components) {
    value = components[key];
    Vue.component(key, value[1]);
    keyVersions[key] = value[0];
  }
  var components$1 = {
    version: version,
    components: keyVersions
  };

  return components$1;

}));
