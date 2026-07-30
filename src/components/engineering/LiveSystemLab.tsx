"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { engineeringHref, type LocalizedEngineeringProject } from "@/data/engineering";
import type { EngineeringUi } from "@/data/engineering/ui";
import type { LocalizedLabStep } from "@/data/engineering/types";
import {
  initialSimulationState,
  simulationReducer,
  type SimulationStatus,
} from "@/lib/labs/simulation";
import type { Locale } from "@/i18n/config";

function statusLabel(status: SimulationStatus, ui: EngineeringUi) {
  return {
    idle: ui.idle,
    running: ui.running,
    paused: ui.paused,
    failed: ui.failed,
    completed: ui.completed,
  }[status];
}

function markerLabel(marker: LocalizedLabStep["marker"], ui: EngineeringUi) {
  return {
    verified: ui.verified,
    documented: ui.documented,
    simulated: ui.simulated,
    experimental: ui.experimental,
  }[marker];
}

export function LiveSystemLab({
  locale,
  project,
  ui,
  initialStepId,
}: {
  locale: Locale;
  project: LocalizedEngineeringProject;
  ui: EngineeringUi;
  initialStepId?: string;
}) {
  const [state, dispatch] = useReducer(simulationReducer, initialSimulationState);
  const [selectedStepId, setSelectedStepId] = useState(
    initialStepId && project.lab.steps.some((step) => step.id === initialStepId)
      ? initialStepId
      : project.lab.steps[0]?.id,
  );
  const boardRef = useRef<HTMLDivElement>(null);
  const activeStep = state.stepIndex >= 0 ? project.lab.steps[state.stepIndex] : undefined;
  const selectedStep =
    project.lab.steps.find((step) => step.id === selectedStepId) ??
    activeStep ??
    project.lab.steps[0];

  useEffect(() => {
    const requestedStep = initialStepId ?? new URLSearchParams(window.location.search).get("step");
    if (!requestedStep || !project.lab.steps.some((step) => step.id === requestedStep)) return;

    const frame = window.requestAnimationFrame(() => setSelectedStepId(requestedStep));
    return () => window.cancelAnimationFrame(frame);
  }, [initialStepId, project.lab.steps]);

  const advance = useCallback(() => {
    if (state.status === "idle") {
      const first = project.lab.steps[0];
      if (first) {
        dispatch({ type: "start", stepId: first.id });
        setSelectedStepId(first.id);
      }
      return;
    }

    if (state.status !== "running") return;
    const nextIndex = state.stepIndex + 1;
    const nextStep = project.lab.steps[nextIndex];
    if (!nextStep) return;
    const completed = nextIndex === project.lab.steps.length - 1;
    dispatch({
      type: "advance",
      stepId: nextStep.id,
      completed,
      durationMs: nextStep.durationMs,
    });
    setSelectedStepId(nextStep.id);
  }, [project.lab.steps, state.status, state.stepIndex]);

  const simulateFailure = () => {
    const failureIndex = project.lab.steps.findIndex(
      (step) => step.id === project.lab.failureAtStepId,
    );
    const failureStep = project.lab.steps[failureIndex];
    if (!failureStep) return;

    if (state.status === "idle") {
      dispatch({ type: "start", stepId: project.lab.steps[0].id });
    }
    dispatch({ type: "fail", stepId: failureStep.id });
    setSelectedStepId(failureStep.id);
  };

  const recover = () => {
    const fallbackIndex = project.lab.steps.findIndex(
      (step) => step.id === project.lab.fallbackStepId,
    );
    const fallbackStep = project.lab.steps[fallbackIndex];
    if (!fallbackStep) return;
    dispatch({
      type: "recover",
      stepId: fallbackStep.id,
      stepIndex: fallbackIndex,
      durationMs: fallbackStep.durationMs,
    });
    setSelectedStepId(fallbackStep.id);
  };

  useEffect(() => {
    if (!state.autoRun || state.status !== "running") return;
    const timer = window.setTimeout(advance, 900);
    return () => window.clearTimeout(timer);
  }, [advance, state.autoRun, state.status]);

  useLayoutEffect(() => {
    if (
      !boardRef.current ||
      state.stepIndex < 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const active = boardRef.current.querySelectorAll<HTMLElement>("[data-lab-active='true']");
    const context = gsap.context(() => {
      gsap.fromTo(
        active,
        { scale: 0.96, opacity: 0.55 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          clearProps: "transform,opacity",
        },
      );
    }, boardRef);
    return () => context.revert();
  }, [state.stepIndex]);

  const visitedIds = useMemo(
    () =>
      new Set(project.lab.steps.slice(0, Math.max(state.stepIndex + 1, 0)).map((step) => step.id)),
    [project.lab.steps, state.stepIndex],
  );

  return (
    <section className="archive-workspace lab-workspace" aria-labelledby="lab-title">
      <header className="archive-workspace__heading">
        <div>
          <p>{ui.preparedData}</p>
          <h2 id="lab-title">{project.lab.title}</h2>
          <p>{project.lab.description}</p>
        </div>
        <span className="archive-stamp archive-stamp--limited">{project.lab.disclaimer}</span>
      </header>

      <div className="lab-layout">
        <div ref={boardRef} className="lab-board" aria-label={project.lab.description}>
          <LabVisualization
            project={project}
            currentStep={state.stepIndex}
            visitedIds={visitedIds}
            failed={state.status === "failed"}
            ui={ui}
          />
          <ol className="lab-timeline">
            {project.lab.steps.map((step, index) => {
              const active = index === state.stepIndex;
              return (
                <li
                  key={step.id}
                  data-lab-active={active ? "true" : "false"}
                  data-lab-visited={visitedIds.has(step.id) ? "true" : "false"}
                >
                  <button type="button" onClick={() => setSelectedStepId(step.id)}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <b>{step.label}</b>
                    <small>{markerLabel(step.marker, ui)}</small>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <aside className="lab-inspector" aria-labelledby="lab-inspector-title">
          <div className="lab-status">
            <span>{ui.currentState}</span>
            <strong data-status={state.status}>{statusLabel(state.status, ui)}</strong>
            <small>
              {(state.elapsedMs / 1000).toFixed(2)} s / {ui.simulated}
            </small>
          </div>
          {selectedStep ? (
            <article>
              <p>{selectedStep.event}</p>
              <h3 id="lab-inspector-title">{selectedStep.label}</h3>
              <p>{selectedStep.description}</p>
              <code>{selectedStep.output}</code>
              <div className="archive-crosslinks">
                {selectedStep.areaId ? (
                  <Link
                    href={engineeringHref(locale, project.slug, "x-ray", {
                      area: selectedStep.areaId,
                    })}
                  >
                    {ui.openXray} →
                  </Link>
                ) : null}
                {selectedStep.evidenceIds[0] ? (
                  <Link
                    href={engineeringHref(locale, project.slug, "evidence", {
                      evidence: selectedStep.evidenceIds[0],
                    })}
                  >
                    {ui.openEvidence} →
                  </Link>
                ) : null}
              </div>
            </article>
          ) : null}
        </aside>
      </div>

      <div className="lab-controls" role="group" aria-label={ui.currentState}>
        <button type="button" onClick={advance} disabled={state.status === "completed"}>
          {state.status === "idle" ? ui.start : ui.next}
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: state.status === "paused" ? "resume" : "pause" })}
          disabled={!["running", "paused"].includes(state.status)}
        >
          {state.status === "paused" ? ui.resume : ui.pause}
        </button>
        <button
          type="button"
          aria-pressed={state.autoRun}
          onClick={() => {
            if (state.status === "idle") advance();
            dispatch({ type: "set-auto", enabled: !state.autoRun });
          }}
          disabled={state.status === "completed" || state.status === "failed"}
        >
          {ui.autoRun}
        </button>
        <button
          type="button"
          onClick={simulateFailure}
          disabled={state.status === "failed" || state.status === "completed"}
        >
          {ui.simulateFailure}
        </button>
        {state.status === "failed" ? (
          <button type="button" onClick={recover}>
            {ui.recover}
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => {
            dispatch({ type: "reset" });
            setSelectedStepId(project.lab.steps[0]?.id);
          }}
        >
          {ui.reset}
        </button>
      </div>

      <details className="lab-event-log" open>
        <summary>
          {ui.eventLog} <span>{state.logs.length}</span>
        </summary>
        {state.logs.length ? (
          <ol aria-live="polite">
            {state.logs.map((log) => {
              const step = project.lab.steps.find((item) => item.id === log.stepId);
              return (
                <li key={log.id}>
                  <span>{String(log.sequence).padStart(2, "0")}</span>
                  <code>{step?.event ?? log.stepId}</code>
                  <b>{ui.eventKinds[log.kind]}</b>
                </li>
              );
            })}
          </ol>
        ) : (
          <p>{ui.noEvents}</p>
        )}
      </details>
    </section>
  );
}

function LabVisualization({
  project,
  currentStep,
  visitedIds,
  failed,
  ui,
}: {
  project: LocalizedEngineeringProject;
  currentStep: number;
  visitedIds: Set<string>;
  failed: boolean;
  ui: EngineeringUi;
}) {
  if (project.slug === "kaya") {
    return (
      <div className="network-sketch" data-failed={failed ? "true" : "false"}>
        {["Node A", "Node B", "Node C"].map((node, index) => (
          <div
            key={node}
            className={`network-node network-node--${index + 1}`}
            data-lab-active={currentStep >= index ? "true" : "false"}
          >
            <b>{node}</b>
            <span>{currentStep >= index ? ui.active : ui.standby}</span>
          </div>
        ))}
        <div className="network-route" data-relay={currentStep >= 6 ? "true" : "false"}>
          <span>A</span>
          <i>→</i>
          {currentStep >= 6 ? (
            <>
              <span>C</span>
              <i>→</i>
            </>
          ) : null}
          <span>B</span>
          <small>{currentStep >= 6 ? "TTL 4" : "TTL 5"}</small>
        </div>
      </div>
    );
  }

  if (project.slug === "recall") {
    return (
      <div className="pipeline-sketch">
        {project.lab.steps.map((step, index) => (
          <div
            key={step.id}
            data-lab-active={index === currentStep ? "true" : "false"}
            data-lab-visited={visitedIds.has(step.id) ? "true" : "false"}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{step.label}</b>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="aggregate-sketch">
      <div data-lab-active={currentStep >= 0 ? "true" : "false"}>
        <span>{ui.aggregate}</span>
        <b>Organization</b>
        <small>{currentStep >= 0 ? ui.active : ui.notCreated}</small>
      </div>
      <div data-lab-active={currentStep >= 3 ? "true" : "false"}>
        <span>{ui.membership}</span>
        <b>{currentStep >= 5 ? "Admin" : "Viewer"}</b>
        <small>{currentStep >= 3 ? ui.active : ui.pending}</small>
      </div>
      <div data-lab-active={currentStep >= 4 ? "true" : "false"}>
        <span>{ui.policy}</span>
        <b>
          {currentStep >= 6
            ? "explicit_allow"
            : currentStep >= 4
              ? "insufficient_role"
              : ui.notEvaluated}
        </b>
        <small>update organization</small>
      </div>
    </div>
  );
}
