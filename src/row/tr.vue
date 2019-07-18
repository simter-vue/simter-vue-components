<template>
  <tr>
    <td v-for="(cell, index) in cells" :key="index" :rowspan="cell.rowspan" :colspan="cell.colspan">
      <component :is="$_getCellComponent(cell.column)" v-bind="$_getCellBind(cell)"></component>
    </td>
  </tr>
</template>

<script>
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
    }
  },
  methods: {
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