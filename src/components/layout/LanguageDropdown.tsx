import { createSignal, Show, onMount, onCleanup, For } from "solid-js";
import type { Component } from "solid-js";
import "../../assets/css/LanguageDropdown.css";

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
    isOpen() ? closeDropdown() : setIsOpen(true);
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
    <div class="dropdown" ref={dropdownRef}>
      <button
        class={`dropdown-button ${isOpen() ? "active" : ""}`}
        onClick={toggleDropdown}
        aria-expanded={isOpen()}
        aria-haspopup="menu"
      >
        {props.currentLang.toUpperCase()}
        <svg
          class={`dropdown-arrow ${isOpen() ? "rotate" : ""}`}
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
        <div class={`dropdown-menu ${isAnimatingOut() ? "hiding" : "show"}`}>
          <div class="menu-items">
            <For each={availableLanguages()}>
              {(lang) => (
                <a href={getLanguageUrl(lang.code)} class="menu-item">
                  <div class="item-title">{lang.title}</div>
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
