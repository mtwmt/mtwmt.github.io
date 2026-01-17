---
name: UI/UX Pro Max (設計智能)
description: 全方位的設計指南，提供專業的 UI/UX 原則、配色方案與開發工作流。適合需要從零打造高品質介面的場景。
---

# UI/UX Pro Max - 設計智能 (Design Intelligence)

本技能提供建立 Web 與移動端應用介面的綜合指南，包含樣式選擇、UX 最佳實踐與實作檢查清單。

## 🎯 核心工作流 (Workflow)

當需要進行 UI/UX 工作（設計、建立、實作、審查、修復、改進）時，請遵循以下步驟：

### 步驟 1: 分析需求 (Analyze User Requirements)
從請求中提取關鍵資訊：
- **產品類型**: SaaS, 電商, 個人作品集, 儀表板, Landing Page 等。
- **風格關鍵字**: 極簡 (Minimal), 活潑 (Playful), 專業 (Professional), 優雅 (Elegant), 深色模式 (Dark Mode) 等。
- **產業**: 醫療, 金融, 遊戲, 教育等。
- **技術棧**: 預設為 `html-tailwind` (本專案適用 Astro + Tailwind)。

### 步驟 2: 建立設計系統 (Generate Design System)
在編寫程式碼前，先定義設計規範：
1.  **配色 (Colors)**: 定義主色 (Primary)、強調色 (Accent) 與背景色，確保深淺模式對比度充足。
2.  **排版 (Typography)**: 選擇標題與內文的字體搭配。
3.  **陰影與邊框 (Effects)**: 統一使用圓角 (Radius) 與陰影 (Shadow) 風格。
4.  **避免模式 (Anti-patterns)**: 識別應避免的設計錯誤。

### 步驟 3: 補充詳細設計 (Supplement)
根據需要補充特定領域的設計：
- **圖表 (Charts)**: 適用於數據儀表板。
- **UX 最佳實踐**: 動畫、無障礙設計 (Accessibility)。
- **Landing Page 結構**: Hero 區塊、社會認同 (Social Proof) 等。

---

## ✅ 專業 UI 通用規則 (Common Rules)

### 圖示與視覺元素 (Icons & Visual Elements)
| 規則 | Do (建議) | Don't (避免) |
|------|----|----- |
| **無 Emoji 圖示** | 使用 SVG 圖示 (如 Iconify, Heroicons) | 使用 🎨 🚀 ⚙️ Emoji 作為 UI icons |
| **穩定的 Hover** | 使用顏色/透明度過渡 | 使用會改變佈局大小的縮放 (Scale) |
| **一致的圖示大小** | 使用固定的容器 (如 w-6 h-6) | 混合使用不同尺寸的圖示 |

### 互動與游標 (Interaction & Cursor)
| 規則 | Do (建議) | Don't (避免) |
|------|----|----- |
| **Cursor Pointer** | 所有可點擊/Hover 的卡片加上 `cursor-pointer` | 保留預設游標於互動元件上 |
| **Hover 回饋** | 提供視覺回饋 (顏色, 陰影, 邊框) | 無任何互動提示 |
| **平滑過渡** | 使用 `transition-colors duration-200` | 瞬間變化或過慢 (>500ms) |

### 深淺模式對比 (Contrast)
| 規則 | Do (建議) | Don't (避免) |
|------|----|----- |
| **亮色卡片** | 使用 `bg-white/80` 或更高不透明度 | 使用 `bg-white/10` (太透明) |
| **文字對比 (亮)** | 使用 `#0F172A` (slate-900) 於主要文字 | 使用 `#94A3B8` (slate-400) 於內文 (太淡) |
| **邊框可見度** | 亮色模式使用 `border-gray-200` | 使用 `border-white/10` (看不見) |

### 佈局與間距 (Layout & Spacing)
| 規則 | Do (建議) | Don't (避免) |
|------|----|----- |
| **懸浮導航列** | 加入 `top-4 left-4 right-4` 間距 | 直接貼齊 `top-0 left-0 right-0` |
| **內容內距** | 考量固定導航列的高度 | 讓內容被固定元素遮擋 |
| **一致的最大寬度** | 統一使用 `max-w-6xl` 或 `max-w-7xl` | 混合使用不同的容器寬度 |

---

## 📋 發布前檢查清單 (Pre-Delivery Checklist)

1.  **視覺品質**: 顏色一致？間距是否遵循柵格系統？
2.  **互動**: Hover 狀態是否明顯？按鈕是否有 Active 效果？
3.  **深色模式**: 切換到深色模式檢查是否有文字看不見或對比度不足。
4.  **無障礙 (a11y)**: 圖片是否有 Alt？按鈕是否有 Aria-label？
5.  **響應式**: 在手機尺寸下是否破版？
