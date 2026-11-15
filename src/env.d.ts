export {};

declare global {
  interface ImportMetaEnv {
    /** The PocketBase base URL (no trailing slash needed). Read at build time for the static pages. */
    readonly PUBLIC_POCKETBASE_URL: string;
  }
}
