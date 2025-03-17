// BurgerMenu.jsx
import { createSignal, createEffect } from 'solid-js';
import '../../assets/css/BurgerMenu.css';

// Многоязычные навигационные ссылки
export const secondaryLinks = [
  {
    href: "/gallery",
    label_en: "Gallery",
    label_lv: "Galerija",
    label_ru: "Галерея"
  },
  {
    href: "/catalogs",
    label_en: "Catalogs",
    label_lv: "Katalogi",
    label_ru: "Каталоги"
  },
  {
    href: "/about-us",
    label_en: "About us",
    label_lv: "Par mums",
    label_ru: "О нас"
  },
  {
    href: "/contact",
    label_en: "Contact",
    label_lv: "Kontakti",
    label_ru: "Контакты"
  }
];

const BurgerMenu = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [currentLang, setCurrentLang] = createSignal(props.lang || 'lv');
  
  // Обновление языка при изменении props
  createEffect(() => {
    if (props.lang) {
      setCurrentLang(props.lang);
    }
  });
  
  const toggleMenu = () => {
    setIsOpen(!isOpen());
  };

  const changeLang = (lang) => {
    setCurrentLang(lang);
    if (props.onLanguageChange) {
      props.onLanguageChange(lang);
    }
  };

  return (
    <div class="burger-menu">
      {/* Кнопка бургер-меню */}
      <button 
        class={`burger-button ${isOpen() ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-expanded={isOpen()}
        aria-label="Main Menu"
      >
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      </button>
      
      {/* Меню */}
      <nav class={`menu-panel ${isOpen() ? 'open' : ''}`}>
        <div class="menu-links">
          {secondaryLinks.map((link) => (
            <a href={link.href} class="menu-link" onClick={() => setIsOpen(false)}>
              {link[`label_${currentLang()}`]}
            </a>
          ))}
        </div>
      </nav>
      
      {/* Затемнение фона */}
      {isOpen() && <div class="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};

export default BurgerMenu;