---
layout: rxjs
title: RxJS 概念
categories:
  - RxJS
tags:
  - RxJS
date: 2020/03/27
---

## Observable 可觀察物件
連續性發生的資料 (主體) ，沒有寫 subscribe 是不會被執行的 
要下了後才會被啟動 在執行過程中 隨時可以中斷行為

```js
var click$ = fromEvent(document, 'click');
```

## Observer 觀察者物件
註冊到(Observable)

next: Observer 接收到一個值 (.then
error: Observer 接收到一個錯誤 (.error
complete: Observer 接收到完成的訊息 (額外

```js
var observer = { next: (x) => console.log(x) };
```

## Subscription 訂閱物件

用來訂閱正在執行的 Observable / Observer 
離開時必需取消訂閱 ( 很重要 )


```js
// 訂閱：
var subs$ = click$.subscribe(observer);

// 取消訂閱：
subs$.unsubscribe();
```

簡化寫法
```js
var subs$ = click$.subscribe( x => console.log(x) );
```

## Operators (lodash) 運算式 
做轉型 過濾類別

```js
// 透過解構賦值取得 operators 的屬性
const { filter, take } = rxjs.operators

click$ = click$.pipe(
  filter( x => x.clientX < 100),
  take(2)
)
```
[釐清幾個超容易混淆又很常用的 RxJS 運算子 (Operators)](https://blog.miniasp.com/post/2018/09/06/Clarify-some-confused-RxJS-operators)


## Subject 像是一個報社的概念 純手工控制流程

本身就是一個 Observable 也是 一個 Observer
可以手動 push 東西進去 就會有結果出來
可以手動控制值如何傳遞

可以用在廣播概念

---

### RxJS 寫法

主要是以聲明式的思考邏輯下去做撰寫 
可參考 [JavaScript函數式編程：聲明式與命令式](https://blog.csdn.net/longzhoufeng/article/details/78802836)

```js
const { interval } = rxjs;
const { take } = rxjs.operators;

// 建立運算子
interval(500)
  .pipe(
    //過濾運算子
    take(4)
  )
  // 回傳訂閱物件(Subscription)
  .subscribe( res => {
    // 觀察者(Observer)
    console.log(res);
  })
```

在 pipe 裡 可以運用各式各樣的 operators 將觀察的值做轉換
經過一連串的整理後 subscribe 出最後的值



參考資料：
[RxJS6 新手入門 影片](https://www.facebook.com/will.fans/videos/1552089998288836/?notif_id=1584964670151136&notif_t=live_video_schedule_viewer)
[RxJS6 新手入門 簡報](https://www.slideshare.net/WillHuangTW/rxjs-6-getting-started/)
[希望是最淺顯易懂的 RxJS 教學](https://blog.techbridge.cc/2017/12/08/rxjs/)
[Explore all RxJS operators 探索所有RxJS運算符](https://reactive.how/rxjs/takeWhile)
[RxJS6 中文手冊](https://cn.rx.js.org/)
