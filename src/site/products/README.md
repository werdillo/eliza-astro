# products

The product records and every screen that shows one: the regular product pages, the sale-item pages, the
mattress pages, and the sale and mattress listings. It owns the PocketBase reads of the three collections,
the URL routes and redirects, the Product schema and the page copy.

Slices:

- `api.ts` — the PocketBase reads of `products_eliza`, `sale_eliza`, `mattresses_eliza`, `getSaleItems`
  and `getMattresses`.
- `routes.ts` — the URL of each kind, the old `?name=` redirect tables, the static-path lists and the
  record's picture.
- `schema.ts` — the meta description, Product JSON-LD and the page title and description.
- `data.ts` — the page words by language and the word that titles each kind.
- `ui/product/` — `ProductPage` and its parts.
- `ui/listings/` — `SaleGrid`, `MatGrid`.
- `assets/fabrics/` — the three fabric photographs the product page shows.

Door (`index.ts`): `ProductPage`, `SaleGrid`, `MatGrid`, `productPages`, `productRedirects`,
`productLink`, `productImage`, `productMeta`, `productSchema`, `getProductsOf`, `PRODUCT_SECTION`.
