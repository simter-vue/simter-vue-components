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
  },
  upload: {
    classes: {
      root: "my-root",
      header: "my-header",
      files: "my-files",
      file: "my-file",
      name: "my-name",
      other: "my-other",
      size: "my-size",
      operation: "my-operation",
      progress: "my-progress"
    },
    styles: {
      dropArea: { border: '1px solid gray' }
    },
    text: {
      selectFileFirst: "请先添加附件！",
      selectFile: "添加附件",
      delete: "删除",
      dropInfo: "请点击“添加附件”选择要上传的附件，或者将要上传的附件拖放到这里。"
    },
    summary: function(count, _size, prettySize) {
      return `${count} 个附件共 ${prettySize}`;
    }
  },
  progressbar: {
    styles: {
      root: { border: '1px solid black' },
      percent: { 'background-color': 'gray' }
    }
  }
}