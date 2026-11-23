import { defineConfig, presetIcons, presetWind4, type Variant } from "unocss";

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
  presets: [
    presetWind4({ preflights: { reset: false } }),
    // Icons are Tabler, drawn from @iconify-json/tabler; a box names one as `i-tabler-…`.
    presetIcons({
      scale: 1,
      extraProperties: { display: "inline-block", "vertical-align": "middle" },
    }),
  ],
  // Scan plain `.ts` too, where a box keeps its icon and menu data.
  content: { pipeline: { include: [/\.(astro|ts)($|\?)/] } },
  variants: [viewport, hov],
  theme: {
    // Colours and fonts are the tokens in src/app/styles/tokens.css.
    colors: {
      layout: "var(--color-layout)",
      white: "var(--color-text)",
      accent: "var(--color-accent)",
      sale: "var(--color-sale)",
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
  },
  // Layout only. Text sizes, weights and line heights are the typography components (src/components/typography);
  // a class here never sets them (src/app/tests/typography.test.ts checks it).
  shortcuts: {
    // Product lists (the regular and sale grids).
    "grid-toggle": "absolute top-[var(--space-20)] right-0 flex gap-[var(--space-4)]",
    "grid-toggle-button": "flex items-center justify-center w-[32px] h-[32px] p-0 border border-solid border-photo rounded-[var(--radius-small)] bg-white text-ink cursor-pointer [&[aria-pressed=true]]:bg-button [&[aria-pressed=true]]:text-white [&[aria-pressed=true]]:border-button",
    "list-title": "mt-[var(--space-20)]",
    "product-list": "w-full grid grid-cols-[1fr_1fr_1fr_1fr] gap-[var(--space-30)_var(--space-20)] my-[var(--space-20)] max-768:grid-cols-[1fr] max-768:gap-[var(--space-12)]",
    "landing": "[transition:var(--duration-slow)] pb-[var(--space-2)] w-full rounded-[var(--radius-tiny)] [&:active]:[opacity:0] [&:active]:[transform:scale(1.1)] hov:[box-shadow:var(--shadow-product-hover)]",
    "landing-name": "mt-[var(--space-4)] mb-[var(--space-12)] text-center text-ink-deep no-underline",
    "sale-name": "m-0 text-left text-ink-deep no-underline",
    "landing-img": "w-full h-auto aspect-[16/9] object-cover object-top",
    "landing-price-row": "flex justify-center items-center gap-[var(--space-4)]",
    "landing-old-price": "text-price-old line-through",
    "landing-price": "text-sale",

    // Product page (regular and sale items): the photo fills the screen, all the information is in the right column,
    // which scrolls by itself with the buttons fixed at its bottom. Below 900px: photo, then information, buttons stuck
    // above the 48px tab bar.
    "prod-page": "w-full grid grid-cols-[minmax(0,1fr)_minmax(360px,28vw)] h-[calc(100dvh-var(--header-height))] min-h-[560px] max-900:block max-900:h-auto max-900:min-h-0",
    "prod-aside": "box-border h-full min-h-0 flex flex-col bg-white max-900:h-auto",
    "prod-info": "flex-1 min-h-0 overflow-y-auto flex flex-col gap-[var(--space-20)] px-[var(--space-30)] pt-[var(--space-30)] pb-[var(--space-20)] max-900:overflow-visible max-900:px-[var(--space-12)] max-900:pt-[var(--space-16)]",
    "prod-head": "flex flex-col gap-[var(--space-4)] min-w-0",
    "prod-price-row": "flex flex-wrap items-center gap-[var(--space-8)_var(--space-12)]",
    "prod-badge": "px-[var(--space-8)] py-[var(--space-2)] bg-sale text-white rounded-[var(--radius-tiny)]",
    "prod-actions": "flex flex-col gap-[var(--space-8)] px-[var(--space-30)] py-[var(--space-16)] bg-white border-t border-t-solid border-t-photo max-900:sticky max-900:z-10 max-900:bottom-0 max-767:bottom-[46px] max-900:grid max-900:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-900:px-[var(--space-12)] max-900:py-[var(--space-8)]",
    "prod-fabrics": "grid grid-cols-[repeat(3,minmax(0,1fr))] gap-[var(--space-8)]",

    // Product photo gallery.
    "gal": "relative h-full min-w-0 overflow-hidden bg-layout max-900:h-auto",
    "gal-track": "flex h-full overflow-x-auto [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-900:w-full max-900:h-auto max-900:aspect-[var(--gal-ratio)] max-900:max-h-[75svh]",
    "gal-slide": "relative flex-[0_0_100%] min-w-0 h-full overflow-hidden [scroll-snap-align:start]",
    "gal-blur": "absolute inset-0 w-full h-full object-cover [filter:blur(24px)_brightness(0.9)] [transform:scale(1.15)]",
    "gal-img": "relative block w-full h-full object-contain",
    "gal-nav": "absolute z-10 top-[50%] [transform:translateY(-50%)] flex items-center justify-center w-[44px] h-[44px] p-0 border-0 rounded-[50%] bg-white text-ink [box-shadow:var(--shadow-tile)] cursor-pointer",
    "gal-count": "absolute z-10 right-[var(--space-12)] bottom-[var(--space-12)] px-[var(--space-8)] py-[var(--space-2)] bg-layout text-white rounded-[var(--radius-small)]",
    "gal-thumbs": "absolute z-10 left-[var(--space-12)] bottom-[var(--space-12)] max-w-[calc(100%-110px)] flex gap-[var(--space-8)] p-[var(--space-2)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-600:hidden",
    "gal-thumb": "flex-[0_0_72px] h-[48px] p-0 border-0 bg-transparent cursor-pointer opacity-70 [transition:var(--duration-fast)] [&[aria-current=true]]:opacity-100 [&[aria-current=true]]:[outline:2px_solid_var(--color-text)]",

    // Mattress list and mattress page.
    "mat-list": "w-full max-w-[1320px] py-[var(--space-30)] flex flex-col gap-[var(--space-30)]",
    "mat-group-title": "mt-0 mb-[var(--space-16)]",
    "mat-grid": "grid grid-cols-[repeat(4,minmax(0,1fr))] gap-[var(--space-20)] max-1200:grid-cols-[repeat(2,minmax(0,1fr))] max-600:grid-cols-[minmax(0,1fr)]",
    "mat-card": "flex flex-col bg-white text-ink-deep border border-solid border-photo [transition:var(--duration-base)] hov:[box-shadow:var(--shadow-tile-hover)]",
    "mat-card-img": "block w-full h-auto aspect-[10/9] object-cover object-top",
    "mat-card-footer": "flex items-center justify-between gap-[var(--space-12)] p-[var(--space-16)] border-t border-t-solid border-t-photo",
    "mat-page": "w-full max-w-[1320px] py-[var(--space-30)] grid grid-cols-[minmax(0,3fr)_minmax(300px,2fr)] items-start gap-[var(--space-50)] max-900:grid-cols-[minmax(0,1fr)] max-900:gap-[var(--space-20)] max-900:py-[var(--space-16)]",
    "mat-poster": "block w-full h-auto border border-solid border-photo box-border",
    // Desktop: the side column fills the screen, the name and buttons at its bottom. Below 900px the same block is a
    // panel in the poster's cell, stuck over it above the 48px tab bar; the poster's padding keeps its end uncovered.
    "mat-poster-box": "min-w-0 max-900:row-start-1 max-900:col-start-1 max-900:pb-[224px] max-767:pb-[192px]",
    "mat-aside": "sticky top-[calc(var(--header-height)+var(--space-30))] box-border h-[calc(100vh-var(--header-height)-var(--space-60))] flex flex-col justify-end gap-[var(--space-16)] max-900:h-auto max-900:top-auto max-900:row-start-1 max-900:col-start-1 max-900:self-end max-900:z-10 max-900:bottom-[var(--space-8)] max-767:bottom-[calc(48px+var(--space-8))] max-900:gap-[var(--space-8)] max-900:p-[var(--space-12)] max-900:bg-white max-900:[box-shadow:var(--shadow-tile-hover)]",
    "mat-actions": "flex flex-col gap-[var(--space-12)] max-900:grid max-900:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-900:gap-[var(--space-8)]",
    "mat-action": "box-border flex items-center justify-center w-full h-[52px] px-[var(--space-20)] no-underline cursor-pointer max-900:h-[44px] max-900:px-[var(--space-8)]",
    "mat-action-primary": "bg-button text-white max-900:col-span-2",
    "mat-action-outline": "bg-white border border-solid border-button text-ink",

    // Fabric pages.
    "textile-title": "block mb-[var(--space-8)] text-center",
    "textile-grid": "w-full my-[var(--space-30)] grid grid-cols-[repeat(4,minmax(0,1fr))] gap-[var(--space-16)] max-1200:grid-cols-[repeat(3,minmax(0,1fr))] max-600:grid-cols-[repeat(2,minmax(0,1fr))]",
    "textile-item": "relative text-center [transition:var(--duration-fast)] overflow-hidden",
    "textile-img": "w-full h-auto aspect-[1/1] object-cover",
    "textile-label": "absolute top-[75%] left-[50%] [transform:translate(-50%,-50%)] w-[85%] text-white max-550:text-p3",

    // Company contacts.
    "contacts-grid": "w-full grid grid-cols-[1fr_1fr_1fr] gap-[var(--space-30)] max-1200:grid-cols-[1fr] max-1200:gap-[var(--space-12)]",
    "contacts-wrapper": "mt-[var(--space-12)] mb-[var(--space-30)]",

    // Photo grid.
    "gallery-grid": "w-full py-[var(--space-12)] grid grid-cols-[1fr_1fr_1fr_1fr] gap-[var(--space-30)] max-1200:grid-cols-[1fr_1fr_1fr] max-1200:gap-[var(--space-12)] max-600:grid-cols-[1fr_1fr]",
    "gallery-img": "w-full h-auto aspect-[16/10] object-cover",

    // Site header and footer.
    "header-links": "flex flex-wrap items-center gap-[var(--space-40)] max-1500:gap-[var(--space-30)] max-1430:gap-[var(--space-30)] max-1400:gap-[var(--space-20)] max-1300:gap-[var(--space-16)] max-600:gap-[var(--space-12)]",
    "header-link": "[transition:all_0.3s_ease] whitespace-nowrap no-underline max-1050:hidden",
    "header-sale-size": "[padding:[var(--space-4)_var(--space-12)] rounded-[var(--radius-sale)] max-1430:[padding:[var(--space-4)_var(--space-12)] max-1300:[padding:[var(--space-4)_var(--space-12)]",
    "header-sale": "header-sale-size [background:linear-gradient(135deg,var(--color-sale)_0%,var(--color-sale-deep)_100%)] [box-shadow:var(--shadow-sale)] hov:[background:linear-gradient(135deg,var(--color-sale-bright)_0%,var(--color-sale-bright-deep)_100%)] hov:shadow-[var(--shadow-sale-hover)]",
    "header-sale-live": "header-sale-size [background:linear-gradient(135deg,var(--color-sale-bright)_0%,var(--color-sale-bright-deep)_100%)] [box-shadow:var(--shadow-sale-hover)]",
    "mobile-link": "flex flex-col items-center gap-[var(--space-2)] [padding:[var(--space-4)_var(--space-4)] rounded-[var(--radius-pill)] [transition:all_0.3s_ease] min-w-[50px]",
    "footer-link": "text-white no-underline [transition:color_0.2s_ease] hov:text-accent",
    "social-icon": "flex items-center justify-center w-[48px] h-[48px] max-767:w-[44px] max-767:h-[44px] rounded-[50%] bg-glass text-white [transition:all_0.3s_ease] no-underline hov:bg-accent hov:text-layout",

    // Printed catalogues.
    "catalogs-title": "mt-[var(--space-40)] w-[30%] text-center max-768:[margin:[var(--space-20)_auto] max-768:w-[90%]",
    "catalogs": "w-full flex flex-wrap gap-[10vw] [place-content:center] py-[var(--space-20)] my-[var(--space-20)]",
    "catalog": "pb-[var(--space-20)] flex justify-center flex-col",
    "catalog-link": "flex justify-center",
    "catalog-img": "[filter:var(--drop-catalog)] min-h-[240px] h-[360px] flex w-auto mb-[var(--space-12)] [transition:var(--duration-fast)] hov:[filter:var(--drop-catalog-hover)] hov:[transform:scale(1.02)] [&:active]:[transform:scale(1.1)] max-1500:h-[260px] max-1500:min-h-[260px] max-1200:h-[220px] max-1200:min-h-[220px]",
    "catalog-label": "block mx-auto text-center",

    // Image tiles: the collection index and the HoReCa segments.
    "tile-grid": "grid grid-cols-[1fr_1fr_1fr] w-full gap-0 p-0 mx-auto max-1024:grid-cols-[1fr]",
    "tile-link": "block no-underline",
    "tile": "relative w-full h-[82vh] min-h-[500px] overflow-hidden cursor-pointer flex justify-center items-center bg-scrim max-1024:h-auto max-1024:min-h-[250px] [&:hover_img]:[opacity:0.5] [&:hover_img]:[transform:scale(1.01)] [&:hover_img]:[filter:grayscale(0.5)]",
    "tile-img": "w-full h-full object-cover [opacity:0.85] [filter:grayscale(0.3)] [transition:opacity_250ms_linear,transform_250ms_linear] max-1024:h-[250px]",
    "tile-label": "absolute top-[50%] left-[50%] [transform:translate(-50%,-50%)] w-[75%] text-white text-center z-[1]",
  },
});
