// Конфигурация коллекций для главной страницы
import type { ImageMetadata } from "astro";
import Pic1 from "#/catalog/collections/assets/Pic1.jpg";
import Pic6 from "#/catalog/collections/assets/Pic6.jpg";
import Pic7 from "#/catalog/collections/assets/Pic7.jpg";
import bboldImg from "#/catalog/collections/assets/bbold.png";

export interface CollectionCard {
  id: string;
  image: ImageMetadata;
  url: string | ((lang: string) => string);
  translationKey: string;
  external?: boolean;
}

export const collectionCards: CollectionCard[] = [
  {
    id: "sophisticated-living",
    image: Pic7,
    url: "https://www.sophisticated-living.com/",
    translationKey: "collections.sophisticatedLiving",
    external: true,
  },
  {
    id: "bbold",
    image: bboldImg,
    url: (lang: string) => `/${lang}/collection/bbold`,
    translationKey: "collections.bbold",
    external: false,
  },
  {
    id: "basic",
    image: Pic6,
    url: (lang: string) => `/${lang}/collection/basic`,
    translationKey: "collections.basic",
    external: false,
  },
];

/** The slides of the home slider; the texts are `slider.<key>.title|text|button`. */
export const heroSlides = [
  { key: "slider.slide1", image: Pic6, path: "/collection/bbold" },
  { key: "slider.slide2", image: Pic1, path: "/collection/basic" },
  { key: "slider.slide3", image: Pic7, path: "/sale" },
];
