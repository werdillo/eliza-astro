import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Shared scanning for the structure tests: the source tree, its modules and the boxes they belong to.
 *
 * A box is a folder directly inside a layer (`components/slider`, `site/products`, `core/fetch`),
 * or one of the two app boxes `app/layout` and `app/frame`. `site/shared` is not a box.
 */
export const SRC = fileURLToPath(new URL("../..", import.meta.url));

/** Which layers each area may import (the area itself is always allowed). */
export const LAYERS: Record<string, string[]> = {
  core: ["core"],
  components: ["core", "components"],
  features: ["core", "components", "features"],
  site: ["core", "components", "features"],
  app: ["core", "components", "features", "site", "app"],
  pages: ["core", "components", "features", "site", "app", "pages"],
};

/** The domains: each may import only itself, of the domains. */
export const DOMAINS = ["site"];

const CODE = /\.(ts|tsx|astro)$/;

export function sourceFiles(dir = SRC): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === "tests" ? [] : sourceFiles(path);
    return CODE.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : [];
  });
}

/** A `src`-relative path, with forward slashes. */
export const rel = (path: string) => relative(SRC, path).split("\\").join("/");

export const area = (path: string) => path.split("/")[0]!;

/** The box a `src`-relative file belongs to, or undefined. */
export function boxOf(path: string): string | undefined {
  const segments = path.split("/");
  const [first, second] = segments;
  if (segments.length < 3) return undefined;
  if (first === "core" || first === "components" || first === "features") return `${first}/${second}`;
  if (DOMAINS.includes(first!) && second !== "shared") return `${first}/${second}`;
  if (first === "app" && (second === "layout" || second === "frame")) return `app/${second}`;
  return undefined;
}

/** The module specifiers of a file that point inside `src`, resolved to a `src`-relative path. */
export function imports(file: string): { spec: string; target: string }[] {
  const text = readFileSync(file, "utf8");
  const found: { spec: string; target: string }[] = [];
  for (const [, spec] of text.matchAll(/\b(?:from|import)\s*\(?\s*['"]([^'"]+)['"]/g)) {
    const base = spec!.startsWith("#/")
      ? resolve(SRC, spec!.slice(2))
      : spec!.startsWith(".")
        ? resolve(dirname(file), spec!)
        : null;
    if (!base) continue;
    const candidates = [base, `${base}.ts`, `${base}.tsx`, `${base}.astro`, join(base, "index.ts"), join(base, "index.tsx")];
    const target = candidates.find((c) => existsSync(c) && statSync(c).isFile());
    if (target) found.push({ spec: spec!, target: rel(target) });
  }
  return found;
}

export const isCode = (target: string) => CODE.test(target);
