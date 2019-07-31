// A functional component for renderer multiple tr element.
import tableRowComponent from './table-row.vue';

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