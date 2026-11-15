# layout

The page shell every route renders in: the document, its SEO head (`SeoHead`: title, description,
canonical, alternates, Open Graph, schema.org in `seo.ts`), and the frame around the content. It also
holds the copy of every static page (`pages`) and `Redirect`, the page that sends an old `?name=` URL on
to its new address.

Door: `Layout`, `Redirect`, `pages`, `pageUrl`, `PageCopy`, `Crumb`.
