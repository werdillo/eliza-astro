import type { ImageMetadata } from "astro";
import type { Language } from "#/features/i18n";
import collection2018 from "./assets/collection_2018.jpg";
import collection2019 from "./assets/collection_2019.jpg";
import collection2021 from "./assets/collection_2021.jpg";

/** The printed catalogues, newest last. `file` is the PDF in `public/`. */
export interface Catalog {
  year: number;
  file: string;
  image: ImageMetadata;
  alt: string;
}

export const catalogs: Catalog[] = [
  {
    year: 2018,
    file: "/catalog_2018.pdf",
    image: collection2018,
    alt: "Eliza-K Furniture Catalog 2018 - Premium furniture collection PDF download",
  },
  {
    year: 2019,
    file: "/catalog_2019.pdf",
    image: collection2019,
    alt: "Eliza-K Furniture Catalog 2019 - Latest premium furniture designs PDF",
  },
  {
    year: 2021,
    file: "/catalog_2021.pdf",
    image: collection2021,
    alt: "Eliza-K Furniture Catalog 2021 - Modern premium furniture collection PDF",
  },
];

/** The page title and the word before each year, by language. */
export const catalogCopy: Record<Language, { pageTitle: string; catalog: string }> = {
  en: { pageTitle: "Catalogue", catalog: "Catalogue" },
  ru: { pageTitle: "Каталоги", catalog: "Каталог" },
  lv: { pageTitle: "Katalogi", catalog: "Katalogs" },
};
