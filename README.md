# Mandy 的個人網站

Astro 負責頁面與文章，Tailwind CSS 負責版面，Three.js 負責首頁 3D 紙上小島。這個專案以 Mandy 能閱讀、修改與維護為優先。

## 開始開發

```sh
nvm install
nvm use
npm ci
npm run dev
```

程式就在專案根目錄的 `src/`，沒有另外的 `site/` 專案。開發首頁是 `/`；頁仔的正面、側面、背面與動畫預覽是 `/yezi-check/`（只在 `npm run dev` 出現，不會被建置或部署）。

## 要修改內容，先看這裡

| 想改什麼                             | 檔案                       | 說明                                                                 |
| ------------------------------------ | -------------------------- | -------------------------------------------------------------------- |
| 歡迎卡、SEO、內容面板文案、操作說明  | `src/data/home.ts`         | `home` 是歡迎卡，`panels` 是工坊／筆記／小屋／鐵人賽／朋友／聯絡面板 |
| Email、GitHub、聯絡表單送出網址      | `src/data/site.ts`         | 首頁面板與聯絡頁共用，不用改兩次                                     |
| 作品名稱、網址、分類                 | `src/data/projects.ts`     | 複製一筆作品物件再填資料；編輯器會檢查必填欄位                       |
| 地標座標、名稱、互動提示、小地圖文字 | `src/data/island.ts`       | `destinations` 管地標與傳送後朝向，`landmarks` 管招牌與小地圖        |
| 友情連結                             | `src/data/friends.ts`      | 島上的朋友路標與面板共用                                             |
| 鐵人賽系列文                         | `src/data/ironman.ts`      | 頒獎台、面板與 `/blog/tags/` 列表共用，新的放最前面                  |
| 關於我、技能與本站使用技術           | `src/data/about.ts`        | 「關於我的小屋」面板使用；面板標題在 `home.ts` 的 `panels.about`     |
| 筆記頁文案、每頁文章數               | `src/data/notes.ts`        | `pageSize` 是筆記列表每頁篇數                                        |
| 聯絡頁文案                           | `src/data/contactPage.ts`  | 表單欄位在 `src/pages/contact.astro`                                 |
| 404 頁文案                           | `src/data/notFound.ts`     | 頁仔扶頭動畫在 `src/scripts/island/not-found.ts`                     |
| 部落格文章                           | `src/content/blog/**/*.md` | 沿用 Markdown 和既有路由；新增時參照同分類的 frontmatter             |
| RSS 名稱、閱讀頁預設標題             | `src/consts.ts`            | 既有閱讀頁共用資訊                                                   |

例如修改首頁介紹，只改 `home.ts`：

```ts
introduction: [
  '第一行介紹',
  '第二行介紹',
],
```

每個陣列項目是一行；不要在資料裡塞 HTML。尚在討論的文案，確認後才套用。

## 版面與程式分工

```text
src/
  data/                      # 內容資料，平常最常修改
  components/
    BaseHead.astro           # SEO、字體、RSS、ClientRouter 與主題偏好
    Fonts.astro              # Google Fonts（首頁與筆記頁共用）
    Brand.astro              # 「m.」品牌標誌（小島與筆記頁兩種樣式）
    Header.astro / Footer.astro  # 筆記頁頁首與頁尾
    Button.astro             # 筆記版型按鈕（有 href 輸出連結）
    notes/                   # 筆記列表、表單欄位
    island/                  # 首頁 Astro 元件
      WelcomeCard.astro      # 歡迎卡（含「看作品・讀筆記」）
      GameHeader.astro       # 品牌、夜晚切換與操作說明
      MiniMap.astro          # 小地圖與傳送
      GameControls.astro     # 鍵盤提示與手機操作
      ContentDialog.astro    # 作品、筆記、鐵人賽、朋友、聯絡等內容面板
      NotFoundCharacter.astro  # 404 的頁仔
  layouts/NotesLayout.astro  # 筆記、聯絡、搜尋、404 共用版型
  pages/
    index.astro              # 組合首頁
    contact.astro            # 聯絡表單
    blog/**                  # 文章、分頁、標籤、分類
  dev-pages/yezi-check.astro # 角色檢查頁，只在 dev 由 astro.config.mjs 注入
  scripts/island/
    index.ts                 # UI 事件、面板開關、白天／夜晚設定
    world.ts                 # 場景、移動、鏡頭、碰撞、坐下、日夜
    character.ts             # 頁仔模型與動畫
    papercraft.ts            # 房屋、桌椅、書本等紙模型
    not-found.ts             # 404 頁仔的扶頭動畫
    character-preview.ts     # 角色檢查頁的預覽操作
    dom.ts                   # 必要 DOM 元素的型別與缺失檢查
  styles/
    tailwind.css             # Tailwind 入口、色票、字體與裝置 variants
    notes.css                # 筆記頁亮／暗語意色與文章內文排版
    island.css               # 首頁少量整頁基礎行為
```

固定內容面板由 Astro 產生 HTML，TypeScript 只切換面板。新增一般文案不需要用 `document.createElement()` 建畫面，也不需要讀懂 Three.js。

### 修改樣式

- 排版、間距、字級、顏色、RWD 優先在 Astro 元件使用 Tailwind utilities。
- 首頁紙材質色票集中在 `tailwind.css` 的 `paper-*` tokens，例如 `bg-paper`、`text-paper-ink`；筆記頁用 `note-*` tokens，亮／暗兩組實際值在 `notes.css`。
- `compact:` 表示寬度不超過 850px；`touch:` 表示寬度不超過 600px 或觸控裝置；`short:` 表示高度不超過 500px。
- `touch:short:` 用於手機橫向。安全區偏移、世界座標投影等特殊計算可保留動態值；不要把普通排版寫進 TS。
- Three.js 模型的顏色、位置、尺寸屬於 3D 資料，不是 HTML 的 CSS，仍由 TS 控制（`world.ts` 與 `papercraft.ts` 的調色盤）。
- 深色模式由 `<html class="dark">` 控制，筆記頁與小島夜晚共用 `localStorage` 的 `theme`；沒設定過就跟系統。

### 修改遊戲

移動、鏡頭、坐姿或日夜才需要改 `world.ts`；頁仔造型或動畫才改 `character.ts`。地標座標是世界座標 `[X, Z]`，招牌是 `[X, Y, Z]`；場景道具使用三倍比例，移動地標時要同時確認模型、觸發點與碰撞範圍。

- 道具放在地面時用 `world.ts` 的高度常數：`ISLAND_SURFACE`（島面）、`BUILDING_BASE`（建築平台）、`SHEET_REST_Y`（廣場紙張），避免浮空或陷入地面。
- 白天與夜晚的天空、霧、燈光、海色在 `world.ts` 的 `DAY`／`NIGHT`；夜晚燈籠與窗戶的暖光也在這裡。
- 頁仔的公開介面：`animate()` 每幀更新動作，`setHeadTurn()` 讓頁仔轉頭看鏡頭，`setAirborne()` 傳入跳躍高度與速度做起跳、空中與落地反應。

操作：WASD／方向鍵移動、Shift 跑步、Space 跳躍、拖曳轉鏡頭、滾輪縮放、E 互動、右上角月亮切換夜晚。信箱與小屋可以前往聯絡表單；頒獎台是鐵人賽系列文；海邊路標是朋友的部落格；長椅可以坐下，再按 E、移動或跳躍站起。

## 修改後如何確認

```sh
npm run check         # 檢查 Astro 與 TypeScript
npm run format        # 格式化程式；不重寫文章與 public 資產
npm run format:check  # 只檢查格式
npm run build         # 確認靜態頁面能正常產生
npm run preview       # 預覽建置結果
```

專案沿用 Astro strict 設定，程式使用 TypeScript。Astro build 不取代型別檢查，因此兩個指令都要執行。TypeScript 使用 Astro 檢查工具支援的 6.x；升級時一起確認工具的相容範圍。

視覺或互動改動還要在瀏覽器確認：桌面與手機尺寸、開始探索、移動／跑步／跳躍、坐下、開關面板、白天與夜晚切換，以及 `/yezi-check/` 的側面、背面與跳躍模式。型別正確不代表模型沒有穿插；手機效能與多指操作需要真機確認。

`npm run dev` 會在背景常駐（`npx astro dev stop` 停止）。如果首頁突然顯示「3D 世界暫時無法載入」、console 出現 `504 (Outdated Optimize Dep)`，通常是安裝或移除套件後 Vite 的依賴快取過期：停止 dev server、刪除 `node_modules/.vite` 再重新啟動即可。

`dist/`、`.astro/`、`node_modules/` 都是產物或依賴，不直接修改。`design/` 是本機視覺驗證資料，不納入 Git。舊網址 `/about` 由 `astro.config.mjs` 的 `redirects` 轉回首頁。
