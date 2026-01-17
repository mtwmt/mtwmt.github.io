---
name: 程式碼品質與最佳實踐 (Clean Code & Best Practices)
description: 定義程式碼品質標準、防止幻覺 (Anti-Hallucination) 與官方文件查證流程。確保所有程式碼皆為最新、穩定且符合最佳實踐。
---

# 程式碼品質與最佳實踐 (Clean Code & Best Practices)

本技能旨在確保程式碼的可維護性、正確性與時效性。核心原則是 **「寧可空白，不可捏造；寧可查證，不可過時」**。

## 🚫 核心規則：防止幻覺與API過時 (Anti-Hallucination)

這是本專案最嚴格的執行規則。

1.  **官方文件優先 (Documentation First)**
    *   **規則**: 在撰寫任何第三方套件 (Astro, Tailwind, React 等) 的程式碼之前，**必須** 確認該寫法在當前安裝版本中是有效的。
    *   **執行步驟**:
        1.  檢查 `package.json` 確認套件版本 (例如: Astro v5, Tailwind v4)。
        2.  如果不確定 API 是否變更，使用 `search_web` 或 `read_url_content` 查閱官方變更日誌 (Changelog) 或最新文件。
        3.  **絕對禁止** 憑記憶使用舊版 API (例如: 在 Tailwind v4 中使用 v3 的 config 寫法，或在 Astro v5 中使用已棄用的 API)。

2.  **不確定就查證 (Verify if Unsure)**
    *   **規則**: 如果你對某個語法只有 80% 的把握，請視為 0%。
    *   **行動**: 告訴使用者：「我需要先確認這個版本的最新寫法」，然後去查證。不要猜測。

3.  **標註適用版本**
    *   在回答複雜的技術問題時，主動標註：「以下程式碼適用於 Astro v5.x」。

## 🧹 Clean Code 實踐指南

### 1. 命名與可讀性
-   **變數命名**: 使用全名，避免無意義縮寫 (用 `userProfile` 而非 `uProf`)。
-   **函式職責**: 一個函式只做一件事 (Single Responsibility Principle)。如果函式超過 30 行，考慮拆分。
-   **註解**: 註解應解釋 **「為什麼 (Why)」** 這樣寫，而不是 **「做了什麼 (What)」** (程式碼本身就該說明做了什麼)。

### 2. 現代化 JavaScript/TypeScript
-   **使用最新語法**: 優先使用 ESNext 特性 (Optional Chaining `?.`, Nullish Coalescing `??`, Async/Await)。
-   **避免 Magic Numbers**: 將硬編碼的數字或字串提取為 `const` 常數或設定檔。
-   **TypeScript**:
    -   嚴格避免 `any`。如果一時解不開型別，使用 `unknown` 並加上註解說明。
    -   善用 `interface` 與 `type` 定義清晰的資料結構。

### 3. CSS/Tailwind 最佳實踐
-   **避免過度堆疊**: 如果一個元素有超過 10 個 class，考慮使用 `@apply` 提取為組件或自定義 class (特別是在重複使用的情況下)。
-   **語意化顏色**: 使用 `text-error` 而非 `text-red-500`，確保與設計系統一致。

## 🔍 重構與除錯流程

當遇到錯誤時：
1.  **不要隨意試錯**: 不要盲目地修改代碼看能不能跑。
2.  **定位根本原因**: 閱讀錯誤訊息，追蹤 Stack Trace。
3.  **查閱最新解法**: 搜尋錯誤訊息時，加上「年份」或「版本號」關鍵字，避免參考到 3 年前的 StackOverflow 解答。

---
**記住：你的目標是寫出「一年後你自己回來接手也能輕易看懂」的程式碼。**
