import { client } from "#/core/pocketbase";
import { logged } from "#/core/fetch";
import type { Product } from "#/catalog/shared/product";

/** The products of one brand (`bbold`, `basic`), listed with a short excerpt for the grid. */
export const getProducts = (brand: string, limit = 100) =>
  logged("Error fetching products:", async () => {
    const res = await client.collection("products_eliza").getList<Product>(1, limit, {
      filter: `collection="${brand}"`,
      fields:
        "id, collectionId, collection, path, images, type, name:excerpt(200, true)",
    });
    return res.items;
  });
