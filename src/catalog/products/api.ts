import { client } from "#/core/pocketbase";
import { logged } from "#/core/fetch";
import type { Product } from "#/catalog/shared/product";

/** One product by its path, for the regular product page. */
export const getProductByPath = (path: string, limit = 50) =>
  logged("Error fetching product:", async () => {
    const res = await client.collection("products_eliza").getList<Product>(1, limit, {
      filter: `path="${path}"`,
    });
    if (res.items.length === 0) {
      throw new Error("Product not found");
    }
    return res.items[0];
  });

/** One mattress by its path, for the mattress page. */
export const getMatressByPath = (path: string, limit = 50) =>
  logged("Error fetching mattress:", async () => {
    const res = await client.collection("mattresses_eliza").getList<Product>(1, limit, {
      filter: `path="${path}"`,
    });
    if (res.items.length === 0) {
      throw new Error("Mattress not found");
    }
    return res.items[0];
  });

/** One sale item by its path, for the sale product page. */
export const getSaleProductByPath = (path: string, limit = 50) =>
  logged("Error fetching sale product:", async () => {
    const res = await client.collection("sale_eliza").getList<Product>(1, limit, {
      filter: `path="${path}"`,
    });
    if (res.items.length === 0) {
      throw new Error("Sale product not found");
    }
    return res.items[0];
  });
