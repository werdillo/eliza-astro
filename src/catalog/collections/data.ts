import type { ImageMetadata } from "astro";
import Pic6 from "./assets/Pic6.jpg";
import Pic7 from "./assets/Pic7.jpg";
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
