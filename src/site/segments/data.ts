import { copy } from "#/core/page";
// Конфигурация HoReCa секции
import type { ImageMetadata } from "astro";
import type { Language } from "#/features/i18n";
import pic1 from "./assets/Ca.png";
import pic2 from "./assets/Ho.png";
import pic3 from "./assets/Re.png";

export interface HoRecaItem {
  id: string;
  image: ImageMetadata;
  url: string;
  label: Record<Language, string>;
}

export const horecaItems: HoRecaItem[] = [
  {
    id: "hotels",
    image: pic2,
    url: "https://www.sophisticated-living.com/projects/#hospitality",
    label: { en: "Hotels", lv: "Viesnīcas", ru: "Отели" },
  },
  {
    id: "cafe",
    image: pic3,
    url: "https://www.sophisticated-living.com/projects/#public-spaces",
    label: { en: "Cafe", lv: "Kafejnīcas", ru: "Кафе" },
  },
  {
    id: "restaurants",
    image: pic1,
    url: "https://www.sophisticated-living.com/projects/#public-spaces",
    label: { en: "Restaurants", lv: "Restorāni", ru: "Рестораны" },
  },
];

/** The copy of the `horeca` page. */
export const horecaPage = copy(
    { title: "HoReCa - Eliza-K | Viesnīcas, kafejnīcas un restorāni", description: "Eliza-K mēbeles viesnīcām, kafejnīcām un restorāniem.", h1: "HoReCa" },
    { title: "HoReCa - Eliza-K | Hotels, Cafes and Restaurants", description: "Eliza-K furniture for hotels, cafes and restaurants.", h1: "HoReCa" },
    { title: "HoReCa - Eliza-K | Отели, кафе и рестораны", description: "Мебель Eliza-K для отелей, кафе и ресторанов.", h1: "HoReCa" },
);

/** The copy of the `hotels` page. */
export const hotelsPage = copy(
    { title: "Viesnīcas - Eliza-K | HoReCa", description: "Eliza-K mēbeles viesnīcām. Drīzumā.", h1: "Viesnīcas" },
    { title: "Hotels - Eliza-K | HoReCa", description: "Eliza-K furniture for hotels. Coming soon.", h1: "Hotels" },
    { title: "Отели - Eliza-K | HoReCa", description: "Мебель Eliza-K для отелей. Скоро.", h1: "Отели" },
);

/** The copy of the `cafe` page. */
export const cafePage = copy(
    { title: "Kafejnīcas - Eliza-K | HoReCa", description: "Eliza-K mēbeles kafejnīcām. Drīzumā.", h1: "Kafejnīcas" },
    { title: "Cafe - Eliza-K | HoReCa", description: "Eliza-K furniture for cafes. Coming soon.", h1: "Cafe" },
    { title: "Кафе - Eliza-K | HoReCa", description: "Мебель Eliza-K для кафе. Скоро.", h1: "Кафе" },
);

/** The copy of the `projects` page. */
export const projectsPage = copy(
    { title: "Projekti - Eliza-K | HoReCa", description: "Eliza-K HoReCa projekti. Drīzumā.", h1: "Projekti" },
    { title: "Projects - Eliza-K | HoReCa", description: "Eliza-K HoReCa projects. Coming soon.", h1: "Projects" },
    { title: "Проекты - Eliza-K | HoReCa", description: "Проекты Eliza-K для HoReCa. Скоро.", h1: "Проекты" },
);
