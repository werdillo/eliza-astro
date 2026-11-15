import { client } from "#/core/pocketbase";
import { logged } from "#/core/fetch";
import type { RecordModel } from "#/core/pocketbase";

/** The working-hours entries, in their display order. */
export const getContacts = (): Promise<RecordModel[]> =>
  logged("Error fetching contacts:", async () => {
    const res = await client.collection("contacts_eliza").getFullList({ sort: "order", batch: 100 });
    return res;
  });
