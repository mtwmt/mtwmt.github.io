# 組件系統規劃（參考 DaisyUI）

## DaisyUI 組件分類架構

DaisyUI 將組件分為 7 大類別：

1. **Actions（動作）** - Button, Dropdown, Modal, Swap, Theme Controller
2. **Data Display（資料展示）** - Accordion, Avatar, Badge, Card, Carousel, Chat bubble, Collapse, Countdown, Diff, Kbd, Stat, Table, Timeline
3. **Navigation（導航）** - Breadcrumbs, Link, Menu, Navbar, Pagination, Steps, Tab
4. **Feedback（回饋）** - Alert, Loading, Progress, Skeleton, Toast, Tooltip
5. **Data Input（表單）** - Calendar, Checkbox, File Input, Input field, Radio, Range, Rating, Select, Textarea, Toggle
6. **Layout（佈局）** - Divider, Drawer, Footer, Hero, Indicator, Join, Stack
7. **Mockup（模擬）** - Browser, Code, Phone, Window

---

## 目前組件對照表

| DaisyUI 分類     | 已有組件                       | 建議新增                                   |
| ---------------- | ------------------------------ | ------------------------------------------ |
| **Actions**      | Button                         | Dropdown, Modal, Toast                     |
| **Data Display** | Card, Badge, Tags              | Accordion, Collapse, Timeline, Table, Stat |
| **Navigation**   | Header, Pagination, Categories | Breadcrumbs, Menu, Tabs, Steps             |
| **Feedback**     | Alert                          | Loading, Progress, Tooltip, Skeleton       |
| **Data Input**   | Input, SearchWidget            | Checkbox, Radio, Select, Textarea, Toggle  |
| **Layout**       | Hero, Footer                   | Divider, Drawer, Stack, Container          |
| **Utility**      | GoTop, Theme, ThemeSwitcher    | -                                          |

---

## 建議的組件目錄結構

```
src/components/
├── actions/          # 動作組件
│   ├── Button.astro
│   ├── Dropdown.astro (新增)
│   └── Modal.astro (新增)
│
├── display/          # 展示組件
│   ├── Card.astro
│   ├── Badge.astro
│   ├── Tags.astro
│   ├── Alert.astro
│   └── Timeline.astro (新增)
│
├── navigation/       # 導航組件
│   ├── Header.astro
│   ├── HeaderLink.astro
│   ├── Pagination.astro
│   ├── Categories.astro
│   └── Breadcrumbs.astro (新增)
│
├── forms/           # 表單組件
│   ├── Input.astro
│   ├── SearchWidget.astro
│   ├── Checkbox.astro (新增)
│   └── Select.astro (新增)
│
├── layout/          # 佈局組件
│   ├── Hero.astro
│   ├── Footer.astro
│   ├── BaseHead.astro
│   └── Divider.astro (新增)
│
├── feedback/        # 回饋組件
│   ├── Alert.astro (移至此)
│   ├── Loading.astro (新增)
│   ├── Toast.astro (新增)
│   └── Tooltip.astro (新增)
│
└── utility/         # 工具組件
    ├── GoTop.astro
    ├── Theme.astro
    ├── ThemeSwitcher.astro
    ├── Toc.astro
    ├── Comments.astro
    ├── FormattedDate.astro
    ├── PageTitle.astro
    ├── PostPreview.astro
    └── FriendshipLink.astro
```

---

## 優先實作組件（依重要性排序）

1. **Divider** - 分隔線（簡單且常用）
2. **Tooltip** - 提示框（提升 UX）
3. **Loading/Spinner** - 載入指示器（必備）
4. **Dropdown** - 下拉選單（常用於導航）
5. **Modal** - 彈出視窗（重要互動）
6. **Tabs** - 標籤頁（內容組織）
7. **Timeline** - 時間軸（部落格常用）
8. **Breadcrumbs** - 麵包屑（導航必備）
9. **Checkbox/Radio** - 表單必備
10. **Select** - 下拉選擇器

---

## 實作原則

1. **Comic Book 風格統一** - 所有組件遵循 Comic Book 風格設計規範：
   - **粗邊框**：2px 黑色邊框 (`border-2 border-gray-900 dark:border-gray-200`)
   - **硬陰影**：偏移式陰影，無模糊 (`4px 4px 0 rgba(0,0,0,0.15)`)
   - **圓角適中**：8px (`rounded-md`)，不過圓
   - **高對比**：白底黑框 / 深底淺框
   - **暗色模式反轉**：陰影從黑色改為白色 (`rgba(255,255,255,0.15)`)
2. **參數命名一致** - 使用 `color` 而非 `variant`
3. **支援暗黑模式** - 所有組件需支援 dark mode（陰影顏色需反轉）
4. **可組合性** - 組件之間可以互相組合使用
5. **無障礙性** - 符合 ARIA 標準

---

## 待辦事項

- [x] 優化配色與樣式系統（已完成 Comic Book 風格）
- [x] 更新 Card 組件為 Comic Book 風格
- [x] 更新 Badge 組件為 Comic Book 風格
- [x] 更新 Button 組件為 Comic Book 風格
- [x] 更新 Alert 組件為 Comic Book 風格
- [x] 更新 Input 組件為 Comic Book 風格
- [x] 更新 Hero 組件為 Comic Book 風格
- [ ] 重新組織現有組件結構（建立分類目錄）
- [ ] 實作優先組件清單
- [ ] 更新 guideline.astro 展示所有組件

## 已完成的 Comic Book 風格組件

- ✅ **Card** - 粗黑邊框 (2px) + 硬陰影偏移 + 適中圓角 (8px)
- ✅ **Badge** - 粗邊框 (2px) + 小硬陰影 + 圓角 (4px)
- ✅ **Button** - 所有 variant 使用 `.btn` class (粗邊框 + 硬陰影)
- ✅ **Alert** - 粗邊框 (2px) + 硬陰影 + 圓角 (8px)
- ✅ **Input** - 粗邊框 (2px) + 硬陰影 + 圓角 (8px)
- ✅ **Hero** - 粗邊框底部分隔線 + Comic Book 風格
