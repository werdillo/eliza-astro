/** A path under a language: `langPath("en", "/sale")` is `/en/sale`. */
export const langPath = (lang: string, path: string): string => `/${lang}${path}`;
