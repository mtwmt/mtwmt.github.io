import { existsSync, readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// 僅開發用頁面（頁仔角色預覽）。
// 檔案放在 src/dev-pages/（不在 src/pages/），只有 `astro dev` 才用 injectRoute 註冊；
// `astro build` 不會產生這些頁面，也就不會出現在 sitemap。
const devOnlyPages = {
  name: "dev-only-pages",
  hooks: {
    "astro:config:setup": ({ command, injectRoute }) => {
      if (command !== "dev") return;
      injectRoute({
        pattern: "/yezi-check",
        entrypoint: "./src/dev-pages/yezi-check.astro",
      });
    },
  },
};

// sitemap 的 lastmod：建置完成後才產生 sitemap，此時直接讀文章頁 HTML 裡
// BaseHead 輸出的 article:modified_time（來自 frontmatter 的 update ?? date），
// 不必在這裡再解析一次 Markdown。非文章頁沒有這個值，就不寫 lastmod。
const distDir = new URL("./dist/", import.meta.url);
function readModifiedTime(pageUrl) {
  const file = new URL(`.${new URL(pageUrl).pathname}index.html`, distDir);
  if (!existsSync(file)) return undefined;
  const html = readFileSync(file, "utf8");
  return html.match(/property="article:modified_time" content="([^"]+)"/)?.[1];
}

// 設了 noindex 的頁面不放進 sitemap，避免給搜尋引擎互相矛盾的訊號。
const sitemapExcluded = ["/search/", "/yezi-check"];

// https://astro.build/config
export default defineConfig({
  site: "https://mtwmt.com",
  prefetch: true,
  // 關於我已整合進首頁小島的「關於我的小屋」面板；舊網址轉回首頁，避免外部連結變成 404。
  redirects: {
    "/about": "/",
    // 筆記列表從第 1 頁開始；/blog 只負責轉址。
    "/blog": "/blog/page/1/",
  },
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    // 只打包實際用到的圖示；用 "*" 會把整套圖示集都放進建置。
    icon({
      include: {
        ic: ["outline-search", "outline-dark-mode", "outline-light-mode"],
      },
    }),
    mdx(),
    devOnlyPages,
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        return !sitemapExcluded.some((path) => pathname.startsWith(path));
      },
      serialize: (item) => {
        const lastmod = readModifiedTime(item.url);
        return lastmod ? { ...item, lastmod } : item;
      },
      customPages: ["https://mtwmt.com/price-generator/"],
    }),
  ],
});
