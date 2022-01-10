---
layout: angular
title: Angular 路由守衛
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/10/06
---

我們在開發的過程中，經常會遇到需要某些權限才能進入的頁面，這時後就會需要路由守衛的機制啦，
而它最常用在登入畫面時

---

## 快速建立

Angular CLI 提供了命令列工具，可以快速建立路由守衛框架檔案：

```bash
ng generate guard auth
```

或

```bash
ng g g auth
```

官網介紹：[guard](https://angular.tw/cli/generate#guard)

執行後，Angular CLI 會問我們需要實現哪些介面，我們直接勾選即可

```bash
? Which interfaces would you like to implement? (Press <space> to select, <a> to toggle all, <i> to invert selection)
>(*) CanActivate
 ( ) CanActivateChild
 ( ) CanDeactivate
 ( ) CanLoad
```

- CanActivate: 控制路由是否可以啟用
- CanActivateChild: 控制子路由是否可以啟用
- CanDeactivate: 控制路由是否可以退出
- CanLoad: 控制模組（module）是否可以被載入

建立完後 會生成一隻 auth.guard.ts

```ts
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // 條件若符合的話 就能成功跳轉
    return true;
  }
}
```

接著我們就可以在在這頁設定是否讓頁面跳轉

---

## 在 router 裡啟用路由

```ts
const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard], // 啟用路由
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/",
  },
];
```

---

基本設定大概是這樣，明天就來介紹如何使用範例吧！
