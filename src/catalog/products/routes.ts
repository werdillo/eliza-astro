import { LANGUAGES, type Language } from "#/features/i18n";
import { fileUrl } from "#/core/pocketbase";
import type { Product, ProductKind } from "#/catalog/shared/product";
import { getProductsOf } from "./api";

export { getProductsOf } from "./api";

/** The first path segment of each kind's page: `/en/product/<slug>/`, `/en/sale-product/<slug>/`, … */
export const PRODUCT_SECTION: Record<ProductKind, string> = {
  def: "product",
  sale: "sale-product",
  mattress: "mattress",
};

/** A product's page under its language: `/en/product/<slug>/`. */
export const productHref = (lang: Language | string, kind: ProductKind, slug: string): string =>
  `/${lang}/${PRODUCT_SECTION[kind]}/${slug}/`;

/** The listing the old `?name=` redirect falls back to when a product has no page. */
export const LISTING: Record<ProductKind, string> = { def: "collections", sale: "sale", mattress: "matresses" };

/** The URL slug of a record of a kind, for the listings. */
export const productLink = async (lang: Language, kind: ProductKind, id: string): Promise<string> => {
  const items = await getProductsOf(kind);
  const found = items.find((item) => item.id === id);
  if (!found) throw new Error(`No ${kind} record ${id}`);
  return productHref(lang, kind, found.slug);
};

/** The records that have a page: every regular product and mattress, the sale items that are not hidden. */
export const visibleProducts = async (kind: ProductKind) =>
  (await getProductsOf(kind)).filter((item) => !(kind === "sale" && item.hide));

/** One page per visible record and language, for `getStaticPaths` of the product routes. */
export const productPages = async (kind: ProductKind) => {
  const items = await visibleProducts(kind);
  return LANGUAGES.flatMap((lang) =>
    items.map((item) => ({ params: { lang, path: item.slug }, props: { item, kind, lang } })),
  );
};

/** The old `?name=<path>` URLs: the path of each visible record, and its new URL slug. */
export const productRedirects = async (kind: ProductKind): Promise<Record<string, string>> =>
  Object.fromEntries((await visibleProducts(kind)).map((item) => [item.path, item.slug]));

/** The photo of a record: a mattress has one per language (falling back to the default), the others a list. */
export const productImage = (item: Product, kind: ProductKind, lang: Language): string | undefined => {
  if (kind === "mattress") {
    const file = (item[`image_${lang}`] as string | undefined) || item.image;
    return file ? fileUrl(item, file) : undefined;
  }
  return item.images?.[0] ? fileUrl(item, item.images[0]) : undefined;
};
