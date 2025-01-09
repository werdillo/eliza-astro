
import { createSignal, Show } from 'solid-js';
import type { Component } from 'solid-js';
import "../../assets/css/LanguageDropdown.css"

interface Language {
  code: string;
  title: string;
  description: string;
}

interface Props {
  currentLang: string;
  currentPath: string;
}

const languages: Language[] = [
  {
    code: 'en',
    title: 'English',
    description: 'United States'
  },
  {
    code: 'lv',
    title: 'Latviešu',
    description: 'Latvija'
  },
  {
    code: 'ru',
    title: 'Русский',
    description: 'Россия'
  }
];

const LanguageDropdown: Component<Props> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [isAnimatingOut, setIsAnimatingOut] = createSignal(false);

  // Фильтруем текущий язык из списка
  const availableLanguages = () => 
    languages.filter(lang => lang.code !== props.currentLang);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimatingOut(false);
    }, 200);
  };

  const toggleDropdown = () => {
    if (isOpen()) {
      handleClose();
    } else {
      setIsOpen(true);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    const dropdown = document.getElementById('langDropdown');
    if (isOpen() && dropdown && !dropdown.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isOpen() && e.key === 'Escape') {
      handleClose();
    }
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
  }

  return (
    <div class="dropdown" id="langDropdown">
      <button 
        class={`dropdown-button ${isOpen() ? 'active' : ''}`}
        onClick={toggleDropdown}
        aria-expanded={isOpen()}
      >
        {props.currentLang.toUpperCase()}
        <svg
          class={`dropdown-arrow ${isOpen() ? 'rotate' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <Show when={isOpen()}>
        <div class={`dropdown-menu ${isAnimatingOut() ? 'hiding' : 'show'}`}>
          <div class="menu-items">
            {availableLanguages().map(lang => (
              <a
                href={`/${lang.code}${props.currentPath.substring(3)}`}
                class="menu-item"
              >
                <div class="item-title">{lang.title}</div>
                <div class="item-description">{lang.description}</div>
              </a>
            ))}
          </div>
        </div>
      </Show>
    </div>
  );
};

export default LanguageDropdown;