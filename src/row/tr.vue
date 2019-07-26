<template>
  <tr
    :class="rootClass"
    :style="styles.root"
    @mouseover="hover = true"
    @mouseout="hover = false"
  >
    <td
      v-for="(cell, index) in cells"
      :class="$_getTdClass(cell)"
      :style="$_getTdStyle(cell)"
      :key="index"
      :rowspan="cell.rowspan"
      :colspan="cell.colspan"
    >
      <component
        :class="classes.cell"
        :style="styles.cell"
        :is="$_getCellComponent(cell.column)"
        v-bind="$_getCellBind(cell)"
      ></component>
    </td>
  </tr>
</template>

<script>
import { concatClasses } from "../utils";
// inner cell components
import stCellIndex from "../cell/index.vue";
import stCellSn from "../cell/sn.vue";
import stCellText from "../cell/text.vue";
import stCellHtml from "../cell/html.vue";
import stCellFn from "../cell/fn.vue";

export default {
  props: {
    /** The row's data */
    row: {
      required: true,
      type: Object
    },
    /** The row's index */
    index: {
      required: true,
      type: Number
    },
    // [{ rowspan, colspan, value, column }, ...]
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
    return { hover: false };
  },
  computed: {
    rootClass() {
      return concatClasses(
        "st-row", // always
        this.classes.root, // custom
        this.hover ? this.classes.hover || "hover" : undefined, // custom or default
      );
    }
  },
  methods: {
    $_getTdClass(cell) {
      return concatClasses(
        "st-cell", // always
        this.classes.cell, // custom
        cell.column.class || "text" // column-define or default
      );
    },
    $_getTdStyle(cell) {
      return concatClasses(this.styles.cell, cell.column.style);
    },
    $_getCellComponent(column) {
      return column.cell
        ? column.cell.component
          ? column.cell.component
          : column.cell
        : "st-cell-text";
    },
    $_getCellBind(cell) {
      // { value, column, row, rowIndex }
      let main = {
        value: cell.value,
        column: cell.column,
        row: cell.row,
        rowIndex: cell.rowIndex
      };
      return typeof cell.column.cell === "object"
        ? Object.assign({}, cell.column.cell, main)
        : main;
    }
  },
  // register all inner cell components
  components: { stCellIndex, stCellSn, stCellText, stCellHtml, stCellFn }
};
</script>