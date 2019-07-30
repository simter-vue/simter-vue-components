// A functional component for renderer multiple tr element.
import tableRowComponent from './table-row.vue';

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
      ? [row[column.pid][subRowIndex], subRowIndex, row[column.pid][subRowIndex][column.id]] // real
      : [undefined, undefined, undefined]) // empty
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
    tableRows: { required: true, type: Array }
  },
  render(createElement, context) {
    return context.props.tableRows.map(tableRow => {
      return createElement(tableRowComponent, {
        props: tableRow,
        on: context.listeners
      })
    });
  }
};