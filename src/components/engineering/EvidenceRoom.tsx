"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  engineeringHref,
  type EngineeringProjectSlug,
  type LocalizedEngineeringProject,
} from "@/data/engineering";
import type { EngineeringUi } from "@/data/engineering/ui";
import type {
  EvidenceCategory,
  EvidenceConfidence,
  EvidenceStatus,
  LocalizedEvidence,
} from "@/data/engineering/types";
import type { Locale } from "@/i18n/config";

type EvidenceEntry = {
  project: LocalizedEngineeringProject;
  evidence: LocalizedEvidence;
};

export function EvidenceRoom({
  locale,
  projects,
  initialProject,
  initialEvidenceId,
  ui,
}: {
  locale: Locale;
  projects: LocalizedEngineeringProject[];
  initialProject: EngineeringProjectSlug;
  initialEvidenceId?: string;
  ui: EngineeringUi;
}) {
  const [query, setQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState<EngineeringProjectSlug | "all">(
    initialProject,
  );
  const [category, setCategory] = useState<EvidenceCategory | "all">("all");
  const [status, setStatus] = useState<EvidenceStatus | "all">("all");
  const [confidence, setConfidence] = useState<EvidenceConfidence | "all">("all");
  const [sort, setSort] = useState<"project" | "category" | "status" | "confidence">("confidence");
  const [focusedEvidenceId, setFocusedEvidenceId] = useState(initialEvidenceId);

  const allEvidence = useMemo<EvidenceEntry[]>(
    () =>
      projects.flatMap((project) => project.evidence.map((evidence) => ({ project, evidence }))),
    [projects],
  );

  const visibleEvidence = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);
    const confidenceRank: Record<EvidenceConfidence, number> = { high: 0, medium: 1, low: 2 };
    return allEvidence
      .filter(({ project, evidence }) => {
        if (projectFilter !== "all" && project.slug !== projectFilter) return false;
        if (category !== "all" && evidence.category !== category) return false;
        if (status !== "all" && evidence.status !== status) return false;
        if (confidence !== "all" && evidence.confidence !== confidence) return false;
        if (!normalizedQuery) return true;
        const area = project.areas.find((item) => item.id === evidence.areaId);
        return [project.name, evidence.claim, evidence.summary, area?.path ?? ""]
          .join(" ")
          .toLocaleLowerCase(locale)
          .includes(normalizedQuery);
      })
      .sort((left, right) => {
        if (sort === "confidence") {
          return (
            confidenceRank[left.evidence.confidence] - confidenceRank[right.evidence.confidence]
          );
        }
        const leftValue =
          sort === "project"
            ? left.project.name
            : sort === "category"
              ? left.evidence.category
              : left.evidence.status;
        const rightValue =
          sort === "project"
            ? right.project.name
            : sort === "category"
              ? right.evidence.category
              : right.evidence.status;
        return leftValue.localeCompare(rightValue, locale);
      });
  }, [allEvidence, category, confidence, locale, projectFilter, query, sort, status]);

  useEffect(() => {
    const requestedEvidence =
      initialEvidenceId ?? new URLSearchParams(window.location.search).get("evidence") ?? undefined;
    if (!requestedEvidence) return;

    const target = allEvidence.find(({ evidence }) => evidence.id === requestedEvidence);
    if (!target) return;

    const frame = window.requestAnimationFrame(() => {
      setProjectFilter(target.project.slug);
      setFocusedEvidenceId(requestedEvidence);
      document
        .querySelector<HTMLElement>(`[data-evidence-id="${requestedEvidence}"]`)
        ?.scrollIntoView({
          block: "center",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [allEvidence, initialEvidenceId]);

  const clearFilters = () => {
    setQuery("");
    setProjectFilter("all");
    setCategory("all");
    setStatus("all");
    setConfidence("all");
  };

  return (
    <section className="archive-workspace evidence-workspace" aria-labelledby="evidence-title">
      <header className="archive-workspace__heading">
        <div>
          <p>
            {ui.claim} / {ui.evidence} / {ui.source} / {ui.limitation}
          </p>
          <h2 id="evidence-title">{ui.viewLabels.evidence}</h2>
          <p>{ui.experienceIntro.evidence}</p>
        </div>
        <span className="archive-stamp">
          {visibleEvidence.length} / {ui.reviewed}
        </span>
      </header>

      <form className="evidence-filters" onSubmit={(event) => event.preventDefault()}>
        <label>
          <span>{ui.search}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={ui.searchPlaceholder}
          />
        </label>
        <label>
          <span>{ui.projectFile}</span>
          <select
            value={projectFilter}
            onChange={(event) =>
              setProjectFilter(event.target.value as EngineeringProjectSlug | "all")
            }
          >
            <option value="all">{ui.all}</option>
            {projects.map((project) => (
              <option key={project.slug} value={project.slug}>
                {project.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{ui.category}</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as EvidenceCategory | "all")}
          >
            <option value="all">{ui.all}</option>
            {Object.entries(ui.categories).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{ui.status}</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as EvidenceStatus | "all")}
          >
            <option value="all">{ui.all}</option>
            {Object.entries(ui.statuses).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{ui.confidence}</span>
          <select
            value={confidence}
            onChange={(event) => setConfidence(event.target.value as EvidenceConfidence | "all")}
          >
            <option value="all">{ui.all}</option>
            {Object.entries(ui.confidences).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{ui.sortBy}</span>
          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as "project" | "category" | "status" | "confidence")
            }
          >
            <option value="project">{ui.projectFile}</option>
            <option value="category">{ui.category}</option>
            <option value="status">{ui.status}</option>
            <option value="confidence">{ui.confidence}</option>
          </select>
        </label>
      </form>

      {visibleEvidence.length ? (
        <div className="evidence-grid" aria-live="polite">
          {visibleEvidence.map(({ project, evidence }) => {
            const source = project.sources.find((item) => item.id === evidence.sourceId);
            const area = project.areas.find((item) => item.id === evidence.areaId);
            return (
              <details
                key={evidence.id}
                className="evidence-card"
                data-evidence-id={evidence.id}
                open={evidence.id === focusedEvidenceId}
              >
                <summary>
                  <div>
                    <span>{project.shortName}</span>
                    <span data-status={evidence.status}>{ui.statuses[evidence.status]}</span>
                    <span>{ui.confidences[evidence.confidence]}</span>
                  </div>
                  <h3>{evidence.claim}</h3>
                  <p>{evidence.summary}</p>
                  <b>{ui.details} +</b>
                </summary>
                <div className="evidence-card__detail">
                  <section>
                    <h4>{ui.whyItMatters}</h4>
                    <p>{evidence.whyItMatters}</p>
                  </section>
                  <section>
                    <h4>{ui.evidence}</h4>
                    <p>{evidence.summary}</p>
                  </section>
                  <section className="evidence-card__boundary">
                    <h4>{ui.doesNotProve}</h4>
                    <p>{evidence.doesNotProve}</p>
                  </section>
                  <section>
                    <h4>{ui.limitation}</h4>
                    <p>{evidence.limitation}</p>
                  </section>
                  <dl>
                    <div>
                      <dt>{ui.category}</dt>
                      <dd>{ui.categories[evidence.category]}</dd>
                    </div>
                    <div>
                      <dt>{ui.relatedArea}</dt>
                      <dd>{area?.path ?? evidence.areaId}</dd>
                    </div>
                    <div>
                      <dt>{ui.lastReviewed}</dt>
                      <dd>{source?.reviewedAt ?? "2026-07-29"}</dd>
                    </div>
                  </dl>
                  <div className="archive-crosslinks">
                    {source ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${ui.viewSource}: ${source.label}, ${ui.externalLink}`}
                      >
                        {ui.viewSource} ↗
                      </a>
                    ) : null}
                    <Link
                      href={engineeringHref(locale, project.slug, "x-ray", {
                        area: evidence.areaId,
                      })}
                    >
                      {ui.openXray} →
                    </Link>
                    {evidence.labStepId ? (
                      <Link
                        href={engineeringHref(locale, project.slug, "lab", {
                          step: evidence.labStepId,
                        })}
                      >
                        {ui.openLab} →
                      </Link>
                    ) : null}
                    <Link href={`/${locale}/projects/${project.slug}/story`}>
                      {ui.backToStory} →
                    </Link>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      ) : (
        <div className="archive-empty" role="status">
          <p>{ui.noResults}</p>
          <button type="button" onClick={clearFilters}>
            {ui.clearFilters}
          </button>
        </div>
      )}
    </section>
  );
}
