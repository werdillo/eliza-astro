import type { Language } from "#/features/i18n";
import type { Product, ProductKind } from "#/site/shared/product";
import { typeLabel } from "#/site/shared/typeLabels";
import { kindWord } from "./data";

/** The description of a record as plain text, for the meta description and the schema. */
export const plainDescription = (item: Product, lang: Language): string =>
  ((item[`description_${lang}`] as string | undefined) ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&ndash;/g, "–")
    .replace(/\s+/g, " ")
    .trim();

/** The schema.org Product of a product page: name, photo, description, brand, and the price where the site shows one. */
export const productSchema = (args: {
  item: Product;
  kind: ProductKind;
  lang: Language;
  url: string;
  image?: string;
  description: string;
}) => {
  const { item, kind, lang, url, image, description } = args;
  const price = kind === "sale" && item.price ? item.price : undefined;
  return {
    "@type": "Product",
    name: item.name,
    description,
    url,
    image: image ? [image] : undefined,
    brand: { "@type": "Brand", name: "Eliza-K" },
    category: item.type || item.types ? typeLabel(lang, (item.type || item.types) as string) : undefined,
    offers: price
      ? {
          "@type": "Offer",
          price: String(price),
          priceCurrency: "EUR",
          url,
        }
      : undefined,
  };
};

/** The title and the description of a product page: the record's own text, or the kind's generic copy. */
export const productMeta = (item: Product, kind: ProductKind, lang: Language, fallback: string) => {
  const text = plainDescription(item, lang).replace(/[\s.]+$/, "");
  // A short record text (often only the dimensions, the same in every language) is not a description:
  // it goes after the name, followed by the kind's generic copy in the page's language.
  const full = text.length >= MIN_DESCRIPTION ? text : `${item.name}${text ? ` (${text})` : ""}. ${fallback}`;
  return {
    title: `${item.name} - Eliza-K | ${kindWord[kind][lang]}`,
    description: clip(full, MAX_DESCRIPTION),
  };
};

/** The shortest record text used alone as a meta description, and the longest description search engines show. */
const MIN_DESCRIPTION = 70;
const MAX_DESCRIPTION = 160;

/** The text cut to `max` characters at a word boundary, with an ellipsis when cut. */
const clip = (text: string, max: number): string => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,.;:–-]+$/, "")}…`;
};
