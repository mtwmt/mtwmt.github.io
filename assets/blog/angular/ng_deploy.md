---
layout: Angular
title: 如何使用 Github Actions 自動部署 Angular 到 Github Pages
categories:
  - Angular
tags:
  - Angular
  - Github
  - ironman2021
date: 2021/10/15
---

Github 多了一個 Actions 的新功能，當 `push` 檔案到 Github 的時後，就會自動跑 CI/CD 部署
這個功能真是太方便啦!!!

---

## Angular Deploy

Angular 有提供了一個 [Deploy](https://angular.tw/guide/deployment) 的功能
這次選用了 `angular-cli-ghpages`

加入 `angular-cli-ghpages`

```bash
ng add angular-cli-ghpages
```

加入完後 在 `angular.json` 的最下面會多了 deploy 的設定

```json
...略

"deploy": {
  "builder": "angular-cli-ghpages:deploy",
  "options": {
    "baseHref": "/<路徑名稱>/",
    "name": "Mandy",
    "email": "123@123.com"
  }
}
```

在 `options` 裡依序填上 設定網址、名稱、mail

---

## 設定 Actions YAML 檔

在根目錄裡建立 `.github\workflows` 資料夾
再建立一支`yaml`檔

![](assets/images/angular/ng_deploy/001.png)

設定檔如下：
.yml

```yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}

      - name: Prepare and deploy
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          npm install
          npm run ng -- deploy --no-silent
```

`name` 可以自行設定
`uses` 使用其他人寫好的腳本
`with` 再透過 with 傳遞腳本參數

> 更詳細的設定可以到 GitHub 的文件裡看 [GitHub Actions](https://docs.github.com/cn/actions/quickstart)

---

## push 到 github

push 上去後 github 會偵側到檔案自動執行

![](assets/images/angular/ng_deploy/002.png)

點進去後可以看到部署的過程

![](assets/images/angular/ng_deploy/003.png)

都沒問題後會顯示勾勾的狀態

---

## 設定發佈頁面

檔案發佈完後會看到多了一個 `gh-pages` 分支

![](assets/images/angular/ng_deploy/004.png)

再到設定裡將發佈頁面設定到 `gh-pages` 就能網址上看到設定的頁面囉

![](assets/images/angular/ng_deploy/005.png)

---

附錄：

[觀看 Github Actions 使用量](https://github.com/settings/billing)

感謝 `VP` 大大熱情釋疑
