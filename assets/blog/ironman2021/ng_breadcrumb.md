---
layout: Angular
title: 如何在 Angular 建立 Breadcrumb (麵包屑)
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2020/06/12
update: 2021/10/08
---

麵包屑 為提供網站裡的導航，讓使用者容易了解當下所在的位置
剛好也呼應前一天使用 `router` 的部份

> `現在位置：首頁 / 列表 / 內容`

## 了解 router 架構

Angular 裡的 router 架構 通常會命名為 `app-routing.module.ts`

```js
const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "about/:name",
        component: AboutComponent,
        data: {
          breadcrumb: "關於",
        },
      },
      {
        path: "list",
        component: ListComponent,
        data: {
          breadcrumb: "列表",
        },
        children: [
          {
            path: "detail",
            component: DetailComponent,
            data: {
              breadcrumb: "內容",
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

---

## 如何建立麵包屑

### 監聽路由事件

這裡會需要帶點 `rxjs` 的概念

```js

breadcrumbs$: Observable<any>;

constructor(
  private router: Router,
  private activatedRoute: ActivatedRoute,
) {}

ngOnInit(): void {
  this.breadcrumbs$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    distinctUntilChanged(),
    map((event) => {
      let root: ActivatedRoute = this.activatedRoute.root;
      return this.createBreadcrumbs(root);
    })
  );
}

```

router 每次更改的時後 都會觸發許多事件，但我們只需要獲取 `NavigationEnd` 這個事
件就可以了 `distinctUntilChanged` 只要 網址有更新 才會觸發此事件，可以檔掉許多連
續觸發接下來再將拿到的參數進行操作

---

### 建立 Breadcrumb ( 麵包屑 )

在 router 裡 我們可以得到一些資訊 如... 當前路徑當前路徑裡的參數子節點當前所使用
的組件等.....各種資訊

可以在 [Angular ActivatedRoute](https://angular.tw/api/router/ActivatedRoute) 得
到更多資訊

---

### 概念

> 每次一次來就檢測是否有下一個子節點，若是有的話 就繼續再跑一次迴圈如此重覆將麵
> 包屑組起來，到達最後一個子節點時 會是一個 `null` 值，我們就能將先前組好的麵包
> 屑回傳出來，這時後會是一個陣列，接著再將它拿到 HTML 上顯示！

JS

```js
createBreadcrumbs( route, url: string = '', breadcrumbs = [] ) {
  const children = route.firstChild;

  if( !children ) {
    return breadcrumbs;
  }

  const routeURL: string = children.snapshot.url
    .map(segment => segment.path)
    .join('/');

  const label = children.snapshot.data['breadcrumb'];

  if( !label ) {
    return this.createBreadcrumbs( children, url,  breadcrumbs)
  }

  if ( !routeURL ) {
    url += `/${routeURL}`;
  }

  const breadcrumb = {
    label: label,
    params: children.snapshot.params,
    url: routeURL
  }

  return this.createBreadcrumbs( children, url,  [...breadcrumbs, breadcrumb])
}
```

先前我們將麵包屑建立為一個 Observable，就直接到 html 裡 使用 `async` 訂閱再來就
可以撰寫出我們想要的麵包屑樣式囉

HTML

```html
<ul class="breadcrumb">
  <li *ngFor="let breadcrumb of breadcrumbs$ | async; last as isLast">
    <a [routerLink]="breadcrumb?.url" *ngIf="!isLast else last">
      {{ breadcrumb.label }}
      <ng-container *ngIf="breadcrumb?.params.name">
        - {{ breadcrumb?.params.name }}
      </ng-container>
    </a>
    <ng-template #last>
      {{ breadcrumb.label }}
      <ng-container *ngIf="breadcrumb?.params.name">
        - {{ breadcrumb?.params.name }}
      </ng-container>
    </ng-template>
  </li>
</ul>
```

---

實作如下： https://stackblitz.com/edit/angular-routing-breadcrumb
