import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const projects = readFileSync(new URL("../src/data/projects.ts", import.meta.url), "utf8");
const storyRoute = readFileSync(
  new URL("../src/app/[locale]/projects/[slug]/story/page.tsx", import.meta.url),
  "utf8",
);
const storyReader = readFileSync(
  new URL("../src/components/project-story/StoryBookReader.tsx", import.meta.url),
  "utf8",
);
const chapterNavigation = readFileSync(
  new URL("../src/components/navigation/ChapterNavigation.tsx", import.meta.url),
  "utf8",
);
const cardboardImpactMotion = readFileSync(
  new URL("../src/components/motion/CardboardImpactMotion.tsx", import.meta.url),
  "utf8",
);

test("portfolio retains public contact routes and primary chapters", () => {
  assert.match(page, /mailto:\$\{site\.email\}/);
  for (const chapter of ["origin", "engineer", "systems", "process", "experiments", "contact"]) {
    assert.match(page, new RegExp(`id=\\"${chapter}\\"`));
  }
});

test("project data does not include common secret assignment patterns", () => {
  assert.doesNotMatch(projects, /(api[_-]?key|password|secret)\s*[:=]/i);
});

test("exactly three public project stories are linked from project data", () => {
  const storyLinks = projects.match(/storySlug:/g) ?? [];
  assert.equal(storyLinks.length, 3);
  for (const slug of ["kaya", "african-business-network", "recall"]) {
    assert.match(projects, new RegExp(`storySlug: \\"${slug}\\"`));
  }
});

test("story route includes metadata and structured data", () => {
  assert.match(storyRoute, /generateMetadata/);
  assert.match(storyRoute, /TechArticle/);
  assert.match(storyRoute, /BreadcrumbList/);
  assert.match(storyRoute, /heliomatondo\.dev/);
});

test("story editions include distinct narrative images and page controls", () => {
  for (const asset of [
    "kaya-origin.webp",
    "african-business-network-origin.webp",
    "recall-origin.webp",
  ]) {
    assert.equal(
      existsSync(new URL(`../public/project-media/story/${asset}`, import.meta.url)),
      true,
    );
  }

  assert.match(storyReader, /onTouchStart/);
  assert.match(storyReader, /ArrowRight/);
  assert.match(storyReader, /showModal/);
  assert.match(storyReader, /totalPages = content\.chapters\.length \+ 2/);
});

test("the chapter index uses the cardboard impact motion and respects reduced motion", () => {
  assert.match(chapterNavigation, /gsap\.timeline/);
  assert.match(chapterNavigation, /power4\.out/);
  assert.match(chapterNavigation, /back\.out\(2\.6\)/);
  assert.match(chapterNavigation, /prefers-reduced-motion: reduce/);
  assert.match(chapterNavigation, /aria-controls="chapter-index-menu"/);
});

test("cardboard impact motion covers global controls and engineering states", () => {
  assert.match(cardboardImpactMotion, /pointerdown/);
  assert.match(cardboardImpactMotion, /keydown/);
  assert.match(cardboardImpactMotion, /archiveRevealSelector/);
  assert.match(cardboardImpactMotion, /stateEchoTarget/);
  assert.match(cardboardImpactMotion, /ScrollTrigger/);
  assert.match(cardboardImpactMotion, /prefers-reduced-motion: reduce/);
});
