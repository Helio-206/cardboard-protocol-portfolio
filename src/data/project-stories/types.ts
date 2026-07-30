import type { Locale } from "@/i18n/config";

export const projectStorySlugs = ["kaya", "african-business-network", "recall"] as const;

export type ProjectStorySlug = (typeof projectStorySlugs)[number];

export type StoryPanelKind = "caption" | "decision" | "flow" | "terminal" | "technical" | "limits";

export type StoryPanel = {
  kind: StoryPanelKind;
  title?: string;
  stamp?: string;
  body?: string[];
  items?: string[];
  steps?: string[];
  lines?: string[];
  tone?: "ink" | "red" | "blue";
};

export type StoryChapter = {
  id: string;
  number: string;
  title: string;
  summary: string;
  panels: StoryPanel[];
};

export type ProjectStoryLocale = {
  title: string;
  subtitle: string;
  description: string;
  thesis: string;
  chapters: StoryChapter[];
  finalLine: string;
};

export type ProjectStory = {
  id: string;
  slug: ProjectStorySlug;
  projectSlug: string;
  sceneImage: string;
  sceneAlt: Record<Locale, string>;
  sceneCaption: Record<Locale, string>;
  caseNumber: Record<Locale, string>;
  classification: Record<Locale, string>;
  status: Record<Locale, string>;
  repository: string;
  accent: "ink" | "red" | "blue";
  seoTitle: Record<Locale, string>;
  content: Record<Locale, ProjectStoryLocale>;
};

export type ProjectStoryEditionData = {
  slug: ProjectStorySlug;
  projectSlug: string;
  sceneImage: string;
  sceneAlt: string;
  sceneCaption: string;
  caseNumber: string;
  status: string;
  repository: string;
  accent: ProjectStory["accent"];
  content: ProjectStoryLocale;
};

export type StoryUiMessages = {
  protocolLabel: string;
  coreThesis: string;
  edition: string;
  conceptualReconstruction: string;
  indexShort: string;
  openIndex: string;
  closeIndex: string;
  beginReading: string;
  previousPage: string;
  nextPage: string;
  page: string;
  of: string;
  swipeHint: string;
  backCover: string;
  readAgain: string;
  backToProject: string;
  skipToTechnicalFile: string;
  previousChapter: string;
  nextChapter: string;
  openProjectFile: string;
  tableOfContents: string;
  technicalFile: string;
  repository: string;
  chapter: string;
  readingProgress: string;
  switchLanguage: string;
  runSystemLab: string;
  enterEvidenceRoom: string;
  inspectRepository: string;
};
