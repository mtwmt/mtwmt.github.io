---
title: 使用 ag-grid 讀取 server 端分頁 ( Ag-grid server-side with paginated RESTful API and Angular )
categories:
  - agGrid
tags:
  - Angular
  - agGrid
date: 2019/08/19
---

先稍微介紹分頁會用到的 gridOptions 功能

- rowBuffer: 0; //在網格呈現的可滾動可視區域外部呈現的行數。預設為 20 有一個緩衝區意味著當用戶緩慢地垂直滾動時，表格將準備顯示行。
- rowSelection: 'multiple'; //多行選擇
- cacheOverflowSize: 2; //緩存大小
- maxConcurrentDatasourceRequests: 1; //最大並發數據源請求 發出 Requests 請求
- infiniteInitialRowCount: 1000; //最初允許在網格中滾動多少行。 一次幾行
- maxBlocksInCache: 10; //緩存中要保留多少頁面。

## 基本分頁設定

- pagination: true, // 是否開啟分頁功能 或 無限捲動
- rowModelType: 'infinite'
- cacheBlockSize: 20 一次下載 20 筆總筆教
- paginationPageSize: 10 一頁呈現 10 筆

```ts
import {
  IDatasource,
  IGetRowsParams,
  GridOptions,
  GridApi,
} from 'ag-grid-community';
// 此部份需引入 GridOptions, GridApi
gridApi: GridApi;
gridOptions: GridOptions = {
  pagination: true,
  rowModelType: 'infinite',
  cacheBlockSize: 20, // you can have your custom page size
  paginationPageSize: 20, //pagesize
};
```

getRows 函數為您提供特定頁面的開始和結束索引。
params.successCallback：它有兩個參數，
第一個是 api 資料
第二個是 api 資料總筆數
Ag-grid 使用第二個參數來決定總頁數。

餵給 getRows 的資料必需是 observable 屬性 讓它可被訂閱 被 subscribe 時 必需是 getRows 格式

如下

```ts
rowData = [
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Porsche', model: 'Boxter', price: 72000 },
];
```

```ts
dataSource: IDatasource = {
  getRows: (params: IGetRowsParams) => {
    // Use startRow and endRow for sending pagination to Backend
    // params.startRow : Start Page
    // params.endRow : End Page
    //replace this.apiService with your Backend Call that returns an Observable
    this.apiService().subscribe((response) => {
      params.successCallback(response.data, response.totalCount);
    });
  },
};
```

初始化設定

```ts
// API 讀取資料
apiService() {
  return this.httpclient.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json')
}

onGridReady(params: any) {
  this.gridApi = params.api;
  // api資料來源
  this.gridApi.setDatasource(this.dataSource) // replace dataSource with your datasource
}
```

HTML 設定

```html
<ag-grid-angular
  style="width: 100%; height: 100%;"
  class="ag-theme-balham"
  [gridOptions]="gridOptions"
  (gridReady)="onGridReady($event)"
>
</ag-grid-angular>
```

DEMO: [angular_ag-grid_infinite](https://stackblitz.com/edit/angular-aggrid-pagination)

參考資料：  
[https://stackoverflow.com/questions/47338347/ag-grid-server-side-pagination](https://stackoverflow.com/questions/47338347/ag-grid-server-side-pagination)  
[https://www.ag-grid.com/javascript-grid-infinite-scrolling/](https://www.ag-grid.com/javascript-grid-infinite-scrolling/)
