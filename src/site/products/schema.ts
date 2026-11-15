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
  const text = plainDescription(item, lang);
  return {
    title: `${item.name} - Eliza-K | ${kindWord[kind][lang]}`,
    description: text ? (text.length > 155 ? `${text.slice(0, 152).trimEnd()}…` : text) : `${item.name}. ${fallback}`,
  };
};
