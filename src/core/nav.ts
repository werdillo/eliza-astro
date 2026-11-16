export interface NavLink {
  /** A site path (`/sale`) or an absolute URL; the frame adds the language prefix to a site path. */
  href: string;
  label_en: string;
  label_lv: string;
  label_ru: string;
  external?: boolean;
  /** The UnoCSS icon class of the mobile tab bar, when the link is shown there. */
  icon?: string;
}

/** The label of a link in a language; English when the language has none. */
export const navLabel = (link: NavLink, lang: string): string =>
  (link as unknown as Record<string, string | undefined>)[`label_${lang}`] || link.label_en;
