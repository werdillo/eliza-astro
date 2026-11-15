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
