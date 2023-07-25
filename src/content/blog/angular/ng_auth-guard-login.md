---
title: Angular 路由守衛(登入篇)
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/10/07
---

經過了昨天的介紹，今天就來看看使用登入範例囉

今天的登入資料依然是使用 [FakeStoreAPI](https://fakestoreapi.com/docs)

## 登入畫面

這裡就做個簡單的驗証，沒填值就不能按按鈕

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div>
    <label for="">userName：</label>
    <input type="text" formControlName="username" required />
  </div>
  <div>
    <label for="">passWord：</label>
    <input type="password" formControlName="password" required />
  </div>
  <button [disabled]="!form.valid">Login</button>
</form>
```

```ts
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    const { username, password } = this.form.value;
    this.authService.login(username, password).subscribe((res: any) => {
      if (res.token) {
        // 登入成功後的跳轉網址
        this.router.navigate(['']);
      } else {
        console.log('error', res);
      }
    });
  }
}
```

---

## API Service

```ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  setToken$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private httpClient: HttpClient) {}
  login(username: string, password: string) {
    const url = `https://fakestoreapi.com/auth/login`;

    return this.httpClient
      .post(
        url,
        JSON.stringify({
          username,
          password,
        }),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        tap((res: any) => {
          this.setToken$.next(res.token);
        })
      );
  }
}
```

若是有成功得到 `token` 就裝這狀態記錄在 `setToken$` 裡

---

## 路由守衛 auth.guard.ts

```ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canEnter();
  }

  canActivateChild(): Observable<boolean> {
    return this.canEnter();
  }

  canEnter(): Observable<boolean> {
    // 這裡提取剛剛記錄的狀態
    return this.authService.setToken$.pipe(
      map((isLogin) => {
        if (!isLogin) {
          this.router.navigate(['/', 'login']);
        }
        return !!isLogin;
      })
    );
  }
}
```

在 `canEnter` 訂閱剛剛的 `setToken$` 狀態，若是沒有 `token` 則導回 login 頁

---

## 路由設定

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard], //新增路由守衛
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

---

今天的範例就放在這裡囉
https://stackblitz.com/edit/angular-ivy-pwkhc4
