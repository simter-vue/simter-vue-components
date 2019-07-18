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
      :style="{width: width, height: height, border: '1px solid #666'}"
      :columns="columns"
      :rows="rows"
    >
      <template #bottom>
        <st-button @click.native="refresh">Refresh</st-button>
        <st-pagebar :page-no="pageNo" :page-size="pageSize" :total="total" @change="changePagebar"></st-pagebar>
        <st-button-group :items="items" :active-item="activeItem" @change="changeItem"></st-button-group>
      </template>
    </st-grid>

    <blockquote>Column 'Website' is auto width.</blockquote>
  </div>
</template>

<script>
import stGrid from "../src/grid.vue";
import stPagebar from "../src/pagebar.vue";
import stButton from "../src/button.vue";
import stButtonGroup from "../src/button-group.vue";
export default {
  components: { stGrid, stPagebar, stButton, stButtonGroup },
  data() {
    return {
      unit: "em",
      customWidth: true,
      widthValue: 44,
      customHeight: true,
      heightValue: 15,
      pageNo: 1,
      pageSize: 25,
      total: 101,
      items: ["A", "B", "C"],
      activeItem: "B",
      columns: [
        { label: "SN", cell: "st-cell-sn", width: "2.5em" }, // test st-cell-sn (global)
        { label: "Index", cell: "st-cell-index", width: "4em" }, // test st-cell-index
        { id: "id", label: "ID", width: "5em" }, // test st-cell-text (default)
        { id: "name", label: "Name", width: "7em" }, // test st-cell-text (default)
        { id: "website", label: "Website", width: "auto" }, // test st-cell-text (default),
        {
          // test st-cell-fn
          label: "Link",
          width: "3em",
          cell: {
            component: "st-cell-fn",
            fn(row, rowIndex) {
              return row.website
                ? `<a href="https://${row.website}">Go</a>`
                : "";
            },
            isHtml: true
          }
        },
        {
          label: "Partners",
          children: [
            { label: "GSN", cell: "st-cell-sn", width: "3.5em" }, // test st-cell-sn (global)
            {
              pid: "partners",
              label: "SN",
              cell: "st-cell-sn",
              width: "2.5em"
            }, // test st-cell-sn (local)
            { pid: "partners", id: "name", label: "Name", width: "4em" }
          ]
        },
        {
          label: "Commiters",
          children: [
            {
              pid: "commiters",
              label: "SN",
              cell: "st-cell-sn",
              width: "2.5em"
            },
            { pid: "commiters", id: "name", label: "Name", width: "4em" }
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
          commiters: [{ name: "C 41" }, { name: "C 42" }]
        },
        {
          id: "doge",
          name: "DogeDoge",
          website: "dogedoge.com",
          partners: [{ name: "P 51" }, { name: "P 52" }, { name: "P 53" }],
          commiters: [{ name: "C 51" }, { name: "C 52" }]
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
    refresh() {
      console.log("Refresh");
    },
    changePagebar(type, pageNo, pageSize) {
      console.log("changePagebar: type=%s, pageNo=%s, pageSize=%s", type, pageNo, pageSize);
      this.pageNo = pageNo;
      this.pageSize = pageSize;
    },
    changeItem(item, index) {
      console.log("changeItem: index=%s, item=%s", index, item);
    }
  }
};
</script>
<style>
input {
  background-color: inherit;
  color: inherit;
}
</style>
