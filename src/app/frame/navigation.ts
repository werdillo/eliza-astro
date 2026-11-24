import { navLabel, type NavLink } from "#/core/nav";
import { catalogsNav } from "#/site/catalogs";
import { mainLinks as collectionsLinks } from "#/site/collections";
import { aboutNav, contactNav, galleryNav } from "#/site/company";
import { mainLinks as materialsLinks } from "#/site/materials";
import { mainLinks as productsLinks } from "#/site/products";

/** The boxes declare their own menu entries; the frame only lists them in the order it shows them. */
export const mainLinks: NavLink[] = [...collectionsLinks, ...productsLinks, ...materialsLinks];

export const secondaryLinks: NavLink[] = [aboutNav, galleryNav, catalogsNav, contactNav];

export { navLabel };
export type { NavLink };
