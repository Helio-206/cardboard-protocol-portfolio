import type { Locale } from "@/i18n/config";

export const engineeringProjectSlugs = ["kaya", "african-business-network", "recall"] as const;
export const engineeringExperienceSlugs = ["lab", "evidence", "x-ray"] as const;

export type EngineeringProjectSlug = (typeof engineeringProjectSlugs)[number];
export type EngineeringExperienceSlug = (typeof engineeringExperienceSlugs)[number];
export type LocalizedText = Record<Locale, string>;

export type EvidenceStatus =
  "verified" | "documented" | "demonstrated" | "experimental" | "planned" | "limited" | "unknown";

export type EvidenceConfidence = "high" | "medium" | "low";

export type EvidenceCategory =
  | "architecture"
  | "repository-structure"
  | "documentation"
  | "testing"
  | "runtime-behaviour"
  | "security"
  | "product-scope"
  | "known-limitations"
  | "roadmap"
  | "release"
  | "api"
  | "domain-model";

export type RepositoryAreaType =
  | "application"
  | "domain"
  | "infrastructure"
  | "interface"
  | "worker"
  | "service"
  | "package"
  | "crate"
  | "module"
  | "documentation"
  | "database"
  | "search"
  | "ai"
  | "network"
  | "security"
  | "tooling"
  | "test"
  | "experimental";

export type SourceType = "repository" | "code" | "documentation" | "manifest" | "release";

export type PublicSource = {
  id: string;
  type: SourceType;
  label: LocalizedText;
  path: string;
  url: string;
  reviewedAt: string;
};

export type LabStep = {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
  event: string;
  output: LocalizedText;
  state: "queued" | "active" | "completed" | "failed" | "fallback";
  marker: "verified" | "documented" | "simulated" | "experimental";
  durationMs: number;
  areaId?: string;
  evidenceIds: string[];
};

export type LabDefinition = {
  id: string;
  project: EngineeringProjectSlug;
  title: LocalizedText;
  description: LocalizedText;
  disclaimer: LocalizedText;
  failureAtStepId?: string;
  fallbackStepId?: string;
  steps: LabStep[];
};

export type EvidenceRecord = {
  id: string;
  project: EngineeringProjectSlug;
  category: EvidenceCategory;
  status: EvidenceStatus;
  confidence: EvidenceConfidence;
  claim: LocalizedText;
  summary: LocalizedText;
  whyItMatters: LocalizedText;
  doesNotProve: LocalizedText;
  limitation: LocalizedText;
  sourceId: string;
  areaId: string;
  labStepId?: string;
  chapterId?: string;
};

export type RepositoryArea = {
  id: string;
  project: EngineeringProjectSlug;
  name: LocalizedText;
  responsibility: LocalizedText;
  description: LocalizedText;
  limitation: LocalizedText;
  type: RepositoryAreaType;
  path: string;
  parentId?: string;
  dependencies: string[];
  status: EvidenceStatus;
  sourceIds: string[];
  labStepId?: string;
  evidenceIds: string[];
};

export type EngineeringProject = {
  slug: EngineeringProjectSlug;
  name: string;
  shortName: string;
  repository: string;
  accent: "ink" | "red" | "blue";
  description: LocalizedText;
  architecturalStyle: LocalizedText;
  status: LocalizedText;
  lab: LabDefinition;
  sources: PublicSource[];
  evidence: EvidenceRecord[];
  areas: RepositoryArea[];
};

export type LocalizedLabStep = Omit<LabStep, "label" | "description" | "output"> & {
  label: string;
  description: string;
  output: string;
};

export type LocalizedLab = Omit<LabDefinition, "title" | "description" | "disclaimer" | "steps"> & {
  title: string;
  description: string;
  disclaimer: string;
  steps: LocalizedLabStep[];
};

export type LocalizedEvidence = Omit<
  EvidenceRecord,
  "claim" | "summary" | "whyItMatters" | "doesNotProve" | "limitation"
> & {
  claim: string;
  summary: string;
  whyItMatters: string;
  doesNotProve: string;
  limitation: string;
};

export type LocalizedSource = Omit<PublicSource, "label"> & { label: string };

export type LocalizedRepositoryArea = Omit<
  RepositoryArea,
  "name" | "responsibility" | "description" | "limitation"
> & {
  name: string;
  responsibility: string;
  description: string;
  limitation: string;
};

export type LocalizedEngineeringProject = Omit<
  EngineeringProject,
  "description" | "architecturalStyle" | "status" | "lab" | "sources" | "evidence" | "areas"
> & {
  description: string;
  architecturalStyle: string;
  status: string;
  lab: LocalizedLab;
  sources: LocalizedSource[];
  evidence: LocalizedEvidence[];
  areas: LocalizedRepositoryArea[];
};
