// Конфигурация коллекций для главной страницы
import type { ImageMetadata } from "astro";
import Pic6 from "../assets/images/collection/Pic6.jpg";
import Pic7 from "../assets/images/collection/Pic7.jpg";
import bboldImg from "../assets/images/collection/bbold.png";

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
