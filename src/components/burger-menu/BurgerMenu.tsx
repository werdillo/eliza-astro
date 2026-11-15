import { createSignal, For } from "solid-js";

export interface BurgerLink {
  /** Full href, language prefix already applied. */
  href: string;
  label: string;
}

interface Props {
  items: BurgerLink[];
  currentPath: string;
}

const BurgerMenu = (props: Props) => {
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
        <span class="burger-line" />
        <span class="burger-line" />
        <span class="burger-line" />
      </button>

      {/* Меню */}
      <nav class={`menu-panel ${isOpen() ? "open" : ""}`}>
        <div class="menu-links">
          <For each={props.items}>
            {(link) => {
              const isActive =
                props.currentPath === link.href ||
                props.currentPath.startsWith(link.href);

              return (
                <a
                  href={link.href}
                  class={`menu-link ${isActive ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              );
            }}
          </For>
        </div>
      </nav>

      {/* Затемнение фона */}
      {isOpen() && <div class="overlay" onClick={toggleMenu} />}
    </div>
  );
};

export default BurgerMenu;
