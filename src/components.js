
import Vue from 'vue'
import { version } from '../package.json'

import stColgroup from 'simter-vue-colgroup'
import stThead from 'simter-vue-thead'

import stButton from "./button.vue"
import stButtonGroup from "./button-group.vue"

// global register all components
const components = {
  "st-colgroup": ["0.3.0", stColgroup],
  "st-thead": ["0.4.2", stThead],
  "st-button": [version, stButton],
  "st-button-group": [version, stButtonGroup]
}
const keyVersions = {}
Object.entries(components).forEach(([key, value]) => {
  Vue.component(key, value[1])
  keyVersions[key] = value[0]
});
console.log(`global register all components: %o`, keyVersions)

export default { version, components: keyVersions }