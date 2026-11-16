# Eliza-K website

The public site of Eliza-K, a furniture and mattress manufacturer in Riga: collections, mattresses, sale,
fabrics, foam, HoReCa projects, gallery, catalogues and contacts, in Latvian, English and Russian.

The site is static. The catalogue (products, mattresses, sale items, fabrics, contacts, gallery) is read
from PocketBase **at build time**: each product has its own page per language, built from its record.

## Structure

```
src/
  core/          logic with no subject
    pocketbase/    PocketBase client (base URL without trailing slash), fileUrl
    fetch/         logged(): log a failed remote call and rethrow it
    slug/          URL slugs of records (path, unique within its collection)
  components/    the UI kit: presentational, no subject
    typography/    the nine text styles (H1–H6, P1–P3)
    slider/        generic Swiper container
    burger-menu/   mobile menu button and panel
    image-tile/    photograph with a label
    landing-tile/  picture on a light card with a caption
  features/      used by every domain, owned by none
    i18n/          languages, langPath, LanguageDropdown
    analytics/     Google tag
    coming-soon/   placeholder page for a section not open yet
  site/          domain: the whole public site as one matrix
    products/      product pages (product, sale-product, mattress), the sale and mattress listings, routes, schema
    collections/   collection index, one collection's grid, the home collection cards
    materials/     components page (foam and textile) and the fabric page
    catalogs/      printed catalogues
    company/       contacts, awards, gallery
    segments/      HoReCa segments (hotels, restaurants, cafes)
    home/          home page hero
    shared/        product record type, type labels and collection photographs (imported by path)
  app/           composition root
    layout/        document shell, SEO head and schema, Redirect
    frame/         header, footer, mobile tab bar, navigation
    styles/        tokens.css, base.css, animations.css
  tests/         the structure checks (layers, boxes, doors)
  pages/         Astro routes, thin: they compose the boxes above
```

Layers import only the layers to their left, and a box is reached through its `index.ts` door. The rules
are checked by `src/tests`. Text sizes, weights and line heights are set only by
`src/components/typography` (checked by `src/components/typography/tests/typography.test.ts`).

## Content and deploys

Content lives in PocketBase. The site is rebuilt to show a change:

1. Read `PUBLIC_POCKETBASE_URL` from `.env.local` (see `.env.dist`).
2. `bun run build` fetches the collections listed in `src/site/products/api.ts`,
   `src/site/materials/api.ts`, `src/site/company/api/contacts.ts`, `src/site/company/api/gallery.ts` and writes `dist/`.
3. Serve `dist/` from any static host.

To rebuild on every change, trigger the host's build hook from PocketBase. Host-agnostic recipe: create a
build hook URL on the host (most hosts have one under the project's deploy settings), then add a PocketBase
JS hook in `pb_hooks/` that calls it when a record of the content collections changes:

```js
// pb_hooks/rebuild.pb.js
const BUILD_HOOK = $os.getenv("SITE_BUILD_HOOK");
const rebuild = () => $http.send({ url: BUILD_HOOK, method: "POST", timeout: 10 });
["products_eliza", "mattresses_eliza", "sale_eliza", "textile_eliza", "contacts_eliza", "gallery_eliza"].forEach((name) => {
  onRecordAfterCreateSuccess(() => rebuild(), name);
  onRecordAfterUpdateSuccess(() => rebuild(), name);
  onRecordAfterDeleteSuccess(() => rebuild(), name);
});
```

Set `SITE_BUILD_HOOK` in the PocketBase environment. The build fails, and so the hook result shows it, if
PocketBase is unreachable: the site is then not republished with an empty catalogue.

Record changes take effect after the rebuild. The product URL of a record is its path (see below).

## URLs

| Page | URL |
|---|---|
| Home | `/{lv,en,ru}/` (and `/`, canonical `/lv/`) |
| Collections, one collection | `/{lang}/collections/`, `/{lang}/collection/{basic,bbold}/` |
| Product, sale item, mattress | `/{lang}/product/{slug}/`, `/{lang}/sale-product/{slug}/`, `/{lang}/mattress/{slug}/` |
| Mattresses, sale, fabrics, components | `/{lang}/matresses/`, `/{lang}/sale/`, `/{lang}/textile/`, `/{lang}/components/` |
| Contacts, gallery, catalogues, HoReCa | `/{lang}/contact/`, `/{lang}/gallery/`, `/{lang}/catalogs/`, `/{lang}/horeca/…` |

The slug is the record's `path`, lower case with accents folded and dashes between words. When two records
of one collection share a slug, both get their record id appended.

Old `?name=` links (`/{lang}/product?name=…`, `/{lang}/sale-product?name=…`, `/{lang}/mattress?name=…`)
are redirect pages (`noindex`): they send the visitor to the new URL. A name with no page (a hidden sale
item, an unknown name) goes to the listing.

## Commands

```sh
bun install        # install dependencies (bun.lock is versioned)
bun run dev        # development server (builds the pages from PocketBase when they are first requested)
bun run build      # static build into dist/ (needs PUBLIC_POCKETBASE_URL)
bun run check      # astro check, oxlint and the structure and typography tests
```

Configuration: `PUBLIC_POCKETBASE_URL` in `.env.local` (see `.env.dist`). PocketBase must allow the
build host; the browser needs no PocketBase access (no runtime fetches).

## Stack

- Astro 7.4.12 (static output), `@astrojs/sitemap` 3.7.5 with the three locales.
- UnoCSS 66.13.0 with `@unocss/astro` 66.13.0 (`presetWind4`, its reset off; `presetIcons` with
  `@iconify-json/tabler`). Layout is utility classes on the markup; `uno.config.ts` holds the viewport
  variants, the `hov:` variant and the layout shortcuts.
  Text styles are plain CSS in `src/components/typography/typography.css` (a bare `<h2>` or `<p>` must
  already look right, which a utility cannot give).
- Swiper 14.4.0 (`swiper/element/bundle`) for the sliders; the only shipped JavaScript file besides small
  inline scripts (menus, language switch).
- PocketBase client 0.29.0.
- Dev: TypeScript 6.0.3, `@astrojs/check` 0.9.12, oxlint 1.93.0, vitest 5.1.0.
- Deviations from the usual baseline:
  - TypeScript 6.0.3 instead of 7.0.2: `astro check` does not support TypeScript 7 yet.
  - Solid (`@astrojs/solid-js`, `solid-js`, `eslint-plugin-solid`) removed: every island is an Astro component.
  - `astro-compress` removed: it was installed but not used by the Astro config.

Architecture: [../docs_web/README.md](../docs_web/README.md)
