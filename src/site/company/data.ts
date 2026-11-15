export interface ContactPoint {
  key: string;
  address?: string;
  mail: string;
  phone: string[];
}

/** The three addresses in the footer. */
export const contacts: ContactPoint[] = [
  {
    key: "showroom",
    mail: "teika@eliza-k.lv",
    phone: ["29112499"],
  },
  {
    key: "foam",
    address: "Rīga, A. Deglava iela 52A, LV-1035",
    mail: "order@eliza-k.lv",
    phone: ["27862121", "26653510"],
  },
  {
    key: "textile",
    address: "Rīga, A. Deglava 50 iela K-1",
    mail: "audumi@eliza-k.lv",
    phone: ["26599422"],
  },
];

/** The footer headings of each address, by language. */
export const contactTitles: Record<string, Record<string, string>> = {
  lv: {
    showroom: "Mēbeļu salons ELIZA",
    foam: "Porolona detaļas ražošana",
    textile: "Audumu noliktava",
  },
  en: {
    showroom: "Furniture showroom ELIZA",
    foam: "Foam details manufacture",
    textile: "Textile warehouse",
  },
  ru: {
    showroom: "Мебельный салон ELIZA",
    foam: "Производство деталей из поролона",
    textile: "Склад тканей",
  },
};

/** The heading of the working-hours board on the contacts page. */
export const workingHoursTitle: Record<string, string> = {
  en: "Working time",
  ru: "Время работы",
  lv: "Darba laiks",
};

/** The award certificates in `public/awards`, newest first. */
export const awards = Array.from({ length: 13 }, (_, index) => `award_${13 - index}.jpg`);
