---
layout: Angular
title: Angular 組件傳值
categories:
  - Angular
tags:
  - Angular
date: 2019/07/20
---

# 父子組件互傳( input output )

一張圖說明 input 與 output 值的互相傳遞
<img src="assets/images/angular/emit/input-output.png" />

## 父組件 傳值給 子組件

```js
// 父組件
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: ` <app-child [dataSource]="data"></app-child> `,
  styleUrls: [''],
})
export class AppComponent {
  data = '我是一筆資料';
  constructor() {}
}

// child 子組件
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-child',
  template: ` <div>{{ dataSource }}</div> `,
  styleUrls: [''],
})
export class ListComponent {
  @Input() dataSource: string;
  constructor() {}
}
```

## 透過 setting 監聽

[透過 setter 截聽輸入屬性值的變化](https://angular.tw/guide/component-interaction#intercept-input-property-changes-with-a-setter)

```html
<!-- html 傳值 -->
<app-name [name]="'this is a value'"></app-name>
```

```js
// name.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-name',
  template: '<h3>"{{name}}"</h3>'
})
export class NameChildComponent {
  private _name = '';
  @Input()
  set name(params: string) {
    // 傳進來的 params => this is a value
    // do Something....
    params = 'aaa'  // 將 params 改為 aaa 後
    this._name = params;
  }

  get name(): string {
    // 回傳出去的值 就是 aaa
    return this._name;
  }
}
```

## 子組件 傳值給 父組件

```js
// 父組件
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <app-child (doOpen)="getOpen($event)"></app-child> `,
  styleUrls: [''],
})
export class AppComponent {
  isOpen;
  constructor() {}
  getOpen(data: any) {
    this.isOpen = data;
  }
}

// child 子組件
import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: [''],
})
export class ChildComponent {
  @Output() doOpen: EventEmitter<any> = new EventEmitter();
  isOpen = false;
  constructor() {}
  open() {
    this.isOpen = !this.isOpen;
    this.doOpen.emit(this.isOpen);
  }
}
```

---

# 組件與組件之間的傳值(service)

把需要傳遞的 data 存到 service 裡然後再到 service 裡存取需要用的值

分別建立一個 list 跟 detail 的 compontent

- list compontent

```js
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
@Component({
  selector: 'app-list',
  template: `<ul class="tab">
    <li (click)="doTab('about')">about</li>
    <li (click)="doTab('news')">news</li>
    <li (click)="doTab('contact')">contact</li>
  </ul>`,
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit() {
  }
  doTab( str:string ){
    this.storeService.getTabVal( str )
  }
}
```

- detail compontent

```js
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
@Component({
  selector: 'app-detail',
  template: `
  <hr />
  <p>{{ detailData }}</p>`,
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  detailData;

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.storeService.tabVal.subscribe( res => {
      this.detailData = res;
    })
  }
}
```

- store.service (用來負責存取資料的地方 當做一個小型資料庫)

```js
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  tabVal$ = new Subject();
  constructor() {}
  getTabVal(str: string) {
    this.tabVal$.next(str);
  }
}
```

[https://stackblitz.com/edit/angular-service-passvalue](https://stackblitz.com/edit/angular-service-passvalue)

參考資料：

[Angular - 元件之間的互動](https://angular.tw/guide/component-interaction)
