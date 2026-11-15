import { client } from "#/core/pocketbase";
import { logged } from "#/core/fetch";

/** The fabric collections, in their display order. */
export const getTextileItems = () =>
  logged("Error fetching textile items:", async () => {
    const items = await client.collection("textile_eliza").getFullList({ batch: 100 });
    return items.sort((a, b) => a.order - b.order);
  });
