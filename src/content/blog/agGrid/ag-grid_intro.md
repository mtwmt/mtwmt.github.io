---
title: agGrid 介紹
categories:
  - agGrid
tags:
  - Angular
  - agGrid
date: 2020/03/28
---

agGrid 是個非常強大的表格套件
在撰寫上 大部份都是使用配置的概念做設定

在一開始 agGrid 分別做了 Grid Interface 與 Column Interface 兩大接口
所有的設定就從這兩大接口開始...

以下將會以 Angular 的寫法來介紹

---

### HTML 部份

```html
<ag-grid-angular
  style="width: 100%; height: 500px;"
  class="ag-theme-balham"
  [rowData]="rowData"
  [columnDefs]="columnDefs"
  [gridOptions]="gridOptions"
  (gridReady)="onGridReady($event)"
>
</ag-grid-angular>
```

主要由 欄位名稱 (columnDefs) 與 資料列 (rowData) 組成

- [rowData]="rowData"
- [columnDefs]="columnDefs"
  ... 等 表格載入設定資料

接著由 `gridOptions` 載入各種表格裡的各種設定

- (gridReady)="onGridReady(\$event)"

當表格載入完成後 可接收 agGrid event 裡的 API 進而設定表格
[Grid API](https://www.ag-grid.com/javascript-grid-api/)

[AGgrid 事件結構](https://www.ag-grid.com/javascript-grid-events/#properties-and-hierarchy)

---

### JS 部份

```js
gridOptions: GridOptions = {
  // 預設所有 column 配置
  defaultColDef: {
    headerValueGetter: (obj) => {  return obj; }   //設定標題預設值
  }
  // 欄位分類
  columnTypes: {
    "nonEditableColumn": {editable: false},
  }
};

// 針對各個 column 做配置
columnDefs: [
  {
    field: 'make', // 主要用來對應 rowdata 的名字
    headerName: 'make',
    width : 100,
    type: 'nonEditableColumn',
    cellRenderer: '',
    ...
  },
  { field: 'make' },
  { field: 'price' },
];

//  對應到 rowData
rowData = [
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Porsche', model: 'Boxter', price: 72000 }
];
```

---

# Grid 屬性配置 ( Grid Properties )

## GridOptions

用於 agGrid 初始預設設定

[所有配置表格的屬性 都在這裡設定](https://www.ag-grid.com/javascript-grid-properties/)

### Grid API

用來更新 agGrid 初始設定

### columnDefs

更多的 columnDefs 可觀看 [GIT 原始碼](https://github.com/ag-grid/ag-grid/blob/master/community-modules/core/src/ts/entities/colDef.ts#L75) 做挑選

踩雷經驗：

- colId: 如果沒設會自動產生來確保唯一值，以比重來說 應該就像是 css 裡的 `!important` 吧，加上它之後 會將 column 提到最前面
  > 雷點：在編輯欄位的時後若沒有設定，在欄位異動後 colId 則會再名字後面加上 `_1`，若是用 colID 來取值的話 就會很容易噴錯，後來我就使用 field 來取值了 ㄏㄏ

https://www.ag-grid.com/javascript-grid-column-definitions/#column-ids

### columnTypes

可對每個 column 做分類，分群組
比如 可編輯的 column 一組，不可編輯的一組

對應方式寫法如下

```js
columnDefs: [
  {
    headerName: 'Make',
    field: 'make',
    type: 'nonEditableColumn',
  },
  {
    headerName: 'Model',
    field: 'model',
    type: ['nonEditableColumn','numberColumn'],
  },
];
columnTypes: {
  nonEditableColumn: { editable: false },
  numberColumn: {
    width: 130,
    filter: 'agTextColumnFilter',
  },
}

```

https://www.ag-grid.com/javascript-grid-column-definitions/#default-column-definitions

---

## Grid API

[GIT 源碼](https://github.com/ag-grid/ag-grid/blob/master/community-modules/core/src/ts/gridApi.ts)

https://www.ag-grid.com/javascript-grid-api/

表格讀取完成後 可用來做後續的調整設定
如：更新資料，新增欄或列

---

## Grid Events

[設定表格事件](https://www.ag-grid.com/javascript-grid-events/)

了解 agGrid 的層級架構
https://www.ag-grid.com/javascript-grid-events/#properties-and-hierarchy

才能知道事件需用在哪個地方 哪種設定的 api 會對應怎麼樣名稱的事件

在每個 cell(單個小格) 裡 有時後需要做些各別的設定 就會使用到
主要是設定在 `GridOptions` 裡，比如 欄位的編輯，呈現方式等

就有待慢慢去挖掘了。

附上 [Demo](https://stackblitz.com/edit/angular-aggridsample) 頁

---

後記 在寫這篇的時後 發現 agGrid 已經更新到 23 版了
多了許多 css 的樣式可以挑選 也可以自己定義樣式
可至 https://www.ag-grid.com/javascript-grid-themes-provided/ 觀看介紹
