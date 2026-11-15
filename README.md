# Eliza-K website

The public site of Eliza-K, a furniture and mattress manufacturer in Riga: collections, mattresses, sale,
fabrics, foam, HoReCa projects, gallery, catalogues and contacts, in Latvian, English and Russian. The
catalogue data comes from PocketBase; the pages are static, and the product, contact and gallery views
are Solid islands that load their data in the browser.

## Structure

```
src/
  core/          logic with no subject
    pocketbase/    PocketBase client, pocketbaseUrl, fileUrl
    fetch/         logged(): log a failed remote call and rethrow it
  components/    the UI kit: presentational, no subject
    slider/        generic Swiper container
    skeleton/      loading placeholders (CSS)
    burger-menu/   mobile menu button and panel
  features/      used by every domain, owned by none
    i18n/          languages, t(), langPath, LanguageDropdown
    analytics/     Google tag
    coming-soon/   placeholder page for a section not open yet
  catalog/       domain: what a visitor browses
    home/          home hero and collection cards
    collections/   collections index, one collection's grid, collection data
    products/      product page (regular, sale and mattress products)
    sale/          sale page
    mattresses/    mattress listing
    textile/       fabric page
    materials/     foam and textile page
    catalogs/      printed catalogues
    shared/        product record type and type labels (imported by path)
  horeca/        domain: hotels, restaurants, cafes
    segments/      segment grid and its data
  company/       domain: the company
    contacts/      addresses and working hours
    awards/        certificates carousel
    gallery/       photographs of completed projects
  app/           composition root
    layout/        document shell (Layout)
    frame/         header, footer, mobile tab bar, navigation
    styles/        tokens.css, main.css
    assets/        logo and mobile tab icons
    tests/         layer and box checks
  pages/         Astro routes, thin: they compose the boxes above
```

Layers import only the layers to their left, and a box is reached through its `index.ts` door. The rules
are checked by `src/app/tests`.

## Commands

```sh
bun install        # install dependencies (bun.lock is versioned)
bun run dev        # development server
bun run build      # static build into dist/
bun run check      # astro check, oxlint and the structure tests
```

Configuration: PocketBase's URL is read from `PUBLIC_POCKETBASE_URL` (see `.env.dist`).

## Stack

- Astro 7.4.12, `@astrojs/solid-js` 7.1.6 with Solid 1.9.19 (Solid 2 is not used), `@astrojs/sitemap` 3.7.5.
- PocketBase client 0.29.0, Swiper 14.4.0.
- Dev: TypeScript 6.0.3, `@astrojs/check` 0.9.12, oxlint 1.93.0 with `eslint-plugin-solid` 0.19.0,
  vitest 5.1.0.
- Deviations from the usual baseline:
  - TypeScript 6.0.3 instead of 7.0.2: `astro check` does not support TypeScript 7 yet.
  - No UnoCSS: the site uses plain CSS and has no Tailwind.
  - `astro-compress` removed: it was installed but not used by the Astro config.

Architecture: [../docs_web/README.md](../docs_web/README.md)
