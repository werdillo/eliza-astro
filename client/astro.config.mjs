import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://eliza-k.lv",
  integrations: [
    solidJs(),
    sitemap({
      i18n: {
        defaultLocale: "lv",
        locales: {
          lv: "lv",
          en: "en",
          ru: "ru",
        },
      },
      filter: (page) => !page.includes("/admin") && !page.includes("/test"),
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
