/** The site's address and the SEO defaults used when a page sets none. */
export const siteUrl = "https://eliza-k.lv";

export const defaults = {
  title: "Eliza-K - Эксклюзивная премиум мебель в Латвии | Рига",
  description:
    "Eliza-K - производитель эксклюзивной премиум мебели в Латвии и Риге. Коллекции Sophisticated Living, BBold, Basic. Качественная мебель, индивидуальный дизайн, матрасы, текстиль.",
  keywords:
    "премиум мебель, эксклюзивная мебель, мебель Латвия, мебель Рига, Eliza-K, качественная мебель, дизайнерская мебель, матрасы, текстиль",
  image: "/og-image.jpg",
};

/** The schema.org graph of the site: the company, the website in its three languages, and the page. */
export const structuredData = (page: { title: string; description: string; url: string; lang: string }) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Eliza-K",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
      description: "Производитель эксклюзивной премиум мебели в Латвии",
      address: {
        "@type": "PostalAddress",
        addressCountry: "LV",
        addressLocality: "Рига",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Eliza-K",
      inLanguage: [
        { "@type": "Language", name: "Latvian", alternateName: "lv" },
        { "@type": "Language", name: "English", alternateName: "en" },
        { "@type": "Language", name: "Russian", alternateName: "ru" },
      ],
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${page.url}/#webpage`,
      url: page.url,
      name: page.title,
      description: page.description,
      inLanguage: page.lang,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
    },
  ],
});
