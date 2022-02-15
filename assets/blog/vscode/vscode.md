---
layout: vscode
title: vscode：vscode基本介紹與安裝
categories:
  - vscode
tags:
  - vscode
date: 2018/11/25
---

## VSCODE 設定檔存放路徑

### 設定檔文件路徑

- Windows `%APPDATA%\Code\User\settings.json`
- Mac `$HOME/Library/Application Support/Code/User/settings.json`
- Linux `$HOME/.config/Code/User/settings.json`

### 擴充功能存放路徑

- Windows `%USERPROFILE%\.vscode\extensions`
- macOS `~/.vscode/extensions`
- Linux `~/.vscode/extensions`

[vscode 中文文檔(簡中)](//jeasonstudio.gitbooks.io/vscode-cn-doc/content/)

主要是以前端 `html scss js 再加點vue` 做為安裝設定

## 基本安裝

`(在此以個人使用習慣做安裝)`

```js
{
  "editor.tabSize": 2,
  "git.ignoreMissingGitWarning": true,
  "window.zoomLevel": 0,
  "editor.formatOnPaste": true,
  "explorer.confirmDelete": false,
}
```

`editor.tabSize` 設定 tab 間隔
`editor.formatOnPaste` 貼上程式碼時自動排版
`indow.zoomLevel` 調整視窗的縮放比例。
`git.ignoreMissingGitWarning` 忽略遺漏 Git 時的警告
`explorer.confirmDelete` 控制總管是否須在透過垃圾桶刪除檔案時要求確認。

## 掛件包

- Chinese (Traditional) Language Pack for Visual Studio Code `vscode 中文繁體包`
- Vetur `Vue 的集大成工具，寫 Vue 必裝`
- cdnjs `檢示>命令選擇區 找libraries 快速在編輯器內插入jquery之類的路徑`
- [Live Server](//mtwmt.github.io/vscode_liveserver/) `網頁伺服器`

## 常用快捷鍵

- `markdown 預覽` ctrl + shift + v（Mac 的快捷鍵是 command + shift + V）
- `直行選取` shift + alt + 滑鼠左鍵 (shift + alt + ctrl + 方向鍵)
