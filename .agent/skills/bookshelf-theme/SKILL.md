---
name: Bookshelf Theme & Design System
description: 「Teal Comic」風格指南與組件系統，基於 Mandy's Website 主題。包含了詳細的組件分類、配色規範與實作原則。
---

# Bookshelf 主題與設計系統 (Bookshelf Theme Skill)

本技能定義了本網站獨特的 **Teal Comic (Mandy's Website)** 設計語言與組件系統。

## 🎨 設計理念：Teal Comic

融合了 **Teal (藍綠色)** 主色調與 **Comic Book (美式漫畫)** 結構的獨特風格。
-   **主色**: Teal (`#00aaaa`)
-   **結構**: 粗黑邊框 + 硬陰影 + Dosis 字體。
-   **原則**: 高對比、線條分明，支援 Dark Mode (邊框與陰影反轉)。

## 🧱 核心設計 Token

所有顏色與樣式皆已在 `src/styles/tailwind.css` (CSS 變數) 與 `src/styles/global.css` (Utility Classes) 中定義。

### 1. 色彩系統 (Color System)
-   **Primary (Teal)**: `#00aaaa` (由 `--color-primary-500` 定義)
-   **Semantic Colors**:
    -   **Success**: `#22c55e` (Green) - 視覺化圖表
    -   **Warning**: `#eab308` (Yellow) - 開發工具 (Git, npm)
    -   **Error**: `#ef4444` (Red) - 前端框架 (Angular, React)
    -   **Info**: `#3b82f6` (Blue) - 樣式工具 (SCSS)
    -   **Accent**: `#f97316` (Orange) - 建置工具 (Astro, Vite)
    -   **Neutral**: 語言 (TypeScript)
-   **Backgrounds**:
    -   Light: `#ffffff`
    -   Dark: `#111827` (Gray 900)

### 2. 漫畫風格元素 (Comic Elements)
-   **邊框 (Borders)**:
    -   `.comic-border`: 2px solid black (Dark mode: gray-200)。
    -   `.comic-border-thick`: 3px solid black。
    -   `rounded-md`: 預設圓角 (8px)。
-   **陰影 (Shadows)**:
    -   `.comic-shadow`: 4px 4px 0 (無模糊)。
    -   `.comic-shadow-sm`: 2px 2px 0。
    -   `.comic-shadow-lg`: 6px 6px 0。

## 🧩 組件分類與規範

本專案採用 **類 DaisyUI** 的組件分類架構：

### 1. Actions (動作)
-   **已實作**: `Button`
-   **計畫中**: `Dropdown`, `Modal`
-   **規範**:
    -   `Button`: 使用 `.btn` class，支援 `variant` (primary, accent, ghost, outline)。

### 2. Data Display (展示)
-   **已實作**: `Card`, `Badge`, `Tags`
-   **計畫中**: `Timeline`
-   **規範**:
    -   `Card`: 使用 `.comic-card`，支援 `variant="project"` (帶圖釘效果) 或 `variant="post"`。
    -   `Badge`: 用於技術標籤，必須遵循上方「Semantic Colors」的配色定義。

### 3. Navigation (導航)
-   **已實作**: `Header`, `Pagination`, `Categories`
-   **計畫中**: `Breadcrumbs`
-   **規範**: 導航元素應具備 Hover 互動回饋。

### 4. Feedback (回饋)
-   **已實作**: `Alert`
-   **計畫中**: `Tooltip`, `Loading`
-   **規範**: `Alert` 需使用粗邊框與對應的語意化顏色 icon。

### 5. Data Input (表單)
-   **已實作**: `Input`, `SearchWidget`
-   **規範**: Focus 狀態必須有明顯的 Ring 效果 (`ring-2 ring-primary-500`)。

### 6. Layout (佈局)
-   **已實作**: `Hero`, `Footer`, `MainLayout`, `ContentLayout`, `AsideLayout`
-   **計畫中**: `Divider`
-   **規範**: 容器寬度限制在 `max-w-screen-xl`，保持良好的閱讀體驗。

## 📝 實作 Check List

1.  **CSS 變數優先**: 禁止 Hard-code 色碼，使用 `var(--color-primary-500)`。
2.  **Dark Mode 必測**: 每次新增組件，必須切換暗黑模式檢查邊框可見度。
3.  **無障礙 (a11y)**: 按鈕需有 `aria-label`，圖片需有 `alt`。
4.  **Comic 風格檢查**: 
    -   是直角嗎？ (應為 rounded-md)
    -   有模糊陰影嗎？ (應為無模糊硬陰影)
    -   邊框夠粗嗎？ (應至少 2px)

## 常用程式碼片段

### 按鈕
```astro
<button class="btn bg-primary-500 text-white hover:translate-y-1">
  Click Me
</button>
```

### 技術 Badge
```astro
<Badge color="error">React</Badge>
<Badge color="accent">Astro</Badge>
```

---
*參考文件: `COMPONENT_SYSTEM_PLAN.md` (已整合)*
