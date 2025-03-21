// BurgerMenu.jsx
import { createSignal, createEffect } from 'solid-js';
import '../../assets/css/BurgerMenu.css';

import { secondaryLinks} from "./Links"

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
    <div class="burger-menu" >
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
            <a             
              href={ link.href.startsWith('http') ? link.href : `/${props.lang}${link.href}`}
             class="menu-link" onClick={() => setIsOpen(false)}>
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