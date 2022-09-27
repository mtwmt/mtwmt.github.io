---
layout: angular
title: Angular Window Resize Event (偵測視窗縮放事件)
categories:
  - Angular
tags:
  - Angular
date: 2022/09/28
---

偶然發現 Angular 有蠻多種方式可以偵到一些視窗事件，順手記錄下來

## template 傳送事件

```html
<div (window:resize)="onResize($event)"></div>
```

```ts
onResize(event: Event) {
  event.target.innerWidth;
}
```

---

## HostListener

```ts
@HostListener('window:resize', ['$event'])
onResize(event) {
  event.target.innerWidth;
}
```

---

## Component host

```ts
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})

onResize(event: Event) {
  event.target.innerWidth;
}
```

---

## RxJS

```ts
@Component({
  ...
})
export class AppComponent implements OnInit, OnDestroy {
  resizeObservable$: Observable<Event> = fromEvent(window, 'resize');
  resizeSubscription$!: Subscription;

  ngOnInit(): void {
     this.resizeSubscription$ = this.resizeObservable$.subscribe((e) => {
      // do Something
    });
  }

  // 離開後解訂閱
  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }
}

```

在 `subscribe` 前 可再多做些設定，當 resize 時，不用一直觸發，300ms 偵測一次就好

```ts
this.resizeSubscription$ = this.resizeObservable$
  .pipe(debounceTime(300))
  .subscribe((e) => {
    // do Something
  });
```

---

## 如何一開始就偵側到視窗大小

```ts
@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent implements OnInit, OnDestroy {
  // 初始化
  initial$ = of(window).pipe(
    map((event: any) => {
      return {
        width: event.innerWidth,
        height: event.innerHeight,
      }
    })
  )
  // 當視窗拖動的時後
  resize$ = fromEvent(window, "resize").pipe(
    map((event: Event) => {
      return {
        width: event.target.innerWidth,
        height: event.target.innerHeight,
      }
    })
  );
  winSize$ = merge(this.resize$, this.initial$).pipe(distinctUntilChanged());
  subscription$!: Subscription;
  constructor() {}

  ngOnInit(): void {
    this.subscription$ = this.winSize$.subscribe({ width, height} => {
      console.log('width', width, 'height', height);
    });
  }

  ngOnDestroy() {
    // 記得解訂閱
    this.subscription$.unsubscribe();
  }
}
```
