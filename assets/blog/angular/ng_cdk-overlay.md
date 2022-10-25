---
layout: Angular
title: Angular 客製彈出視窗
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/10/04
---

> 因為我的這個 blog 需要一個彈出視窗做提示，而套件裡的樣式我都不喜歡，所以今天就來客製化一個吧！

這次的彈出視窗會使用 Angular Material 裡的 cdk 來做開發

---

## 前置作業

安裝 cdk

```bash
npm i @angular/cdk
```

> 注意： 若發現 `@angular/cdk` 裡的某些功能不能掛載，可以看一下 `@angular/cdk` 與 `@angular/core` 的版本是否一樣，若一直報錯不能使用的話，就安裝成同個版本號處理試試 (當時一直踩到這個雷)。

在 `styles.scss` 引入 css

```css
@import "~@angular/cdk/overlay-prebuilt.css";
```

在 `app.module.ts` 裡 引入 `OverlayModule`

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { OverlayModule } from "@angular/cdk/overlay";

@NgModule({
  imports: [BrowserModule, FormsModule, OverlayModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

---

## 開始

template

```html
<button (click)="onClick()" type="button">Open</button>

<ng-template #tpl>
  <div class="modal">
    <i class="modal__close" (click)="onClose()">X</i>
    <div class="modal__container">HI 我是彈出視窗內容</div>
  </div>
</ng-template>
```

建立 `ng-template` 這個是彈出視窗，讓點 button 的時後呼叫。
可以看看前幾天寫的這篇文 [Angular ElementRef、TemplateRef、viewContainerRef 的區別](https://ithelp.ithome.com.tw/articles/10273658)

.ts

```ts
import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  @ViewChild("tpl") tplRef!: TemplateRef<any>;
  overlayRef!: OverlayRef;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    // 設定彈窗出來時的定位
    const strategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const configs = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: strategy,
    });

    this.overlayRef = this.overlay.create(configs);
    this.overlayRef.backdropClick().subscribe((res) => {
      this.overlayRef.detach();
    });
  }

  onClick() {
    this.overlayRef.attach(
      new TemplatePortal(this.tplRef, this.viewContainerRef)
    );
  }

  onClose() {
    this.overlayRef.detach();
  }
}
```

---

### 彈窗定位方式

彈窗定位：[OverlayPositionBuilder](https://material.angular.tw/cdk/overlay/api#OverlayPositionBuilder)

文件上寫的沒有很清楚

這裡筆記一下

原點定位 (中心點以 button 為主) https://material.angular.tw/cdk/overlay/api#ConnectedPosition

> 在 constructor 要再多引入 ElementRef

```ts
const strategy = this.overlay
  .position()
  .flexibleConnectedTo(this.elementRef)
  .withPositions([
    {
      originX: "start",
      originY: "bottom",
      overlayX: "start",
      overlayY: "top",
    },
  ]);
```

全域定位 (中心點以整個畫面為主) https://material.angular.tw/cdk/overlay/api#GlobalPositionStrategy

```ts
const strategy = this.overlay
  .position()
  .global()
  .centerHorizontally()
  .centerVertically();
```

---

### 彈窗設定

```ts
const configs = new OverlayConfig({
  hasBackdrop: true,
  positionStrategy: strategy,
});
```

這裡我只設定了兩種，

更多設定方式可以看文件 [OverlayConfig](https://material.angular.tw/cdk/overlay/api#OverlayConfig)

---

### 打開彈窗

```ts
onClick() {
  this.overlayRef.attach(
    new TemplatePortal(this.tplRef, this.viewContainerRef)
  );
}
```

建立浮動圖層 [OverlayRef](https://material.angular.tw/cdk/overlay/api#OverlayRef)

### 關閉彈窗

```ts
onClose() {
  this.overlayRef.detach();
}
```

範例：https://stackblitz.com/edit/angular-ivy-ujphmp

---

## 後記

今天介紹的 cdk 的 overlay 的基本應用，在實作上會再將這個彈窗提出，處理成共用元件，有需要的話直接引入使用就可以囉。

<!-- https://mainawycliffe.dev/blog/how-to-build-a-reusable-modal-overlay-dialog-using-angular-cdk -->
