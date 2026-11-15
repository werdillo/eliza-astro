import type { RecordModel } from "#/core/pocketbase";

/** A product record as the catalogue lists and shows it. */
export interface Product extends RecordModel {
  name: string;
  path: string;
  type: string;
  images: string[];
  image?: string;
  price?: number;
  oldPrice?: number;
  schema?: string;
  hide?: boolean;
  index?: number;
}

/** Which product page a record is shown on: a regular product, a sale item or a mattress. */
export type ProductKind = "def" | "sale" | "mattress";
