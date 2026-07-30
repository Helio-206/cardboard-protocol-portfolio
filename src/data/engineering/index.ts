import { africanBusinessNetworkEngineering } from "./african-business-network";
import { kayaEngineering } from "./kaya";
import { recallEngineering } from "./recall";
import {
  engineeringExperienceSlugs,
  engineeringProjectSlugs,
  type EngineeringExperienceSlug,
  type EngineeringProject,
  type EngineeringProjectSlug,
  type LocalizedEngineeringProject,
} from "./types";
import type { Locale } from "@/i18n/config";

export const engineeringProjects = [
  kayaEngineering,
  africanBusinessNetworkEngineering,
  recallEngineering,
] satisfies EngineeringProject[];

export { engineeringExperienceSlugs, engineeringProjectSlugs };
export type { EngineeringExperienceSlug, EngineeringProjectSlug, LocalizedEngineeringProject };

export function isEngineeringProjectSlug(value: string): value is EngineeringProjectSlug {
  return engineeringProjectSlugs.includes(value as EngineeringProjectSlug);
}

export function isEngineeringExperienceSlug(value: string): value is EngineeringExperienceSlug {
  return engineeringExperienceSlugs.includes(value as EngineeringExperienceSlug);
}

export function getEngineeringProject(slug: string): EngineeringProject | undefined {
  return engineeringProjects.find((project) => project.slug === slug);
}

export function localizeEngineeringProject(
  project: EngineeringProject,
  locale: Locale,
): LocalizedEngineeringProject {
  return {
    ...project,
    description: project.description[locale],
    architecturalStyle: project.architecturalStyle[locale],
    status: project.status[locale],
    lab: {
      ...project.lab,
      title: project.lab.title[locale],
      description: project.lab.description[locale],
      disclaimer: project.lab.disclaimer[locale],
      steps: project.lab.steps.map((step) => ({
        ...step,
        label: step.label[locale],
        description: step.description[locale],
        output: step.output[locale],
      })),
    },
    sources: project.sources.map((source) => ({
      ...source,
      label: source.label[locale],
    })),
    evidence: project.evidence.map((evidence) => ({
      ...evidence,
      claim: evidence.claim[locale],
      summary: evidence.summary[locale],
      whyItMatters: evidence.whyItMatters[locale],
      doesNotProve: evidence.doesNotProve[locale],
      limitation: evidence.limitation[locale],
    })),
    areas: project.areas.map((area) => ({
      ...area,
      name: area.name[locale],
      responsibility: area.responsibility[locale],
      description: area.description[locale],
      limitation: area.limitation[locale],
    })),
  };
}

export function localizeEngineeringProjects(locale: Locale): LocalizedEngineeringProject[] {
  return engineeringProjects.map((project) => localizeEngineeringProject(project, locale));
}

export function engineeringHref(
  locale: Locale,
  project: EngineeringProjectSlug,
  experience: EngineeringExperienceSlug,
  focus?: { area?: string; evidence?: string; step?: string },
): string {
  const params = new URLSearchParams();
  if (focus?.area) params.set("area", focus.area);
  if (focus?.evidence) params.set("evidence", focus.evidence);
  if (focus?.step) params.set("step", focus.step);
  const query = params.toString();
  return `/${locale}/projects/${project}/${experience}${query ? `?${query}` : ""}`;
}
