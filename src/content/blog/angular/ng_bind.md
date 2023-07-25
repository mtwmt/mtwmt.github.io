---
title: Angular 繫結方式
categories:
  - Angular
tags:
  - Angular
date: 2019/07/17
---

Angular 共有四種資料繫結的方法

## 內嵌繫結

```html
<p>{{ title }}</p>
```

## 屬性繫結

`[property]='statement'`

```html
<p [ngClass]="{'is-on': item === true}">這是內文</p>
```

## 事件繫結

`(event)='someMethod($event)'`

```html
<button (click)="doFunction()"></button>
```

```js
doFunction(){
  doSomeThing...

  return result;
}
```

## 雙向繫結

`[(ngModel)]='property'`

component.ts

```js
export class Component {
  keyword = '';
}
```

component.html

```html
<input type="[(ngModel)]" ="keyword" /> {{keyword}}
```

app.module.ts 要多 import FormsModule 才能正常執行

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// 新增
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule // 新增
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```
