---
title: 實作 Astro 部署：將網站部署到 GitHub Pages
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/30
---

Astro 裡有許多部屬方式，因我們這次介紹是針對初學者架設，所以選擇了 github pages

## 設定 astro.config.mjs 檔案

開啟 `astro.config.mjs` 檔案。這個檔案用於設定你的 Astro 網站相關的設定。

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://<YOUR_USERNAME>.github.io", // 或是你的自訂域名
  base: "/my-repo", // 如果需要的話，設定為你的專案名稱，開頭加上斜線
});
```

- site：將`site`設定為你的`GitHub Pages`網址，或是自訂域名。
- base: 如果您的專案名稱是 `<YOUR_USERNAME>`.github.io 或使用了自訂域名，則不需要設定。如果需要設定，請將其設定為您的專案名稱，開頭加上斜線。

## 建立 GitHub Actions 部署流程

在此專案中，建立一個名為`.github/workflows`的資料夾，並在資料夾內建立一個名為`deploy.yml`的檔案。

複製以下的內容貼到`deploy.yml`檔案中：

```yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v3
      - name: Install, build, and upload your site
        uses: withastro/action@v0

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

此 `YAML` 文件描述了 `GitHub Actions` 的部署流程。它將在每次將變更推送到 `main` 分支時自動觸發部署，並且也可以在 GitHub 的 `Actions` 選項中手動運行。

## 設定 GitHub Pages

- 前往你的 `GitHub` 專案的`Settings`（設定）選項。
- 找到`Pages`（頁面）部分，將`Source`（來源）設定為`GitHub Actions`。
- 提交並推送新的工作流程文件 `deploy.yml` 到 `GitHub`

## 部署你的網站

現在，當你將變更推送到你的 `Astro` 專案的儲存庫時，`GitHub Actions` 將自動為你部署網站。你的 Astro 網站現在可以通過以下網址訪問：

`https://<YOUR_USERNAME>.github.io/my-repo`（根據你的設定）

## 設定自訂域名（可選）

如果你想要使用自訂域名，你可以按照以下步驟進行設定：

- 在 public 資料夾中建立一個名為 `CNAME` 的檔案，並將您的自訂域名寫入該檔案。
- 設定您的域名解析，將您的自訂域名指向 `<YOUR_USERNAME>`.github.io。
- 將 CNAME 檔案一起提交到 GitHub。

---

## 總結

今天，我們學到了：

- 設定 `astro.config.mjs` 檔案，指定網站網址和基本路徑。
- 建立 `GitHub Actions` 部署流程，使您的網站自動部署。
- 設定 `GitHub Pages`，以便使用 `GitHub Actions` 部署。
- 部署您的網站並訪問它。

希望這份教學能夠幫助你成功部署你的 Astro 網站到 GitHub Pages！
