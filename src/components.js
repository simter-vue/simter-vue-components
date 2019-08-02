
import Vue from 'vue'
import { version } from '../package.json'


// grid
import stGrid from "./grid.vue";
import stColgroup from './colgroup.vue'
import stThead from './thead.vue'
// grid:row
import stTableRow from "./row/table-row.vue";
import stDataRow from "./row/data-row";
// grid:cell
import stCellIndex from "./cell/index.vue";
import stCellSn from "./cell/sn.vue";
import stCellSnSelectable from "./cell/sn-selectable.vue";
import stCellText from "./cell/text.vue";
import stCellHtml from "./cell/html.vue";
// grid:pagebar
import stPagebar from "./pagebar.vue";
import stPagebarSizes from "./pagebar-sizes.vue";

// others
import stToolbar from "./toolbar.vue";
import stButton from "./button.vue"
import stButtonGroup from "./button-group.vue"
import stSearch from "./search.vue";

// global register all components
const components = {
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
  "st-search": [version, stSearch],
}
const keyVersions = {}
let value
for (let key in components) {
  value = components[key]
  Vue.component(key, value[1])
  keyVersions[key] = value[0]
}

export default { version, components: keyVersions }