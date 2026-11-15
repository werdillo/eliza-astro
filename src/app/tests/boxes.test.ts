import { existsSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";
import { SRC, boxOf, rel, sourceFiles } from "./layers";

const LAYER_FOLDERS = ["core", "components", "features", "catalog", "horeca", "company", "app"];

test("every layer folder has a README", () => {
  const missing = LAYER_FOLDERS.filter((layer) => !existsSync(join(SRC, layer, "README.md")));
  expect(missing).toEqual([]);
});

test("every box folder has an index.ts door and a README", () => {
  const boxes = new Set(sourceFiles().map((file) => boxOf(rel(file))).filter((box): box is string => !!box));
  expect(boxes.size).toBeGreaterThan(0);
  const missing = [...boxes].flatMap((box) => {
    const problems: string[] = [];
    if (!existsSync(join(SRC, box, "index.ts"))) problems.push(`${box}/index.ts`);
    if (!existsSync(join(SRC, box, "README.md"))) problems.push(`${box}/README.md`);
    return problems;
  });
  expect(missing).toEqual([]);
});
