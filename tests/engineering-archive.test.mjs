import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { africanBusinessNetworkEngineering } from "../src/data/engineering/african-business-network.ts";
import { kayaEngineering } from "../src/data/engineering/kaya.ts";
import { recallEngineering } from "../src/data/engineering/recall.ts";
import { initialSimulationState, simulationReducer } from "../src/lib/labs/simulation.ts";

const route = readFileSync(
  new URL("../src/app/[locale]/projects/[slug]/[experience]/page.tsx", import.meta.url),
  "utf8",
);
const evidenceRoom = readFileSync(
  new URL("../src/components/engineering/EvidenceRoom.tsx", import.meta.url),
  "utf8",
);
const xray = readFileSync(
  new URL("../src/components/engineering/RepositoryXray.tsx", import.meta.url),
  "utf8",
);
const labs = readFileSync(
  new URL("../src/components/engineering/LiveSystemLab.tsx", import.meta.url),
  "utf8",
);
const engineeringProjects = [kayaEngineering, africanBusinessNetworkEngineering, recallEngineering];

test("engineering data keeps every cross-experience reference valid", () => {
  for (const project of engineeringProjects) {
    const stepIds = new Set(project.lab.steps.map((step) => step.id));
    const sourceIds = new Set(project.sources.map((source) => source.id));
    const evidenceIds = new Set(project.evidence.map((evidence) => evidence.id));
    const areaIds = new Set(project.areas.map((area) => area.id));

    assert.match(project.repository, /^https:\/\/github\.com\/Helio-206\//);
    assert.ok(stepIds.has(project.lab.failureAtStepId));
    assert.ok(stepIds.has(project.lab.fallbackStepId));

    for (const step of project.lab.steps) {
      assert.ok(areaIds.has(step.areaId), `${step.id} references an unknown area`);
      step.evidenceIds.forEach((id) =>
        assert.ok(evidenceIds.has(id), `${step.id} references unknown evidence ${id}`),
      );
    }

    for (const evidence of project.evidence) {
      assert.ok(sourceIds.has(evidence.sourceId), `${evidence.id} references an unknown source`);
      assert.ok(areaIds.has(evidence.areaId), `${evidence.id} references an unknown area`);
      if (evidence.labStepId) {
        assert.ok(
          stepIds.has(evidence.labStepId),
          `${evidence.id} references unknown lab step ${evidence.labStepId}`,
        );
      }
    }

    for (const area of project.areas) {
      area.dependencies.forEach((id) =>
        assert.ok(areaIds.has(id), `${area.id} references unknown dependency ${id}`),
      );
      area.sourceIds.forEach((id) =>
        assert.ok(sourceIds.has(id), `${area.id} references unknown source ${id}`),
      );
      area.evidenceIds.forEach((id) =>
        assert.ok(evidenceIds.has(id), `${area.id} references unknown evidence ${id}`),
      );
      if (area.labStepId) {
        assert.ok(
          stepIds.has(area.labStepId),
          `${area.id} references unknown lab step ${area.labStepId}`,
        );
      }
    }
  }
});

test("simulation reducer supports deterministic start, pause, failure, fallback and reset", () => {
  const started = simulationReducer(initialSimulationState, {
    type: "start",
    stepId: "step-01",
  });
  assert.equal(started.status, "running");
  assert.equal(started.stepIndex, 0);

  const paused = simulationReducer(started, { type: "pause" });
  assert.equal(paused.status, "paused");
  const resumed = simulationReducer(paused, { type: "resume" });
  assert.equal(resumed.status, "running");

  const failed = simulationReducer(resumed, {
    type: "fail",
    stepId: "step-failure",
  });
  assert.equal(failed.status, "failed");
  assert.equal(failed.failureInjected, true);

  const recovered = simulationReducer(failed, {
    type: "recover",
    stepId: "step-fallback",
    stepIndex: 4,
    durationMs: 500,
  });
  assert.equal(recovered.status, "running");
  assert.equal(recovered.stepIndex, 4);
  assert.equal(recovered.logs.at(-1)?.kind, "fallback");

  assert.deepEqual(simulationReducer(recovered, { type: "reset" }), initialSimulationState);
});

test("engineering archive statically generates three experiences for three public projects", () => {
  assert.match(route, /dynamicParams = false/);
  assert.match(route, /engineeringProjectSlugs\.flatMap/);
  assert.match(route, /engineeringExperienceSlugs\.map/);
  for (const experience of ["LiveSystemLab", "EvidenceRoom", "RepositoryXray"]) {
    assert.match(route, new RegExp(experience));
  }
});

test("evidence room includes local search, filters, details and safe public source links", () => {
  assert.match(evidenceRoom, /type="search"/);
  assert.match(evidenceRoom, /setCategory/);
  assert.match(evidenceRoom, /setStatus/);
  assert.match(evidenceRoom, /setConfidence/);
  assert.match(evidenceRoom, /<details/);
  assert.match(evidenceRoom, /noopener noreferrer/);
  assert.match(evidenceRoom, /doesNotProve/);
});

test("repository x-ray exposes all three views and mobile-compatible inspector content", () => {
  for (const mode of ["system", "repository", "dependency"]) {
    assert.match(xray, new RegExp(`\\"${mode}\\"`));
  }
  assert.match(xray, /navigator\.clipboard/);
  assert.match(xray, /xray-inspector/);
  assert.match(xray, /alternateDiagram/);
});

test("labs retain reset, failure, fallback, keyboard-native controls and reduced motion", () => {
  assert.match(labs, /type: "reset"/);
  assert.match(labs, /simulateFailure/);
  assert.match(labs, /recover/);
  assert.match(labs, /prefers-reduced-motion/);
  assert.match(labs, /<button/);
});
