import { readFileSync } from "node:fs";
import { relative } from "node:path";
import { expect, test } from "vitest";
import { DOMAINS, LAYERS, SRC, area, boxOf, imports, isCode, rel, sourceFiles } from "./layers";

const files = sourceFiles();

test("each area imports only the layers its row allows; a domain imports only itself", () => {
  const violations: string[] = [];
  for (const file of files) {
    const from = area(rel(file));
    const allowed = LAYERS[from];
    if (!allowed) continue;
    for (const { spec, target } of imports(file)) {
      const to = area(target);
      if (!(to in LAYERS) || to === from) continue;
      const ok = allowed.includes(to) || (DOMAINS.includes(from) && to === from);
      if (!ok) violations.push(`${rel(file)} → ${spec}`);
    }
  }
  expect(violations).toEqual([]);
});

test("a box is reached through its door (index), never a file inside it", () => {
  const violations: string[] = [];
  for (const file of files) {
    const path = rel(file);
    const own = boxOf(path);
    for (const { spec, target } of imports(file)) {
      if (!isCode(target)) continue;
      const box = boxOf(target);
      if (!box || box === own) continue;
      if (target !== `${box}/index.ts`) violations.push(`${path} → ${spec}`);
    }
  }
  expect(violations).toEqual([]);
});

test("a domain's shared/ folder is imported by path, and only from that domain", () => {
  const violations: string[] = [];
  for (const file of files) {
    const path = rel(file);
    for (const { spec, target } of imports(file)) {
      if (!target.includes("/shared/") || !isCode(target)) continue;
      const domain = target.split("/")[0]!;
      if (!DOMAINS.includes(domain) || area(path) !== domain) violations.push(`${path} → ${spec}`);
    }
  }
  expect(violations).toEqual([]);
});

test("the door of a box is only import and export lines, and does not export its api", () => {
  const violations: string[] = [];
  for (const file of files) {
    const path = rel(file);
    if (!/^[^/]+\/[^/]+\/index\.tsx?$/.test(path) || boxOf(path) !== path.replace(/\/index\.tsx?$/, "")) continue;
    const lines = readFileSync(file, "utf8").split("\n");
    for (const line of lines) {
      const code = line.trim();
      if (code === "" || code.startsWith("//") || /^(export|import)\b/.test(code)) continue;
      violations.push(`${path}: ${code}`);
    }
    if (/from\s*['"]\.\/api['"]/.test(readFileSync(file, "utf8"))) violations.push(`${path} exports its api`);
  }
  expect(violations).toEqual([]);
});

test("pages import only through the #/ alias", () => {
  const violations = files
    .filter((file) => rel(file).startsWith("pages/"))
    .flatMap((file) =>
      [...readFileSync(file, "utf8").matchAll(/\bfrom\s*['"](\.[^'"]*)['"]/g)].map(
        ([, spec]) => `${relative(SRC, file)} → ${spec}`,
      ),
    );
  expect(violations).toEqual([]);
});
