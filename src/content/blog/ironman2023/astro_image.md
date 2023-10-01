---
title: 了解 Astro 圖片處理 (Image)
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/11
---

Astro 提供多種方法來有效地管理和顯示圖片，不論它們是存儲在專案內部、遠程連結，還是由內容管理系統（CMS）或內容分發網絡（CDN）管理。

## 圖片存儲位置

我們建議將本地圖片存儲在 `src/` 目錄下，以允許 Astro 對其進行轉換、優化和打包。
位於 `/public` 目錄下的文件將被直接複製到構建目錄，不會進行任何處理。

本地圖片可以存儲在 `src/` 中的任何文件夾中，以便它們可以被項目中的所有文件使用，包括 `.astro`、`.md`、`.mdx`、`.mdoc` 以及其他 UI 框架。請注意，圖片可以與內容並列存放。

如果您希望圖片不經處理或希望直接引用公共 URL，則將圖片存儲在 `public/` 文件夾中。

## 遠程圖片

您也可以選擇將圖片存儲在遠程位置，例如內容管理系統（CMS）或數字資產管理（DAM）平台。

> 注意：getImage() 依賴於僅在伺務器上執行的 API，當在客戶端上使用時會導致構建失敗。

### 使用 getImage()

Astro 提供了一個方便的函數 `getImage()`，用於獲取圖片數據，無論它們是本地的還是遠程的。您可以像這樣使用 `getImage()` 函數：

```astro
---
import { getImage } from "astro:assets";
import myBackground from "../background.png"

const optimizedBackground = await getImage({src: myBackground, format: 'avif'})
---

<div style={`background-image: url(${optimizedBackground.src});`}></div>
```

getImage()函數會回傳一個物件，其中包含以下屬性：

```js
{
  options: {...} // Original parameters passed
  src: "https//..." // Path to the generated image
  attributes: {...} // Additional HTML attributes needed to render the image (width, height, style, etc..)
}
```

這將使您能夠更靈活地處理圖片並使用它們，不論它們存儲在哪裡。 `getImage()` 函數會自動處理圖片的載入和優化，以確保最佳性能和性能。

## 在 .astro 文件中使用圖片

在 `.astro` 文件中，必須導入本地圖片以便使用它們，而遠程和 `public/` 文件夾中的圖片不需要導入。

您可以使用 Astro 內置的 `<Image />` 組件來顯示經過 `astro:assets` 優化的圖片，當然，Astro 還支持直接編寫 HTML 的 `<img>` 標籤，以跳過圖片處理過程。

```astro
---
import { Image } from 'astro:assets';
import localBirdImage from '../../images/subfolder/localBirdImage.png';
---
<Image src={localBirdImage} alt="這是一張圖" />
```

### 使用 `<Image />` 組件（astro:assets）

使用內置的 `<Image />` Astro 組件，您可以輕鬆地顯示本地圖片以及配置的遠程圖片的優化版本。

`<Image />` 可以自動調整本地或授權的遠程圖片的尺寸、文件格式和品質，以控制所顯示圖片的外觀。生成的 `<img>` 標籤包括 `alt`、`loading` 和 `decoding` 屬性，並基於原始圖片的長寬比例計算圖片尺寸，以避免累積布局變化（CLS）。

### 圖片屬性

- 存儲在 `src/` 中的本地圖片 - 必須將圖片使用相對文件路徑進行導入，然後使用導入的名稱作為 `src` 屬性的值。

```astro
---
import { Image } from 'astro:assets';
import myImportedImage from `../assets/my-local-image.png`
---

<Image src={myImportedImage} alt="描述性文本" />
```

- 存儲在 `public/` 文件夾中的圖片 - 使用相對於 public/ 文件夾的文件路徑作為 src 屬性的值：

```astro
---
import { Image } from 'astro:assets';
---
<Image
  src="/images/my-public-image.png"
  alt="描述性文本"
  width="200"
  height="150"
/>
```

- 遠程圖片 - 使用圖片的完整 URL 作為 src 屬性的值：

```astro
---
import { Image } from 'astro:assets';
---
<Image
  src="https://example.com/remote-image.jpg"
  alt="描述性文本"
  width="200"
  height="150"
/>
```

### 圖片品質 quality

`quality` 屬性可用於指定圖片的質量。它可以是以下之一：

- 預設值（low、mid、high、max）：這些預設值將自動在不同格式之間進行規範化，通常代表壓縮比例的建議值。

- 0 到 100 之間的數字：具體的含義取決於圖片格式。例如，對於 JPEG 格式，這個數字通常表示壓縮質量，0 表示最低質量，100 表示最高質量。

---

## 授權遠程圖片

您可以透過配置圖片來源的 URL 和啟用圖片優化，使用圖片`.domains` 和圖片`.remotePatterns`，這是一個額外的安全措施，用於確保您的網站能夠安全地展示來自外部來源的圖片。

通過這種設置，來自其他來源的遠程圖片將不會自動進行優化，但如果您使用 `<Image />` 組件來呈現這些圖片，將有助於防止累積佈局位移（CLS）的問題。

例如，以下配置僅允許從 astro.build 的遠程圖片進行優化：

```js
// astro.config.mjs
export default defineConfig({
  image: {
    domains: ["astro.build"],
  },
});
```

以下配置僅允許從 HTTPS 主機獲取的遠程圖片：

```js
astro.config.mjs;
export default defineConfig({
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
});
```

---

## Markdown 文件中的圖片

在 .md 文件中，您可以使用標准的 Markdown `![alt](src)` 語法。此語法與 Astro 的圖片服務 API 一起使用，以優化本地圖片和經授權的遠程圖片。

```markdown
src/pages/post-1.md

# 我的 Markdown 頁面

<!-- 存儲在 src/assets/ 中的本地圖片 -->
<!-- 使用相對文件路徑或導入別名 -->

![stars](../assets/stars.png)

<!-- 存儲在 public/images/ 中的圖片 -->
<!-- 使用相對於 public/ 的文件路徑 -->

![stars](/images/stars.png)

<!-- 另一台伺務器上的遠程圖片 -->
<!-- 使用圖片的完整 URL -->

![Astro](https://example.com/images/remote-image.png)
```

.md 文件中不支持 `<img>` 標籤，並且在 .md 文件中無法使用 `<Image />` 組件。

如果需要更多控制圖片屬性，我們建議使用 `.mdx` 文件格式，它允許您在 Markdown 語法之外包含 Astro 的 `<Image />` 組件或 JSX `<img />` 標籤。使用 MDX 集成來為 Astro 添加對 MDX 的支持。

## .mdx 文件中的圖片

src/pages/post-1.mdx

```astro
---
title: 我的頁面標題
---
import { Image } from 'astro:assets';
import rocket from '../assets/rocket.png';

# 我的 MDX 頁面

// 存儲在 src/assets/ 中的本地圖片
<Image src={rocket} alt="太空中的火箭。"/>
<img src={rocket.src} alt="太空中的火箭。" />
![rocket](../assets/rocket.png)

// 存儲在 public/images/ 中的圖片
<Image src="/images/stars.png" alt="星空。" />
<img src="/images/stars.png" alt="星空。" />
![stars](/images/stars.png)

// 另一台伺務器上的遠程圖片
<Image src="https://example.com/images/remote-image.png" />
<img src="https://example.com/images/remote-image.png" />
![Astro](https://example.com/images/remote-image.png)
```

## 內容集合中的圖片

您可以在內容集合中的條目的前端使用相對於當前文件夾的路徑來聲明相關聯的圖片，例如 blog 文章的封面圖片。

```markdown
## src/content/blog/my-post.md

title: "我的第一篇 blog 文章"
cover: "./firstpostcover.jpeg" # 將解析為 "src/content/blog/firstblogcover.jpeg"
coverAlt: "一幅山脈後的夕陽照片。"

---
```

使用 image 函數可讓您使用 Zod 驗證圖片元數據。

```ts
import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      cover: image().refine((img) => img.width >= 1080, {
        message: "封面圖片必須至少寬度為 1080 像素！",
      }),
      coverAlt: z.string(),
    }),
});

export const collections = {
  blog: blogCollection,
};
```

然後，將圖片導入並轉換為元數據，以便將其作為 src 傳遞給 `<Image/>`、`<img>` 或 `getImage()`。

```astro
---
import { Image } from "astro:assets";
import { getCollection } from "astro:content";
const allBlogPosts = await getCollection("blog");
---
{
  allBlogPosts.map((post) => (
    <div>
      <Image src={post.data.cover} alt={post.data.coverAlt} />
      <h2>
        <a href={"/blog/" + post.slug}>{post.data.title}</a>
      </h2>
    </div>
  ))
}
```

## 總結

Astro 提供多種方法來處理圖片，包括使用 `<Image />` 組件、`<img>` 標籤、.`mdx` 文件中的 `JSX`、內容集合中的圖片以及 UI 框架組件中的圖片。您可以根據項目的需要選擇最適合的方法。

## 參考資料

[Astro Images](https://docs.astro.build/en/guides/images/)
