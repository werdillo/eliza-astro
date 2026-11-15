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
