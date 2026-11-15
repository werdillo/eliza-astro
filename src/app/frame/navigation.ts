import type { Language } from "#/features/i18n";

export interface NavLink {
  /** A site path (`/sale`, joined with the language prefix) or an absolute URL. */
  href: string;
  label_en: string;
  label_lv: string;
  label_ru: string;
  external?: boolean;
}

/** The label of a link in a language; English when the language has none. */
export const navLabel = (link: NavLink, lang: Language | string): string =>
  (link as unknown as Record<string, string | undefined>)[`label_${lang}`] || link.label_en;

/** The links of the top bar and the mobile tab bar. */
export const mainLinks: NavLink[] = [
  {
    href: "/collections",
    label_en: "Collections",
    label_lv: "Kolekcijas",
    label_ru: "Коллекции",
    external: false,
  },
  {
    href: "/matresses",
    label_en: "Matresses",
    label_lv: "Matrači",
    label_ru: "Матрацы",
    external: false,
  },
  {
    href: "/sale",
    label_en: "Sale",
    label_lv: "Izpārdošana",
    label_ru: "Распродажа",
    external: false,
  },
  {
    href: "https://porolons.lv/",
    label_en: "Foam",
    label_lv: "Porolons",
    label_ru: "Поролон",
    external: true,
  },
  {
    href: "/components",
    label_en: "Components",
    label_lv: "Komponenti",
    label_ru: "Компоненты",
    external: false,
  },
];

/** The links of the right side of the top bar and of the burger menu. */
export const secondaryLinks: NavLink[] = [
  {
    href: "/horeca",
    label_en: "HoReCa",
    label_lv: "HoReCa",
    label_ru: "HoReCa",
    external: false,
  },
  {
    href: "/gallery",
    label_en: "Gallery",
    label_lv: "Galerija",
    label_ru: "Галерея",
  },
  {
    href: "/catalogs",
    label_en: "Catalogue",
    label_lv: "Katalogi",
    label_ru: "Каталоги",
  },
  // {
  //   href: "/about-us",
  //   label_en: "About us",
  //   label_lv: "Par mums",
  //   label_ru: "О нас",
  // },
  {
    href: "/contact",
    label_en: "Contact",
    label_lv: "Kontakti",
    label_ru: "Контакты",
  },
];
