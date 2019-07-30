# table component design

## Grid Component

Props/columns:

```
[
  {
    id: "sn",
    label: "SN",
    width: "2.5em",
    cell: "st-cell-sn",       // String > component name, default st-cell
    cell: {                   // {}
      component: "st-cell-sn",  // component name or config
      text: "test",             // innerText
      html: "<b>test</b>",       // innerHTML
      click({target, row, value}){
        console.log("click by column.cell.on.click config")
      }
    },
    cell(row, index) { // function > content by st-cell component
      return "test"             // innerText
      return {          
        html: "<b>test</b>"     // innerHTML
      }
      return {                  // full {}
        component: "st-cell-sn",
        text: "",
        html: "<b>test</b>"
      }
    },
    class: "test",
    style: {},
    children: [
      {
        pid: "items",   // without pid: value=row["name"]
        id: "name",     // value=row["items"][index]["name"]
        ...
      }
    ],
    headerCell: ...    // like cell
  },
  ...
]
```

Props:

| Name    | Required | ValueType | DefaultValue | Description |
|---------|----------|-----------|--------------|-------------|
| columns | true     |           | -            |             |
| rows    | true     |           | -            |             |
| classes | false    | {}        | -            |             |
| styles  | false    | {}        | -            |             |

- classes: { ..., contentRow, contentCell }
- styles: { ..., contentRow, contentCell }
- contentRow: { ..., cell }

Events:

| Name         | Params                  |
|--------------|-------------------------|
| row-click    | { row, index, selected} |
| row-dblclick | { row, index}           |

## DataRow Component

> It is a functional component because DataRow and TableRow has OneToMany relation.

Props:

| Name      | Required | ValueType         | DefaultValue | Description                                             |
|-----------|----------|-------------------|--------------|---------------------------------------------------------|
| value     | true     | {}                | -            | The value of `grid.rows[index]`                         |
| index     | true     | Int               | -            | The array index within `grid.rows`                      |
| tableRows | true     | \[TableRowConfig] | -            | The config for `tr` elements relative to this `DataRow` |
| selected  | false    | Boolean           | false        | Whether this `DateRow` is include in `grid.selection`   |

## TableRow Component

Props:

| Name          | Required | ValueType          | DefaultValue | Description                                                                     |
|---------------|----------|--------------------|--------------|---------------------------------------------------------------------------------|
| index         | true     | Int                | -            | The nested item index                                                           |
| tableRowIndex | true     | Int                | -            | The array index within `table.rows`. It's the `tr` index within `table` element |
| dataRowIndex  | true     | Int                | -            | The row index within `grid.rows`                                                |
| cells         | true     | \[TableCellConfig] | -            | The config for `td` elements relative to this `TableRow`                        |
| selected      | true     | Boolean            | false        | Whether this `TableRow` is include in `dateRow.selection`                       |
| classes       | false    | {}                 | -            |                                                                                 |
| styles        | false    | {}                 | -            |                                                                                 |

Computed:

| Name | ValueType | Description   |
|------|-----------|---------------|
| row  | {}, Array | DataRow.value |

TableRow/td:

| Name         | Required | ValueType | DefaultValue | Description                         |
|--------------|----------|-----------|--------------|-------------------------------------|
| rowspan      | false    | Int       | -            | The attribute value of `td.rowspan` |
| colspan      | false    | Int       | -            | The attribute value of `td.colspan` |
| column.class | false    | {}        | -            |                                     |
| classes.td   | false    | {}        | -            |                                     |
| styles.td    | false    | {}        | -            |                                     |

TableRow/td events:

| Name       | Params               |
|------------|----------------------|
| cell-click | {target, row, value} |

## TableCell Component

Props:

| Name    | Required | ValueType | DefaultValue | Description            |
|---------|----------|-----------|--------------|------------------------|
| value   | false    | Any       | -            | The value of this cell |
| column  | false    | {}        | -            |                        |
| classes | false    | {}        | -            |                        |
| styles  | false    | {}        | -            |                        |

Computed:

| Name  | ValueType | Description    |
|-------|-----------|----------------|
| row   | {}, Array | DataRow.value  |
| index | Int       | TableRow.index |

Events:

| Name       | Params     |
|------------|------------|
| cell-click | { target } |

Computed:

| Name        | Description             |
|-------------|-------------------------|
| columnIndex | The global column index |
| rowIndex    | The global row index    |
| tableRow    | The TableRow instance   |
| dataRow     | The DataRow instance    |
