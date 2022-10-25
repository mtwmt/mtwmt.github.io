---
layout: Angular
title: Scully 佈署到 github
categories:
  - Scully
tags:
  - Angular
  - Scully
  - Github
date: 2021/05/04
---

終於！用 scully 把先前的 Blog 翻寫完成了!!! 灑花～

接著當然是要把頁面佈署到 github 讓其他人看到啦

不然也只能自己自 high XD

## 安裝

首先安裝 angular-cli-ghpages

```bash
npm i -g angular-cli-ghpages
```

輸入 `ngh --version` 可檢查本機是否已安裝過

---

## 注意事項

要注意的是 ghpages 會幫你把 build 出來的 dist 資料夾整包部署到 github 所以在
angular.json 與 scully.<你的專案>.config.ts 的 outputPath 必需一致 才能整包一起
丟到 github 上，不然會分成兩包丟，出來頁面的路徑會對不上

如圖： <img src="assets/images/angular/scully_deploy/001.png"/>
<img src="assets/images/angular/scully_deploy/002.png"/>

---

## 串連 github

若 git 尚未初始化時 會出現這樣的錯誤

```bash
Failed to get remote.origin.url (task must either be run in a git repository
with a configured origin remote or must be configured with the "repo" option).
```

先初始化 git

```bash
git init
```

新增遠端

```bash
git remote add github git@github.com:<your git name>/<your git repertory>
```

設定遠端

```bash
git remote set-url origin git@github.com:<your git name>/<your git repertory>
```

若是出現 `error: No such remote 'origin'` 可用另一種方式新增

```
git remote add origin https://github.com/<your git name>/<your git repertory>
```

---

觀看 git 設定 `git remote -v`
<img src="assets/images/angular/scully_deploy/003.png"/>

---

## deploy

接著再到 package.json 新增一行新的 script

```bash
"deploy": "ng build --prod && npm run scully && npx ngh --dir=dist/static"
```

因為我們先前將 outputPath 生成到 static 這個資料夾，需再設定 `--dir=dist/static`

執行 `npm run deploy` 就會直接幫你部署到 github 上囉！

再來就是打開網頁 看有沒有部署成功囉！
