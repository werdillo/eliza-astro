import { copy } from "#/core/page";
import type { ImageMetadata } from "astro";
import type { Language } from "#/features/i18n";
import Pic1 from "./assets/Pic1.jpg";
import Pic6 from "../shared/assets/collections/Pic6.jpg";
import Pic7 from "../shared/assets/collections/Pic7.jpg";

export interface HeroSlide {
  image: ImageMetadata;
  path: string;
  title: Record<Language, string>;
  text: Record<Language, string>;
  button: Record<Language, string>;
}

/** The slides of the home slider, with its own words. */
export const heroSlides: HeroSlide[] = [
  {
    image: Pic6,
    path: "/collection/bbold",
    title: { en: "Premium Elegance", lv: "Premium elegance", ru: "Премиальная элегантность" },
    text: {
      en: "Where luxury meets craftsmanship",
      lv: "Kur luksuss satiekas ar meistarību",
      ru: "Где роскошь встречается с мастерством",
    },
    button: { en: "Discover BBold", lv: "Atklājiet BBold", ru: "Откройте BBold" },
  },
  {
    image: Pic1,
    path: "/collection/basic",
    title: { en: "Timeless Comfort", lv: "Mūžīgs komforts", ru: "Вечный комфорт" },
    text: {
      en: "Quality that endures. Style that inspires",
      lv: "Kvalitāte, kas iztur laiku. Stils, kas iedvesmo",
      ru: "Качество на века. Вдохновляющий стиль",
    },
    button: { en: "Explore Basic", lv: "Izpētiet Basic", ru: "Изучите Basic" },
  },
  {
    image: Pic7,
    path: "/sale",
    title: { en: "Exclusive Offers", lv: "Ekskluzīvi piedāvājumi", ru: "Эксклюзивные предложения" },
    text: {
      en: "Exceptional prices. Uncompromising quality",
      lv: "Izcila cena. Teicama kvalitāte",
      ru: "Исключительные цены. Безупречное качество",
    },
    button: { en: "Shop Sale", lv: "Izpārdošana", ru: "Распродажа" },
  },
];

/** The copy of the `home` page. */
export const homePage = copy(
    { title: "Eliza-K - Ekskluzīva premium mēbeles Latvijā | Rīga", description: "Eliza-K - ekskluzīvu premium mēbeļu ražotājs Latvijā un Rīgā. Kolekcijas Sophisticated Living, BBold, Basic. Kvalitatīvas mēbeles, individuāls dizains, matračus, tekstils.", h1: "Eliza-K" },
    { title: "Eliza-K - Exclusive Premium Furniture in Latvia | Riga", description: "Eliza-K - manufacturer of exclusive premium furniture in Latvia and Riga. Collections Sophisticated Living, BBold, Basic. Quality furniture, individual design, mattresses, textiles.", h1: "Eliza-K" },
    { title: "Eliza-K - Эксклюзивная премиум мебель в Латвии | Рига", description: "Eliza-K - производитель эксклюзивной премиум мебели в Латвии и Риге. Коллекции Sophisticated Living, BBold, Basic. Качественная мебель, индивидуальный дизайн, матрасы, текстиль.", h1: "Eliza-K" },
);
