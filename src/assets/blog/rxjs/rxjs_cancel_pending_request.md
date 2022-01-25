---
layout: rxjs
title: 使用 RXJS 取消 http request
categories:
  - Angular
tags:
  - Angular
  - rxjs
date: 2022/01/26
---

因為需求，有時後需要取消處理中的 http request
所以就來做個筆記吧


## TS
```ts
export class AppComponent {
  private subscription: Subscription = new Subscription();

  constructor(private httpClient: HttpClient) {}
  
  fetchProd(): Observable<any> {
    const url = `https://fakestoreapi.com/products`;
    return this.httpClient.get<any>(url).pipe(
      takeUntil(this.onDestroy$),
      catchError((err, caught) => {
        console.error(err);
        throw err;
      })
    );
  }

  onRequest() {
    this.subscription = this.fetchProd().subscribe((res) => {
      console.log("getData", res);
    });
  }

  onCancel() {
    this.subscription.unsubscribe();
    console.log("cancel");
  }
}
```

## HTML
```html
<button class="p-10" (click)="onRequest()">Request</button>
<button class="p-10" (click)="onCancel()">Cancel</button>
```
