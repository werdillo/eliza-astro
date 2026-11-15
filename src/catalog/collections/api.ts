import { getProductsOf } from "#/catalog/products";

/** The regular products of one brand (`bbold`, `basic`), in the order the collection lists them. */
export const getBrandProducts = async (brand: string) =>
  (await getProductsOf("def")).filter((item) => item.collection === brand);
