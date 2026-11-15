export {};

declare global {
  interface ImportMetaEnv {
    readonly PUBLIC_POCKETBASE_URL: string;
  }
}

/** The Swiper web components, used directly in the Solid islands. */
declare module "solid-js/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "swiper-container": Record<string, unknown>;
      "swiper-slide": Record<string, unknown>;
    }
  }
}
