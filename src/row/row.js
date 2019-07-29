// A functional component for renderer multiple tr element.
import tr from './tr.vue';

/**
 * [localRow, rowIndex, cellValue].
 * 
 * If column has a pid, then: 
 *   1. return `[row[column.pid][subRowIndex], subRowIndex, row[column.pid][subRowIndex][column.id]]`
 *      if row[column.pid].length > subRowIndex,
 *   2. or return [undefined, undefined, undefined]
 *      if row[column.pid].length <= subRowIndex.
 * Otherwise return `[row, mainRowIndex, row[column.id]]`.
 * 
 * @param {Object} row 
 * @param {Object} column 
 * @param {Number} index 
 */
function getCellConfigInfo(row, column, subRowIndex, mainRowIndex) {
  return column.pid
    ? (row[column.pid] && row[column.pid].length > subRowIndex
      ? [row[column.pid][subRowIndex], subRowIndex, row[column.pid][subRowIndex][column.id]]
      : [undefined, undefined, undefined])
    : [row, mainRowIndex, row[column.id]]
}

function addClassesAndStyles(props, classes, styles) {
  if (classes) props.classes = classes
  if (styles) props.styles = styles
  return props
}

export default {
  functional: true,
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
    /** The row's first tr columns */
    columns: {
      required: true,
      type: Array
    },
    /** The row's tr columns exclude first tr */
    subColumns: {
      required: false,
      type: Array,
      default: function () { return []; }
    },
    // All dom element class
    classes: { type: Object, required: false },
    styles: { type: Object, required: false }
  },
  render(createElement, context) {
    let row = context.props.row
    let trs = []

    // main tr
    trs.push(createElement(tr, {
      props: addClassesAndStyles({
        row: row,
        index: context.props.index,
        cells: context.props.columns.map(column => {
          let [localRow, rowIndex, cellValue] = getCellConfigInfo(row, column, 0, context.props.index)
          return {
            rowspan: column.pid ? 1 : row.rowspan,
            column: column,
            value: cellValue,
            row: localRow,
            rowIndex: rowIndex
          }
        })
      }, context.props.classes, context.props.styles),
      on: context.listeners
    }))

    // sub trs
    let len = row.rowspan || 1
    for (let i = 1; i < len; i++) {
      trs.push(createElement(tr, {
        props: addClassesAndStyles({
          row: row,
          index: context.props.index,
          cells: context.props.subColumns.map(column => {
            let [localRow, rowIndex, cellValue] = getCellConfigInfo(row, column, i)
            return {
              column: column,
              value: cellValue,
              row: localRow,
              rowIndex: rowIndex
            }
          })
        }, context.props.classes, context.props.styles),
        on: context.listeners
      }))
    }

    return trs
  }
};