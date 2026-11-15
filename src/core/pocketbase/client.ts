import PocketBase from "pocketbase";

/**
 * The PocketBase base URL with no trailing slash: `${pocketbaseUrl}/api/files/…` is then a valid
 * path. `PUBLIC_POCKETBASE_URL` may end with `/`.
 */
export const pocketbaseUrl: string = (import.meta.env.PUBLIC_POCKETBASE_URL ?? "").replace(/\/+$/, "");

export const client = new PocketBase(pocketbaseUrl);
