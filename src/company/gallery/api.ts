import { client, type RecordModel } from "#/core/pocketbase";
import { logged } from "#/core/fetch";

/** The gallery is one record holding the list of its photographs. */
export const getGallery = (limit = 50) =>
  logged("Error fetching gallery:", async (): Promise<RecordModel | null> => {
    const res = await client.collection("gallery_eliza").getList(1, limit);
    return res.items[0] || null;
  });
