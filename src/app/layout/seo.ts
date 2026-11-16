import { LANGUAGES, type Language } from "#/features/i18n";
import { contacts } from "#/site/company";
import { socialLinks } from "#/app/frame";

/** The site's address: every canonical, alternate and schema URL starts with it. */
export const siteUrl = "https://eliza-mebeles.lv";

/** The canonical URL of a page: its language and its path under it, with a trailing slash. */
export const pageUrl = (lang: string, path = ""): string => `${siteUrl}/${lang}${path ? path.replace(/\/?$/, "/") : "/"}`;

/** The alternate of a page in every language, and x-default (Latvian). */
export const alternates = (path = "") => [
  ...LANGUAGES.map((lang) => ({ lang, href: pageUrl(lang, path) })),
  { lang: "x-default", href: pageUrl("lv", path) },
];

/** The locale of the Open Graph tags. */
export const ogLocale = (lang: Language | string) => (lang === "lv" ? "lv_LV" : lang === "ru" ? "ru_RU" : "en_US");

/** A breadcrumb: a page of the site, by its name and its path under the language. */
export interface Crumb {
  name: string;
  path: string;
}

/** The name of the home link in breadcrumbs, by language. */
export const homeLabel: Record<Language, string> = { lv: "Sākumlapa", en: "Home", ru: "Главная" };

/** The company as schema.org: the Organization node every page refers to, with the addresses of the footer. */
export const organizationNode = () => ({
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Eliza-K",
  url: siteUrl,
  logo: { "@type": "ImageObject", url: `${siteUrl}/logo512.png` },
  description: "Производитель эксклюзивной премиум мебели в Латвии",
  email: contacts[0].mail,
  telephone: `+371${contacts[0].phone[0]}`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "LV",
    addressLocality: "Rīga",
  },
  sameAs: socialLinks.map((link) => link.url),
  location: contacts
    .filter((contact) => contact.address)
    .map((contact) => ({
      "@type": "LocalBusiness",
      name: `Eliza-K ${contact.key}`,
      address: { "@type": "PostalAddress", streetAddress: contact.address, addressCountry: "LV" },
      email: contact.mail,
      telephone: contact.phone.map((phone) => `+371${phone}`),
    })),
});

/** The schema.org graph of a page: the company, the website and the page, plus the page's own nodes. */
export const structuredData = (page: {
  title: string;
  description: string;
  url: string;
  lang: string;
  crumbs?: { name: string; url: string }[];
  nodes?: Record<string, unknown>[];
}) => ({
  "@context": "https://schema.org",
  "@graph": [
    organizationNode(),
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Eliza-K",
      inLanguage: LANGUAGES,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${page.url}#webpage`,
      url: page.url,
      name: page.title,
      description: page.description,
      inLanguage: page.lang,
      isPartOf: { "@id": `${siteUrl}/#website` },
    },
    ...(page.crumbs && page.crumbs.length > 0
      ? [
          {
            "@type": "BreadcrumbList",
            itemListElement: page.crumbs.map((crumb, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: crumb.name,
              item: crumb.url,
            })),
          },
        ]
      : []),
    ...(page.nodes ?? []),
  ],
});
