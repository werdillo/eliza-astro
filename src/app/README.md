# app

The composition root: the page shell and frame every route renders in, the global stylesheets, the logo
and the social preview image. It may import every layer; nothing imports it except the
pages.

Boxes:
- `layout/` — the document shell (`Layout`), its SEO head and schema (`seo.ts`), and `Redirect` for
  the old `?name=` URLs.
- `frame/` — the header, footer and mobile tab bar. Each box declares its own menu entry; the frame only
  lists them in the order it shows them.

Folders without a door:
- `styles/` — `tokens.css`, `base.css`, `animations.css`.
- `assets/` — the logo and the default social preview image.
