export default {
  props: {
    /** The backend value */
    value: { required: true },
    /** The origin column option */
    column: { type: Object, required: false },
    /** 
     * The row's data.
     * 
     * If this cell is a nested array cell, this row is the nested array item data,
     * not the parent component's row data. If want to use the parent component's row data,
     * call this.$parent.row.
     */
    row: {
      required: false,
      type: Object
    },
    /** 
     * The row's index.
     * 
     * If this cell is a nested array cell, this index is the nested array item index,
     * not the parent component's row index. If want to use the parent component's row index,
     * call this.$parent.index.
     */
    rowIndex: {
      required: false,
      type: Number
    },
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
    /** The parent component's row data */
    parentRow() {
      return this.$parent.row
    },
    /** The parent component's row index */
    parentRowIndex() {
      return this.$parent.index
    },
    /** Whether this cell is a nested array item cell */
    isNested() {
      return this.$parent.row !== this.row
    }
  }
}