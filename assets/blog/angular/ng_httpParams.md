---
layout: angular
title: Angular HttpParams
categories:
  - Angular
tags:
  - Angular
date: 2020/11/03
---

這篇記錄著關於如何使用 Angular `HttpParams`
且 HttpParams 接收的參數值必定要轉為`字串`才可以

在 service.ts 引入

```ts
import { HttpClient, HttpParams } from '@angular/common/http';

constructor(
  private http: HttpClient
) {}
```

## GET

```ts
fetchRepos( params ):Observable<any> {
  const url = `localhost:4000/`
  return this.httpClient.get(url, {
    params: new HttpParams()
      .set('page', params.page)
      .set('sort', params.name)
  })
}
// localhost:4000/?page=2&sort=name
```

---

以上是基本的傳參數方式，然而 Angular 提供了一些方法讓我們使用

### HttpParams.set

```ts
set(param: string, value: string): HttpParams;
```

若參數已存在 則後面會取代前面

```ts
params = new HttpParams().set('page', '2').set('page', '3').set('sort', 'name');

console.log(params.toString()); //Returns page=3&sort=name
```

或

```ts
let params = new HttpParams();

params = params.set('page', '2');
params = params.set('sort', 'name');

console.log(params.toString()); //Returns page=2&sort=name
```

### HttpParams.append

```ts
append(param: string, value: string): HttpParams;
```

無論參數是否存在 都會附加上去

```ts
params = new HttpParams().set('page', '2').append('page', '3').set('sort', 'name');

console.log(params.toString()); //Returns page=2&page=3&sort=name
```

或

```ts
let params = new HttpParams();

params = params.append('page', '2');
params = params.append('sort', 'name');

console.log(params.toString()); //Returns page=2&sort=name
```

---

## 另一種傳遞方式

### 參數如果是字串

```ts
let params = new HttpParams({
  fromString: 'page=' + PageNo + '&sort=' + SortOn,
});
```

### 參數如果是物件

```ts
let params = new HttpParams({
  fromObject: { page: PageNo, sort: SortOn },
});
```

---

最後 如果傳來的參數很多 且需要過瀘空值的話 那個寫個 function 來處理吧

```ts
getQueryParams(source: Object): HttpParams {
  let target: HttpParams = new HttpParams();
  Object.keys(source).forEach((key: string) => {
    const value: string | number | boolean | Date = source[key];
    if (typeof value !== 'undefined' && value !== null) {
      target = target.append(key, value.toString());
    }
  });
  return target;
}
```

---

參考資料：
https://github.com/angular/angular/issues/23856
[URL Parameters, Query Parameters, httpparams in Angular HttpClient](https://www.tektutorialshub.com/angular/angular-pass-url-parameters-query-strings/)
