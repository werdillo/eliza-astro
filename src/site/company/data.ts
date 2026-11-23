import type { ImageMetadata } from "astro";
import { copy } from "#/core/page";
export interface ContactPoint {
  key: string;
  address?: string;
  mail: string;
  phone: string[];
}

/** The three addresses in the footer. */
export const contacts: ContactPoint[] = [
  {
    key: "showroom",
    mail: "teika@eliza-k.lv",
    phone: ["29112499"],
  },
  {
    key: "foam",
    address: "Rīga, A. Deglava iela 52A, LV-1035",
    mail: "order@eliza-k.lv",
    phone: ["27862121", "26653510"],
  },
  {
    key: "textile",
    address: "Rīga, A. Deglava 50 iela K-1",
    mail: "audumi@eliza-k.lv",
    phone: ["26599422"],
  },
];

/** The footer headings of each address, by language. */
export const contactTitles: Record<string, Record<string, string>> = {
  lv: {
    showroom: "Mēbeļu salons ELIZA",
    foam: "Porolona detaļas ražošana",
    textile: "Audumu noliktava",
  },
  en: {
    showroom: "Furniture showroom ELIZA",
    foam: "Foam details manufacture",
    textile: "Textile warehouse",
  },
  ru: {
    showroom: "Мебельный салон ELIZA",
    foam: "Производство деталей из поролона",
    textile: "Склад тканей",
  },
};

/** The heading of the working-hours board on the contacts page. */
export const workingHoursTitle: Record<string, string> = {
  en: "Working time",
  ru: "Время работы",
  lv: "Darba laiks",
};

/** The labels of the map and the location actions on the contacts page. */
export const contactMapLabels: Record<string, { map: string; showOnMap: string; route: string }> = {
  en: { map: "Map", showOnMap: "Show on map", route: "Get directions" },
  ru: { map: "Карта", showOnMap: "Показать на карте", route: "Проложить маршрут" },
  lv: { map: "Karte", showOnMap: "Rādīt kartē", route: "Maršruts" },
};

/** The award certificates in `assets/awards`, newest first (`award_13` is the newest). */
const awardFiles = import.meta.glob<ImageMetadata>("./assets/awards/award_*.jpg", { eager: true, import: "default" });
const awardNumber = (path: string) => Number(path.match(/award_(\d+)/)?.[1] ?? 0);
export const awards: ImageMetadata[] = Object.keys(awardFiles)
  .sort((a, b) => awardNumber(b) - awardNumber(a))
  .map((path) => awardFiles[path]!);

/** The copy of the `contact` page. */
export const contactPage = copy(
    { title: "Kontakti - Eliza-K | Salons un birojs Rīgā", description: "Eliza-K kontakti: salona, porolona un audumu noliktavas adreses, tālruņi, e-pasts un darba laiks.", h1: "Kontakti" },
    { title: "Contact - Eliza-K | Showroom and Offices in Riga", description: "Eliza-K contacts: showroom, foam and textile warehouse addresses, phones, email and working hours.", h1: "Contacts" },
    { title: "Контакты - Eliza-K | Салон и офисы в Риге", description: "Контакты Eliza-K: адреса салона, производства поролона и склада тканей, телефоны, e-mail и время работы.", h1: "Контакты" },
);

/** The copy of the `gallery` page. */
export const galleryPage = copy(
    { title: "Galerija - Eliza-K | Pabeigtie projekti", description: "Eliza-K pabeigto projektu fotogrāfijas.", h1: "Galerija" },
    { title: "Gallery - Eliza-K | Completed Projects", description: "Photographs of Eliza-K completed projects.", h1: "Gallery" },
    { title: "Галерея - Eliza-K | Завершённые проекты", description: "Фотографии завершённых проектов Eliza-K.", h1: "Галерея" },
);

/** The copy of the `aboutUs` page. */
export const aboutUsPage = copy(
    { title: "Par mums - Eliza-K", description: "Par Eliza-K: ražotājs Rīgā. Drīzumā.", h1: "Par mums" },
    { title: "About us - Eliza-K", description: "About Eliza-K: a manufacturer in Riga. Coming soon.", h1: "About us" },
    { title: "О нас - Eliza-K", description: "Eliza-K: производитель в Риге. Скоро.", h1: "О нас" },
);
