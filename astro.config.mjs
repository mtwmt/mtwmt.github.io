import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://mtwmt.com",
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    icon({
      include: {
        "grommet-icons": ["*"],
        teenyicons: ["*"],
        la: ["*"],
        ph: ["*"],
        ic: ["*"],
        mdi: ["*"],
        uis: ["*"],
      },
    }),
    mdx(),
    sitemap(),
  ],
});
