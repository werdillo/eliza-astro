import { copy as pageCopy } from "#/core/page";
import type { ImageMetadata } from "astro";
import type { Language } from "#/features/i18n";
import porolon from "./assets/porolon.png";
import textile from "./assets/textile.png";

export interface MaterialCard {
  image: ImageMetadata;
  title: string;
  text: string;
  href: string;
  external: boolean;
}

const copy: Record<Language, { porolonTitle: string; porolonText: string; textileTitle: string; textileText: string }> = {
  lv: {
    porolonTitle: "Porolons",
    porolonText: "Mēs ražojam izstrādājumus no porolona.",
    textileTitle: "Audumi",
    textileText: "Piedāvājam lielu audumu un materiālu izvēli mīkstajām mēbelēm.",
  },
  ru: {
    porolonTitle: "Поролон",
    porolonText: "Изготавливаем из поролона изделия любой сложности.",
    textileTitle: "Ткань",
    textileText: "Предлагаем широкий выбор тканей из любого вида волокна для мягкой мебели.",
  },
  en: {
    porolonTitle: "Foam",
    porolonText: "Our company creates goods from foam rubber of any complexity.",
    textileTitle: "Textile",
    textileText: "A wide selection of fabrics from any type of fiber for upholstered furniture is available.",
  },
};

/** The two component cards: the foam maker (an outside site) and the fabric page. */
export const materialCards = (lang: Language): MaterialCard[] => {
  const t = copy[lang] ?? copy.lv;
  return [
    { image: porolon, title: t.porolonTitle, text: t.porolonText, href: "http://porolons.lv/", external: true },
    { image: textile, title: t.textileTitle, text: t.textileText, href: `/${lang}/textile`, external: false },
  ];
};

/** The copy of the `textile` page. */
export const textilePage = pageCopy(
    { title: "Tekstilmateriāli - Eliza-K | Plašs audumu klāsts mīkstajām mēbelēm", description: "Eliza-K piedāvā plašu tekstilmateriālu klāstu mīkstajām mēbelēm. Kvalitatīvi audumi dažādos krāsu un faktūru variantos jūsu mēbeļu projektiem.", h1: "Tekstilmateriāli" },
    { title: "Textile Materials - Eliza-K | Wide Range of Fabrics for Upholstered Furniture", description: "Eliza-K offers a wide range of textile materials for upholstered furniture. Quality fabrics in various color and texture options for your furniture projects.", h1: "Textile materials" },
    { title: "Текстильные материалы - Eliza-K | Широкий выбор тканей для мягкой мебели", description: "Eliza-K предлагает широкий выбор текстильных материалов для мягкой мебели. Качественные ткани в различных цветовых и фактурных вариантах для ваших мебельных проектов.", h1: "Текстильные материалы" },
);

/** The copy of the `components` page. */
export const componentsPage = pageCopy(
    { title: "Komponenti - Eliza-K | Porolons un audumi", description: "Eliza-K ražo porolona izstrādājumus un piedāvā audumus mīkstajām mēbelēm.", h1: "Komponenti" },
    { title: "Components - Eliza-K | Foam and Textile", description: "Eliza-K makes foam products and offers fabrics for upholstered furniture.", h1: "Components" },
    { title: "Компоненты - Eliza-K | Поролон и ткани", description: "Eliza-K производит изделия из поролона и предлагает ткани для мягкой мебели.", h1: "Компоненты" },
);
