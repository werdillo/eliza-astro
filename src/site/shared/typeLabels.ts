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

/** The label of a group; an unknown group shows its own name. */
export const typeLabel = (lang: Language, type: string): string => typeLabels[lang][type.toLowerCase()] ?? type;
