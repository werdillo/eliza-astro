# materials

The material side of the business: the components page (foam and textile) and the fabric page with each
fabric collection and its photographs. The components' cards are static; the fabrics are read from
PocketBase at build time.

Slices:

- `data.ts` — the two component cards and their texts by language.
- `api.ts` — the fabric collections.
- `ui/` — `MaterialsList`, `TextileItems`.

Door (`index.ts`): `MaterialsList`, `TextileItems`, `textilePage`, `componentsPage`, `mainLinks`.
