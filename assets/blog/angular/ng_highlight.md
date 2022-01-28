---
layout: angular
title: 在 Angular 文章裡幫程式碼加上語法高亮 (highlight)
categories:
  - Angular
tags:
  - Angular
  - highlight
date: 2022/01/29
---

## highlight.js

### Install

```bash
npm i highlight.js
```

### Create

create highlight.service

```ts
import hljs from "highlight.js";

@Injectable({
  providedIn: "root",
})
export class HighlightService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      hljs.highlightAll();
    }
  }
}
```

### Import CSS

在 styles.scss 引入 (可選自己喜歡的樣式引入)

```scss
@import "~highlight.js/scss/atom-one-dark";
```

Themes
https://highlightjs.org/static/demo/

---

## prismjs

prismjs 不只提供了 higtlight 樣式，也提供了一些外掛讓使用者套用
如：`copy-to-clipboard`

### Install

```bash
npm i prismjs
```

### Create

create highlight.service

```ts
// 也可這樣寫
// import * as Prism from 'prismjs';

import "prismjs";

// 加入語言樣式
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-typescript";
declare var Prism: any;

@Injectable({
  providedIn: "root",
})
export class HighlightService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
}
```

### Import CSS

在 styles.scss 引入 (可選自己喜歡的樣式引入)

```scss
@import "prismjs/themes/prism-tomorrow";

// 加入 prismjs plugins css
@import "prismjs/plugins/toolbar/prism-toolbar";
```

styles.scss
https://prismjs.com/

### 啟用 plugins

在 angular.json 裡加上這一段

```json
"allowedCommonJsDependencies": [
  "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard"
],
```

如下圖：
<img src="assets/images/angular/ng_highlight/001.jpg"  width=100% />

---

## 文章 heightlight 引用

要等內文載入後才會有效果

```ts

ngAfterViewInit(): void {
  this.highlightService.highlightAll();
}
```
