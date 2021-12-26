---
layout: ironman2021
title: Angular 筆記 css 樣式篇
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/10/05
---

今天就只是個筆記，單純記錄寫法如何使用，以便自己日後查找，畢竟人非聖賢、會忘難免 XD

## css

套用 className

變數為 isDark，value 必需為 boolean

```ts
isDark = true;
```

在 html 的 dom 裡設定

```html
<p [ngClass]="isDark ? dark : light">test</p>
```

```html
<p [ngClass]="{'isDark': true}">test</p>
```

https://angular.tw/api/common/NgClass

[Document difference between [NgClass] and [class] [NgClass] 與 [class] 之間的差異](https://github.com/angular/angular/issues/40623)

---

## style

在 html 的 dom 裡設定

```html
<p
  [ngStyle]="{'background-color': '#159', 'color':'#fff', 'font-size': '20px'}"
>
  test
</p>
```

```ts
isDark = true;
```

```html
<p [ngStyle]="isDark ? {'background-color': '#159', 'color':'#fff'} : {}">
  test
</p>
```

若 屬性的值為 value

```ts
width = 60;
height = 20;
```

```html
<p [ngStyle]="{'width.px': width, 'height.px': height}>test</p>
```

https://angular.tw/api/common/NgStyle

---

## :host 設定宿主(host)的樣式

```css
:host {
  display: block;
  border: 1px solid black;
}
```

在 css 裡加上條件式

```css
:host(.active) {
  border-width: 3px;
}
```

---

## @HostBinding

在 ts 裡直接綁定 class 到 宿主上

```ts
@HostBinding() class = `hey`;
```

直接綁定 id 到 宿主上

```ts
@HostBinding() id = `hey`;
```

或是直接設定 style

```ts
@HostBinding() style = `background: #159;display: block;`;
```

### 套上變數

```ts
@Input() isColor!: string;

@HostBinding('style.background') get color() {
  return this.isColor;
}
```

```ts
@HostBinding('class.value') get color() {
  return true;
}
```

若是 return true，class 會掛載 `value` 這個 class name

```ts
@HostBinding('class') get color() {
  return 'yoo';
}
```

若 `HostBinding` 裡的 只有 class，則需 return 出一個字串，return 出來的字串則為 class name

---
