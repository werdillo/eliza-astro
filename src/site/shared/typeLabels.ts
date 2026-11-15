import type { Language } from "#/features/i18n";

/** Labels for the product types (`sofa`, `bed`, …) that group a collection or a sale page. */
export const typeLabels: Record<Language, Record<string, string>> = {
  en: { sofa: "Sofas", bed: "Beds", chair: "Chair", other: "Other" },
  ru: { sofa: "Диваны", bed: "Кровати", chair: "Стуля", other: "Другое" },
  lv: { sofa: "Dīvāni", bed: "Gultas", chair: "Krēsli", other: "Cits" },
};

/** The label of a group; an unknown group shows its own name. */
export const typeLabel = (lang: Language, type: string): string => typeLabels[lang][type.toLowerCase()] ?? type;
