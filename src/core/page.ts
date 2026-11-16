/** The copy of a page: its title, its description and, where the page shows no heading, the one it gets for screen readers. */
export interface PageCopy {
  title: string;
  description: string;
  h1?: string;
}

/** The three languages of one page's copy, written lv, en, ru. */
export const copy = (lv: PageCopy, en: PageCopy, ru: PageCopy) => ({ lv, en, ru });
