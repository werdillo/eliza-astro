import { client } from "#/core/pocketbase";
import { logged } from "#/core/fetch";
import { withSlugs } from "#/core/slug";
import type { Product, ProductKind } from "#/catalog/shared/product";

/** The PocketBase collection of each kind of product page. */
export const COLLECTIONS: Record<ProductKind, string> = {
  def: "products_eliza",
  sale: "sale_eliza",
  mattress: "mattresses_eliza",
};

const cache = new Map<ProductKind, ReturnType<typeof load>>();

const load = (kind: ProductKind) =>
  logged(`Error fetching ${kind} products:`, async () => {
    const items = await client.collection(COLLECTIONS[kind]).getFullList<Product>({ batch: 200 });
    return withSlugs(items);
  });

/**
 * Every record of one kind with its URL slug (hidden sale items included: their slugs stay stable).
 * Fetched once per build: the collection, the listings and the product pages share the same list.
 */
export const getProductsOf = (kind: ProductKind) => {
  let pending = cache.get(kind);
  if (!pending) {
    pending = load(kind);
    cache.set(kind, pending);
  }
  return pending;
};
