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

// https://astro.build/config
export default defineConfig({
  site: "https://mtwmt.com",
  prefetch: true,
  // 關於我已整合進首頁小島的「關於我的小屋」面板；舊網址轉回首頁，避免外部連結變成 404。
  redirects: {
    "/about": "/",
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
      // 保險：即使開發頁面意外被建置，也不列入 sitemap
      filter: (page) => {
        const { pathname } = new URL(page);
        return !pathname.startsWith("/yezi-check");
      },
      customPages: ["https://mtwmt.com/price-generator/"],
    }),
  ],
});
