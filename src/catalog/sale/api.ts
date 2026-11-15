import { client } from "#/core/pocketbase";
import { logged } from "#/core/fetch";
import type { Product } from "#/catalog/shared/product";

/** Every sale item; the page hides the ones marked `hide`. */
export const getSalePage = (limit = 100) =>
  logged("Error fetching sale page:", async () => {
    const res = await client.collection("sale_eliza").getList<Product>(1, limit);
    return res.items;
  });
