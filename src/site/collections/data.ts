import type { ImageMetadata } from "astro";
import type { Language } from "#/features/i18n";
import Pic6 from "../shared/assets/collections/Pic6.jpg";
import Pic7 from "../shared/assets/collections/Pic7.jpg";
import bbold from "./assets/bbold.png";

/** The three collection tiles of the collections page. */
export interface CollectionTile {
  image: ImageMetadata;
  alt: string;
  label: string;
  href: (lang: string) => string;
  external: boolean;
}

export const collectionTiles: CollectionTile[] = [
  {
    image: Pic7,
    alt: "Sophisticated Living collection - premium elegant furniture by Eliza-K",
    label: "Sophisticated Living",
    href: () => "https://www.sophisticated-living.com/",
    external: true,
  },
  {
    image: bbold,
    alt: "BBold collection - modern bold furniture designs by Eliza-K",
    label: "BBold",
    href: (lang) => `/${lang}/collection/bbold`,
    external: false,
  },
  {
    image: Pic6,
    alt: "Basic collection - functional minimalist furniture by Eliza-K",
    label: "Basic",
    href: (lang) => `/${lang}/collection/basic`,
    external: false,
  },
];

/** The three collection cards of the home page. */
export interface CollectionCard {
  id: string;
  image: ImageMetadata;
  url: string | ((lang: string) => string);
  label: Record<Language, string>;
  external?: boolean;
}

export const collectionCards: CollectionCard[] = [
  {
    id: "sophisticated-living",
    image: Pic7,
    url: "https://www.sophisticated-living.com/",
    label: { en: "Sophisticated Living", lv: "Sophisticated Living", ru: "Sophisticated Living" },
    external: true,
  },
  {
    id: "bbold",
    image: bbold,
    url: (lang: string) => `/${lang}/collection/bbold`,
    label: { en: "BBold", lv: "BBold", ru: "BBold" },
    external: false,
  },
  {
    id: "basic",
    image: Pic6,
    url: (lang: string) => `/${lang}/collection/basic`,
    label: { en: "Basic", lv: "Basic", ru: "Basic" },
    external: false,
  },
];
