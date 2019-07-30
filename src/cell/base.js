export default {
  props: {
    // Whether is a empty cell
    empty: { required: false, default: false },
    // Cell value
    value: { required: false },
    // Column option
    column: { type: Object, required: false },
    // All dom element class
    classes: {
      type: Object,
      required: false,
      default() { return {}; }
    },
    // All dom element style
    styles: {
      type: Object,
      required: false,
      default() { return {}; }
    }
  },
  computed: {
    // DataRow.value
    row() {
      return this.$parent.dataRowValue
    },
    // TableRow.index
    index() {
      return this.$parent.index
    },
    // TableRow.tableRowIndex
    tableRowIndex() {
      return this.$parent.tableRowIndex
    },
    // TableRow.dataRowIndex
    dataRowIndex() {
      return this.$parent.dataRowIndex
    }
  }
}