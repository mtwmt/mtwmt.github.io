---
title: 如何在 Angular 取得當前頁面的絕對路徑
categories:
  - Angular
tags:
  - Angular
  - pipe
  - ironman2021
date: 2021/10/02
---

## 情境

當有一個連結需要另開新頁時，在 develop 或 production 需要對應到正確的路徑
Angular 提供了這個方式 https://angular.tw/api/common/Location#prepareexternalurl

---

## 實作一個外埠連結 url 的 pipe

所以我就做了以下的 pipe，在有需要的時後，直接幫我轉換

建立一個 pipe 名為 externalUrl

```bash
ng g p externalUrl
```

pipe.ts

```ts
import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';

@Pipe({
  name: 'externalUrl',
})
export class ExternalUrlPipe implements PipeTransform {
  constructor(private location: Location) {}

  transform(url: string, ...queryParams: Object[]): unknown {
    const setQueryParams = queryParams.length
      ? `?${String(this.getQueryParams(queryParams?.[0]))}`
      : '';
    return this.location.prepareExternalUrl(url) + setQueryParams;
  }

  getQueryParams(source: any): HttpParams {
    let target: HttpParams = new HttpParams();
    Object.keys(source).forEach((key: string) => {
      const value: string | number | boolean | Date = source[key];
      if (typeof value !== 'undefined' && value !== null) {
        target = target.append(key, value.toString());
      }
    });
    return target;
  }
}
```

---

## 使用 pipe

在 template 裡

```html
<a [href]="'../ithome/externalUrl' | externalUrl: {name: external}">外部網址</a>
```

實際網址 => http://外部網址//ithome/externalUrl?name=external

---

用在 ts 裡，首先要先把 pipc 注入

```ts
providers: [ExternalUrlPipe],
```

.ts

```ts
this.externalUrlPipe.transform('../ithome/externalUrl', { name: 'external' });
```

---

參考資料：
[為自訂資料轉換建立管道](https://angular.tw/guide/pipes#creating-pipes-for-custom-data-transformations)
https://angular.tw/api/common/Location#prepareexternalurl
