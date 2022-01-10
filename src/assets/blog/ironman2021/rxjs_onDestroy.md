---
layout: angular
title: Rxjs 各種解訂閱方式
categories:
  - RxJS
tags:
  - RxJS
  - Angular
  - ironman2021
date: 2021/09/24
---

昨天說到了將資料訂閱出來渲染在頁面上的事，那麼就就來說說 RxJs 解訂閱這件事吧。
這也是為了避免 memory leak，或重覆訂閱所造成的 BUG，若非有限訂閱，通常在訂閱離開後，都需要解訂閱。

---

## 轉換為的 Observable

### first

只執行第一次，通常用於第一次進來讀取成功取得資料後，就不需再次執行

```ts
export class RxjsOndestroyComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject();
  private timer$: Observable<number> = timer(0, 1000);

  constructor() {}

  ngOnInit(): void {
    this.timer$.pipe(first()).subscribe((time) => {
      console.log("time", time);
      this.count = time;
    });
  }
}
```

---

### take(1)

只發生一次

```ts
export class RxjsOndestroyComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject();
  private timer$: Observable<number> = timer(0, 1000);

  constructor() {}

  ngOnInit(): void {
    this.timer$.pipe(first()).subscribe((time) => {
      console.log("time", time);
      this.count = time;
    });
  }
}
```

[take1 與 first 差異](https://stackoverflow.com/questions/42345969/take1-vs-first)

---

### takeUntil

持續執行，直到離開

```ts
export class RxjsOndestroyComponent implements OnInit, OnDestroy {
  private destroy$: Subject = new Subject<void>();
  private timer$: Observable<number> = timer(0, 1000);

  constructor() {}

  ngOnInit(): void {
    this.timer$.pipe(takeUntil(this.destroy$)).subscribe((time) => {
      console.log("time", time);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
```

---

## unsubscribe

```ts
export class RxjsOndestroyComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private timer$: Observable<number> = timer(0, 1000);

  constructor() {}

  ngOnInit(): void {
    this.subscription.add(
      this.timer$.subscribe((time) => {
        console.log("time", time);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
```

---

## 使用 Async Pipe

template

```html
<div>{{ timer$ | async }}</div>
```

ts

```ts
export class RxjsOndestroyComponent implements OnInit, OnDestroy {
  timer$: Observable<number> = timer(0, 1000).pipe(
    tap((time: number) => console.log("time", time))
  );
}
```

當 component 離開時，AsyncPipe 會自動取消訂閱

---

## 有限的 Observable

在 Angular 裡，有一些 Observable 離開後就會自動取消訂閱

裡面包含了：

- HTTP
- router 與 ActivatedRoute
- reactive forms 裡的 valueChanges 與 statusChanges

---

參考資料：
[Angular 中的可觀察物件](https://angular.tw/guide/observables-in-angular)
