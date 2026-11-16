# collections

The three collections (Sophisticated Living, BBold, Basic): the collections index page, the product grid
of one collection, and the collection cards of the home page. The grid reads the products box at build
time; the photographs of the two shared collections are in the domain's `shared/assets/collections/`.

Slices:

- `data.ts` — the index tiles and the home cards.
- `api.ts` — the products of one brand.
- `ui/` — `CollectionGrid`, `CollectionIndex`, `CollectionCards`.

Door (`index.ts`): `CollectionGrid`, `CollectionIndex`, `CollectionCards`, `collectionsPage`, `bboldPage`,
`basicPage`, `mainLinks` (the box's menu entry).
