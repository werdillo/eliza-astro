// Конфигурация HoReCa секции
import type { ImageMetadata } from "astro";
import pic1 from "../assets/images/hoReCa/Ca.png";
import pic2 from "../assets/images/hoReCa/Ho.png";
import pic3 from "../assets/images/hoReCa/Re.png";

export interface HoRecaItem {
  id: string;
  image: ImageMetadata;
  url: string;
  translationKey: string;
}

export const horecaItems: HoRecaItem[] = [
  {
    id: "hotels",
    image: pic2,
    url: "https://www.sophisticated-living.com/projects/#hospitality",
    translationKey: "horeca.hotels",
  },
  {
    id: "cafe",
    image: pic3,
    url: "https://www.sophisticated-living.com/projects/#public-spaces",
    translationKey: "horeca.cafe",
  },
  {
    id: "restaurants",
    image: pic1,
    url: "https://www.sophisticated-living.com/projects/#public-spaces",
    translationKey: "horeca.restaurants",
  },
];
