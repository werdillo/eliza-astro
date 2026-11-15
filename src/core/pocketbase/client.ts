import PocketBase from "pocketbase";

export const pocketbaseUrl: string = import.meta.env.PUBLIC_POCKETBASE_URL;

export const client = new PocketBase(pocketbaseUrl);
