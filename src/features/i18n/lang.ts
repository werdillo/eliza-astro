import type { Language } from "./translations";

/** The site's languages, the default one first. */
export const LANGUAGES: Language[] = ["lv", "en", "ru"];

/** A path under a language: `langPath("en", "/sale")` is `/en/sale`. */
export const langPath = (lang: string, path: string): string => `/${lang}${path}`;
