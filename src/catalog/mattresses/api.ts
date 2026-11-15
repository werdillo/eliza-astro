import { getProductsOf } from "#/catalog/products";

/** Every mattress in the catalogue. */
export const getMattresses = () => getProductsOf("mattress");
