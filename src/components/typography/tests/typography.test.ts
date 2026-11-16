import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { expect, test } from "vitest";
import { SRC } from "../../../tests/layers";

const ROOT = join(SRC, "..");

/** The places that may name a size, a weight or a line height: the text styles and the global styles. */
const ALLOWED = ["components/typography/", "app/styles/"];

/** Raw type utilities and type properties. A screen names a text style (H1–H6, P1–P3), never a size. */
const RAW: RegExp[] = [
  /(?<![\w-])(?:[\w:-]*:)?(?:text-(?:fs-\d+|\[[^\]]*\]|\d*xl|xs|sm|base|lg)|font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black|\[[^\]]*\])|leading-(?:none|tight|snug|normal|relaxed|loose|\d+|\[[^\]]*\]))(?![\w-])/g,
  /\[(?:font-size|font-weight|line-height|font)\s*:[^\]]*\]/g,
  /(?<![\w-])(?:font-size|font-weight|line-height|font)\s*:/g,
];

/**
 * Text outside the nine styles that is allowed, each with its reason. The test fails when an entry no
 * longer matches anything, so the list cannot go stale. The same entries are listed in
 * src/components/typography/README.md.
 */
const EXCEPTIONS: { file: string; match: string; reason: string }[] = [];

const files = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === "tests" || name === "node_modules" ? [] : files(path);
    return /\.(astro|ts|css)$/.test(name) ? [path] : [];
  });

test("no screen sets a font size, weight or line height: only the text styles and the global styles do", () => {
  const sources = [...files(SRC), join(ROOT, "uno.config.ts")];
  const found: { file: string; match: string }[] = [];
  for (const file of sources) {
    const path = relative(ROOT, file).split("\\").join("/").replace(/^src\//, "");
    if (ALLOWED.some((dir) => path.startsWith(dir))) continue;
    const text = readFileSync(file, "utf8");
    for (const pattern of RAW) {
      for (const [match] of text.matchAll(pattern)) found.push({ file: path, match: match.trim() });
    }
  }

  const unlisted = found.filter(
    (f) => !EXCEPTIONS.some((e) => e.file === f.file && e.match === f.match),
  );
  const stale = EXCEPTIONS.filter((e) => !found.some((f) => f.file === e.file && f.match === e.match)).map(
    (e) => `${e.file}: ${e.match} (no longer found)`,
  );

  expect(unlisted.map((f) => `${f.file}: ${f.match}`)).toEqual([]);
  expect(stale).toEqual([]);
});
