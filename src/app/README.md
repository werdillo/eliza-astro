# app

The composition root: the page shell and frame every route renders in, the global stylesheets, the app
icons and logo, the social preview image, and the structure tests. It may import every layer; nothing
imports it except the pages.

Boxes:
- `layout/` — the document shell (`Layout`), its SEO head and schema (`seo.ts`), the copy of the static pages (`pages`), and `Redirect` for the old `?name=` URLs.
- `frame/` — the header, footer and mobile tab bar, and the navigation lists.

Folders without a door:
- `styles/` — `tokens.css`, `base.css`, `animations.css`.
- `assets/` — the logo, the mobile tab icons and the default social preview image.
- `tests/` — the layer, box and typography checks run by `bun run test`.
