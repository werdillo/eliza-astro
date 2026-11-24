import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import sitemap from "@astrojs/sitemap";
import UnoCSS from "@unocss/astro";

// The PocketBase host: its photos are fetched at build and served optimized from the site (`astro:assets`).
const { PUBLIC_POCKETBASE_URL } = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");
const pocketbaseHost = PUBLIC_POCKETBASE_URL ? new URL(PUBLIC_POCKETBASE_URL).hostname : undefined;

// https://astro.build/config
export default defineConfig({
  site: "https://eliza-mebeles.lv",
  // HoReCa became the "About us" page; its old addresses keep working.
  redirects: {
    "/[lang]/horeca": "/[lang]/about-us",
    "/[lang]/horeca/hotels": "/[lang]/about-us",
    "/[lang]/horeca/cafe": "/[lang]/about-us",
    "/[lang]/horeca/projects": "/[lang]/about-us",
  },
  image: {
    domains: pocketbaseHost ? [pocketbaseHost] : [],
  },
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
      // Out of the sitemap: the root duplicate and the noindex pages — the old `?name=` redirects and the old HoReCa addresses.
      filter: (page) =>
        // The root is the Latvian home again (its canonical is `/lv/`), so only `/lv/` is listed.
        page !== "https://eliza-mebeles.lv/" &&
        !page.includes("/admin") &&
        !page.includes("/test") &&
        !/\/(lv|en|ru)\/(product|mattress|sale-product|horeca(\/(hotels|cafe|projects))?)\/$/.test(page),
      changefreq: "weekly",
      priority: 0.7,
    }),
  ],
  vite: {
    build: {
      // pdf.js (`features/pdf-viewer/viewer.ts`, ~510 kB) is one library that cannot be split further; it is already
      // loaded with a dynamic import only when a PDF is opened, so the default 500 kB warning is noise.
      chunkSizeWarningLimit: 600,
    },
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
