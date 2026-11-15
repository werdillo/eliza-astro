import { createSignal, For, Show } from "solid-js";

export interface BurgerLink {
  /** Full href, language prefix already applied. */
  href: string;
  label: string;
}

interface Props {
  items: BurgerLink[];
  currentPath: string;
}

const line = "w-full h-[2px] bg-white [transition:all_var(--transition-speed)]";

const BurgerMenu = (props: Props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const toggleMenu = () => setIsOpen(!isOpen());

  return (
    <div class="z-[1000] min-1200:hidden">
      {/* Кнопка бургер-меню */}
      <button
        class="relative flex flex-col justify-between w-[30px] h-[22px] [background:transparent] [border:none] cursor-pointer p-0 z-[1001] [&:focus]:[outline:none]"
        onClick={toggleMenu}
        aria-expanded={isOpen()}
        aria-label="Main Menu"
      >
        <span class={`${line} ${isOpen() ? "[transform:translateY(10px)_rotate(45deg)]" : ""}`} />
        <span class={`${line} ${isOpen() ? "opacity-0" : ""}`} />
        <span class={`${line} ${isOpen() ? "[transform:translateY(-10px)_rotate(-45deg)]" : ""}`} />
      </button>

      {/* Меню */}
      <nav
        class={`fixed top-0 w-full h-[100vh] bg-overlay [transition:right_var(--transition-speed)] flex flex-col items-end justify-center z-[999] min-768:w-[320px] ${
          isOpen() ? "right-0" : "right-[-100%]"
        }`}
      >
        <div class="z-[999] flex flex-col items-end pr-[var(--space-60)] w-full min-768:pr-[var(--space-40)]">
          <For each={props.items}>
            {(link) => {
              const isActive = props.currentPath === link.href || props.currentPath.startsWith(link.href);

              return (
                <a
                  href={link.href}
                  class={`text-fs-32 no-underline my-[var(--space-16)] [transition:opacity_var(--duration-fast)] hov:opacity-[0.8] ${
                    isActive ? "text-accent" : "text-white"
                  }`}
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
      <Show when={isOpen()}>
        <div class="fixed top-0 left-0 w-full h-full z-[99]" onClick={toggleMenu} />
      </Show>
    </div>
  );
};

export default BurgerMenu;
