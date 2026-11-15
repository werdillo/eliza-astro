// Централизованные переводы для всего сайта
export type Language = "lv" | "en" | "ru";

export const translations = {
  // Общие переводы
  common: {
    readMore: {
      en: "Read More",
      lv: "Lasīt vairāk",
      ru: "Читать далее",
    },
    backToHome: {
      en: "Back to Home",
      lv: "Atpakaļ uz sākumu",
      ru: "Вернуться на главную",
    },
    contact: {
      en: "Contact",
      lv: "Kontakti",
      ru: "Контакты",
    },
  },

  // HoReCa секция
  horeca: {
    hotels: {
      en: "Hotels",
      lv: "Viesnīcas",
      ru: "Отели",
    },
    cafe: {
      en: "Cafe",
      lv: "Kafejnīcas",
      ru: "Кафе",
    },
    restaurants: {
      en: "Restaurants",
      lv: "Restorāni",
      ru: "Рестораны",
    },
  },

  // Коллекции
  collections: {
    sophisticatedLiving: {
      en: "Sophisticated Living",
      lv: "Sophisticated Living",
      ru: "Sophisticated Living",
    },
    bbold: {
      en: "BBold",
      lv: "BBold",
      ru: "BBold",
    },
    basic: {
      en: "Basic",
      lv: "Basic",
      ru: "Basic",
    },
  },

  // Coming Soon страница
  comingSoon: {
    title: {
      en: "Coming Soon",
      lv: "Drīzumā",
      ru: "Скоро открытие",
    },
    message: {
      en: "Our website is currently under development. We're working hard to bring you an amazing experience.",
      lv: "Mūsu vietne pašlaik ir izstrādes procesā. Mēs cītīgi strādājam, lai jums sniegtu lielisku pieredzi.",
      ru: "Наш сайт в настоящее время находится в разработке. Мы усердно работаем, чтобы предоставить вам потрясающий опыт.",
    },
    subMessage: {
      en: "Please check back later for updates.",
      lv: "Lūdzu, apmeklējiet mūs vēlāk, lai uzzinātu jaunumus.",
      ru: "Пожалуйста, загляните позже для обновлений.",
    },
    button: {
      en: "Home",
      lv: "Sākumlapa",
      ru: "Главная",
    },
  },

  // Слайдер
  slider: {
    slide1: {
      title: {
        en: "Premium Elegance",
        lv: "Premium elegance",
        ru: "Премиальная элегантность",
      },
      text: {
        en: "Where luxury meets craftsmanship",
        lv: "Kur luksuss satiekas ar meistarību",
        ru: "Где роскошь встречается с мастерством",
      },
      button: {
        en: "Discover BBold",
        lv: "Atklājiet BBold",
        ru: "Откройте BBold",
      },
    },
    slide2: {
      title: {
        en: "Timeless Comfort",
        lv: "Mūžīgs komforts",
        ru: "Вечный комфорт",
      },
      text: {
        en: "Quality that endures. Style that inspires",
        lv: "Kvalitāte, kas iztur laiku. Stils, kas iedvesmo",
        ru: "Качество на века. Вдохновляющий стиль",
      },
      button: {
        en: "Explore Basic",
        lv: "Izpētiet Basic",
        ru: "Изучите Basic",
      },
    },
    slide3: {
      title: {
        en: "Exclusive Offers",
        lv: "Ekskluzīvi piedāvājumi",
        ru: "Эксклюзивные предложения",
      },
      text: {
        en: "Exceptional prices. Uncompromising quality",
        lv: "Izcila cena. Teicama kvalitāte",
        ru: "Исключительные цены. Безупречное качество",
      },
      button: {
        en: "Shop Sale",
        lv: "Izpārdošana",
        ru: "Распродажа",
      },
    },
  },
} as const;

// Утилита для получения перевода
export function t(
  key: string,
  lang: Language = "lv"
): string {
  const keys = key.split(".");
  let value: any = translations;

  for (const k of keys) {
    value = value[k];
    if (!value) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }

  return value[lang] || value.lv || key;
}
