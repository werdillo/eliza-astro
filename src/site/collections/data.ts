import { copy } from "#/core/page";
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

/** The copy of the `collections` page. */
export const collectionsPage = copy(
    { title: "Mēbeļu kolekcijas - Eliza-K | Sophisticated Living, BBold, Basic", description: "Apskatiet Eliza-K ekskluzīvās mēbeļu kolekcijas: Sophisticated Living premium līniju, moderno BBold kolekciju un praktisko Basic sēriju. Unikāls dizains un augstākā kvalitāte.", h1: "Kolekcijas" },
    { title: "Furniture Collections - Eliza-K | Sophisticated Living, BBold, Basic", description: "Explore Eliza-K exclusive furniture collections: Sophisticated Living premium line, modern BBold collection and practical Basic series. Unique design and highest quality.", h1: "Collections" },
    { title: "Коллекции мебели - Eliza-K | Sophisticated Living, BBold, Basic", description: "Изучите эксклюзивные коллекции мебели Eliza-K: премиум линию Sophisticated Living, современную коллекцию BBold и практичную серию Basic. Уникальный дизайн и высочайшее качество.", h1: "Коллекции" },
);

/** The copy of the `bbold` page. */
export const bboldPage = copy(
    { title: "BBold kolekcija - Eliza-K | Modernas un izteiksmīgas mēbeles", description: "Apskatiet Eliza-K BBold kolekciju - modernas, izteiksmīgas mēbeles ar unikālu dizainu.", h1: "BBold" },
    { title: "BBold Collection - Eliza-K | Modern Bold Furniture", description: "Explore the Eliza-K BBold collection - modern furniture with a bold, unique design.", h1: "BBold" },
    { title: "Коллекция BBold - Eliza-K | Современная выразительная мебель", description: "Изучите коллекцию BBold от Eliza-K - современная выразительная мебель с уникальным дизайном.", h1: "BBold" },
);

/** The copy of the `basic` page. */
export const basicPage = copy(
    { title: "Basic kolekcija - Eliza-K | Praktiskas un funkcionālas mēbeles", description: "Apskatiet Eliza-K Basic kolekciju - praktiskas un funkcionālas mēbeles ikdienas lietošanai. Kvalitatīvas mēbeles par pieejamu cenu ar modernu minimālistisku dizainu.", h1: "Basic" },
    { title: "Basic Collection - Eliza-K | Practical and Functional Furniture", description: "Explore Eliza-K Basic collection - practical and functional furniture for everyday use. Quality furniture at affordable price with modern minimalist design.", h1: "Basic" },
    { title: "Коллекция Basic - Eliza-K | Практичная и функциональная мебель", description: "Изучите коллекцию Basic от Eliza-K - практичная и функциональная мебель для повседневного использования. Качественная мебель по доступной цене с современным минималистичным дизайном.", h1: "Basic" },
);
