# app

The composition root: the page shell and frame every route renders in, the global stylesheets, the app
icons and logo, and the structure tests. It may import every layer; nothing imports it except the
pages.

Boxes:
- `layout/` — the document shell (`Layout`) and its SEO head.
- `frame/` — the header, footer and mobile tab bar, and the navigation lists.

Folders without a door:
- `styles/` — `tokens.css`, `base.css`, `animations.css`.
- `assets/` — the logo and the mobile tab icons.
- `tests/` — the layer and box checks run by `bun run test`.
