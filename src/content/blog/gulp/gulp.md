---
title: Gulp4 與 gulp-cli
categories:
  - Gulp
tags:
  - Gulp
  - node
date: 2019/01/24
---

# npm 套件安裝

| 指令                   | 縮寫     |
| ---------------------- | -------- |
| npm install            | npm i    |
| npm install --save     | npm i -S |
| npm install --save-dev | npm i -D |

--save 將此文件 安裝到本地資料夾 -dev 將安裝的 gulp 訊息存在 package.json 裡

若要安裝特定版本 `npm i -D gulp@4.0.2`

---

gulp 與之前版本的差異 3 到 4 的轉換這次多了 gulp-cli 需在全域裡加裝

## gulp4 有什麼新東西

提供了兩種新的 流程控制方法 `series()` 與 `parallel()` 取消了 task 的用法

## 無痛升級 gulp4

先在 cmd 裡查看 node 版本(支援 node8.11.1 以上)
<img src="/assets/images/gulp/node-v.jpg" /> npm 版本(支援 5.6.0 以上)
<img src="/assets/images/gulp/node-v.jpg" />

確認 gulp 跟 npm 版本後 再來就是安裝 gulp-cli

```
npm install --global gulp-cli
或
npm i gulp-cli -g
```

安裝完後 確認版本 <img src="/assets/images/gulp/gulpcli-v.jpg" /> 出現版本資訊 表
示`gulp-cli`安裝成功

---

## 寫法差異

將 task 移除

過去版本寫法

```js
gulp.task('css', function () {
  // doSomething
});
gulp.task('js', function () {
  // doSomething
});
gulp.task('default', ['css', 'js']);
```

4.0 改為

```js
function css() {
  // doSomething
}
function js() {
  // doSomething
}
var build = gulp.series(css, js);
exports.default = build;
```

bulid 新增 使用 `lastRun()`

---

## 執行方式

新增`series()` 與 `parallel()`

```js
const { series } = require('gulp');

function clean(cb) {
  // body omitted
  cb();
}

function build(cb) {
  // body omitted
  cb();
}
function watch(cb) {
  // body omitted
  cb();
}

//單一執行
exports.build = build;

//逐行執行
exports.default = series(clean, build, watch);

//組合執行 (深度執行)(同步執行)
exports.default = series(clean, parallel(build, watch));
```

---

## 排除

### 資料夾排除

```js
['dist/**', '!dist/noDel', '!dist/noDel/**'];
```

除了 noDel 外的資料夾，其他通通都會吃到設定！

### 檔案排除

```js
('src/**/!(_)*.html');
```

除了 檔案前綴有 \_ 外 也都會吃到設定！

---

以上介紹 有錯歡迎指正

### 參考文件

- https://www.gulpjs.com.cn/
- https://www.pixemweb.com/blog/gulp-4-0-0-with-nodejs-imagemin-browsersync-sass-sourcemaps-cleancss-more/
