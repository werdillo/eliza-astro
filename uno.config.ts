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
  // Made by the catalogue reader's script, which is loaded on demand and so is not scanned during the build.
  safelist: ["zoom-swiper", "zoom-box", "zoom-slide", "zoom-spinner", "zoom-photo", "i-tabler-loader-2", "pdf-view-slide", "pdf-view-sheet", "pdf-view-canvas", "pdf-view-thumb"],
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
    // The sale category bar: chips scroll sideways, the 3/4 (1/2) toggle stands at its right edge.
    "sale-nav": "sticky z-20 top-[var(--header-height)] max-768:top-[var(--header-height-mobile)] flex items-center gap-[var(--space-12)] py-[var(--space-8)] bg-white border-b border-b-solid border-b-photo [&>.grid-toggle]:static [&>.grid-toggle]:shrink-0",
    "sale-nav-chips": "relative flex-1 min-w-0 flex gap-[var(--space-4)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    "sale-nav-chip": "shrink-0 box-border flex items-center gap-[var(--space-4)] h-[32px] max-768:h-[36px] px-[var(--space-8)] whitespace-nowrap no-underline text-ink border border-solid border-photo rounded-[var(--radius-small)] bg-white hov:border-button [&[aria-current=true]]:bg-button [&[aria-current=true]]:text-white [&[aria-current=true]]:border-button",
    "sale-nav-section": "w-full scroll-mt-[calc(var(--header-height)+49px)] max-768:scroll-mt-[calc(var(--header-height-mobile)+53px)]",
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
    "gal-track": "block h-full overflow-hidden max-900:w-full max-900:h-auto max-900:aspect-[var(--gal-ratio)] max-900:max-h-[75svh]",
    "gal-slide": "relative w-full h-full overflow-hidden",
    "gal-blur": "absolute inset-0 w-full h-full object-cover [filter:blur(24px)_brightness(0.9)] [transform:scale(1.15)]",
    "gal-img": "relative block w-full h-full object-contain",
    "gal-nav": "absolute z-10 top-[50%] [transform:translateY(-50%)] flex items-center justify-center w-[44px] h-[44px] p-0 border-0 rounded-[50%] bg-white text-ink [box-shadow:var(--shadow-tile)] cursor-pointer",
    "gal-count": "absolute z-10 right-[var(--space-12)] bottom-[var(--space-12)] px-[var(--space-8)] py-[var(--space-2)] bg-layout text-white rounded-[var(--radius-small)]",
    "gal-thumbs": "absolute z-10 left-[var(--space-12)] bottom-[var(--space-12)] max-w-[calc(100%-110px)] flex gap-[var(--space-8)] p-[var(--space-2)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-600:hidden",
    "gal-thumb": "flex-[0_0_72px] h-[48px] p-0 border-0 bg-transparent cursor-pointer opacity-70 [transition:var(--duration-fast)] [&[aria-current=true]]:opacity-100 [&[aria-current=true]]:[outline:2px_solid_var(--color-text)]",

    // Fullscreen photo viewer with zoom.
    "zoom-target": "cursor-zoom-in",
    "zoom-open": "absolute z-10 top-[var(--space-12)] right-[var(--space-12)] flex items-center justify-center w-[44px] h-[44px] p-0 border-0 rounded-[50%] bg-white text-ink [box-shadow:var(--shadow-tile)] cursor-pointer",
    "zoom-dialog": "fixed inset-0 w-[100vw] h-[100dvh] max-w-none max-h-none m-0 p-0 border-0 overflow-hidden bg-[#000000eb] text-white [&::backdrop]:bg-[#000000eb]",
    "zoom-stage": "absolute inset-0 overflow-hidden select-none",
    "zoom-swiper": "block w-full h-full",
    "zoom-box": "flex items-center justify-center w-full h-full",
    "zoom-slide": "relative w-full h-full overflow-hidden [&[data-loaded]_img]:opacity-100 [&[data-loaded]_.zoom-spinner]:hidden",
    "zoom-spinner": "absolute left-[50%] top-[50%] ml-[-16px] mt-[-16px] w-[32px] h-[32px] text-white animate-spin",
    "zoom-photo": "block max-w-none max-h-none opacity-0 [transition:opacity_200ms,transform_300ms]",
    "zoom-button": "absolute z-10 flex items-center justify-center w-[44px] h-[44px] p-0 border-0 rounded-[50%] bg-white text-ink cursor-pointer [&[hidden]]:hidden",
    "zoom-side": "top-[50%] [transform:translateY(-50%)]",
    "zoom-count": "absolute z-10 left-[50%] bottom-[var(--space-12)] [transform:translateX(-50%)] px-[var(--space-8)] py-[var(--space-2)] bg-layout text-white rounded-[var(--radius-small)] [&[hidden]]:hidden",

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
    "textile-grid": "w-full my-[var(--space-30)] grid grid-cols-[repeat(4,minmax(0,1fr))] gap-[var(--space-16)] max-1200:grid-cols-[repeat(3,minmax(0,1fr))] max-600:grid-cols-[repeat(2,minmax(0,1fr))]",
    "textile-item": "relative text-center [transition:var(--duration-fast)] overflow-hidden",
    "textile-img": "block w-full h-auto aspect-[1/1] object-cover",
    "textile-caption": "absolute inset-0 box-border flex flex-col items-center justify-center gap-[var(--space-4)] p-[var(--space-12)] text-center text-white [text-shadow:0_1px_8px_var(--color-scrim-60)] [overflow-wrap:anywhere]",

    // Company contacts.
    "contact-page": "w-full grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] max-900:grid-cols-[minmax(0,1fr)]",
    "contact-list": "box-border flex flex-col gap-[var(--space-30)] p-[var(--space-40)] max-900:order-2 max-900:p-[var(--space-16)] max-900:pb-[var(--space-30)]",
    "contact-item": "flex flex-col gap-[var(--space-8)] pt-[var(--space-30)] border-0 border-t border-solid border-[var(--color-photo)] max-900:pt-[var(--space-20)]",
    "contact-links": "flex flex-col gap-[var(--space-4)] [&_a]:underline [&_a]:underline-offset-3",
    "contact-hours": "flex flex-col gap-[var(--space-2)] mt-[var(--space-8)] text-price-old",
    "contact-actions": "flex flex-wrap gap-[var(--space-8)] mt-[var(--space-12)]",
    "contact-action": "box-border inline-flex items-center justify-center min-h-[44px] px-[var(--space-16)] bg-white border border-solid border-button text-ink cursor-pointer no-underline aria-pressed:bg-button aria-pressed:text-white",
    "contact-map": "sticky top-[var(--header-height)] h-[calc(100svh-var(--header-height))] max-900:static max-900:order-1 max-900:h-[45svh]",
    "contact-frame": "block w-full h-full border-0",

    // Photo grid.
    "gallery-grid": "w-full py-[var(--space-12)] grid grid-cols-[1fr_1fr_1fr_1fr] gap-[var(--space-30)] max-1200:grid-cols-[1fr_1fr_1fr] max-1200:gap-[var(--space-12)] max-600:grid-cols-[1fr_1fr]",
    "gallery-open": "block w-full p-0 border-0 bg-transparent cursor-zoom-in",
    "gallery-img": "block w-full h-auto aspect-[16/10] object-cover",

    // Site header and footer.
    "header-links": "flex flex-wrap items-center gap-[var(--space-40)] max-1500:gap-[var(--space-30)] max-1430:gap-[var(--space-30)] max-1400:gap-[var(--space-20)] max-1300:gap-[var(--space-16)] max-600:gap-[var(--space-12)]",
    "header-link": "[transition:color_0.3s_ease,box-shadow_0.3s_ease] whitespace-nowrap no-underline max-1050:hidden",
    "header-sale-size": "[padding:var(--space-4)_var(--space-12)] rounded-[var(--radius-sale)] max-1430:[padding:var(--space-4)_var(--space-12)] max-1300:[padding:var(--space-4)_var(--space-12)]",
    "header-sale": "header-sale-size [background:linear-gradient(135deg,var(--color-sale)_0%,var(--color-sale-deep)_100%)] [box-shadow:var(--shadow-sale)] hov:[background:linear-gradient(135deg,var(--color-sale-bright)_0%,var(--color-sale-bright-deep)_100%)] hov:shadow-[var(--shadow-sale-hover)]",
    "header-sale-live": "header-sale-size [background:linear-gradient(135deg,var(--color-sale-bright)_0%,var(--color-sale-bright-deep)_100%)] [box-shadow:var(--shadow-sale-hover)]",
    "mobile-link": "flex flex-col items-center gap-[var(--space-2)] [padding:var(--space-4)_var(--space-4)] rounded-[var(--radius-pill)] [transition:all_0.3s_ease] min-w-[50px]",
    "footer-link": "text-white no-underline [transition:color_0.2s_ease] hov:text-accent",
    "social-icon": "flex items-center justify-center w-[48px] h-[48px] max-767:w-[44px] max-767:h-[44px] rounded-[50%] bg-glass text-white [transition:all_0.3s_ease] no-underline hov:bg-accent hov:text-layout",

    // Printed catalogues.
    "catalogs-title": "mt-[var(--space-40)] w-[30%] text-center max-768:[margin:var(--space-20)_auto] max-768:w-[90%]",
    "catalogs": "w-full flex flex-wrap gap-[10vw] [place-content:center] py-[var(--space-20)] my-[var(--space-20)]",
    "catalog": "pb-[var(--space-20)] flex justify-center flex-col",
    "catalog-link": "flex justify-center",
    "catalog-img": "[filter:var(--drop-catalog)] min-h-[240px] h-[360px] flex w-auto mb-[var(--space-12)] [transition:var(--duration-fast)] hov:[filter:var(--drop-catalog-hover)] hov:[transform:scale(1.02)] [&:active]:[transform:scale(1.1)] max-1500:h-[260px] max-1500:min-h-[260px] max-1200:h-[220px] max-1200:min-h-[220px]",
    "catalog-label": "block mx-auto text-center",
    // The catalogue reader: a dark full-screen room, the pages are the only light thing in it.
    "pdf-view": "fixed inset-0 w-[100vw] h-[100dvh] max-w-none max-h-none m-0 p-0 border-0 overflow-hidden bg-[#1c1c1c] text-white [&[open]]:flex [&[open]]:flex-col [&::backdrop]:bg-[#1c1c1c]",
    "pdf-view-bar": "shrink-0 flex items-center gap-[var(--space-12)] h-[56px] px-[var(--space-12)] max-768:h-[48px] max-768:px-[var(--space-8)]",
    "pdf-view-title": "m-0 flex-1 min-w-0 truncate max-768:hidden",
    "pdf-view-counter": "m-0 flex items-center gap-[var(--space-4)] whitespace-nowrap max-768:flex-1",
    "pdf-view-input": "box-border w-[72px] h-[32px] px-[var(--space-4)] text-center text-white bg-[var(--color-glass)] border-0 rounded-[var(--radius-small)] focus:outline-none focus:bg-[var(--color-glass-strong)]",
    "pdf-view-tools": "flex-1 flex items-center justify-end gap-[var(--space-4)] max-768:flex-none",
    "pdf-view-tool": "flex items-center justify-center w-[40px] h-[40px] p-0 border-0 rounded-[var(--radius-small)] bg-transparent text-white cursor-pointer no-underline hov:bg-[var(--color-glass)] [&[hidden]]:hidden",
    "pdf-view-full": "[&>.pdf-view-full-off]:hidden [[data-fullscreen]_&>.pdf-view-full-on]:hidden [[data-fullscreen]_&>.pdf-view-full-off]:block",
    "pdf-view-stage": "relative flex-1 min-h-0 overflow-hidden select-none [touch-action:none] cursor-default",
    "pdf-view-track": "flex w-full h-full [will-change:transform]",
    "pdf-view-slide": "flex-[0_0_100%] min-w-0 h-full flex items-center justify-center overflow-hidden",
    "pdf-view-sheet": "shrink-0 flex bg-white [box-shadow:0_8px_32px_rgba(0,0,0,0.5)] [will-change:transform]",
    "pdf-view-canvas": "block h-full",
    "pdf-view-nav": "absolute z-10 top-[50%] [transform:translateY(-50%)] flex items-center justify-center w-[44px] h-[44px] p-0 border-0 rounded-[50%] bg-white text-ink [box-shadow:var(--shadow-tile)] cursor-pointer disabled:opacity-0 disabled:pointer-events-none max-768:hidden",
    "pdf-view-state": "absolute inset-0 z-20 flex flex-col items-center justify-center gap-[var(--space-12)] p-[var(--space-20)] text-center bg-[#1c1c1c] [&[hidden]]:hidden",
    "pdf-view-spinner": "w-[32px] h-[32px] animate-spin motion-reduce:animate-none",
    "pdf-view-fallback": "px-[var(--space-20)] py-[var(--space-8)] bg-white text-ink no-underline rounded-[var(--radius-small)]",
    "pdf-view-thumbs": "relative shrink-0 flex gap-[var(--space-8)] h-[84px] box-border px-[var(--space-12)] py-[var(--space-8)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-768:hidden",
    "pdf-view-thumb": "shrink-0 flex h-full p-0 border-0 bg-[#3a3a3a] cursor-pointer opacity-50 overflow-hidden [transition:opacity_var(--duration-fast)] hov:opacity-100 [&[aria-current=true]]:opacity-100 [&[aria-current=true]]:[outline:2px_solid_white]",
    "pdf-view-range": "hidden max-768:block shrink-0 w-[calc(100%-32px)] mx-auto my-[var(--space-8)] h-[28px] accent-white",

    // The "About us" page: an airy centred layout in the site's colours and type.
    "about": "w-full bg-white text-ink",
    "about-section": "box-border w-full max-w-[1280px] mx-auto px-[80px] py-[96px] max-1024:px-[var(--space-40)] max-1024:py-[var(--space-70)] max-600:px-[var(--space-16)] max-600:py-[var(--space-50)]",
    "about-hero": "flex flex-col gap-[var(--space-50)] max-600:gap-[var(--space-30)]",
    "about-hero-head": "flex flex-col items-center gap-[var(--space-20)] max-w-[928px] mx-auto",
    "about-est": "m-0 text-center uppercase tracking-[0.4em] text-price-old",
    "about-hero-photo": "block w-full h-auto aspect-[16/9] object-cover object-[center_30%] max-600:aspect-[3/2]",
    "about-rule": "border-y border-y-solid border-y-photo border-x-0",
    "about-rule-top": "border-t border-t-solid border-t-photo border-x-0 border-b-0",
    "about-band": "w-full bg-[#f7f7f7]",
    "about-columns": "grid grid-cols-[repeat(12,minmax(0,1fr))] gap-[32px] [&>*:first-child]:col-[1/span_6] [&>*:last-child]:col-[8/span_5] max-900:grid-cols-[minmax(0,1fr)] max-900:[&>*:first-child]:col-auto max-900:[&>*:last-child]:col-auto max-900:gap-[var(--space-40)]",
    "about-columns-care": "[&>*:first-child]:col-[1/span_5] [&>*:last-child]:col-[7/span_6] max-900:[&>*:first-child]:col-auto max-900:[&>*:last-child]:col-auto",
    "about-copy": "flex flex-col items-start gap-[var(--space-20)]",
    "about-reach": "box-border flex flex-col gap-[var(--space-30)] p-[var(--space-40)] bg-[#f7f7f7] max-600:p-[var(--space-20)]",
    "about-label": "m-0 uppercase tracking-[0.12em] text-price-old",
    "about-countries": "grid grid-cols-[repeat(2,minmax(0,1fr))] gap-x-[var(--space-30)] gap-y-[var(--space-16)] m-0 p-0 list-none max-600:gap-x-[var(--space-16)]",
    "about-country": "pb-[var(--space-8)] border-b border-b-solid border-b-[#e2e2e2]",
    "about-photo": "block w-full h-auto aspect-[4/3] object-cover",
    "about-action": "inline-block mt-[var(--space-8)] px-[var(--space-40)] py-[var(--space-16)] uppercase tracking-[1px] bg-layout text-white no-underline [border:2px_solid_var(--color-layout)] [transition:all_0.3s_ease] hov:bg-white hov:text-ink max-600:box-border max-600:w-full max-600:text-center",
    "about-fields": "flex flex-col gap-[var(--space-50)] max-600:gap-[var(--space-30)]",
    "about-fields-head": "flex flex-col items-center gap-[var(--space-12)] max-w-[720px] mx-auto text-center",
    "about-cards": "grid grid-cols-[repeat(12,minmax(0,1fr))] gap-[32px] max-900:grid-cols-[minmax(0,1fr)] max-600:gap-[var(--space-16)]",
    "about-card": "relative flex items-end overflow-hidden bg-layout text-white no-underline after:content-[''] after:absolute after:inset-0 after:[background:linear-gradient(0deg,var(--color-scrim-60)_0%,var(--color-scrim-20)_40%,var(--color-clear)_70%)]",
    "about-card-wide": "col-[1/span_8] h-[420px] max-900:col-auto max-900:h-[300px]",
    "about-card-narrow": "col-[9/span_4] h-[420px] max-900:col-auto max-900:h-[300px]",
    "about-card-half": "col-span-6 h-[320px] max-900:col-auto max-900:h-[260px]",
    "about-card-photo": "absolute inset-0 block w-full h-full object-cover [transition:transform_var(--duration-slow)_ease] group-hover:[transform:scale(1.03)]",
    "about-card-body": "relative z-[1] flex flex-col gap-[var(--space-4)] p-[var(--space-30)] max-600:p-[var(--space-20)]",
    "about-points": "flex flex-col gap-[var(--space-12)] m-0 p-0 list-none",
    "about-point": "flex items-center gap-[var(--space-12)] before:content-[''] before:shrink-0 before:w-[6px] before:h-[6px] before:rounded-[50%] before:bg-button",

    // Image tiles: the collection index.
    "tile-grid": "grid grid-cols-[1fr_1fr_1fr] w-full gap-0 p-0 mx-auto max-1024:grid-cols-[1fr]",
    "tile-link": "block no-underline",
    "tile": "relative w-full h-[82vh] min-h-[500px] overflow-hidden cursor-pointer flex justify-center items-center bg-scrim max-1024:h-auto max-1024:min-h-[250px] [&:hover_img]:[opacity:0.5] [&:hover_img]:[transform:scale(1.01)] [&:hover_img]:[filter:grayscale(0.5)]",
    "tile-img": "w-full h-full object-cover [opacity:0.85] [filter:grayscale(0.3)] [transition:opacity_250ms_linear,transform_250ms_linear] max-1024:h-[250px]",
    "tile-label": "absolute top-[50%] left-[50%] [transform:translate(-50%,-50%)] w-[75%] text-white text-center z-[1]",
  },
});
