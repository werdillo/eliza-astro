# products

The product pages, shared by the regular products (`product/<slug>/`), the sale items
(`sale-product/<slug>/`) and the mattresses (`mattress/<slug>/`). Each record gets one static page per
language, built from PocketBase at build time. `routes.ts` gives the URLs, the redirect table of the old
`?name=` links and the `getStaticPaths` lists; `schema.ts` the Product JSON-LD and the page's text.

Door: `ProductPage`, `productPages`, `productRedirects`, `productHref`, `productLink`, `productImage`,
`productMeta`, `productSchema`, `getProductsOf`, `visibleProducts`, `LISTING`, `PRODUCT_SECTION`.
