---
title: Angular Providers
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/10/10
---

一直以來對 `Angular Providers` 這部份都還是有存在著半知半解的狀態，就趁著這次機會一次搞懂它吧！

Providers 提供了四種注入方式

- Class Provider : useClass
- Value Provider: useValue
- Factory Provider: useFactory
- Aliased Class Provider: useExisting

## useClass

將 `service` 的服務注入進來

product.ts

```ts
export class Product {
  constructor(productID: number, name: string, price: number) {
    this.productID = productID;
    this.name = name;
    this.price = price;
  }

  productID: number;
  name: string;
  price: number;
}
```

product.service

```ts
import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable()
export class ProductService {
  constructor() {}

  public getProducts() {
    let products: Product[];
    products = [new Product(1, 'Memory Card', 100)];
    return products;
  }
}
```

component.ts

```ts
@Component({
  ...略
  providers: [ProductService],
})

export class AppComponent implements OnInit {
  constructor(
    private productService: ProductService,

  ) {
    cosnole.log(
      this.productService.getProducts()
      // {productID: 1, name: 'Memory Card', price: 100}
    )
  }
}
```

---

## useValue

直接在 providers 裡的 `useValue` 設定想提供的值

```ts

const APP_CONFIG = Object.freeze({
  serviceURL: 'mtwmt.github.io',
  IsDevleomentMode: true,
});

@Component({
  ...略
  providers: [
    { provide: 'USE_FAKE', useValue: true },
    { provide: 'APP_CONFIG', useValue: APP_CONFIG },
    {
      provide: 'FUNC',
      useValue: () => {
        return 'hello world';
      },
    },
    {
      provide: TestService,
      useClass: TestService,
    },
  ],
})

export class AppComponent implements OnInit {
  constructor(
    @Inject('USE_FAKE') public useFake: string,
    @Inject('APP_CONFIG') public appConfig: any,
    @Inject('FUNC') public func: any
  ) {
    cosnole.log(
      useFake,  // true
      appConfig,
      // {
      //   serviceURL: 'mtwmt.github.io',
      //   IsDevleomentMode: true,
      // }
      func() // hello world
    )

  }
}
```

---

## useFactory

有時後會需要拿 `useValue` 的值 注到其他服務裡做判斷，這時後就可以使用 `useFactory`，來處理一些邏輯上的事情

續上例：

這裡多做了一個 `MoreProductService`

more-product.service

```ts
import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable()
export class MoreProductService {
  constructor() {}

  public getProducts() {
    let products: Product[];

    products = [
      new Product(1, 'Memory Card', 500),
      new Product(2, 'Pen Drive', 750),
      new Product(3, 'Power Bank', 100),
      new Product(4, 'Laptop', 10000),
      new Product(5, 'Desktop', 100),
    ];
    return products;
  }
}
```

component.ts

```ts
import { Component, Inject, VERSION } from '@angular/core';
import { MoreProductService } from './more-product.service';
import { ProductService } from './product.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    MoreProductService,
    {
      provide: 'GET_MORE',
      useValue: false,
    },
    {
      provide: ProductService,
      // 取得 GET_MORE 的 value，判斷要產生的實體
      useFactory: (isMore) => {
        return isMore ? new MoreProductService() : new ProductService();
      },
      // 注入相依的 service
      deps: ['GET_MORE', MoreProductService],
    },
  ],
})
export class AppComponent {
  products = [];

  constructor(
    @Inject('GET_MORE') public getMore: string,
    private productService: ProductService
  ) {
    this.products = this.productService.getProducts();
  }
}
```

---

## useExisting

當想有新的 `provide` 想取代舊的 `provide` 時，可以使用 `useExisting` 來做取代，而不用再將源有的重新注入

---

實作如下：https://stackblitz.com/edit/angular-ivy-zhtp2w

---

參考文章：
[This Won’t Hurt a Bit — Dependency Injection Tokens in Angular](https://medium.com/ngconf/this-wont-hurt-a-bit-dependency-injection-tokens-in-angular-2fa5f6e6293)
[Angular Providers: useClass, useValue, useFactory & useExisting](https://www.tektutorialshub.com/angular/angular-providers/)
