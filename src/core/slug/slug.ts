/** A URL segment for a text: lower case, accents folded, words joined by dashes. */
export const slugify = (text: string): string =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Gives every record a unique URL slug: its slugified path. When two records of the list share a slug,
 * both get their record id appended, so the slug of a record does not change when another is added.
 */
export function withSlugs<T extends { id: string; path: string }>(records: T[]): (T & { slug: string })[] {
  const base = (r: T) => slugify(r.path) || r.id;
  const count = new Map<string, number>();
  for (const r of records) count.set(base(r), (count.get(base(r)) ?? 0) + 1);
  return records.map((r) => {
    const b = base(r);
    return { ...r, slug: (count.get(b) ?? 0) > 1 ? `${b}-${r.id}` : b };
  });
}
