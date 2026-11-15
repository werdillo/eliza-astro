import { client, type RecordModel } from "#/core/pocketbase";
import { logged } from "#/core/fetch";

/** The gallery is one record holding the list of its photographs. */
export const getGallery = (): Promise<RecordModel | null> =>
  logged("Error fetching gallery:", async () => {
    const res = await client.collection("gallery_eliza").getList(1, 1);
    return res.items[0] || null;
  });
