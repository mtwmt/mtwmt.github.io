---
title: Gulp：del
categories:
  - Gulp
tags:
  - Gulp
  - node
date: 2017/06/26
---

> 刪除多餘的資料夾或文件

```javascript
var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function () {
  //目的資料夾
  del(['public/include/**', 'public/scss/**']);
});
```

終端機指令：
npm gulp clean
或
yarn gulp clean

### 參考文件

[http://www.gulpjs.com.cn/docs/recipes/delete-files-folder/](http://www.gulpjs.com.cn/docs/recipes/delete-files-folder/)
