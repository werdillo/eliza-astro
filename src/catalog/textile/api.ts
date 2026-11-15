import { client } from "#/core/pocketbase";
import { logged } from "#/core/fetch";

/** The fabric collections, in their display order. */
export const getTextileItems = (limit = 50) =>
  logged("Error fetching textile items:", async () => {
    const res = await client.collection("textile_eliza").getList(1, limit);
    return res.items.sort((a, b) => a.order - b.order);
  });
