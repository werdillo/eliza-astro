import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import UnoCSS from "@unocss/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://eliza-mebeles.lv",
  integrations: [
    UnoCSS({ injectReset: false }),
    sitemap({
      i18n: {
        defaultLocale: "lv",
        locales: {
          lv: "lv",
          en: "en",
          ru: "ru",
        },
      },
      // Out of the sitemap: the noindex pages — the old `?name=` redirects and the "coming soon" placeholders.
      filter: (page) =>
        !page.includes("/admin") &&
        !page.includes("/test") &&
        !/\/(lv|en|ru)\/(product|mattress|sale-product|about-us|horeca\/(hotels|cafe|projects))\/$/.test(page),
      changefreq: "weekly",
      priority: 0.7,
    }),
  ],
  vite: {
    resolve: {
      // `#/…` is `src/…`, the same alias tsconfig.json `paths` gives the type checker.
      alias: [
        {
          find: /^#\//,
          replacement: fileURLToPath(new URL("./src/", import.meta.url)),
        },
      ],
    },
  },
});
