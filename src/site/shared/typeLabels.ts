import type { Language } from "#/features/i18n";

/** Labels for the product types (`sofa`, `bed`, …) that group a collection or a sale page. */
export const typeLabels: Record<Language, Record<string, string>> = {
  en: { sofa: "Sofas", bed: "Beds", chair: "Chairs", other: "Other" },
  ru: { sofa: "Диваны", bed: "Кровати", chair: "Кресла и стулья", other: "Другое" },
  lv: { sofa: "Dīvāni", bed: "Gultas", chair: "Krēsli", other: "Cits" },
};

/** What the 3-or-4-in-a-row control of a product list is, for screen readers. */
export const columnsLabel: Record<Language, string> = {
  en: "Products in a row",
  ru: "Товаров в ряду",
  lv: "Preces rindā",
};

/** The chip of the sale category bar that shows every group. */
export const allLabel: Record<Language, string> = { en: "All", ru: "Все", lv: "Visas" };

/** What the sale category bar is, for screen readers. */
export const saleNavLabel: Record<Language, string> = {
  en: "Sale categories",
  ru: "Категории распродажи",
  lv: "Izpārdošanas kategorijas",
};

/** The label of a group; an unknown group shows its own name. */
export const typeLabel = (lang: Language, type: string): string => typeLabels[lang][type.toLowerCase()] ?? type;
