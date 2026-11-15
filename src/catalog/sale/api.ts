import { getProductsOf } from "#/catalog/products";

/** The sale items that are shown; the hidden ones have a page but are not listed. */
export const getSaleItems = async () => (await getProductsOf("sale")).filter((item) => !item.hide);
