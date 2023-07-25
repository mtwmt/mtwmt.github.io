---
title: Angular 轉換 API 資料格式 (Adapter)
categories:
  - Angular
tags:
  - Angular
  - TypeScript
  - ironman2021
date: 2021/09/29
---

今天的內容屬於設計模式的一種。
當我們從後端接到資料後，有時後資料格式往往不是如我們所想，所以會再加工做個轉換的動作。
所以就要使用 `TypeScript` 來做個轉接器，轉成我們所需的資料！

就拿前幾天的文章　[Angular 如何取得 API 資料](https://ithelp.ithome.com.tw/articles/10270252) 繼續做介紹囉

---

## 轉換資料格式

這是原 api 取得的資料格式

```json
{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use and walks in the forest...",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}
```

想轉換為這樣的資料格式

```json
{
  "ngTitle": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "ngDescription": "Your perfect pack for everyday use and walks in the forest...",
  "ngCategory": "men's clothing",
  "ngImage": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
}
```

---

## 建立一個 model.ts

model.ts

```ts
// 欲轉成的資料格式
export class List {
  constructor(
    public ngTitle: string,
    public ngCategory: string,
    public ngImage: string,
    public ngDescription: string
  ) {}
}

// 注入到 root
@Injectable({
  providedIn: 'root',
})
export class ListAdapter {
  adapt(item: any): List {
    return new List(item.title, item.category, item.image, item.description);
  }
}
```

---

service.ts

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { List, ListAdapter } from './app.model';

@Injectable()
export class AppService {
  constructor(
    private httpClient: HttpClient,
    private listAdapter: ListAdapter
  ) {}

  fetchProd(): Observable<List[]> {
    const url = `https://fakestoreapi.com/products`;
    return this.httpClient.get<any>(url).pipe(
      map((list) => {
        // 接到資料後做轉換
        return list.map((item) => this.listAdapter.adapt(item));
      }),
      catchError((err, caught) => {
        throw err;
      })
    );
  }
}
```

資料就會轉成我們需要的格式了

![](/assets/images/ironman/ng_adapter-data/3cRgvNU.png)

---

## 後記

今天的文章比較偏向設計模式的應用，當專案越來越大時，程式碼藕合度越低越好，避免牽一髮而動全身，改了 A 壞了 B 而花更多時間找問題點

---

範例：[https://stackblitz.com/edit/angular-ivy-zsnxup](https://stackblitz.com/edit/angular-ivy-zsnxup)

參考資料：
[Consuming APIs in Angular: The Model-Adapter Pattern](https://dev.to/florimondmanca/consuming-apis-in-angular--the-model-adapter-pattern-3fk5/)
[适配器模式](https://refactoringguru.cn/design-patterns/adapter)
