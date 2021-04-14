window.simter = {
  grid: {
    classes: {
      root: "my-grid",
      top: "my-top",
      header: "my-header",
      content: "my-content",
      bottom: "my-bottom",
      contentRow: {
        row: "my-row",
        rowHover: "my-hover",
        rowSelected: "my-selected",
        cell: "my-cell",
      }
    },
    styles: {
      headerTable: { border: "1px solid gray" },
      contentTable: { border: "1px solid gray" },
      contentRow: {
        rowHover: { "background-color": "#222" },
        rowSelected: { "background-color": "#444" }
      }
    }
  },
  button: {
    styles:{
      root: { "cursor": "pointer" },
      hover: { "text-decoration": "underline" },
      selected: { "color": "blue" }
    }
  },
  loader: {
    styles: {
      actor: { 
        "border-style": "solid",
        "border-color": "blue transparent"
      },
      timer: { color: 'red' }
    }
  }
}