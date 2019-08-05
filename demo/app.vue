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
    <st-grid
      ref="grid"
      :style="{width: width, height: height, border: '1px solid #666'}"
      :columns="columns"
      :rows="rows"
      @row-click="clickRow"
      @row-dblclick="dblclickRow"
    >
      <template #top>
        <st-toolbar>
          <st-button icon-class="icon-create">Create</st-button>
          <st-button>Edit</st-button>
          <st-button>Delete</st-button>
          <st-button-group :items="statuses" :value.sync="status" @change="changeStatus"></st-button-group>
          <template #right>
            <st-search :value.sync="fuzzyValue" @search="doSearch" @change="doSearchChange"></st-search>
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
  </div>
</template>

<script>
import stGrid from "../src/grid.vue";
import stPagebar from "../src/pagebar.vue";
import stPagebarSizes from "../src/pagebar-sizes.vue";
import stButton from "../src/button.vue";
import stButtonGroup from "../src/button-group.vue";
import stSearch from "../src/search.vue";
import stToolbar from "../src/toolbar.vue";
export default {
  components: {
    stGrid,
    stPagebar,
    stPagebarSizes,
    stButton,
    stButtonGroup,
    stToolbar,
    stSearch
  },
  data() {
    return {
      unit: "em",
      customWidth: true,
      widthValue: 44,
      customHeight: false,
      heightValue: 15,

      // pagebar
      pageNo: 1,
      pageSize: 25,
      total: 101,
      // pagebar:pageSizes
      pageSizes: [25, 50, 100],

      // toolbar
      statuses: ["Enabled", "Disabled", "All"],
      status: "All",
      fuzzyValue: "test",

      // grid columns
      columns: [
        {
          label: "SN",
          cell: "st-cell-sn-selectable",
          width: "2.5em",
          class: "number"
        }, // test st-cell-sn (global)
        {
          label: "Index",
          cell: "st-cell-index",
          width: "4em",
          class: "number"
        }, // test st-cell-index
        { id: "id", label: "ID", width: "5em" }, // test st-cell-text (default)
        { id: "name", label: "Name", width: "7em" }, // test st-cell-text (default)
        { id: "website", label: "Website", width: "auto" }, // test st-cell-text (default),
        {
          // test render html
          label: "Link",
          width: "3em",
          cell(row, index) {
            return {
              component: "st-cell-html",
              value: row.website
                ? `<a href="https://${row.website}">Go</a>`
                : "",
              click({ target, row, value }) {
                console.log("click cell: value=%s", value);
              }
            };
          }
        },
        {
          label: "Partners",
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
      ]
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
    changeStatus(status, index) {
      console.log(
        "changeStatus: status=%s, index=%s, this.status=%s",
        status,
        index,
        this.status
      );
    },
    doSearch(value) {
      console.log("doSearch: value=%s, fuzzy=%s", value, this.fuzzyValue);
    },
    doSearchChange(value) {
      console.log("doChange: value=%s, fuzzy=%s", value, this.fuzzyValue);
    },
    changePageNo(pageNo) {
      console.log("changePageNo: pageNo=%s", pageNo);
    },
    changePageSize(pageSize) {
      console.log("changePageSize: pageSize=%s", pageSize);
    },
    doRefresh() {
      console.log("doRefresh");
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
    changeRowSelected($event) {
      console.log("changeRowSelected: $event=%s", JSON.stringify($event));
    },
    changeCellSelected($event) {
      console.log("changeCellSelected: $event=%s", JSON.stringify($event));
    }
  }
};
</script>