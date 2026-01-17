---
name: 內容寫作指南 (Content Writing)
description: 專案部落格文章與 Markdown 文件寫作規範，涵蓋 Frontmatter、格式與 SEO 最佳實踐。
---

# 內容寫作指南 (Content Writing Skill)

本指南用於協助撰寫本專案的 Markdown/MDX 內容，特別是 `src/content/blog` 下的文章。

## 📝 檔案結構與 Frontmatter

每個 `.md` 或 `.mdx` 檔案必須包含完整的 Frontmatter。

```yaml
---
title: 文章標題 (具吸引力且包含關鍵字)
date: YYYY-MM-DD
tags:
  - tag1
  - tag2
description: 文章摘要 (用於 SEO Meta Description 與列表預覽，約 100-150 字)
---
```

### 欄位說明
- **title**: 必填。應包含核心關鍵字。
- **date**: 必填。格式 `YYYY-MM-DD`。
- **tags**: 選填。小寫，協助分類。
- **description**: 必填。這段文字非常重要，會直接影響 SEO 搜尋結果與社交分享預覽。

## ✍️ 寫作風格與語氣

本專案部落格採用 **「Vibe Coding / 技術分享」** 風格：

1.  **口語化但專業**：像在跟同事分享技術一樣，不用過度正式，但技術名詞要精確。
2.  **第一人稱敘事**：多用「我」、「我們」，分享真實的開發心路歷程與踩坑經驗。
3.  **強調「解決了什麼」**：不要只貼程式碼，要說明遇到了什麼困難，為什麼選擇這個解法。
4.  **繁體中文使用者導向**：
    -   使用台灣習慣用語 (例如：專案、程式碼、透過、資訊)。
    -   中英文之間請 **務必** 加上空格 (例如：使用 React Native 開發)。

## 📄 Markdown 格式規範

### 標題層級
-   **H1 (`#`)**：僅用於文章標題 (由 Frontmatter 自動處理，內文從 H2 開始)。
-   **H2 (`##`)**：主要章節。
-   **H3 (`###`)**：子章節。

### 引用與強調
-   使用 `> 引用區塊` 來強調核心觀點或名言。
-   使用 **粗體** 強調關鍵字或重要結論。

### 圖片處理
-   圖片應放在 `public/assets/images/blog/` 或 `src/assets/` (若需優化)。
-   語法：`![圖片替代文字](/assets/images/blog/filename.png)`
-   **Alt Text**: 必須填寫，且具描述性 (SEO 與無障礙需求)。

### 程式碼區塊
-   務必指定語言，例如：
    ```
    ```typescript
    const hello = "world";
    ```
    ```

## 🔍 SEO 最佳實踐

1.  **關鍵字佈局**：確保核心關鍵字出現在 `title`、`description` 與第一段 H2 中。
2.  **內部連結**：適當連結到專案內的其他相關文章。
3.  **結構化資料**：(由 Astro 系統自動處理，作者需專注於填寫正確的 Frontmatter)。

---

## 範例文章結構

```markdown
---
title: Vibe Coding 之旅：我的開發心得
date: 2026-01-18
tags:
  - vibe coding
  - ai
description: 記錄我如何利用 AI 協作模式，在兩週內完成過去需要三個月的專案...
---

> 「引用一句核心心得。」

前言段落，說明為什麼寫這篇文章。

## 遇到的挑戰

描述問題背景...

## 解決方案

### 1. 選擇技術棧

解釋選擇原因...

## 結語

總結心得...
```
