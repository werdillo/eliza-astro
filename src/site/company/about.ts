import type { Language } from "#/features/i18n";

export interface AboutCopy {
  heading: string;
  historyTitle: string;
  history: string;
  reachTitle: string;
  countries: string[];
  craftLabel: string;
  craftTitle: string;
  craft: string;
  craftAction: string;
  fieldsTitle: string;
  fields: string;
  sofas: { title: string; text: string };
  beds: { title: string; text: string };
  chairs: string;
  fabrics: string;
  careTitle: string;
  care: string;
  carePoints: string[];
  photoAlt: { showroom: string; craft: string; production: string };
}

/** The text of the "About us" page. */
export const aboutCopy: Record<Language, AboutCopy> = {
  lv: {
    heading: "Eliza-K: mantojums un meistarība kopš 1994. gada",
    historyTitle: "Trīs pilnveides desmitgades.",
    history:
      "Eliza-K dibināta 1994. gadā. Uzņēmums attīstījās, izmantojot pašu izstrādes un apmeklējot starptautiskas tekstila un mēbeļu izstādes. Pateicoties profesionālai komandai un mūsdienīgam dizainam, izdevās iziet premium mēbeļu starptautiskajā tirgū un iegūt atzinību starptautiskās izstādēs par inovatīvu un izsmalcinātu dizainu.",
    reachTitle: "Globālā klātbūtne",
    countries: ["Francija", "Vācija", "Anglija", "Īrija", "Šveice", "Baltijas valstis", "Spānija", "Itālija", "Beļģija", "Amerika"],
    craftLabel: "Individuāla pieeja",
    craftTitle: "Hand-made un custom-made māksla",
    craft:
      "Mūsu priekšrocība ir izstrādājumi, kas izgatavoti tikai ar rokām, un iespēja veikt individuālu pasūtījumu. Elastība izpildē: no izmēriem un komplektācijas līdz ekskluzīvu audumu, furnitūras un dizaina izvēlei.",
    craftAction: "Pasūtīt projektu",
    fieldsTitle: "Daudznozaru pieredze",
    fields: "No mīkstajām mēbelēm līdz ortopēdiskiem risinājumiem: mēs radām komfortu katrā detaļā.",
    sofas: { title: "Mīkstās mēbeles un dīvāni", text: "Jūsu interjera centrālie elementi." },
    beds: { title: "Gultas un matrači", text: "Nevainojamai atpūtai." },
    chairs: "Krēsli un pufi",
    fabrics: "Audumu tirdzniecība",
    careTitle: "Atbildīga ražošana",
    care: "Mēs esam sustainable FSC producer membership dalībnieki un izmantojam tikai augstas kvalitātes materiālus, kas atzīti pasaules standartos. Mūsu apņemšanās saudzēt vidi ir ieguldījums nākotnē.",
    carePoints: ["Sertificēta FSC koksne", "Videi draudzīgi pildījumi", "Ražošanas atkritumu samazināšana"],
    photoAlt: { showroom: "Eliza-K salonā", craft: "Mēbeļu izgatavošana ar rokām", production: "Eliza-K ražošana" },
  },
  en: {
    heading: "Eliza-K: heritage and craftsmanship since 1994",
    historyTitle: "Three decades of refinement.",
    history:
      "Eliza-K was founded in 1994. The company grew through its own developments and by attending international textile and furniture exhibitions. Thanks to a professional team and contemporary design, it entered the international premium furniture market and earned recognition at international exhibitions for innovative, refined design.",
    reachTitle: "Global presence",
    countries: ["France", "Germany", "England", "Ireland", "Switzerland", "Baltic States", "Spain", "Italy", "Belgium", "America"],
    craftLabel: "Individual approach",
    craftTitle: "The art of hand-made and custom-made",
    craft:
      "Our advantage is exclusively hand-made pieces and the option of an individual order. Flexibility in execution, from sizes and configuration to a choice of exclusive fabrics, fittings and design.",
    craftAction: "Order a project",
    fieldsTitle: "Multi-industry expertise",
    fields: "From upholstered furniture to orthopaedic solutions, we create comfort in every detail.",
    sofas: { title: "Upholstered furniture and sofas", text: "The centrepieces of your interior." },
    beds: { title: "Beds and mattresses", text: "For flawless rest." },
    chairs: "Armchairs and poufs",
    fabrics: "Fabric trade",
    careTitle: "Responsible production",
    care: "We are members of the sustainable FSC producer membership and use only high-quality materials recognised by world standards. Our commitment to the environment is an investment in the future.",
    carePoints: ["FSC-certified wood", "Eco-friendly fillings", "Minimised production waste"],
    photoAlt: { showroom: "In the Eliza-K showroom", craft: "Furniture being made by hand", production: "Eliza-K production" },
  },
  ru: {
    heading: "Eliza-K: Наследие и Мастерство с 1994 года",
    historyTitle: "Три десятилетия совершенствования.",
    history:
      "Eliza-K основана в 1994 году. Предприятие развивалось используя собственные разработки, посещая международные текстильные и мебельные выставки. Благодаря профессиональной команде и современному дизайну удалось выйти на международный рынок премиальной мебели, получить признание на международных выставках за инновационный и изысканный дизайн.",
    reachTitle: "Глобальное присутствие",
    countries: ["Франция", "Германия", "Англия", "Ирландия", "Швейцария", "Страны Балтии", "Испания", "Италия", "Бельгия", "Америка"],
    craftLabel: "Индивидуальный подход",
    craftTitle: "Искусство hand-made и custom-made",
    craft:
      "Наше преимущество — это изделия исключительно ручной работы и возможность индивидуального заказа. Гибкость в исполнении — от размеров и комплектации до выбора эксклюзивных тканей, фурнитуры и дизайна.",
    craftAction: "Заказать проект",
    fieldsTitle: "Многоотраслевая экспертиза",
    fields: "От мягкой мебели до ортопедических решений — мы создаем комфорт в каждой детали.",
    sofas: { title: "Мягкая мебель и диваны", text: "Центральные элементы вашего интерьера." },
    beds: { title: "Кровати и матрацы", text: "Для безупречного отдыха." },
    chairs: "Кресла и пуфы",
    fabrics: "Торговля тканями",
    careTitle: "Ответственное производство",
    care: "Мы являемся членами sustainable FSC producer membership и используем только высококачественные материалы, признанные мировыми стандартами. Наша приверженность экологии — это инвестиция в будущее.",
    carePoints: ["Сертифицированная древесина FSC", "Экологичные наполнители", "Минимизация отходов производства"],
    photoAlt: { showroom: "В шоуруме Eliza-K", craft: "Изготовление мебели вручную", production: "Производство Eliza-K" },
  },
};
