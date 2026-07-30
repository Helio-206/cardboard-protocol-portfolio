"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { engineeringHref, type LocalizedEngineeringProject } from "@/data/engineering";
import type { EngineeringUi } from "@/data/engineering/ui";
import type { LocalizedRepositoryArea, RepositoryAreaType } from "@/data/engineering/types";
import type { Locale } from "@/i18n/config";

type XrayMode = "system" | "repository" | "dependency";

export function RepositoryXray({
  locale,
  project,
  ui,
  initialAreaId,
}: {
  locale: Locale;
  project: LocalizedEngineeringProject;
  ui: EngineeringUi;
  initialAreaId?: string;
}) {
  const [mode, setMode] = useState<XrayMode>("system");
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<RepositoryAreaType | "all">("all");
  const [selectedAreaId, setSelectedAreaId] = useState<string | undefined>(
    initialAreaId && project.areas.some((area) => area.id === initialAreaId)
      ? initialAreaId
      : project.areas[0]?.id,
  );
  const [copied, setCopied] = useState(false);

  const selectedArea = project.areas.find((area) => area.id === selectedAreaId);
  const visibleAreas = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale);
    return project.areas.filter((area) => {
      if (typeFilter !== "all" && area.type !== typeFilter) return false;
      if (!normalized) return true;
      return [area.name, area.path, area.responsibility, area.type]
        .join(" ")
        .toLocaleLowerCase(locale)
        .includes(normalized);
    });
  }, [locale, project.areas, query, typeFilter]);

  const areaTypes = useMemo(
    () => [...new Set(project.areas.map((area) => area.type))].sort(),
    [project.areas],
  );

  useEffect(() => {
    const requestedArea =
      initialAreaId ?? new URLSearchParams(window.location.search).get("area") ?? undefined;
    if (!requestedArea || !project.areas.some((area) => area.id === requestedArea)) return;

    const frame = window.requestAnimationFrame(() => {
      setSelectedAreaId(requestedArea);
      document.querySelector<HTMLElement>("[data-xray-inspector]")?.scrollIntoView({
        block: "nearest",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [initialAreaId, project.areas]);

  const copyPath = async () => {
    if (!selectedArea) return;
    try {
      await navigator.clipboard.writeText(selectedArea.path);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="archive-workspace xray-workspace" aria-labelledby="xray-title">
      <header className="archive-workspace__heading">
        <div>
          <p>
            {ui.boundary} / {ui.responsibility} / {ui.path} / {ui.dependencies}
          </p>
          <h2 id="xray-title">{ui.viewLabels["x-ray"]}</h2>
          <p>{project.architecturalStyle}</p>
        </div>
        <span className="archive-stamp">
          {project.areas.length} / {ui.areas}
        </span>
      </header>

      <div className="xray-toolbar">
        <div role="tablist" aria-label={ui.viewLabels["x-ray"]}>
          {(
            [
              ["system", ui.systemView],
              ["repository", ui.repositoryView],
              ["dependency", ui.dependencyView],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={mode === value}
              onClick={() => setMode(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <label>
          <span>{ui.search}</span>
          <input
            type="search"
            value={query}
            placeholder={ui.searchPlaceholder}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          <span>{ui.filterByType}</span>
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value as RepositoryAreaType | "all")}
          >
            <option value="all">{ui.all}</option>
            {areaTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="xray-layout">
        <div className="xray-map" role="tabpanel">
          {visibleAreas.length ? (
            <>
              {mode === "system" ? (
                <SystemView
                  areas={visibleAreas}
                  selectedAreaId={selectedAreaId}
                  onSelect={setSelectedAreaId}
                />
              ) : null}
              {mode === "repository" ? (
                <RepositoryView
                  areas={visibleAreas}
                  selectedAreaId={selectedAreaId}
                  onSelect={setSelectedAreaId}
                />
              ) : null}
              {mode === "dependency" ? (
                <DependencyView
                  areas={visibleAreas}
                  allAreas={project.areas}
                  selectedAreaId={selectedAreaId}
                  onSelect={setSelectedAreaId}
                />
              ) : null}
            </>
          ) : (
            <div className="archive-empty" role="status">
              <p>{ui.noResults}</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setTypeFilter("all");
                }}
              >
                {ui.clearFilters}
              </button>
            </div>
          )}
        </div>

        <aside
          className="xray-inspector"
          data-xray-inspector
          aria-labelledby="xray-inspector-title"
        >
          {selectedArea ? (
            <>
              <header>
                <p>{selectedArea.type}</p>
                <h3 id="xray-inspector-title">{selectedArea.name}</h3>
                <span data-status={selectedArea.status}>{ui.statuses[selectedArea.status]}</span>
              </header>
              <section>
                <h4>{ui.responsibility}</h4>
                <p>{selectedArea.responsibility}</p>
              </section>
              <section>
                <h4>{ui.path}</h4>
                <code>{selectedArea.path}</code>
                <button type="button" onClick={copyPath}>
                  {copied ? ui.copied : ui.copyPath}
                </button>
              </section>
              <section>
                <h4>{ui.details}</h4>
                <p>{selectedArea.description}</p>
              </section>
              <section className="xray-inspector__limit">
                <h4>{ui.limitation}</h4>
                <p>{selectedArea.limitation}</p>
              </section>
              <section>
                <h4>{ui.dependencies}</h4>
                {selectedArea.dependencies.length ? (
                  <ul>
                    {selectedArea.dependencies.map((dependencyId) => {
                      const dependency = project.areas.find((area) => area.id === dependencyId);
                      return (
                        <li key={dependencyId}>
                          <button type="button" onClick={() => setSelectedAreaId(dependencyId)}>
                            {dependency?.name ?? dependencyId}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p>{ui.noDependencies}</p>
                )}
              </section>
              <div className="archive-crosslinks">
                {selectedArea.sourceIds.map((sourceId) => {
                  const source = project.sources.find((item) => item.id === sourceId);
                  return source ? (
                    <a
                      key={source.id}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${ui.viewSource}: ${source.label}, ${ui.externalLink}`}
                    >
                      {source.label} ↗
                    </a>
                  ) : null;
                })}
                {selectedArea.evidenceIds[0] ? (
                  <Link
                    href={engineeringHref(locale, project.slug, "evidence", {
                      evidence: selectedArea.evidenceIds[0],
                    })}
                  >
                    {ui.openEvidence} →
                  </Link>
                ) : null}
                {selectedArea.labStepId ? (
                  <Link
                    href={engineeringHref(locale, project.slug, "lab", {
                      step: selectedArea.labStepId,
                    })}
                  >
                    {ui.openLab} →
                  </Link>
                ) : null}
              </div>
              <button
                className="xray-clear"
                type="button"
                onClick={() => setSelectedAreaId(undefined)}
              >
                {ui.clearSelection}
              </button>
            </>
          ) : (
            <p>{ui.noResults}</p>
          )}
        </aside>
      </div>

      <details className="xray-text-alternative">
        <summary>{ui.alternateDiagram}</summary>
        <ol>
          {visibleAreas.map((area) => (
            <li key={area.id}>
              <b>{area.name}</b>: {area.responsibility} — {area.path}
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}

function SystemView({
  areas,
  selectedAreaId,
  onSelect,
}: {
  areas: LocalizedRepositoryArea[];
  selectedAreaId?: string;
  onSelect: (id: string) => void;
}) {
  const groups = [...new Set(areas.map((area) => area.type))];
  return (
    <div className="xray-system-view">
      {groups.map((group) => (
        <section key={group}>
          <h3>{group}</h3>
          <div>
            {areas
              .filter((area) => area.type === group)
              .map((area) => (
                <AreaButton
                  key={area.id}
                  area={area}
                  selected={area.id === selectedAreaId}
                  onSelect={onSelect}
                />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function RepositoryView({
  areas,
  selectedAreaId,
  onSelect,
}: {
  areas: LocalizedRepositoryArea[];
  selectedAreaId?: string;
  onSelect: (id: string) => void;
}) {
  const groups = new Map<string, LocalizedRepositoryArea[]>();
  areas.forEach((area) => {
    const root = area.path === "." ? "repository" : (area.path.split("/")[0] ?? "repository");
    groups.set(root, [...(groups.get(root) ?? []), area]);
  });
  return (
    <div className="xray-repository-view">
      {[...groups.entries()].map(([root, groupedAreas]) => (
        <details key={root} open>
          <summary>{root}/</summary>
          <ul>
            {groupedAreas.map((area) => (
              <li key={area.id}>
                <AreaButton area={area} selected={area.id === selectedAreaId} onSelect={onSelect} />
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}

function DependencyView({
  areas,
  allAreas,
  selectedAreaId,
  onSelect,
}: {
  areas: LocalizedRepositoryArea[];
  allAreas: LocalizedRepositoryArea[];
  selectedAreaId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="xray-dependency-view">
      {areas.map((area) => (
        <article key={area.id} data-selected={area.id === selectedAreaId ? "true" : "false"}>
          <AreaButton area={area} selected={area.id === selectedAreaId} onSelect={onSelect} />
          <span aria-hidden="true">→</span>
          <div>
            {area.dependencies.length ? (
              area.dependencies.map((dependencyId) => {
                const dependency = allAreas.find((item) => item.id === dependencyId);
                return (
                  <button key={dependencyId} type="button" onClick={() => onSelect(dependencyId)}>
                    {dependency?.name ?? dependencyId}
                  </button>
                );
              })
            ) : (
              <small>∅</small>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function AreaButton({
  area,
  selected,
  onSelect,
}: {
  area: LocalizedRepositoryArea;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      className="xray-area"
      aria-pressed={selected}
      onClick={() => onSelect(area.id)}
    >
      <span>{area.type}</span>
      <b>{area.name}</b>
      <code>{area.path}</code>
    </button>
  );
}
