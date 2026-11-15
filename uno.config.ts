import { defineConfig, presetWind4, type Variant } from "unocss";

/**
 * `max-600:` and `min-768:` are the old `@media (max-width: 600px)` and `@media (min-width: 768px)`,
 * with the same px value and the same inclusive edge. Wider `max-` rules are emitted first, so the
 * narrower ones win, as they did in the old cascade.
 */
const viewport: Variant = {
  name: "viewport",
  match(matcher) {
    const m = /^(min|max)-(\d+):/.exec(matcher);
    if (!m) return;
    const [prefix, kind, px] = m;
    return {
      matcher: matcher.slice(prefix.length),
      handle: (input, next) =>
        next({
          ...input,
          parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (${kind}-width: ${px}px)`,
          // Above every plain rule (order 0): a media rule overrides its base utility, as in the old cascade.
          parentOrder: kind === "max" ? 1_000_000 - Number(px) : 2_000_000 + Number(px),
        }),
    };
  },
};

/**
 * `hov:` is a plain `:hover`. The built-in `hover:` only applies under `(hover: hover)`, which the old
 * rules did not require.
 */
const hov: Variant = {
  name: "hov",
  match(matcher) {
    if (!matcher.startsWith("hov:")) return;
    return {
      matcher: matcher.slice(4),
      handle: (input, next) => next({ ...input, selector: `${input.selector || ""}:hover` }),
    };
  },
};

export default defineConfig({
  presets: [presetWind4({ preflights: { reset: false } })],
  variants: [viewport, hov],
  // The font-size scale: `text-fs-14` is 14px. Numbered names keep Wind4 from reading them as spacing.
  rules: [[/^text-fs-(\d+)$/, ([, size]) => ({ "font-size": `${size}px` })]],
  // Scan the sources, not only the modules the server build renders: `client:only` islands never
  // render on the server, so their classes would otherwise get no CSS.
  content: { filesystem: ["src/**/*.{astro,ts,tsx}"] },
  theme: {
    // Colours and fonts are the tokens in src/app/styles/tokens.css.
    colors: {
      layout: "var(--color-layout)",
      white: "var(--color-text)",
      accent: "var(--color-accent)",
      sale: "var(--color-sale)",
      skeleton: "var(--color-skeleton)",
      ink: "var(--color-ink)",
      "ink-deep": "var(--color-ink-deep)",
      "price-old": "var(--color-price-old)",
      orange: "var(--color-orange)",
      bar: "var(--color-bar)",
      overlay: "var(--color-overlay)",
      glass: "var(--color-glass)",
      "glass-strong": "var(--color-glass-strong)",
      "glass-soft": "var(--color-glass-soft)",
      dropdown: "var(--color-dropdown)",
      rule: "var(--color-rule)",
      button: "var(--color-button)",
      photo: "var(--color-photo)",
      scrim: "var(--color-scrim)",
      "scrim-60": "var(--color-scrim-60)",
      highlight: "var(--color-highlight)",
    },
    font: {
      avenir: "var(--font-avenir)",
      body: "var(--font-body)",
    },

  },
  shortcuts: {
    // Loading placeholders: the islands show them until their records arrive.
    "skeleton": "bg-skeleton w-full h-auto aspect-[16/10]",
    "skeleton-slider": "bg-skeleton w-full h-auto aspect-[16/9]",
    "skeleton-textile": "bg-skeleton w-full h-auto aspect-[1/1]",
    "skeleton-title": "bg-skeleton w-full h-[35px] max-w-[150px] my-[var(--space-8)] rounded-[var(--radius-tiny)] aspect-[16/10]",
    "skeleton-title-wide": "bg-skeleton w-full h-[35px] max-w-full my-[var(--space-8)] rounded-[var(--radius-tiny)] aspect-[16/10]",
    "skeleton-row": "bg-skeleton w-full h-[24px] max-w-[900px] my-[var(--space-4)] rounded-[var(--radius-tiny)] aspect-[16/10]",
    "skeleton-button": "bg-skeleton w-full h-[60px] aspect-[16/10] max-600:h-[50px] max-600:w-[60%] max-600:text-fs-24 max-600:mb-[var(--space-20)]",

    // Product lists (the regular, sale and mattress grids).
    "list-title": "text-fs-28 mt-[var(--space-20)] font-bold",
    "product-list": "w-full grid grid-cols-[1fr_1fr_1fr_1fr] gap-[var(--space-30)_var(--space-20)] my-[var(--space-20)] max-768:grid-cols-[1fr] max-768:gap-[var(--space-12)]",
    "landing": "[transition:var(--duration-slow)] pb-[var(--space-2)] w-full rounded-[var(--radius-tiny)] [&:active]:[opacity:0] [&:active]:[transform:scale(1.1)] hov:[box-shadow:var(--shadow-product-hover)]",
    "landing-name": "mt-[var(--space-4)] mb-[var(--space-12)] font-avenir text-center text-ink-deep no-underline",
    "sale-name": "m-0 font-avenir text-left text-ink-deep no-underline",
    "landing-img": "w-full h-auto aspect-[16/9] object-cover object-top",
    "landing-price-row": "flex justify-center items-center gap-[var(--space-4)]",
    "landing-old-price": "font-avenir text-fs-14 text-price-old line-through",
    "landing-price": "font-avenir text-fs-18 font-semibold text-sale",

    // Product page.
    "product-item": "grid mb-[var(--space-4)] grid-cols-[65%_1fr] gap-[var(--space-20)] w-[100vw] max-1200:grid-cols-[1fr]",
    "product-swiper": "max-w-[65vw] max-1200:max-w-[100vw]",
    "product-slider": "w-full aspect-[16/9] object-cover",
    "product-right": "flex flex-col justify-end gap-[var(--space-16)] px-[var(--space-50)] max-600:px-[var(--space-8)]",
    "product-title": "text-fs-48 font-bold",
    "product-price-row": "flex items-center gap-[var(--space-12)]",
    "product-price": "font-avenir text-fs-36 font-bold text-sale",
    "product-old-price": "font-avenir text-fs-24 text-price-old line-through",
    "product-button": "min-w-[140px] h-[40px] [padding:[0_var(--space-20)] mt-[var(--space-4)] bg-button text-white [border:0] text-fs-18 cursor-pointer",
    "product-button-xl": "min-w-[140px] h-[60px] w-full [padding:[0_var(--space-20)] mt-[var(--space-4)] bg-button text-white [border:0] text-fs-24 cursor-pointer max-600:h-[50px] max-600:w-[60%]",
    "product-card": "flex flex-col box-border gap-[var(--space-20)] min-h-[300px] py-[var(--space-30)] px-[var(--space-50)] max-600:p-[var(--space-8)]",
    "product-textile": "grid grid-cols-[1fr_1fr_1fr] gap-[var(--space-20)]",
    "product-heading": "font-avenir font-bold text-fs-32 max-600:text-fs-24",
    "product-text": "font-avenir font-normal text-fs-18 max-600:text-fs-14",

    // Fabric pages.
    "textile-title": "inline-block text-fs-48 mb-[var(--space-30)] mt-[var(--space-40)] max-550:text-fs-24 max-550:mb-[var(--space-16)] max-550:mt-[var(--space-30)]",
    "textile-grid": "grid grid-cols-[1fr_1fr_1fr_1fr] gap-[var(--space-16)] max-1200:grid-cols-[1fr_1fr_1fr] max-600:grid-cols-[1fr_1fr]",
    "textile-item": "relative text-center [transition:var(--duration-fast)] overflow-hidden",
    "textile-img": "w-full h-auto aspect-[1/1] object-cover",
    "textile-label": "absolute top-[75%] left-[50%] [transform:translate(-50%,-50%)] w-[85%] font-avenir text-fs-36 text-white max-550:text-fs-16",

    // Company contacts.
    "contacts-grid": "w-full grid grid-cols-[1fr_1fr_1fr] gap-[var(--space-30)] max-1200:grid-cols-[1fr] max-1200:gap-[var(--space-12)]",
    "contacts-wrapper": "mt-[var(--space-12)] mb-[var(--space-30)]",
    "contact-text": "font-avenir font-medium text-fs-20 max-1000:text-fs-16",
    "contact-title": "font-avenir font-bold text-fs-26 max-1000:text-fs-24",
    "contact-event": "font-avenir text-fs-20 max-1000:text-fs-16 text-sale font-bold",

    // Photo grid.
    "gallery-grid": "w-full py-[var(--space-12)] grid grid-cols-[1fr_1fr_1fr_1fr] gap-[var(--space-30)] max-1200:grid-cols-[1fr_1fr_1fr] max-1200:gap-[var(--space-12)] max-600:grid-cols-[1fr_1fr]",
    "gallery-img": "w-full h-auto aspect-[16/10] object-cover",

    // Site header and footer.
    "header-links": "flex flex-wrap items-center gap-[var(--space-40)] max-1500:gap-[var(--space-30)] max-1430:gap-[var(--space-30)] max-1400:gap-[var(--space-20)] max-1300:gap-[var(--space-16)] max-600:gap-[var(--space-12)]",
    "header-link": "text-fs-14 [transition:all_0.3s_ease] whitespace-nowrap no-underline max-1500:text-fs-14 max-1430:text-fs-13 max-1400:text-fs-12 max-1300:text-fs-11 max-1050:hidden",
    "header-sale-size": "[padding:[var(--space-4)_var(--space-12)] rounded-[var(--radius-sale)] font-semibold max-1430:[padding:[var(--space-4)_var(--space-12)] max-1300:[padding:[var(--space-4)_var(--space-12)]",
    "header-sale": "header-sale-size [background:linear-gradient(135deg,var(--color-sale)_0%,var(--color-sale-deep)_100%)] [box-shadow:var(--shadow-sale)] hov:[background:linear-gradient(135deg,var(--color-sale-bright)_0%,var(--color-sale-bright-deep)_100%)] hov:shadow-[var(--shadow-sale-hover)]",
    "header-sale-live": "header-sale-size [background:linear-gradient(135deg,var(--color-sale-bright)_0%,var(--color-sale-bright-deep)_100%)] [box-shadow:var(--shadow-sale-hover)]",
    "mobile-link": "flex flex-col items-center gap-[var(--space-2)] [padding:[var(--space-4)_var(--space-4)] rounded-[var(--radius-pill)] [transition:all_0.3s_ease] min-w-[50px] no-underline",
    "mobile-link-text": "text-fs-10 font-medium text-center leading-[1.2] max-380:text-fs-10",
    "footer-link": "text-white no-underline font-medium [transition:color_0.2s_ease] hov:text-accent",
    "social-icon": "flex items-center justify-center w-[48px] h-[48px] max-767:w-[44px] max-767:h-[44px] rounded-[50%] bg-glass text-white [transition:all_0.3s_ease] no-underline hov:bg-accent hov:text-layout",

    // Printed catalogues.
    "catalogs-title": "text-fs-36 w-[30%] mt-[var(--space-40)] text-center font-avenir font-medium max-768:text-fs-16 max-768:[margin:[var(--space-20)_auto] max-768:w-[90%]",
    "catalogs": "w-full flex flex-wrap gap-[10vw] [place-content:center] py-[var(--space-20)] my-[var(--space-20)]",
    "catalog": "pb-[var(--space-20)] flex justify-center flex-col",
    "catalog-link": "flex justify-center",
    "catalog-img": "[filter:var(--drop-catalog)] min-h-[240px] h-[360px] flex w-auto mb-[var(--space-12)] [transition:var(--duration-fast)] hov:[filter:var(--drop-catalog-hover)] hov:[transform:scale(1.02)] [&:active]:[transform:scale(1.1)] max-1500:h-[260px] max-1500:min-h-[260px] max-1200:h-[220px] max-1200:min-h-[220px]",
    "catalog-label": "block mx-auto text-center font-avenir text-fs-16",

    // Image tiles: the collection index and the HoReCa segments.
    "tile-grid": "grid grid-cols-[1fr_1fr_1fr] w-full gap-0 p-0 mx-auto max-1024:grid-cols-[1fr]",
    "tile-link": "block no-underline",
    "tile": "relative w-full h-[82vh] min-h-[500px] overflow-hidden cursor-pointer flex justify-center items-center bg-scrim max-1024:h-auto max-1024:min-h-[250px] [&:hover_img]:[opacity:0.5] [&:hover_img]:[transform:scale(1.01)] [&:hover_img]:[filter:grayscale(0.5)]",
    "tile-img": "w-full h-full object-cover [opacity:0.85] [filter:grayscale(0.3)] [transition:opacity_250ms_linear,transform_250ms_linear] max-1024:h-[250px]",
    "tile-label": "absolute top-[50%] left-[50%] [transform:translate(-50%,-50%)] w-[75%] text-white font-avenir text-fs-48 text-center z-[1] max-1024:text-fs-32",
  },
});
