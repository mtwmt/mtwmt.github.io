---
title: 使用 RXJS 取消 http request
categories:
  - RxJS
tags:
  - Angular
  - RxJS
date: 2022/01/26
---

因為需求，有時後需要取消處理中的 http request
所以就來做個筆記吧

## subscription 方式

### TS

```ts
export class AppComponent {
  private subscription: Subscription = new Subscription();

  constructor(private httpClient: HttpClient) {}

  fetchProd(): Observable<any> {
    const url = `https://fakestoreapi.com/products`;
    return this.httpClient.get<any>(url).pipe(
      catchError((err, caught) => {
        console.error(err);
        throw err;
      })
    );
  }

  onRequest() {
    this.subscription = this.fetchProd().subscribe((res) => {
      console.log('getData', res);
    });
  }

  onCancel() {
    this.subscription.unsubscribe();
    console.log('cancel');
  }
}
```

### HTML

```html
<button class="p-10" (click)="onRequest()">Request</button>
<button class="p-10" (click)="onCancel()">Cancel</button>
```

---

## takeUntil 方式

模擬另一種情境，比如說在 ngrx 裡處理，這裡寫的很簡略，只寫了方法，但沒有 ngrx 的寫法

```ts
export class AppComponent {
  private onDestroy$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private httpClient: HttpClient) {}

  fetchProd(): Observable<any> {
    const url = `https://fakestoreapi.com/products`;
    return this.httpClient.get<any>(url).pipe(
      catchError((err, caught) => {
        console.error(err);
        throw err;
      })
    );
  }

  onRequest() {
    this.onDestroy$.next(false);

    of('test')
      .pipe(
        switchMap((data) => {
          return this.fetchProd().pipe(
            takeUntil(this.onDestroy$.pipe(filter((v) => v)))
          );
        })
      )
      .subscribe((res) => {
        console.log('getData', res);
      });
  }

  onCancel() {
    this.onDestroy$.next(true);
    console.log('cancel');
  }
}
```
