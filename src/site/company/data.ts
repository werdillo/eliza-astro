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

/** The award certificates in `public/awards`, newest first. */
export const awards = Array.from({ length: 13 }, (_, index) => `award_${13 - index}.jpg`);

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
