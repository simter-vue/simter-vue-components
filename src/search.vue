<template>
  <div :class="['st-search', classes.root]" :style="styles.root">
    <div :class="['fuzzy-box', classes.fuzzyBox]" :style="styles.fuzzyBox">
      <input
        type="search"
        :class="['text', classes.text]"
        :placeholder="placeholder"
        v-model="value_"
        @keyup.enter.stop="doSearch"
      />
      <st-button
        :class="'search'"
        :classes="classes.search"
        :styles="styles.search"
        @click.native.prevent.stop="doSearch"
      >{{searchButtonText}}</st-button>
      <st-button v-if="advanceConfig && advanceConfig.conditions.length"
        :class="'advance'"
        :iconClass="advanceVisable ? classes.advance.upIcon : classes.advance.downIcon"
        :classes="classes.advance"
        :styles="styles.advance"
        :title="advanceVisable ? clickToHideAdvanceButtonText : clickToShowAdvanceButtonText"
        @click.native.prevent.stop="advanceVisable = !advanceVisable"
      >{{advanceButtonText}}</st-button>
    </div>
    <div v-if="advanceVisable" 
      :class="['advance-box', classes.advanceBox]" 
      :style="[styles.advanceBox, {
        width: advanceConfig.width,
        minWidth: advanceConfig.minWidth,
        height: advanceConfig.height,
        maxHeight: advanceConfig.maxHeight,
      }]">
      <div class="conditions">
        <div v-for="c of advanceConfig.conditions" class="condition">
          <div class="label">{{c.label}}</div>
          <!-- single value：string, number, date, time, ... -->
          <template v-if="!c.operator || ['=', '>', '>=', '<', '<=', '!=', '<>'].includes(c.operator)">
            <label v-if="'checkbox' == c.ui">
              <input :type="c.ui" :name="c.id + '_' + instanceId" v-model="c.value" :class="['value', classes.value]"
                :value="c.options.value || c.options"/>
              <span>{{c.options.text || c.options}}</span>
            </label>
            <label v-else-if="'radio' == c.ui" v-for="o of c.options">
              <input type="radio" :name="c.id + '_' + instanceId" v-model="c.value" :class="['value', classes.value]"
                :value="o.value || o"/>
              <span>{{o.text || o}}</span>
            </label>
            <select v-else-if="c.tag === 'select'" v-model="c.value" :class="['value', classes.value]">
              <option value=""></option>
              <option v-for="o of c.options" :value="o.value || o">{{o.text || o}}</option>
            </select>
            <input v-else 
              :type="c.ui || 'text'" v-model="c.value" :class="['value', classes.value]"
              :step="c.step" :min="c.min" :max="c.max"/>
          </template>
          <!-- multiple value for checkout and select -->
          <template v-else-if="['in', 'not in'].includes(c.operator)">
            <select v-if="c.tag === 'select'" multiple v-model="c.value" :class="['value', classes.value]" :style="c.style">
              <option v-for="o of c.options" :value="o.value || o">{{o.text || o}}</option>
            </select>
            <label v-else-if="'checkbox' == c.ui" v-for="o of c.options">
              <input type="checkbox" :name="c.id + '_' + instanceId" v-model="c.value" :class="['value', classes.value]"
                :value="o.value || o"/>
              <span>{{o.text || o}}</span>
            </label>
          </template>
          <!-- range value for [], [), (], () -->
          <template v-else-if="['[]', '[)', '(]', '()'].includes(c.operator)">
            <div class="range">
              <div class="left">
                <select v-if="c.tag === 'select'" v-model="c.value[0]" :class="['value', classes.value]">
                  <option v-for="o of c.options" :value="o.value || o">{{o.text || o}}</option>
                </select>
                <input v-else 
                  :type="c.ui || 'text'" v-model="c.value[0]" :class="['value', classes.value]"
                  :step="c.step" :min="c.min" :max="c.max"/>
              </div>
              <div class="center">～</div>
              <div class="right">
                <select v-if="c.tag === 'select'" v-model="c.value[1]" :class="['value', classes.value]">
                  <option v-for="o of c.options" :value="o.value || o">{{o.text || o}}</option>
                </select>
                <input v-else 
                  :type="c.ui || 'text'" v-model="c.value[1]" :class="['value', classes.value]"
                  :step="c.step" :min="c.min" :max="c.max"/>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div :class="['operations', classes.operations.class]">
        <st-button
          :iconClass="classes.operations.runIcon"
          @click.native.prevent.stop="doSearch"
        >{{runButtonText}}</st-button>
        <st-button
          :iconClass="classes.operations.cleanIcon"
          @click.native.prevent.stop="cleanCondition"
        >{{cleanButtonText}}</st-button>
        <st-button
          :iconClass="classes.operations.closeIcon"
          @click.native.prevent.stop="closeCondition"
        >{{closeButtonText}}</st-button>
      </div>
    </div>
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
    /** Whether immediately trigger 'search' event when condition value changed */
    quick: { type: Boolean, required: false, default: false },
    /** Whether trigger 'search' event when click clean button */
    cleanToSearch: { type: Boolean, required: false, default: true },
    /** Whether clean condition when click close button */
    closeToClean: { type: Boolean, required: false, default: false },
    placeholder: {
      type: String,
      required: false,
      default: () => gv("simter.search.placeholder", "Please input key word")
    },
    value: {
      type: String,
      required: false
    },
    searchButtonText: {
      type: String,
      required: false,
      default: () => gv("simter.search.searchButtonText", "Go")
    },
    advanceButtonText: {
      type: String,
      required: false,
      default: () => gv("simter.search.advanceButtonText", "More")
    },
    runButtonText: {
      type: String,
      required: false,
      default: () => gv("simter.search.operations.runButtonText", "Search")
    },
    cleanButtonText: {
      type: String,
      required: false,
      default: () => gv("simter.search.operations.cleanButtonText", "Clean")
    },
    closeButtonText: {
      type: String,
      required: false,
      default: () => gv("simter.search.operations.closeButtonText", "Close")
    },
    clickToShowAdvanceButtonText: {
      type: String,
      required: false,
      default: () => gv("simter.search.clickToShowAdvanceButtonText", "Click to show advance box")
    },
    clickToHideAdvanceButtonText: {
      type: String,
      required: false,
      default: () => gv("simter.search.clickToHideAdvanceButtonText", "Click to hide advance box")
    },
    // all dom elements class
    classes: {
      type: Object,
      required: false,
      default: () => gv("simter.search.classes", { advance: {}})
    },
    // all dom elements class
    styles: {
      type: Object,
      required: false,
      default() {
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
  data() {
    return {
      // for radio, checkout control's unique name
      instanceId: Date.now(),
      advanceVisable: false,
      value_: undefined
    };
  },
  created() {
    // copy value prop's value
    this.value_ = this.value

    // init default advanceConfig value to avoid failed reactive
    // console.log(this.advanceConfig?.conditions)
    if (this.advanceConfig && this.advanceConfig.conditions) {
      this.advanceConfig.conditions.forEach((c) => {
        if (!c.hasOwnProperty("value")) {
          this.$set(c, "value", ["in", "not in", "[]", "[)", "(]", "()"].includes(c.operator) ? [] : "")
        }
      })
    }
  },
  computed: {
    /**
     * The advance condition values, has this format:
     * 
     * [[$id, $value, $type, $operator], ...]
     */
    advanceValue() {
      const all = this.advanceConfig ? this.advanceConfig.conditions
        .filter((c) => c.value && (Array.isArray(c.value) ? c.value.some((v) => v) : true))
        .map((c) => [c.id, c.value, c.type || "string", c.operator || "="]) : [];
      return all.length ? all : undefined;
    },
    /** Mix advanceValue and fuzzyValue */
    mixValue() {
      const fuzzyValue = this.value_ ? ["fuzzy", this.value_] : undefined;
      let v;
      if (!this.advanceValue) {	// no advance value
        v = fuzzyValue ? [fuzzyValue] : undefined;
      } else {                  // has advance value
        v = fuzzyValue ? [fuzzyValue].concat(this.advanceValue) : this.advanceValue;
      }
      return v;
    }
  },
  watch: {
    value_(newValue) {
      // for <st-search v-model="myVar" ...>
      this.$emit("input", newValue);
      // for <st-search :value.sync="myVar" ...>
      this.$emit("update:value", newValue);
    },
    mixValue(newValue) {
      // console.log("watch: mixValue=" + JSON.stringify(newValue))
      this.$emit("change", this.value_, this.advanceValue, this.mixValue);
      if (this.quick) this.$emit("search", this.value_, this.advanceValue, this.mixValue);
    }
  },
  methods: {
    doSearch() {
      // console.log("st-search: ")
      // console.log("  value=%s", this.value)
      // console.log("  value_=%s", this.value_)
      // console.log("  advanceValue=%s", JSON.stringify(this.advanceValue))
      // console.log("  mixValue=%s", JSON.stringify(this.mixValue))
      this.$nextTick(() => this.$emit("search", this.value_, this.advanceValue, this.mixValue));
    },
    cleanCondition() {
      this.advanceConfig.conditions.forEach((c) => c.value = Array.isArray(c.value) ? [] : undefined);
      if (this.cleanToSearch) this.doSearch();
    },
    closeCondition() {
      this.advanceVisable = false;
      if (this.closeToClean) this.cleanCondition();
    }
  }
};
</script>

<style>
.st-search {
  position: relative;
}
.st-search>.fuzzy-box {
  position: relative;
  display: inline-flex;
}
.st-search>.advance-box {
  position: absolute;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  right: 0;
  padding: 0;
  margin: 0;
}
.st-search>.advance-box>.conditions {
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0.4em;
}
.st-search>.advance-box>.operations {
  border-width: 1px 0 0 0;
  padding: 0.4em;
}

.st-search>.advance-box>.conditions>.condition>.range {
  display: flex;
  flex-direction: row;
}
.st-search>.advance-box>.conditions>.condition>.range>:nth-child(odd) {
  flex-grow: 1;
}

.st-search>.advance-box>.conditions>.condition>input.value,
.st-search>.advance-box>.conditions>.condition>select.value,
.st-search>.advance-box>.conditions>.condition>.range>.left>input,
.st-search>.advance-box>.conditions>.condition>.range>.right>input {
  box-sizing: border-box;
  padding: 0.45em 0.45em 0.35em 0.45em;
  width: 100%;
}
.st-search>.advance-box>.conditions>.condition>label {
  width: fit-content;
}
</style>