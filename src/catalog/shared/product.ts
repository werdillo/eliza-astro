import type { RecordModel } from "#/core/pocketbase";

/**
 * A product record as the catalogue lists and shows it. Regular products and mattresses carry `type`;
 * sale items carry `types` (the same groups).
 */
export interface Product extends RecordModel {
  name: string;
  path: string;
  type?: string;
  types?: string;
  images: string[];
  image?: string;
  price?: number;
  oldPrice?: number;
  schema?: string;
  hide?: boolean;
  index?: number;
  description_lv?: string;
  description_en?: string;
  description_ru?: string;
}

/** Which product page a record is shown on: a regular product, a sale item or a mattress. */
export type ProductKind = "def" | "sale" | "mattress";
