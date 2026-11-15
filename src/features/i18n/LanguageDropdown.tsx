import { createSignal, Show, onMount, onCleanup, For } from "solid-js";
import type { Component } from "solid-js";

interface Language {
  code: string;
  title: string;
}

interface Props {
  currentLang: string;
  currentPath: string;
}

const languages: Language[] = [
  { code: "en", title: "English" },
  { code: "lv", title: "Latviešu" },
  { code: "ru", title: "Русский" },
];

const LanguageDropdown: Component<Props> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [isAnimatingOut, setIsAnimatingOut] = createSignal(false);

  let dropdownRef: HTMLDivElement | undefined;

  const availableLanguages = () =>
    languages.filter((lang) => lang.code !== props.currentLang);

  const closeDropdown = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimatingOut(false);
    }, 200);
  };

  const toggleDropdown = () => {
    if (isOpen()) {
      closeDropdown();
    } else {
      setIsOpen(true);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (isOpen() && dropdownRef && !dropdownRef.contains(e.target as Node)) {
      closeDropdown();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isOpen() && e.key === "Escape") {
      closeDropdown();
    }
  };

  const getLanguageUrl = (langCode: string) => {
    if (typeof window === "undefined") return "#";

    const { pathname, search, hash } = window.location;
    const pathParts = pathname.split("/");
    pathParts[1] = langCode;
    return `${pathParts.join("/")}${search}${hash}`;
  };

  onMount(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
  });

  onCleanup(() => {
    if (typeof document !== "undefined") {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }
  });

  return (
    <div class="relative inline-block" ref={dropdownRef}>
      <button
        class={`inline-flex items-center [border:0] px-[var(--space-12)] py-[var(--space-8)] text-fs-16 font-normal text-white bg-glass rounded-[var(--radius-small)] cursor-pointer [transition:all_0.2s_ease] hov:bg-glass-strong [&:focus]:[outline:none] ${isOpen() ? "bg-glass-strong" : ""}`}
        onClick={toggleDropdown}
        aria-expanded={isOpen()}
        aria-haspopup="menu"
      >
        {props.currentLang.toUpperCase()}
        <svg
          class={`w-[16px] h-[16px] ml-[var(--space-4)] opacity-[0.8] [transition:transform_0.2s_ease] ${isOpen() ? "[transform:rotate(180deg)]" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <Show when={isOpen()}>
        <div
          class={`absolute right-0 mt-[var(--space-8)] w-[100px] bg-dropdown rounded-[var(--radius-small)] [box-shadow:var(--shadow-dropdown)] [border:1px_solid_var(--color-glass)] z-50 [transform-origin:top_right] block ${
            isAnimatingOut() ? "[animation:slideUp_0.2s_ease-out_forwards]" : "[animation:slideDown_0.2s_ease-out_forwards]"
          }`}
        >
          <div class="py-[var(--space-4)]">
            <For each={availableLanguages()}>
              {(lang) => (
                <a
                  href={getLanguageUrl(lang.code)}
                  class="block px-[var(--space-12)] py-[var(--space-8)] no-underline [transition:background-color_0.2s_ease] text-white hov:bg-glass"
                >
                  <div class="text-fs-14 font-normal text-white mb-[var(--space-2)]">{lang.title}</div>
                </a>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default LanguageDropdown;
