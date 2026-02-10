// BurgerMenu.jsx
import { createSignal } from "solid-js";
import "../../../assets/css/BurgerMenu.css";

import { secondaryLinks } from "../Links";

const BurgerMenu = ({ lang, currentPath }) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const toggleMenu = () => setIsOpen(!isOpen());

  return (
    <div class="burger-menu">
      {/* Кнопка бургер-меню */}
      <button
        class={`burger-button ${isOpen() ? "open" : ""}`}
        onClick={toggleMenu}
        aria-expanded={isOpen()}
        aria-label="Main Menu"
      >
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      </button>

      {/* Меню */}
      <nav class={`menu-panel ${isOpen() ? "open" : ""}`}>
        <div class="menu-links">
          {secondaryLinks.map((link) => {
            // Create the full href with language prefix if needed
            const fullHref = link.href.startsWith("http")
              ? link.href
              : `/${lang}${link.href}`;

            // Check if current path matches this link's path
            const isActive =
              currentPath === fullHref ||
              (link.href !== "/" && currentPath.startsWith(fullHref));

            return (
              <a
                href={fullHref}
                class={`menu-link ${isActive ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                {link[`label_${lang}`]}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Затемнение фона */}
      {isOpen() && <div class="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};

export default BurgerMenu;
