import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://mtwmt.com",
  prefetch: true,
  experimental: {
    contentCollectionCache: true,
  },
  // markdown: {
  //   shikiConfig: {
  //     theme: "material-theme-darker",
  //     // 啟用自動換行，避免出現捲軸
  //     wrap: true,
  //   },
  // },
  integrations: [
    // expressiveCode({
    //   frames: {
    //     title: true,
    //   },
    //   shiki: true,
    //   textMarkers: false,
    // }),
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
