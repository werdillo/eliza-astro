# core

Logic with no subject: the PocketBase client and file URLs, the fetch helper and the URL slugs of records.
No markup.

Modules:
- `pocketbase/` — the client, `pocketbaseUrl` (the base URL without its trailing slash), `fileUrl`.
- `fetch/` — `logged`, the error wrapper for remote calls.
- `slug/` — `slugify` and `withSlugs`: the URL segment of each record.
- `nav.ts` — `NavLink` and `navLabel`: the shape each box declares its menu entry in, and its label by
  language.
- `page.ts` — `PageCopy` and `copy`: the shape of a page's title, description and screen-reader heading, in
  the three languages.
