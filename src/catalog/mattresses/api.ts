import { client } from "#/core/pocketbase";
import { logged } from "#/core/fetch";
import type { Product } from "#/catalog/shared/product";

/** Every mattress in the catalogue. */
export const getMatresses = (limit = 50) =>
  logged("Error fetching mattresses:", async () => {
    const res = await client.collection("mattresses_eliza").getList<Product>(1, limit);
    return res.items;
  });
