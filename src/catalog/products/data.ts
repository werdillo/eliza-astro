export const translations = {
  en: {
    sendEmail: "Send email",
    dimensions: "Dimensions",
    cleaning: "Cleaning",
    description: "Description",
    fabrics: "Fabrics",
    price: "Price",
    oldPrice: "Was",
  },
  ru: {
    sendEmail: "Отправить email",
    dimensions: "Размеры",
    cleaning: "Уход",
    description: "Описание",
    fabrics: "Ткани",
    price: "Цена",
    oldPrice: "Было",
  },
  lv: {
    sendEmail: "Sūtīt e-pastu",
    dimensions: "Izmēri",
    cleaning: "Tīrīšana",
    description: "Apraksts",
    fabrics: "Audumi",
    price: "Cena",
    oldPrice: "Bija",
  },
};

/** The word that titles a page of each kind: "Produkts - Eliza-K | …", "Product - …". */
export const kindWord = {
  def: { lv: "Produkts", en: "Product", ru: "Продукт" },
  sale: { lv: "Izpārdošanas produkts", en: "Sale Product", ru: "Товар со скидкой" },
  mattress: { lv: "Matracis", en: "Mattress", ru: "Матрас" },
} as const;
