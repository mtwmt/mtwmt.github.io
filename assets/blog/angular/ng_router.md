---
layout: Angular
title: Angular Router 筆記
categories:
  - Angular
tags:
  - Angular
date: 2020/10/20
---

在 app.module.ts 引入 RouterModule

```ts
import { RouterModule } from '@angular/router';

@NgModule({
  RouterModule.forRoot(routes)
})
```

## router 設定

`ps.注意：路徑不包含斜線`

```ts
const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "blog",
    loadChildren: () => import("./blog/blog.module").then((m) => m.BlogModule),
  },
  { path: "404", component: NotFoundComponent },
  { path: "**", component: NotFoundComponent },
];
```

Route Guards 路由守衛

```ts
class AlwaysAuthGuard implements CanActivate {
  canActivate() {
    return true;
  }
}
```

```ts
const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "blog/:id", component: BlogComponent, canActivate: [AlwaysAuthGuard] },
  { path: "**", component: PageNotFoundComponent },
];
```

預設導址

```ts
{
    path: '**',
    redirectTo: 'list',
},
```

---

## 網址傳參數

### path

網址 http://localhost:4200/list/網址變數

routing.module

```ts
{
    path: 'blog',
    data: { //這一層要給它的資料
      breadcrumb: 'NAV.blog',
    },
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule)
    canActivateChild: [AlwaysAuthGuard],  //路由守衛
},
```

```ts
{
    path: 'blog/:slug',  //有加「:」就是變數
    component: BlogComponent,
},
```

ts 設定網址連結 (path)

```ts
constructor(private router: Router) { }

this.router.navigate(['blog/', 'taiwan']);
```

html template 設定網址連結

```html
<a [routerLink]="['blog', 'taiwan']" routerLinkActive="active">Prodcuts</a>
```

`routerLinkActive="active"` 若是在當下這頁面 會新增一個 'active' 的 class

ts 取得網址參數方式

```ts
constructor(private activatedRoute: ActivatedRoute) { }

this.activatedRoute.paramMap.subscribe((params: Params)=> {
    //params: { slug: 'taiwan' }
    console.log( params.get('slug') )  // 'taiwan'
})
```

---

### queryParam

網址 http://localhost:4200/list?參數名=變數

routing.module 不變

```ts
{
  path: 'list',
  component: ListComponent,
},
```

ts:

```ts
constructor(private router: Router) { }

this.router.navigate(['list/'], { queryParams: { page: pageNumber, test: '字串也可' } });
```

template

```html
<a [routerLink]="['list']" [queryParams]="{ page: pageNumber }">Products</a>
```

取得參數方式

```ts
constructor(private activatedRoute: ActivatedRoute) { }

this.activatedRoute.queryParamMap.subscribe( (params: ParamMap) => {
    //params: { page: '1' }
    console.log( params.get('page') )  // '1'
})
```

---

activatedRoute 裡的 queryParamMap 跟 paramMap 都是可觀察物件 接下來就是需要理解 rxjs 後 才能活用了

---

## FAQ

> Q: 使用 routerLinkActive 時，根路徑一直被觸發

- A: 因為這是 Angular 的設計使然，所以再加上 `[routerLinkActiveOptions]="{ exact: true }"` 即可
  參考資料：
- [With routerLinkActive the root URL is always active](https://github.com/angular/angular/issues/9885)
- [Angular API](https://angular.tw/api/router/RouterLinkActive)
