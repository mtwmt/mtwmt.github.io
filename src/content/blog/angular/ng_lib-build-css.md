---
title: 如何將 Angular library 裡的 scss/sass 正確導出
categories:
  - Angular
tags:
  - Angular
  - Angular library
date: 2021/01/17
---

因專案越來越龐大，需要將一些共用元件抽出來做 library 放到 npm 上，在其他專案在開
發時也能一起使用，以便節省開發時間。

照著官網的教學建立: https://angular.tw/guide/creating-libraries

```bash
ng new angular-library-template --create-application=false
cd angular-library-template
ng g library mandy-lib
```

建立完後 將所需要抽出來的共用元件加上因要使用 scss 編譯，所以需在根目錄的
`angular.json` 加上這一段設定

<img src="/assets/images/angular/lib_build_css/001.jpg" />

```ts
"schematics": {
  "@schematics/angular:component": {
    "style": "scss",
    "skipTests": true //不產測試檔 .spec
  }
}
```

接著建立元件 `ng g c <your-component>`

過程中，若是不能建立 component
`Could not find an NgModule. Use the skip-import option to skip importing in NgModule.`
可以參考這裡的解法 https://forum.angular.tw/t/topic/972/9

component 添加完後在 cmd 執行 `ng run build`

---

因為專案需要，讓使用者可以調整 theme 的顏色設定做切換， 發現 component 裡的 scss
檔沒有被產出來

所以需要另外在 `ng-package.json` 裡多加一段 assets 配置

<img src="/assets/images/angular/lib_build_css/002.jpg" />

```ts
"assets": [
  "**/**.scss"
],
```

結果 build 出來的 ts 檔 跟 scss 檔沒有在同一個資料夾裡

<img src="/assets/images/angular/lib_build_css/003.jpg" />

會發現產出來的 scss 檔外多了一層 src 的資料夾，但這不是我要的呀 XDDD

---

過程中試了很多解法，最後的解決方案，在 build 後，將檔案複製到對應的資料裡，然後
再將原本 src 的資料夾清掉

新增 cpx

```bash
npm i cpx -D
```

在根目錄的 package.json 檔裡修改 script 指令

<img src="/assets/images/angular/lib_build_css/004.jpg" />

```json
{
  "scripts": {
    //修改
    "build": "ng build && npm run copy:lib && npm run clean",
    // 新增
    "copy:lib": "cpx \"./dist/mandy-lib/src/lib/**/*\" \"./dist/mandy-lib/lib\"",
    "clean": "rimraf \"./dist/mandy-lib/src\""
  }
}
```

再來執行一次 `ng run build`

<img src="/assets/images/angular/lib_build_css/005.jpg" />

成功!!!

---

為了這個設定花了我快兩天的時間，必須紀錄 XDDD

---

[angular-library-template sourse code](https://github.com/mtwmt/angular-library-template)

參考資料：

[Angular 9 update: creating a library that supports Angular Material theming is easier now](https://www.usefuldev.com/post/Angular%209%20update:%20creating%20a%20library%20that%20supports%20Angular%20Material%20theming%20is%20easier%20now)
[Angular (+ CLI) 6.0.0: Global styles for libraries](https://github.com/angular/angular-cli/issues/10869)
