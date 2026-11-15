import type { Language } from "#/features/i18n";

/** The placeholder's words, owned by the feature that shows them. */
export const comingSoonCopy: Record<Language, { title: string; message: string; subMessage: string; button: string }> = {
  en: {
    title: "Coming Soon",
    message: "Our website is currently under development. We're working hard to bring you an amazing experience.",
    subMessage: "Please check back later for updates.",
    button: "Home",
  },
  lv: {
    title: "Drīzumā",
    message: "Mūsu vietne pašlaik ir izstrādes procesā. Mēs cītīgi strādājam, lai jums sniegtu lielisku pieredzi.",
    subMessage: "Lūdzu, apmeklējiet mūs vēlāk, lai uzzinātu jaunumus.",
    button: "Sākumlapa",
  },
  ru: {
    title: "Скоро открытие",
    message: "Наш сайт в настоящее время находится в разработке. Мы усердно работаем, чтобы предоставить вам потрясающий опыт.",
    subMessage: "Пожалуйста, загляните позже для обновлений.",
    button: "Главная",
  },
};
