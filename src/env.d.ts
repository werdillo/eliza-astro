export {};

declare global {
  interface ImportMetaEnv {
    /** The PocketBase base URL (no trailing slash needed). Read at build time for the static pages. */
    readonly PUBLIC_POCKETBASE_URL: string;
    /** The Google Search Console verification token (the content of the meta tag). Optional: the tag is rendered only when set. */
    readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
    /** The Yandex Webmaster verification token. Optional: the tag is rendered only when set. */
    readonly PUBLIC_YANDEX_VERIFICATION?: string;
  }
}
