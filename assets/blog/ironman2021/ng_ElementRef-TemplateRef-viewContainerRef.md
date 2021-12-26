---
layout: ironman2021
title: Angular ElementRef、TemplateRef、viewContainerRef 的區別
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/09/28
---

今天就來聊聊 `ElementRef`、`TemplateRef`、`viewContainerRef`，者實說，在這之前一直都沒很認真搞懂這部份
就趁著這次機會一起來看看吧！

## ElementRef

用於檢視 HTML DOM 元素，可以在瀏覽器中取得 DOM 的原生 Element

[ElementRef](https://angular.tw/api/core/ElementRef)

.html

```html
<span #elRef>I am span</span>
```

.ts

```ts
export class TemplateComponent implements AfterViewInit {
  @ViewChild("elRef") elRef!: ElementRef;

  ngAfterViewInit() {
    console.log("ElementRef", this.elRef.nativeElement.textContent); //I am span
  }
}
```

---

## TemplateRef

屬於模板元素的一種，在頁面裡不會呈現，但可透過 `ViewContainerRef` 將它渲染出來

.html

```html
<ng-template #tpRef><span>I am span in template</span></ng-template>
```

.ts

```ts
export class TemplateComponent implements AfterViewInit {
  @ViewChild('tpRef') tplRef!: TemplateRef<any>;

  ngAfterViewInit() {
    console.log("TemplateRef", this.tplRef.elementRef.nativeElement); //<!--container-->
    console.log("TemplateRef", this.tplRef.elementRef.textContent); //container
  }
}
```

這裡可以看到 把 TemplateRef console 出來會是一個 container，在 html 上是就只是一個註解。

---

## viewContainerRef

它用來操控顯示的內容
有著 host 與 embedded view 來建立動態顯示

接續著剛剛的 `TemplateRef`

.html

```html
<span>I am first span</span>
<ng-container #vc></ng-container>
<span>I am last span</span>

<ng-template #tpRef
  ><span style="color:red;">I am span in template</span></ng-template
>

<!-- 加兩顆按鈕，試著操控 TemplateRef -->
<button (click)="onRemoveTpl()">removeTpl</button>
<button (click)="onAddTpl()">addTpl</button>
```

.ts

```ts
export class TemplateComponent implements AfterViewInit {
  @ViewChild('tpRef') tplRef!: TemplateRef<any>;

  ngAfterViewInit() {
    const elem = this.tplRef.createEmbeddedView(null);
    this.vc.insert(elem);
  }

  onRemoveTpl() {
    this.vc.remove();
  }

  onAddTpl() {
    this.vc.createEmbeddedView(this.tplRef);
  }
}
```

試著玩玩看範例吧！

範例：[https://stackblitz.com/edit/angular-ivy-sffarv](https://stackblitz.com/edit/angular-ivy-sffarv)

---

參考資料：

[Exploring Angular DOM manipulation techniques using ViewContainerRef](https://indepth.dev/posts/1052/exploring-angular-dom-manipulation-techniques-using-viewcontainerref)

[Angular 2 TemplateRef & ViewContainerRef](https://segmentfault.com/a/1190000008672478)
