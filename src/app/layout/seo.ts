import { LANGUAGES, type Language } from "#/features/i18n";
import { contacts } from "#/site/company";
import { socialLinks } from "#/app/frame";

/** The site's address: every canonical, alternate and schema URL starts with it. */
export const siteUrl = "https://eliza-k.lv";

/** The canonical URL of a page: its language and its path under it, with a trailing slash. */
export const pageUrl = (lang: string, path = ""): string => `${siteUrl}/${lang}${path ? path.replace(/\/?$/, "/") : "/"}`;

/** The alternate of a page in every language, and x-default (Latvian). */
export const alternates = (path = "") => [
  ...LANGUAGES.map((lang) => ({ lang, href: pageUrl(lang, path) })),
  { lang: "x-default", href: pageUrl("lv", path) },
];

/** The locale of the Open Graph tags. */
export const ogLocale = (lang: Language | string) => (lang === "lv" ? "lv_LV" : lang === "ru" ? "ru_RU" : "en_US");

/** A breadcrumb: a page of the site, by its name and its path under the language. */
export interface Crumb {
  name: string;
  path: string;
}

/** The name of the home link in breadcrumbs, by language. */
export const homeLabel: Record<Language, string> = { lv: "Sākumlapa", en: "Home", ru: "Главная" };

/** The copy of a page: its title, its description and, where the page shows no heading, the one it gets for screen readers. */
export interface PageCopy {
  title: string;
  description: string;
  h1?: string;
}

const copy = (lv: PageCopy, en: PageCopy, ru: PageCopy): Record<Language, PageCopy> => ({ lv, en, ru });

/** The copy of every static page, by key; the pages look up their key and their language. */
export const pages = {
  home: copy(
    { title: "Eliza-K - Ekskluzīva premium mēbeles Latvijā | Rīga", description: "Eliza-K - ekskluzīvu premium mēbeļu ražotājs Latvijā un Rīgā. Kolekcijas Sophisticated Living, BBold, Basic. Kvalitatīvas mēbeles, individuāls dizains, matračus, tekstils.", h1: "Eliza-K" },
    { title: "Eliza-K - Exclusive Premium Furniture in Latvia | Riga", description: "Eliza-K - manufacturer of exclusive premium furniture in Latvia and Riga. Collections Sophisticated Living, BBold, Basic. Quality furniture, individual design, mattresses, textiles.", h1: "Eliza-K" },
    { title: "Eliza-K - Эксклюзивная премиум мебель в Латвии | Рига", description: "Eliza-K - производитель эксклюзивной премиум мебели в Латвии и Риге. Коллекции Sophisticated Living, BBold, Basic. Качественная мебель, индивидуальный дизайн, матрасы, текстиль.", h1: "Eliza-K" },
  ),
  collections: copy(
    { title: "Mēbeļu kolekcijas - Eliza-K | Sophisticated Living, BBold, Basic", description: "Apskatiet Eliza-K ekskluzīvās mēbeļu kolekcijas: Sophisticated Living premium līniju, moderno BBold kolekciju un praktisko Basic sēriju. Unikāls dizains un augstākā kvalitāte.", h1: "Kolekcijas" },
    { title: "Furniture Collections - Eliza-K | Sophisticated Living, BBold, Basic", description: "Explore Eliza-K exclusive furniture collections: Sophisticated Living premium line, modern BBold collection and practical Basic series. Unique design and highest quality.", h1: "Collections" },
    { title: "Коллекции мебели - Eliza-K | Sophisticated Living, BBold, Basic", description: "Изучите эксклюзивные коллекции мебели Eliza-K: премиум линию Sophisticated Living, современную коллекцию BBold и практичную серию Basic. Уникальный дизайн и высочайшее качество.", h1: "Коллекции" },
  ),
  bbold: copy(
    { title: "BBold kolekcija - Eliza-K | Modernas un izteiksmīgas mēbeles", description: "Apskatiet Eliza-K BBold kolekciju - modernas, izteiksmīgas mēbeles ar unikālu dizainu.", h1: "BBold" },
    { title: "BBold Collection - Eliza-K | Modern Bold Furniture", description: "Explore the Eliza-K BBold collection - modern furniture with a bold, unique design.", h1: "BBold" },
    { title: "Коллекция BBold - Eliza-K | Современная выразительная мебель", description: "Изучите коллекцию BBold от Eliza-K - современная выразительная мебель с уникальным дизайном.", h1: "BBold" },
  ),
  basic: copy(
    { title: "Basic kolekcija - Eliza-K | Praktiskas un funkcionālas mēbeles", description: "Apskatiet Eliza-K Basic kolekciju - praktiskas un funkcionālas mēbeles ikdienas lietošanai. Kvalitatīvas mēbeles par pieejamu cenu ar modernu minimālistisku dizainu.", h1: "Basic" },
    { title: "Basic Collection - Eliza-K | Practical and Functional Furniture", description: "Explore Eliza-K Basic collection - practical and functional furniture for everyday use. Quality furniture at affordable price with modern minimalist design.", h1: "Basic" },
    { title: "Коллекция Basic - Eliza-K | Практичная и функциональная мебель", description: "Изучите коллекцию Basic от Eliza-K - практичная и функциональная мебель для повседневного использования. Качественная мебель по доступной цене с современным минималистичным дизайном.", h1: "Basic" },
  ),
  sale: copy(
    { title: "Izpārdošana - Eliza-K | Mēbeles ar atlaidi", description: "Izmantojiet Eliza-K izpārdošanas piedāvājumus - kvalitatīvas mēbeles par īpašām cenām. Dīvāni, gultas un citas mēbeles ar lielām atlaidēm.", h1: "Izpārdošana" },
    { title: "Sale - Eliza-K | Discounted Furniture", description: "Take advantage of Eliza-K sale offers - quality furniture at special prices. Sofas, beds and other furniture with great discounts.", h1: "Sale" },
    { title: "Распродажа - Eliza-K | Мебель со скидкой", description: "Воспользуйтесь предложениями распродажи Eliza-K - качественная мебель по специальным ценам. Диваны, кровати и другая мебель с большими скидками.", h1: "Распродажа" },
  ),
  mattresses: copy(
    { title: "Matracis - Eliza-K | Premium kvalitatīvi matrači Latvijā", description: "Kvalitatīvi premium matrači no Eliza-K. Dažādi cietības līmeņi, izmēri un materiāli jūsu ideālam miegam un komfortam. Ortopēdiski matrači augstākajā kvalitātē.", h1: "Matrači" },
    { title: "Mattresses - Eliza-K | Premium Quality Mattresses in Latvia", description: "Premium quality mattresses from Eliza-K. Different firmness levels, sizes and materials for your ideal sleep and comfort. Orthopedic mattresses in the highest quality.", h1: "Mattresses" },
    { title: "Матрасы - Eliza-K | Премиум качественные матрасы в Латвии", description: "Качественные премиум матрасы от Eliza-K. Различные уровни жесткости, размеры и материалы для вашего идеального сна и комфорта. Ортопедические матрасы высшего качества.", h1: "Матрацы" },
  ),
  textile: copy(
    { title: "Tekstilmateriāli - Eliza-K | Plašs audumu klāsts mīkstajām mēbelēm", description: "Eliza-K piedāvā plašu tekstilmateriālu klāstu mīkstajām mēbelēm. Kvalitatīvi audumi dažādos krāsu un faktūru variantos jūsu mēbeļu projektiem.", h1: "Tekstilmateriāli" },
    { title: "Textile Materials - Eliza-K | Wide Range of Fabrics for Upholstered Furniture", description: "Eliza-K offers a wide range of textile materials for upholstered furniture. Quality fabrics in various color and texture options for your furniture projects.", h1: "Textile materials" },
    { title: "Текстильные материалы - Eliza-K | Широкий выбор тканей для мягкой мебели", description: "Eliza-K предлагает широкий выбор текстильных материалов для мягкой мебели. Качественные ткани в различных цветовых и фактурных вариантах для ваших мебельных проектов.", h1: "Текстильные материалы" },
  ),
  components: copy(
    { title: "Komponenti - Eliza-K | Porolons un audumi", description: "Eliza-K ražo porolona izstrādājumus un piedāvā audumus mīkstajām mēbelēm.", h1: "Komponenti" },
    { title: "Components - Eliza-K | Foam and Textile", description: "Eliza-K makes foam products and offers fabrics for upholstered furniture.", h1: "Components" },
    { title: "Компоненты - Eliza-K | Поролон и ткани", description: "Eliza-K производит изделия из поролона и предлагает ткани для мягкой мебели.", h1: "Компоненты" },
  ),
  catalogs: copy(
    { title: "Katalogi - Eliza-K | Iepriekšējo gadu katalogi", description: "Eliza-K katalogi PDF formātā: kolekcijas 2018, 2019 un 2021." },
    { title: "Catalogue - Eliza-K | Catalogues of Previous Years", description: "Eliza-K catalogues in PDF: collections of 2018, 2019 and 2021." },
    { title: "Каталоги - Eliza-K | Каталоги прошлых лет", description: "Каталоги Eliza-K в PDF: коллекции 2018, 2019 и 2021 годов." },
  ),
  contact: copy(
    { title: "Kontakti - Eliza-K | Salons un birojs Rīgā", description: "Eliza-K kontakti: salona, porolona un audumu noliktavas adreses, tālruņi, e-pasts un darba laiks.", h1: "Kontakti" },
    { title: "Contact - Eliza-K | Showroom and Offices in Riga", description: "Eliza-K contacts: showroom, foam and textile warehouse addresses, phones, email and working hours.", h1: "Contacts" },
    { title: "Контакты - Eliza-K | Салон и офисы в Риге", description: "Контакты Eliza-K: адреса салона, производства поролона и склада тканей, телефоны, e-mail и время работы.", h1: "Контакты" },
  ),
  gallery: copy(
    { title: "Galerija - Eliza-K | Pabeigtie projekti", description: "Eliza-K pabeigto projektu fotogrāfijas.", h1: "Galerija" },
    { title: "Gallery - Eliza-K | Completed Projects", description: "Photographs of Eliza-K completed projects.", h1: "Gallery" },
    { title: "Галерея - Eliza-K | Завершённые проекты", description: "Фотографии завершённых проектов Eliza-K.", h1: "Галерея" },
  ),
  horeca: copy(
    { title: "HoReCa - Eliza-K | Viesnīcas, kafejnīcas un restorāni", description: "Eliza-K mēbeles viesnīcām, kafejnīcām un restorāniem.", h1: "HoReCa" },
    { title: "HoReCa - Eliza-K | Hotels, Cafes and Restaurants", description: "Eliza-K furniture for hotels, cafes and restaurants.", h1: "HoReCa" },
    { title: "HoReCa - Eliza-K | Отели, кафе и рестораны", description: "Мебель Eliza-K для отелей, кафе и ресторанов.", h1: "HoReCa" },
  ),
  hotels: copy(
    { title: "Viesnīcas - Eliza-K | HoReCa", description: "Eliza-K mēbeles viesnīcām. Drīzumā.", h1: "Viesnīcas" },
    { title: "Hotels - Eliza-K | HoReCa", description: "Eliza-K furniture for hotels. Coming soon.", h1: "Hotels" },
    { title: "Отели - Eliza-K | HoReCa", description: "Мебель Eliza-K для отелей. Скоро.", h1: "Отели" },
  ),
  cafe: copy(
    { title: "Kafejnīcas - Eliza-K | HoReCa", description: "Eliza-K mēbeles kafejnīcām. Drīzumā.", h1: "Kafejnīcas" },
    { title: "Cafe - Eliza-K | HoReCa", description: "Eliza-K furniture for cafes. Coming soon.", h1: "Cafe" },
    { title: "Кафе - Eliza-K | HoReCa", description: "Мебель Eliza-K для кафе. Скоро.", h1: "Кафе" },
  ),
  projects: copy(
    { title: "Projekti - Eliza-K | HoReCa", description: "Eliza-K HoReCa projekti. Drīzumā.", h1: "Projekti" },
    { title: "Projects - Eliza-K | HoReCa", description: "Eliza-K HoReCa projects. Coming soon.", h1: "Projects" },
    { title: "Проекты - Eliza-K | HoReCa", description: "Проекты Eliza-K для HoReCa. Скоро.", h1: "Проекты" },
  ),
  aboutUs: copy(
    { title: "Par mums - Eliza-K", description: "Par Eliza-K: ražotājs Rīgā. Drīzumā.", h1: "Par mums" },
    { title: "About us - Eliza-K", description: "About Eliza-K: a manufacturer in Riga. Coming soon.", h1: "About us" },
    { title: "О нас - Eliza-K", description: "Eliza-K: производитель в Риге. Скоро.", h1: "О нас" },
  ),
  product: copy(
    { title: "Produkts - Eliza-K | Premium mēbeļu detaļas un specifikācijas", description: "Apskatiet detalizētu informāciju par Eliza-K premium mēbeļu produktiem. Specifikācijas, izmēri, materiāli un cenas mūsu ekskluzīvajām mēbelēm." },
    { title: "Product - Eliza-K | Premium Furniture Details and Specifications", description: "View detailed information about Eliza-K premium furniture products. Specifications, dimensions, materials and prices for our exclusive furniture." },
    { title: "Продукт - Eliza-K | Детали и спецификации премиум мебели", description: "Посмотрите подробную информацию о продукции премиум мебели Eliza-K. Спецификации, размеры, материалы и цены на нашу эксклюзивную мебель." },
  ),
  saleProduct: copy(
    { title: "Izpārdošanas produkts - Eliza-K | Īpašie piedāvājumi un atlaides", description: "Apskatiet detalizētu informāciju par Eliza-K izpārdošanas produktiem. Kvalitatīvas mēbeles ar lielām atlaidēm - specifikācijas, izmēri un īpašās cenas." },
    { title: "Sale Product - Eliza-K | Special Offers and Discounts", description: "View detailed information about Eliza-K sale products. Quality furniture with great discounts - specifications, dimensions and special prices." },
    { title: "Товар со скидкой - Eliza-K | Специальные предложения и скидки", description: "Посмотрите подробную информацию о товарах распродажи Eliza-K. Качественная мебель с большими скидками - спецификации, размеры и специальные цены." },
  ),
  mattress: copy(
    { title: "Matracis - Eliza-K | Premium kvalitatīvs matracis", description: "Apskatiet Eliza-K premium matracis ar detalizētu informāciju. Kvalitatīvs ortopēdisks matracis ar dažādiem cietības līmeņiem un izmēriem jūsu ideālam miegam." },
    { title: "Mattress - Eliza-K | Premium Quality Mattress", description: "View Eliza-K premium mattress with detailed information. Quality orthopedic mattress with different firmness levels and sizes for your ideal sleep." },
    { title: "Матрас - Eliza-K | Премиум качественный матрас", description: "Посмотрите премиум матрас Eliza-K с подробной информацией. Качественный ортопедический матрас с различными уровнями жесткости и размерами для вашего идеального сна." },
  ),
} satisfies Record<string, Record<Language, PageCopy>>;

/** The company as schema.org: the Organization node every page refers to, with the addresses of the footer. */
export const organizationNode = () => ({
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Eliza-K",
  url: siteUrl,
  logo: { "@type": "ImageObject", url: `${siteUrl}/logo512.png` },
  description: "Производитель эксклюзивной премиум мебели в Латвии",
  email: contacts[0].mail,
  telephone: `+371${contacts[0].phone[0]}`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "LV",
    addressLocality: "Rīga",
  },
  sameAs: socialLinks.map((link) => link.url),
  location: contacts
    .filter((contact) => contact.address)
    .map((contact) => ({
      "@type": "LocalBusiness",
      name: `Eliza-K ${contact.key}`,
      address: { "@type": "PostalAddress", streetAddress: contact.address, addressCountry: "LV" },
      email: contact.mail,
      telephone: contact.phone.map((phone) => `+371${phone}`),
    })),
});

/** The schema.org graph of a page: the company, the website and the page, plus the page's own nodes. */
export const structuredData = (page: {
  title: string;
  description: string;
  url: string;
  lang: string;
  crumbs?: { name: string; url: string }[];
  nodes?: Record<string, unknown>[];
}) => ({
  "@context": "https://schema.org",
  "@graph": [
    organizationNode(),
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Eliza-K",
      inLanguage: LANGUAGES,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${page.url}#webpage`,
      url: page.url,
      name: page.title,
      description: page.description,
      inLanguage: page.lang,
      isPartOf: { "@id": `${siteUrl}/#website` },
    },
    ...(page.crumbs && page.crumbs.length > 0
      ? [
          {
            "@type": "BreadcrumbList",
            itemListElement: page.crumbs.map((crumb, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: crumb.name,
              item: crumb.url,
            })),
          },
        ]
      : []),
    ...(page.nodes ?? []),
  ],
});
