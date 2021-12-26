---
layout: Angular
title: 修改 Material Expansion Panel (手風琴) 標題高度
categories:
  - Angular Material
tags:
  - Angular
  - Angular Material
date: 2019/09/16
---

因為 Material Expansion Panel 展開後的高度是使用動畫高度產生
所以css設定過後 仍會被蓋過
除非是下 `!important`

但在展開的過程中 會有先變高再縮回去的不順效果

在 Material 提供了我們兩個方式去設定 
collapsedHeight  - 面板折疊時標題的高度。
expandedHeight  - 面板展開時標題的高度。

```html
<mat-expansion-panel>
  <mat-expansion-panel-header 
    collapsedHeight="48px"
    expandedHeight="48px"
  >
    <mat-panel-title>Title</mat-panel-title>
    <mat-panel-description></mat-panel-description>
  </mat-expansion-panel-header>
  Body
</mat-expansion-panel>
```

- 資料來源 [https://github.com/angular/components/issues/8383]()