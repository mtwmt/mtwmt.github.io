---
layout: hexo
title: hexo：Error:Cannot find module
categories:
  - Hexo
tags:
  - Hexo
date: 2018/12/20
---

一陣子沒更新的 blog
想記錄一下這幾天遇到的問題
就在寫好之際 想預覽一下 發現 hexo 也出問題了!!!
噴了一堆錯

估狗了一下 原來是前陣子在練習 vue 的時後
為了安裝 vue-cli 所以升級了 node 版本
想不到啊想不到 當下使用的 hexo 只能使用舊版 node6 以下執行

人生啊…(喝口茶 只好繼續找解決方案了

總而言之呢 就是先把舊版的`hexo-cli`移除後再裝上
執行以下指令 (是的 我是 mac 用戶 所以就是 mac 指令了

```bash
$ sudo npm uninstall hexo-cli -g
$ sudo npm uninstall dtrace-provider -g
$ sudo npm install hexo-cli -g --no-optional
```

好了 搞定了!!!

參考資料：[https://github.com/hexojs/hexo/issues/1922](https://github.com/hexojs/hexo/issues/1922)
