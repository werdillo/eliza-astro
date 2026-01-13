import "../../assets/css/dropdown.css"
import { createSignal, Show, For } from 'solid-js';

const DropdownMenu = ({lang}) => {
  const [openStates, setOpenStates] = createSignal({
    products: false,
    collections: false,
    components: false
  });

  const [timeoutIds, setTimeoutIds] = createSignal({
    products: null,
    collections: null,
    components: null
  });

  const menuData = {
    collections: [
      {
        title: 'Bbold',
        description: 'Современная дизайнерская коллекция',
        href: '/collection/bbold'
      },
      {
        title: 'Basic',
        description: 'Базовая коллекция мебели',
        href: '/collection/basic'
      },
      {
        title: 'Sophisticated living',
        description: 'Премиальная коллекция для изысканного интерьера',
        href: '/collection/sophisticated'
      }
    ],
    components: [
      {
        title: 'Поролон',
        description: 'Высококачественные наполнители',
        href: '/components/foam'
      },
      {
        title: 'Ткани',
        description: 'Разнообразные варианты обивки',
        href: '/textile'
      }
    ],
    language: [
      {
        title: 'LV',
        description: 'Высококачественные наполнители',
        href: '/components/foam'
      },
      {
        title: 'RU',
        description: 'Высококачественные наполнители',
        href: '/components/foam'
      },
      {
        title: 'EN',
        description: 'Высококачественные наполнители',
        href: '/components/foam'
      },
    ]
  };

  const handleMouseEnter = (dropdownId) => {
    const newOpenStates = {
      products: false,
      collections: false,
      components: false,
      [dropdownId]: true
    };
    
    Object.keys(timeoutIds()).forEach(id => {
      if (timeoutIds()[id]) {
        clearTimeout(timeoutIds()[id]);
      }
    });

    setTimeoutIds({
      products: null,
      collections: null,
      components: null
    });

    setOpenStates(newOpenStates);
  };

  const handleMouseLeave = (dropdownId) => {
    const timeout = setTimeout(() => {
      const dropdown = document.querySelector(`.dropdown-${dropdownId}`);
      const isHovered = dropdown.matches(':hover');
      if (!isHovered) {
        setOpenStates({ ...openStates(), [dropdownId]: false });
      }
    }, 100);

    setTimeoutIds({ ...timeoutIds(), [dropdownId]: timeout });
  };

  const DropdownButton = ({ id, label }) => (
    <div
      class={`dropdown dropdown-${id}`}
      onMouseEnter={() => handleMouseEnter(id)}
      onMouseLeave={() => handleMouseLeave(id)}
    >
      <div
        // onClick={() => {
        //   const newOpenStates = {
        //     products: false,
        //     collections: false,
        //     components: false,
        //     [id]: !openStates()[id]
        //   };
        //   setOpenStates(newOpenStates);
        // }}
        class={`dropdown-button ${openStates()[id] ? 'active' : ''}`}
      >
        {label}
        <svg
          class={`dropdown-arrow ${openStates()[id] ? 'rotate' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
      <Show when={openStates()[id]}>
        <div
          class="dropdown-menu"
          onMouseEnter={() => handleMouseEnter(id)}
          onMouseLeave={() => handleMouseLeave(id)}
        >
          <div class="menu-items">
            <For each={menuData[id]}>
              {(item) => (
                <a href={"/" + lang + item.href} class="menu-item">
                  <div class="item-title">{item.title}</div>
                  <div class="item-description">{item.description}</div>
                </a>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );

  return (
    <div class="dropdowns-container">
      <DropdownButton id="collections" label="Коллекции" />
      <DropdownButton id="components" label="Компоненты" />
    </div>
  );
};

export default DropdownMenu;