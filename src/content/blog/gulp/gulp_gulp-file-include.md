---
title: Gulp：gulp-file-include
categories:
  - Gulp
tags:
  - Gulp
  - node
  - JavaScript
date: 2017/06/26
update: 2020/05/24
---

> 將共用的 html 抽出來 變成共用檔

_於 20200523 更新 拿掉舊有寫法與更新一些個人設定_

常常在編輯 html 時 會遇到許多共同地方 如 header footer
當時想著 如果能跟後端一樣 將共用的地方取出來 需要時 再 inclde 裡去時 那該有多好

### 官方提供設定 code

```javascript
const gulp = require('gulp');
const fileinclude = require('gulp-file-include');

gulp.task('fileinclude', function () {
  gulp
    .src(['index.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(gulp.dest('./'));
});
```

### 個人修改調整後

```js
const gulp = require('gulp');
const fileinclude = require('gulp-file-include');

function html() {
  return src('src/**/!(_)*.html')
    .pipe(plumber())
    .pipe(
      fileinclude({
        prefix: '@@', //設定html include 前綴
      })
    )
    .pipe(dest('./dist'));
}
```

#### html 使用

```html
@@include('include/footer.pug')
```

#### 注意事項：

共用的 html 檔 通常我們是不需要將它編譯出來的 所以所以在開發時，
在 html 的檔名前 加上 `_` 前綴，在輸出時就會排除該檔

---

### 參考文件

[https://www.npmjs.com/package/gulp-file-include](https://www.npmjs.com/package/gulp-file-include)
