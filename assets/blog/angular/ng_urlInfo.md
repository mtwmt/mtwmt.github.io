---
layout: Angular
title: 如何在 Angular 獲取 URL 資訊
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/10/09
---

在實作裡，很多時後我們會將一些必要資訊記錄在網址上，直接在網址裡就能得到我們要的訊息
不用再透過組件將資訊層層傳遞，達到解耦合的效果。

---

## URL

註：一切一切 都只是我用來舉例，不代表為鐵人賽網址真正的實際規劃哦！

例如：我的鐵人賽主題網址為
https://ithelp.ithome.com.tw/users/20093270/ironman/4623?page=2

我們試著將網址解析出

> user => 使用者
> 20093270 => 使用者編號
> ironman => 鐵人賽檔案
> 4623 => 鐵人賽主題編號

> page => 我正在第 2 頁

從這裡可以推測出來，我們可以利用上面的編號去打 API 得到我們需要的資料，或是將這些資料的資料顯示在頁面上

---

## route 規劃

由此可得知，我們可以將 route 做這樣的規劃

```ts
const routes: Routes = [
  {
    path: "user/:userId",
    component: UserComponent,
    children: [
      {
        path: "ironman",
        component: IronmanComponent,
        children: [
          {
            path: ":ironmanId",
            component: IronmanListComponent,
          },
        ],
      },
    ],
  },
  {
    path: "**",
    redirectTo: "user/:userId",
  },
];
```

可以看到 有些 path 上的設裡有加「:」，這個代表變數

---

## 設定網址連結

當我們架構寫出來後，實作上就可以開始使用了

### html 設定網址連結

在 html 上 可以這樣寫

```html
<a
  [routerLink]="['user', userId, 'ironman', ironmanId]"
  [queryParams]="{ page: pageNum }"
  >Angular 常見問題大小事 列表</a
>
```

### ts 設定網址連結

在 ts 裡的寫法為

```ts
// 將 Router 注入
constructor(private router: Router) { }

this.router.navigate(
  ['user', userId, 'ironman', ironmanId], {
    queryParams: { page: pageNum }
  }
);

```

若是要加上其他額外的資訊，在不影響其他網址的情況下，可以這麼做

```ts
this.router.navigate([], {
  queryParams: { msg: "newMsg" },
  queryParamsHandling: "merge",
});
```

得到的網址就會變成
`https://ithelp.ithome.com.tw/users/20093270/ironman/4623?page=2&msg=newMsg`

[QueryParamsHandling](https://angular.tw/api/router/QueryParamsHandling)

---

## 取得網址上的資訊

### path 路徑取得

在 `UserComponent` 裡執行
取得 `userId` 與 `ironmanId`

```ts
constructor(private activatedRoute: ActivatedRoute) { }

// userId
this.activatedRoute.paramMap.subscribe( (params: Params) => {
  console.log( 'userId', params.get('userId') )
})

// ironmanId

this.activatedRoute.firstChild?.firstChild?.paramMap.subscribe( (params: Params) => {
  console.log( 'ironmanId', params.get('ironmanId') )
})
```

因為 ironmanId 設定在 UserComponent 的下下一層，所以使用了兩次 `firstChild`

### query 參數

```ts
this.activatedRoute.queryParamMap.subscribe((params: Params) => {
  console.log("page", params.get("page"));
});
```

---

因為懶的再開新專案，今天範例就與昨天的放一起囉～
實作如下：
https://stackblitz.com/edit/angular-routing-breadcrumb?file=src%2Fapp%2Fuser%2Fuser.component.ts
