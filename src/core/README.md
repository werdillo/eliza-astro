# core

Logic with no subject: the PocketBase client and file URLs, the fetch helper and the URL slugs of records.
No markup.

Boxes:
- `pocketbase/` — the client, `pocketbaseUrl` (the base URL without its trailing slash), `fileUrl`.
- `fetch/` — `logged`, the error wrapper for remote calls.
- `slug/` — `slugify` and `withSlugs`: the URL segment of each record.
