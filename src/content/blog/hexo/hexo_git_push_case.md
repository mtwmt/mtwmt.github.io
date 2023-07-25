---
title: Hexo：Github 上傳佈署後 檔名大小寫問題
categories:
  - Hexo
tags:
  - Hexo
  - Github
date: 2020/12/06
---

最近在整理以前寫過的文章分類，把一些檔名的大小寫稍做調整，
發現文章佈署到 git 上後，git 對於檔名大小寫的更動 檔案不會更新，
導致頁面出現 404 找不到頁面

## 解決方法

在 hexo 的目錄下 找到 `.deploy_git/.git/config`
修改 `ignorecase = false`

cmd 裡面直接打指令

```bash
$ cd .deploy_git
$ git config core.ignorecase false
$ hexo clean
$ hexo deploy -g
```

<!-- git config --global core.ignorecase false -->
