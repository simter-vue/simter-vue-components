# simter-vue-components changelog

## 1.3.1 2024-09-17

- Support multiple selected on st-button-group

## 1.3.0 2024-08-25

- Add right icon to st-button
- Add new component st-button-menu

## 1.2.0 2023-08-18

- Make component st-search compatible with `<st-search :value.sync="myVar" ...>`
  > Because since 1.1.0 st-search change to `<st-search v-model="myVar" ...>` 
- Use prop quick to control st-search trigger search event when condition changed
- Use prop cleanToSearch to control st-search trigger search event when click clean button
- Use prop closeToClean to control st-search clean condition when click close button

## 1.1.0 2023-08-16

- Add advance conditions for search component
  - Usage: `<st-search v-model="fuzzyValue" @search="doSearch" :advanceConfig="advanceConfig"></st-search>`
  - Document: <https://github.com/simter-vue/simter-vue-components/blob/master/src/search.vue#L181>
  - Example: <https://github.com/simter-vue/simter-vue-components/blob/master/demo/app.vue#L43>

## 1.0.0 2022-07-11

- Display `cell.label` as html

## 0.6.0 2022-01-13

- Grid component add toggle-select-all feature

## 0.5.1 2021-11-18

- Add requestOptions property for upload component
    > For add extras options for XMLHttpRequest 

## 0.5.0 2021-09-15

- New upload component

## 0.4.0 2021-04-14

- New Loader component
- Set grid component default position style to relative

## 0.3.0 2020-11-17

- Fix grid's row selection error
- Add clearSelection method for grid component
- Add deleteSelection method for grid component
- Fixed cell-index component error

## 0.2.0 2019-12-11

- Set vue root component instance as config function context

## 0.1.0 2019-08-02

- Init
- global components:
    - st-grid
    - st-colgroup
    - st-thead
    - st-table-row
    - st-data-row
    - st-cell-index
    - st-cell-sn
    - st-cell-sn-selectable
    - st-cell-text
    - st-cell-html
    - st-tooolbar
    - st-button
    - st-button-group
    - st-search
    - st-pagebar
    - st-pagebar-sizes