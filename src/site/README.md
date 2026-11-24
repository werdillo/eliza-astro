# site

The public site's matrix. Each box is a subject of the site; what the boxes have in common sits in
`shared/` below them.

| Box | What it is |
|---|---|
| `products/` | Product records and their pages, with the sale and mattress listings. |
| `collections/` | The collection index, one collection's grid, and the home collection cards. |
| `materials/` | The components page (foam and textile) and the fabric page. |
| `catalogs/` | The printed catalogues. |
| `company/` | The about page, contacts, awards and gallery. |
| `home/` | The home page hero. |

`shared/` holds the product type and labels and the collection photographs. The home page is composed by
`src/pages/index.astro` and `src/pages/[lang]/index.astro` from `home`, `collections` and `company` through
their doors.

The boxes are opaque at this level: a neighbour is reached through its door, and `shared/` is imported by
path. The pages in `src/pages/` compose the boxes for a route.
