import type { Language } from "#/features/i18n";

export const pdfLabels: Record<Language, { page: string; previous: string; next: string; zoomIn: string; zoomOut: string; fullscreen: string; download: string; close: string; loading: string; error: string; openPdf: string }> = {
  en: { page: "Page", previous: "Previous page", next: "Next page", zoomIn: "Zoom in", zoomOut: "Zoom out", fullscreen: "Full screen", download: "Download PDF", close: "Close", loading: "Loading document", error: "The document could not be shown here.", openPdf: "Open the PDF" },
  ru: { page: "Страница", previous: "Предыдущая страница", next: "Следующая страница", zoomIn: "Приблизить", zoomOut: "Отдалить", fullscreen: "На весь экран", download: "Скачать PDF", close: "Закрыть", loading: "Загружаем документ", error: "Не удалось показать документ здесь.", openPdf: "Открыть PDF" },
  lv: { page: "Lapa", previous: "Iepriekšējā lapa", next: "Nākamā lapa", zoomIn: "Pietuvināt", zoomOut: "Attālināt", fullscreen: "Pilnekrāns", download: "Lejupielādēt PDF", close: "Aizvērt", loading: "Ielādē dokumentu", error: "Dokumentu šeit neizdevās parādīt.", openPdf: "Atvērt PDF" },
};
