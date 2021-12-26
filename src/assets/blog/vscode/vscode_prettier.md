---
layout: vscode
title: vscode：Prettier 套件
categories:
  - vscode
tags:
  - 擴充套件
  - vscode
date: 2018/11/25
---

Prettier 是程式碼格式化工具，可設定為存檔時自動格式化，不用再花時間去手動格式化
相對的對自己在撰寫習慣上 會易讀許多。

## 如何安裝

在 VSCODE 擴充功能 尋找 prettier 安裝 `Prettier - Code formatter` 這個版本
<img src="assets/images/vscode/prittier/001.png" />

## 開始設定

依需求在設定裡更改預設配置

```js
{
  "editor.formatOnSave": true,
  "prettier.singleQuote": true,
  "prettier.printWidth": 120,
  "prettier.trailingComma": "es5"
}
```

`editor.formatOnSave` 儲存時自動格式化 `singleQuote` 使用單引號 `printWidth` 行
寬 `trailingComma` 尾隨逗號

其他設定 `semi` 結束是否加分號 `tabWidth` 縮排空幾格 `eslintIntegration` 支援
eslint 擴充套件 ( 需另安裝 eslint 此套件 ) `stylelintIntegration` 支援 stylelint
( 需另安裝 stylelint 此套件 )

這邊要注意 VSCODE 有分為 使用者設定 與 工作區設定，使用者設定則是套用到所有的個
人設定工作區用來執行目前專案，若是怕影響到其他專案 可設定在此

[Prettier 官網](//prettier.io/docs/en/options.html)
