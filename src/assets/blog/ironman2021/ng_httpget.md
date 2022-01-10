---
layout: angular
title: Angular 如何取得 API 資料
categories:
  - Angular
tags:
  - Angular
  - RxJS
  - ironman2021
date: 2021/09/23
---

既然昨天已經說了 http post 這件事，那今天就來說說 http get 這部份吧！

今天的資料依然使用 [FakeStoreAPI](https://fakestoreapi.com/docs)
樣式套用 [Angular Material](https://material.angular.io/)

## 情境

從 api 取得列表後，把資料渲染到 html 上

---

## import Module

`app.module.ts` import HttpClientModule，

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material-module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, // 使用於 http 請求
    FormsModule,
    MaterialModule, // Angular Material
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

---

## 建立服務

建立一個 service 放置 api
service.ts

```ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";

@Injectable()
export class AppService {
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
}
```

記得 `catchError` 這裡可以處理 API 錯誤時，決定怎麼樣的動作

---

## 取得 API 資料 渲染到頁面上

.ts

```ts
import { Component, OnInit } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AppService } from "./app.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [AppService], // 將 AppService 的服務注入
})
export class AppComponent implements OnInit {
  products$ = new Observable<any>();

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.products$ = this.appService.fetchProd();
  }
}
```

.html

```html
<ng-container *ngIf="products$ | async as products">
  <ng-container *ngFor="let item of products">
    <div class="products">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ item.title }}</mat-card-title>
          <mat-card-subtitle>{{ item.category }}</mat-card-subtitle>
        </mat-card-header>
        <img mat-card-image src="{{ item.image }}" />
        <mat-card-content>
          <p>{{ item.description }}</p>
        </mat-card-content>
      </mat-card>
    </div>
  </ng-container>
</ng-container>
```

這裡使用 Async Pipe 將資料渲染出來，直接從 template 訂閱資料即可

---

範例：[https://stackblitz.com/edit/angular-ivy-6bbh3n](https://stackblitz.com/edit/angular-ivy-6bbh3n)
