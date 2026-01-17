# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

這是一個使用 Astro 5.x 構建的靜態部落格網站，採用 TypeScript 和 TailwindCSS。網站支援 MDX、暗黑模式、模糊搜尋、RSS feed 和 sitemap。

**網站 URL**: https://mtwmt.com

## 常用指令

```bash
# 開發環境
npm run dev        # 啟動開發伺服器
npm start          # 同 npm run dev

# 建置與預覽
npm run build      # 建置靜態網站到 dist/
npm run preview    # 預覽建置後的網站

# Astro CLI
npm run astro      # 執行 Astro CLI 指令
```

## 架構概覽

### Content Collections 系統

專案使用 Astro Content Collections 管理內容，定義在 `src/content/config.ts`：

- **blog**: 主要部落格文章集合 (`src/content/blog/`)
- **drafts**: 草稿文章集合 (`src/content/drafts/`)
- **ironman**: 鐵人賽文章集合 (`src/content/ironman/`)

所有集合共享相同的 frontmatter schema：
```typescript
{
  title: string,
  tags?: string[],
  categories?: string[],
  date: string | Date,
  update?: string
}
```

### 佈局系統

專案採用三層佈局架構 (`src/layouts/`)：

1. **MainLayout.astro**: 最外層佈局，包含 `<html>`、`<head>` 和基本結構
2. **ContentLayout.astro**: 內容佈局，處理文章內容區域
3. **AsideLayout.astro**: 側邊欄佈局

佈局之間可以嵌套使用，通過 `<slot>` 傳遞內容。

### 動態路由

專案使用 Astro 的檔案路由系統：

- `/blog/[...slug].astro`: 單篇文章頁面
- `/blog/page/[page].astro`: 分頁列表
- `/blog/tags/[slug].astro`: 標籤頁面
- `/blog/categories/[slug].astro`: 分類頁面

### API Routes

使用 `GET` 方法（大寫）定義 API endpoints：

- `src/pages/rss.xml.js`: RSS feed (使用 `export async function GET()`)
- `src/pages/search.json.ts`: 搜尋 JSON API (使用 `export async function GET()`)

**重要**: Astro 5.x 要求 API route handlers 必須使用大寫的 HTTP 方法名稱（GET, POST 等）。

### TailwindCSS v4 配置

專案使用 **TailwindCSS v4** 搭配 Vite 插件（`@tailwindcss/vite`）：

1. **配置方式**: 使用 CSS-based 配置，在 `src/styles/global.scss` 中定義主題
2. **@theme 指令**: 在 `@theme {}` 區塊中定義自訂顏色和字體
3. **自訂 utilities**: 在 `@layer utilities {}` 中定義自訂工具類別（如 `text-default`、`bg-default`）
4. **暗黑模式**: 使用 `:root.dark {}` 在 runtime 覆蓋 CSS 變數

**重要變更（v3 → v4）**:
- ❌ 不再使用 `@astrojs/tailwind` integration
- ✅ 使用 `@tailwindcss/vite` plugin
- ❌ 移除 `tailwind.config.cjs`
- ✅ 改用 `@import "tailwindcss"` 取代 `@tailwind` 指令
- ❌ opacity utilities（`bg-opacity-*`）已移除
- ✅ 使用新語法：`bg-*/opacity` (例如 `bg-primary-500/70`)

**Astro 組件中使用 @apply**:
- 每個包含 `<style>` 標籤並使用 `@apply` 的組件，都必須在 style 標籤開頭加上 `@import "tailwindcss";`
- 或者將樣式移到 `global.scss` 中

### Icons 系統

使用 `astro-icon` 整合多個 icon 集：
- grommet-icons
- teenyicons
- la (Line Awesome)
- ph (Phosphor)
- ic
- mdi (Material Design Icons)

在 `astro.config.mjs` 中配置，使用 `include: {"icon-set": ["*"]}` 載入所需 icons。

### 全域常數

`src/consts.ts` 定義網站全域常數：
- `SITE_TITLE`: 網站標題
- `SITE_DESCRIPTION`: 網站描述

在所有頁面和組件中可以直接 import。

### Markdown 語法高亮

使用 Shiki 進行程式碼高亮，語言識別碼必須使用小寫：
- ✅ \`\`\`javascript
- ✅ \`\`\`astro
- ❌ \`\`\`JS
- ❌ \`\`\`Astro

### 客戶端路由

專案使用 Astro 5.x 的 `ClientRouter` (取代舊版的 `ViewTransitions`)：

```astro
import { ClientRouter } from 'astro:transitions';
<ClientRouter />
```

## 重要檔案位置

- **全域樣式**: `src/styles/global.scss`
- **基礎 Head 組件**: `src/components/BaseHead.astro` (包含 SEO meta、ClientRouter)
- **工具函式**:
  - `src/lib/sortByDate.ts`: 文章排序
  - `src/lib/readingtime.js`: 閱讀時間計算
  - `src/lib/highlight.ts`: 程式碼高亮處理

## 版本資訊

- **Astro**: 5.14.1
- **TailwindCSS**: 4.1.14 (使用 CSS-based 配置)
- **@tailwindcss/vite**: 4.1.14
- **Node.js**: v20+

## 樣式與主題 (Style & Theme)

專案採用 **Teal Comic (Mandy's Website Theme)**：
-   **核心**: 主色 Teal (`#00aaaa`) + Comic Book 結構 (粗邊框、硬陰影)。
-   **配置**: 定義於 `src/styles/tailwind.css` (@theme 區塊) 與 `src/styles/global.css` (組件層級)。
-   **Tailwind v4**:
    -   **@import "tailwindcss";**: 在所有使用 `@apply` 的 `.astro` 檔案中必須包含。
    -   **CSS Variables**: 主要顏色定義在 `tailwind.css` 的 `@theme` 中。

## 注意事項

1. **Astro v5 API**: 使用大寫 HTTP 方法 (`GET`, `POST`) 定義 API routes。
2. **Client Router**: 使用 `<ClientRouter />` 取代舊版 ViewTransitions。
3. **圖片優化**: 支援 WebP 壓縮與 Lazy Loading。

