import { client } from "#/core/pocketbase";
import { logged } from "#/core/fetch";
import type { RecordModel } from "#/core/pocketbase";

/** The working-hours entries, in their display order. */
export const getContacts = (limit = 50) =>
  logged("Error fetching contacts:", async (): Promise<RecordModel[]> => {
    const res = await client.collection("contacts_eliza").getList(1, limit, {
      sort: "order",
    });
    return res.items;
  });
