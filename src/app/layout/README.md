# layout

The page shell every route renders in: the document, its SEO head (`SeoHead`: title, description,
canonical, alternates, Open Graph, schema.org in `seo.ts`), and the frame around the content. It also holds
`Redirect`, the page that sends an old `?name=` URL on to its new address.

`Layout` takes `error` for the 404 page (`src/pages/404.astro`), which the server serves for any unknown URL:
it then gets no canonical, alternates, og:url or schema, since it has no address of its own. `noindex` keeps
it out of the index.

Door: `Layout`, `Redirect`, `pageUrl`, `Crumb`.
