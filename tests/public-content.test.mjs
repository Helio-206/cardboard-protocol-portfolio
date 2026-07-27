import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const projects = readFileSync(new URL("../src/data/projects.ts", import.meta.url), "utf8");

test("portfolio retains public contact routes and primary chapters", () => {
  assert.match(page, /mailto:\$\{site\.email\}/);
  for (const chapter of ["origin", "engineer", "systems", "process", "experiments", "contact"]) {
    assert.match(page, new RegExp(`id=\\"${chapter}\\"`));
  }
});

test("project data does not include common secret assignment patterns", () => {
  assert.doesNotMatch(projects, /(api[_-]?key|password|secret)\s*[:=]/i);
});
