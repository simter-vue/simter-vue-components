<template>
  <div>
    <div>
      <label>
        <input type="checkbox" v-model="customWidth" />
        Custom width:
      </label>
      <input type="range" min="15" max="80" v-model="widthValue" />
      {{widthValue}} {{unit}}
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="customHeight" />
        Custom height:
      </label>
      <input type="range" min="10" max="30" v-model="heightValue" />
      {{heightValue}} {{unit}}
    </div>
    <div>
      <label><input type="checkbox" v-model="loading" /> Show Loader</label>
      <input type="range" min="1" max="10" step="0.1" v-model="loaderSize" />
      {{loaderSize}} em
    </div>
    <st-grid
      ref="grid"
      :style="{width: width, height: height, border: '1px solid #666', position: 'relative'}"
      :columns="columns"
      :rows="rows"
      @row-click="clickRow"
      @row-dblclick="dblclickRow"
      @column-select-state-change="columnSelectStateChange"
    >
      <template #top>
        <st-loader v-if="loading" :size="loaderSize"></st-loader>
        <st-toolbar>
          <st-button icon-class="icon-create">Create</st-button>
          <st-button>Edit</st-button>
          <st-button @click="deleteSelection">Delete</st-button>
          <st-button @click="clearSelection">Clear</st-button>
          <st-button @click="showSelection">Show</st-button>
          <st-button-group :items="statuses" :value.sync="status" @change="changeStatus"></st-button-group>
          <st-button-menu :items='menuItems' @select="selectMenuItem">Menu</st-button-menu>
          <template #right>
            <st-search :value.sync="fuzzyValueSync" v-model="fuzzyValue" :advanceConfig="advanceConfig"
              @search="doSearch" @change="onSearchValueChange" :quick="false" :clean-to-search="true" :close-to-clean="false"
            ></st-search>
          </template>
        </st-toolbar>
      </template>
      <template #bottom>
        <st-button icon-class="icon-refresh" @click="doRefresh">Refresh</st-button>
        <st-pagebar :page-no.sync="pageNo" :total="total" @change="changePageNo"></st-pagebar>
        <st-pagebar-sizes :value.sync="pageSize" @change="changePageSize"></st-pagebar-sizes>
        <st-button @click="doExport($event)">Export</st-button>
        <st-button @click="doImport">Import</st-button>
      </template>
    </st-grid>

    <blockquote>Column 'Website' is auto width.</blockquote>
    <div>
      <h2>st-upload: </h2>
      <label><input type="checkbox" v-model="autoStartUpload" />Auto upload file</label>
      <button v-if="!autoStartUpload" @click="startUpload">Start Upload</button>
      <st-upload ref="uploader"
        :style="{width: width, border: '1px solid #666', padding: '.25em', height: '10em'}"
        :url="getUploadUrl"
        :auto="autoStartUpload"
        @start="beforeUpload"
        @progress="uploadProgress"
        @success="afterUpload"
        @error="uploadErrorCallback">
      </st-upload>
    </div>
  </div>
</template>

<script>
import stLoader from "../src/loader.vue";
import stGrid from "../src/grid.vue";
import stPagebar from "../src/pagebar.vue";
import stPagebarSizes from "../src/pagebar-sizes.vue";
import stButton from "../src/button.vue";
import stButtonGroup from "../src/button-group.vue";
import stButtonMenu from "../src/button-menu.vue";
import stSearch from "../src/search.vue";
import stUpload from "../src/upload.vue";
import stToolbar from "../src/toolbar.vue";
export default {
  components: {
    stLoader,
    stGrid,
    stPagebar,
    stPagebarSizes,
    stButton,
    stButtonGroup,
    stButtonMenu,
    stToolbar,
    stSearch,
    stUpload
  },
  data() {
    return {
      loading: false,
      loaderSize: 3.2,
      unit: "em",
      customWidth: true,
      widthValue: 50,
      customHeight: false,
      heightValue: 15,
      autoStartUpload: false,

      // pagebar
      pageNo: 1,
      pageSize: 25,
      total: 101,
      // pagebar:pageSizes
      pageSizes: [25, 50, 100],

      // toolbar
      statuses: ["Enabled", "Disabled", "All"],
      menuItems: ["Menu Item 1", "Go Go Go", {text: "Help", method: "callback"}],
      status: "All",
      fuzzyValue: "test",
      fuzzyValueSync: "sync",

      // grid columns
      columns: [
        {
          label: "SN",
          cell: "st-cell-sn-selectable",
          width: "2.5em",
          class: "number",
          selectable: true
        }, // test st-cell-sn (global)
        {
          label: "Index",
          cell: "st-cell-index",
          width: "4em",
          class: "number",
          selectable: true
        }, // test st-cell-index
        { id: "id", label: "ID", width: "5em" }, // test st-cell-text (default)
        { id: "name", label: "Name", width: "7em" }, // test st-cell-text (default)
        { id: "website", label: "Website", width: "auto" }, // test st-cell-text (default),
        {
          // test render html
          label: "Link",
          width: "3em",
          cell(row, index) {
            // 'this' is the vue root component instance
            return {
              component: "st-cell-html",
              value: row.website
                ? `<a href="https://${row.website}">Go</a>`
                : "",
              click({ target, row, value }) {
                // 'this' is the vue root component instance
                console.log("click cell: value=%s", value);
              }
            };
          }
        },
        {
          label: "Partners<br>br test",
          children: [
            // test global sn
            { label: "GSN", cell: "st-cell-sn", width: "3.5em" },
            // test local selectable sn
            {
              pid: "partners",
              label: "SN",
              cell: "st-cell-sn-selectable",
              width: "2.5em"
            },
            // test local sn
            { pid: "partners", id: "name", label: "Name", width: "4em" }
          ]
        },
        {
          label: "Commiters",
          children: [
            {
              pid: "commiters",
              label: "SN",
              cell: "st-cell-sn-selectable",
              width: "2.5em"
            },
            {
              pid: "commiters",
              id: "name",
              label: "Name",
              width: "6em",
              cell: (r, _, emptyCel) => ({
                value: emptyCel ? "" : `${r.id}/${r.name}`
              })
            }
          ]
        }
        //, { label: "|" }
      ],
      rows: [
        { id: "bing", name: "Bing", website: "bing.com" },
        { id: "google", name: "Google", website: "google.com", partners: [] },
        {
          id: "baidu",
          name: "BaiDu",
          website: "baidu.com",
          partners: [{ name: "P 31" }]
        },
        {
          id: "so",
          name: "360",
          website: "www.so.com",
          partners: [{ name: "P 41" }],
          commiters: [{ id: "c41", name: "C 41" }, { id: "c42", name: "C 42" }]
        },
        {
          id: "doge",
          name: "DogeDoge",
          website: "dogedoge.com",
          partners: [{ name: "P 51" }, { name: "P 52" }, { name: "P 53" }],
          commiters: [{ id: "c51", name: "C 51" }, { id: "c52", name: "C 52" }]
        }
      ],
      advanceConfig: {
        maxHeight: "25em",
        // width: "18em",
        conditions: [
          { id: "c0", label: "string value =", value: "test"},
          { id: "c1", label: "number >", operator: ">", type: "int", ui: "number", step: 10, min: -50, max:50},
          { id: "c2", label: "single select =", tag: "select", options: [{text: "S1", value: "sv1"}, {text: "S2", value: "sv2"}]},
          { id: "c3", label: "multiple select in", tag: "select", operator: "in", options: [
            {text: "S1", value: "sv1"}, {text: "S2", value: "sv2"}, {text: "S3", value: "sv3"}
          ], style: "height:4em"},
          { id: "c4", label: "datetime =", type: "datetime", ui: "datetime-local"},
          { id: "c5", label: "month =", type: "month", ui: "month"},
          { id: "c6", label: "date =", type: "date", ui: "date"},
          { id: "c7", label: "time =", type: "time", ui: "time"},
          { id: "c8", label: "radio =", ui: "radio", options: ["R1", "R2", "R3"]},
          { id: "c9", label: "single checkbox =", ui: "checkbox", options: {text: "C1", value: "cv1"}},
          { id: "c10", label: "multiple checkbox in", operator: "in", ui: "checkbox", options: [
            {text: "C1", value: "cv1"}, {text: "C2", value: "cv2"}, {text: "C3", value: "cv3"}
          ]},
          { id: "c98", label: "number range [)", operator: "[)", type: "number", ui: "number"},
          { id: "c99", label: "date range []", operator: "[]", type: "date", ui: "date"},
        ]
      }
    };
  },
  computed: {
    width() {
      if (this.customWidth) return this.widthValue + this.unit;
      else return "auto";
    },
    height() {
      if (this.customHeight) return this.heightValue + this.unit;
      else return "auto";
    }
  },
  methods: {
    selectMenuItem(item, index) {
      console.log(`index=${index}, item=${JSON.stringify(item)}`)
    },
    changeStatus(status, index) {
      console.log(
        "changeStatus: status=%s, index=%s, this.status=%s",
        status,
        index,
        this.status
      );
    },
    doSearch(fuzzyValue, advanceValue, mixValue) {
      console.log("doSearch: origin fuzzyValue=%s, fuzzyValueSync=%s", this.fuzzyValue, this.fuzzyValueSync);
      console.log("  [0]fuzzyValue=%s", fuzzyValue);
      console.log("  [1]advanceValue=%s", JSON.stringify(advanceValue));
      console.log("  [2]mixValue=%s", JSON.stringify(mixValue));
    },
    onSearchValueChange(fuzzyValue, advanceValue, mixValue) {
      console.log("onSearchValueChange: origin fuzzyValue=%s, fuzzyValueSync=%s", this.fuzzyValue, this.fuzzyValueSync);
      console.log("  [0]fuzzyValue=%s", fuzzyValue);
      console.log("  [1]advanceValue=%s", JSON.stringify(advanceValue));
      console.log("  [2]mixValue=%s", JSON.stringify(mixValue));
    },
    changePageNo(pageNo) {
      console.log("changePageNo: pageNo=%s", pageNo);
    },
    changePageSize(pageSize) {
      console.log("changePageSize: pageSize=%s", pageSize);
    },
    doRefresh() {
      console.log("doRefresh");
      this.loading = true;
      setTimeout(() => this.loading = false, 90000); // 90s
    },
    doExport($event) {
      console.log("doExport=%o", $event);
    },
    doImport() {
      console.log("doImport");
    },
    clickRow($event) {
      console.log("clickRow: $event=%s", JSON.stringify($event));
      console.log(
        "clickRow: selection=%s",
        JSON.stringify(this.$refs.grid.selection)
      );
    },
    dblclickRow($event) {
      console.log("dblclickRow: $event=%s", JSON.stringify($event));
    },
    columnSelectStateChange(selected, index, column) {
      console.log(`selected:${selected}, index:${index}, column:${column}`);
    },
    changeRowSelected($event) {
      console.log("changeRowSelected: $event=%s", JSON.stringify($event));
    },
    changeCellSelected($event) {
      console.log("changeCellSelected: $event=%s", JSON.stringify($event));
    },
    deleteSelection() {
      let count = this.$refs.grid.selection.length;
      if (count > 0) {
        if (window.confirm("Are you sure to delete " + count + " rows?"))
          this.$refs.grid.deleteSelection();
      } else window.alert("No row is selected.");
    },
    clearSelection() {
      this.$refs.grid.clearSelection();
    },
    showSelection() {
      window.alert("selectedIds=" + this.$refs.grid.selection.map(r => r.id).join(", "));
    },

    //----st-upload
    startUpload() {
      this.$refs.uploader.startUpload();
    },
    getUploadUrl(data) {
      // data: {index, name, size, type}
      console.log("----getUploadUrl: data=%o", data);
      return `http://localhost:9013/file/?module=test&name=${encodeURIComponent(data.name)}&type=${data.type}&size=${data.size}`;
    },
    uploadProgress(data) {
      console.log("----uploadProgress: data=%o", data);
    },
    beforeUpload(data) {
      console.log("----beforeUpload: data=%o", data);
    },
    afterUpload(data) {
      console.log("----afterUpload: data=%o", data);
    },
    uploadErrorCallback(data) {
      console.log("----uploadErrorCallback: data=%o", data);
    }
  }
};
</script>