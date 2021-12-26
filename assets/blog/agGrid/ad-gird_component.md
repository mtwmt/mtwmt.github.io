---
layout: agGrid
title: 更改 ag-grid 資料欄位顯示 ( ag-grid component )
categories:
  - agGrid
tags:
  - Angular
  - agGrid
date: 2019/10/19
---

在 gridOptions 加上 frameworkComponents

```js
gridOptions = {
  frameworkComponents: {
    customizedComponent: CustomizedComponent,
  },
};
```

在相對應的 columnDefs 裡設定

```js
columnDefs = [
  {
    headerName: 'Row',
    field: 'row',
    width: 150,
    // 針對這一個欄位的內容做調整 可使用自訂義組件
    cellRenderer: 'customizedComponent',
    // 新增 component 內容參數
    cellRendererParams: {
      color: '#159',
    },
  },
];
```

[自訂義組件](https://www.ag-grid.com/javascript-grid-components/#registering-custom-components)

或

```js
columnDefs = [
  {
    // 針對這一個欄位的內容做調整
    cellRenderer: function(params) {
      // return ...do something
    },
  },
];
```

DEMO: [angular_ag-grid_component](https://stackblitz.com/edit/angular-aggrid-component)
