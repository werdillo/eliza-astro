import type { Language } from "#/features/i18n";

export const zoomLabels: Record<Language, { previous: string; next: string; close: string }> = {
  en: { previous: "Previous photo", next: "Next photo", close: "Close" },
  ru: { previous: "Предыдущее фото", next: "Следующее фото", close: "Закрыть" },
  lv: { previous: "Iepriekšējais foto", next: "Nākamais foto", close: "Aizvērt" },
};
