/*!
 * Integrate jQueryUI with simter-vue-components.
 * 
 * Set global js config for simter-vue-components.
 *
 * @author RJ
 */
window.simter = {
  grid: {
    classes: {
      root: "ui-widget-content",
      top: "ui-widget-content",
      bottom: "ui-widget-content",
      contentRow: {
        row: "ui-widget-content",
        rowHover: "ui-state-hover",
        rowSelected: "ui-state-highlight"
      },
      headerRow: {
        row: "ui-widget-content",
        cell: "ui-widget-content"
      }
    }
  },
  button: {
    classes: {
      root: "ui-state-default ui-corner-all",
      hover: "ui-state-hover",
      selected: "ui-state-active"
    }
  },
  buttonGroup: {
    classes: {
      first: "ui-corner-left",
      last: "ui-corner-right",
      button: {
        root: "ui-state-default",
        hover: "ui-state-hover",
        selected: "ui-state-active"
      },
    }
  },
  pagebar: {
    classes: {
      root: "ui-state-default ui-corner-all",
      first: {
        root: "ui-corner-all",
        icon: "ui-icon ui-icon-seek-first",
        hover: "ui-state-hover",
        selected: "ui-state-active"
      },
      previous: {
        root: "ui-corner-all",
        icon: "ui-icon ui-icon-seek-prev",
        hover: "ui-state-hover",
        selected: "ui-state-active"
      },
      next: {
        root: "ui-corner-all",
        icon: "ui-icon ui-icon-seek-next",
        hover: "ui-state-hover",
        selected: "ui-state-active"
      },
      last: {
        root: "ui-corner-all",
        icon: "ui-icon ui-icon-seek-end",
        hover: "ui-state-hover",
        selected: "ui-state-active"
      }
    }
  },
  pagebarSizes: {
    classes: {
      root: "ui-state-default ui-corner-all",
      button: {
        root: "ui-state-default ui-corner-all",
        hover: "ui-state-hover",
        selected: "ui-state-active"
      }
    }
  },
  search: {
    placeholder: "Please input key word",
    searchButtonText: "",
    classes: {
      text: "ui-widget-content",
      search: {
        icon: "ui-icon ui-icon-search"
      }
    }
  },
  loader: {
    classes: {
      actor: "ui-state-active",
      timer: "ui-state-disabled"
    }
  },
  upload: {
    classes: {
      name: "ui-widget-content",
      dropArea: "ui-widget-content"
    },
    text: {
      selectFileFirst: "No files",
      selectFile: "Select...",
      delete: "Delete",
      dropInfo: "Please click \"Select...\" to choose the files, or just drop the files to here."
    },
    summary: function(count, _size, prettySize) {
      return `${count} files total ${prettySize}`;
    }
  },
  progressbar: {
    classes: {
      root: "ui-progressbar ui-widget ui-widget-content ui-corner-all",
      percent: "ui-progressbar-value ui-widget-header ui-corner-left"
    }
  }
};