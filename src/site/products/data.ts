import { copy } from "#/core/page";
export const translations = {
  en: {
    sendEmail: "Send email",
    dimensions: "Dimensions",
    cleaning: "Cleaning",
    description: "Description",
    fabrics: "Fabrics",
    price: "Price",
    oldPrice: "Was",
    previous: "Previous photo",
    next: "Next photo",
    enlarge: "Enlarge photo",
  },
  ru: {
    sendEmail: "Отправить email",
    dimensions: "Размеры",
    cleaning: "Уход",
    description: "Описание",
    fabrics: "Ткани",
    price: "Цена",
    oldPrice: "Было",
    previous: "Предыдущее фото",
    next: "Следующее фото",
    enlarge: "Увеличить фото",
  },
  lv: {
    sendEmail: "Sūtīt e-pastu",
    dimensions: "Izmēri",
    cleaning: "Tīrīšana",
    description: "Apraksts",
    fabrics: "Audumi",
    price: "Cena",
    oldPrice: "Bija",
    previous: "Iepriekšējais foto",
    next: "Nākamais foto",
    enlarge: "Palielināt foto",
  },
};

/** The discount of a sale item as a badge ("-45%"); nothing when there is no real reduction. */
export const discountLabel = ({ price, oldPrice }: { price?: number; oldPrice?: number }): string | undefined =>
  price && oldPrice && oldPrice > price ? `-${Math.round(100 - (100 * price) / oldPrice)}%` : undefined;

/** The mattress construction types (the record's `field`), in the order the list shows them. */
export const mattressFields: Record<string, Record<"lv" | "en" | "ru", string>> = {
  pocket: { lv: "Matrači ar Pocket atsperēm", en: "Pocket spring mattresses", ru: "Матрасы с пружинами Pocket" },
  bonnel: { lv: "Matrači ar Bonnel atsperēm", en: "Bonnel spring mattresses", ru: "Матрасы с пружинами Bonnel" },
  stylex: { lv: "Bezatsperu matrači", en: "Springless mattresses", ru: "Беспружинные матрасы" },
};

/** The word that titles a page of each kind: "Produkts - Eliza-K | …", "Product - …". */
export const kindWord = {
  def: { lv: "Produkts", en: "Product", ru: "Продукт" },
  sale: { lv: "Izpārdošanas produkts", en: "Sale Product", ru: "Товар со скидкой" },
  mattress: { lv: "Matracis", en: "Mattress", ru: "Матрас" },
} as const;

/** The copy of the `sale` page. */
export const salePage = copy(
    { title: "Izpārdošana - Eliza-K | Mēbeles ar atlaidi", description: "Izmantojiet Eliza-K izpārdošanas piedāvājumus - kvalitatīvas mēbeles par īpašām cenām. Dīvāni, gultas un citas mēbeles ar lielām atlaidēm.", h1: "Izpārdošana" },
    { title: "Sale - Eliza-K | Discounted Furniture", description: "Take advantage of Eliza-K sale offers - quality furniture at special prices. Sofas, beds and other furniture with great discounts.", h1: "Sale" },
    { title: "Распродажа - Eliza-K | Мебель со скидкой", description: "Воспользуйтесь предложениями распродажи Eliza-K - качественная мебель по специальным ценам. Диваны, кровати и другая мебель с большими скидками.", h1: "Распродажа" },
);

/** The copy of the `mattresses` page. */
export const mattressesPage = copy(
    { title: "Matracis - Eliza-K | Premium kvalitatīvi matrači Latvijā", description: "Kvalitatīvi premium matrači no Eliza-K. Dažādi cietības līmeņi, izmēri un materiāli jūsu ideālam miegam un komfortam. Ortopēdiski matrači augstākajā kvalitātē.", h1: "Matrači" },
    { title: "Mattresses - Eliza-K | Premium Quality Mattresses in Latvia", description: "Premium quality mattresses from Eliza-K. Different firmness levels, sizes and materials for your ideal sleep and comfort. Orthopedic mattresses in the highest quality.", h1: "Mattresses" },
    { title: "Матрасы - Eliza-K | Премиум качественные матрасы в Латвии", description: "Качественные премиум матрасы от Eliza-K. Различные уровни жесткости, размеры и материалы для вашего идеального сна и комфорта. Ортопедические матрасы высшего качества.", h1: "Матрацы" },
);

/** The copy of the `product` page. */
export const productPage = copy(
    { title: "Produkts - Eliza-K | Premium mēbeļu detaļas un specifikācijas", description: "Apskatiet detalizētu informāciju par Eliza-K premium mēbeļu produktiem. Specifikācijas, izmēri, materiāli un cenas mūsu ekskluzīvajām mēbelēm." },
    { title: "Product - Eliza-K | Premium Furniture Details and Specifications", description: "View detailed information about Eliza-K premium furniture products. Specifications, dimensions, materials and prices for our exclusive furniture." },
    { title: "Продукт - Eliza-K | Детали и спецификации премиум мебели", description: "Посмотрите подробную информацию о продукции премиум мебели Eliza-K. Спецификации, размеры, материалы и цены на нашу эксклюзивную мебель." },
);

/** The copy of the `saleProduct` page. */
export const saleProductPage = copy(
    { title: "Izpārdošanas produkts - Eliza-K | Īpašie piedāvājumi un atlaides", description: "Apskatiet detalizētu informāciju par Eliza-K izpārdošanas produktiem. Kvalitatīvas mēbeles ar lielām atlaidēm - specifikācijas, izmēri un īpašās cenas." },
    { title: "Sale Product - Eliza-K | Special Offers and Discounts", description: "View detailed information about Eliza-K sale products. Quality furniture with great discounts - specifications, dimensions and special prices." },
    { title: "Товар со скидкой - Eliza-K | Специальные предложения и скидки", description: "Посмотрите подробную информацию о товарах распродажи Eliza-K. Качественная мебель с большими скидками - спецификации, размеры и специальные цены." },
);

/** The copy of the `mattress` page. */
export const mattressPage = copy(
    { title: "Matracis - Eliza-K | Premium kvalitatīvs matracis", description: "Apskatiet Eliza-K premium matracis ar detalizētu informāciju. Kvalitatīvs ortopēdisks matracis ar dažādiem cietības līmeņiem un izmēriem jūsu ideālam miegam." },
    { title: "Mattress - Eliza-K | Premium Quality Mattress", description: "View Eliza-K premium mattress with detailed information. Quality orthopedic mattress with different firmness levels and sizes for your ideal sleep." },
    { title: "Матрас - Eliza-K | Премиум качественный матрас", description: "Посмотрите премиум матрас Eliza-K с подробной информацией. Качественный ортопедический матрас с различными уровнями жесткости и размерами для вашего идеального сна." },
);
