import { navLabel, type NavLink } from "#/core/nav";
import { catalogsNav } from "#/site/catalogs";
import { mainLinks as collectionsLinks } from "#/site/collections";
import { contactNav, galleryNav } from "#/site/company";
import { mainLinks as materialsLinks } from "#/site/materials";
import { mainLinks as productsLinks } from "#/site/products";
import { secondaryLinks as segmentsLinks } from "#/site/segments";

/** The boxes declare their own menu entries; the frame only lists them in the order it shows them. */
export const mainLinks: NavLink[] = [...collectionsLinks, ...productsLinks, ...materialsLinks];

export const secondaryLinks: NavLink[] = [segmentsLinks[0]!, galleryNav, catalogsNav, contactNav];

export { navLabel };
export type { NavLink };
