---
name: Astro 開發指南
description: 本專案使用 Astro、Tailwind CSS 和 TypeScript 開發的最佳實踐與指引。
---

# Astro 開發指南 (Astro Development Skill)

本技能提供開發此 Astro 專案時的指引與最佳實踐。

## 技術棧 (Technology Stack)

- **框架**: Astro v5
- **樣式**: Tailwind CSS v4, Sass
- **內容**: MDX (Content Collections)
- **圖示**: Iconify, astro-icon
- **語言**: TypeScript

⚠️ **重要提醒**: Astro v5 與 Tailwind v4 皆有重大更新。
- **Astro v5**: 路由與 Content Layer 有新變動，請務必查閱官方文件，勿使用 v2/v3 舊寫法。
- **Tailwind v4**: 不再需要 `tailwind.config.js`，改用 CSS 變數配置。請確認寫法符合 v4 規範。

## 專案結構 (Project Structure)

- `src/pages/`: 檔案即路由 (File-based routing)。這裡的 `.astro` 和 `.md` 檔案會直接變成頁面。
- `src/components/`: 可重複使用的組件。
- `src/content/`: 內容集合 (部落格文章等)。
- `src/layouts/`: 頁面佈局 (layouts)。
- `public/`: 靜態資源。

## 最佳實踐 (Best Practices)

### 1. 組件 (Components)
- 預設使用 **Astro 組件** (`.astro`)。
- 僅在嚴格需要客戶端互動時才使用 **React/Preact/Vue** (謹慎使用 `client:*` 指令)。
- 保持組件小巧、專注且可重用。
- Props 應使用 TypeScript 介面定義型別。

```astro
---
interface Props {
  title: string;
  isActive?: boolean;
}

const { title, isActive = false } = Astro.props;
---
<div class:list={['base-class', { 'active': isActive }]}>
  {title}
</div>
```

### 2. 樣式 (Styling - Tailwind CSS)
- 大部分樣式應使用 **Tailwind Utility Classes**。
- 對於複雜、可重用的樣式，建立自定義組件比在 CSS 中使用 `@apply` 更清晰。
- 使用 `class:list` 來處理條件式類別。
- 遵循 **深色模式 (Dark Mode)** 設定 (透過 Tailwind 配置)。

### 3. 內容集合 (Content Collections)
- 在 `src/content/config.ts` 中定義架構 (schemas)。
- 使用 `getCollection` 獲取內容。
- 對 Frontmatter 屬性進行型別檢查。

```typescript
import { getCollection } from 'astro:content';
const blogEntries = await getCollection('blog');
```

### 4. 圖片 (Images)
- 使用 Astro 的 `<Image />` 組件以優化圖片。
- 公開的靜態圖片放在 `public/` 並以字串引用 (如 `/logo.png`)。
- 原始圖片放在 `src/assets/` 以進行最佳化處理。

### 5. SEO 與無障礙 (SEO & Accessibility)
- 確保每個頁面都有獨一無二的 `<title>` 和 `<meta name="description">`。
- 使用語意化 HTML (`<main>`, `<article>`, `<nav>` 等)。
- 為所有圖片添加 `alt` 文字。

### 6. TypeScript
- `tsconfig.json` 中已啟用 `strict` 模式。
- 避免使用 `any`，應使用明確的型別。
- 使用 Astro 為內容集合生成的型別。
