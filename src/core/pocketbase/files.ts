import type { RecordModel } from "pocketbase";
import { pocketbaseUrl } from "./client";

/** Collection used for files of records that do not carry their own collectionId. */
const DEFAULT_COLLECTION_ID = "pmlzc10hatw7ufi";

/** The public URL of a file stored on a record: `/api/files/{collection}/{record}/{file}`. */
export const fileUrl = (record: RecordModel, fileName: string | undefined | null): string => {
  const collectionId = record.collectionId || DEFAULT_COLLECTION_ID;
  return `${pocketbaseUrl}/api/files/${collectionId}/${record.id}/${fileName}`;
};
