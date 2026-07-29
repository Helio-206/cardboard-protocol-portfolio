export type Locale = "en" | "pt";

export type ProjectLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type Project = {
  slug: string;
  issue: string;
  name: string;
  eyebrow: string;
  status: string;
  context: string;
  approach: string;
  architecture: string[];
  technologies: string[];
  result: string;
  links: ProjectLink[];
  storySlug?: "kaya" | "african-business-network" | "recall";
  accent: "blue" | "red" | "ink";
};

export type TimelineEntry = {
  period: string;
  title: string;
  detail: string;
};

export type SkillCluster = {
  name: string;
  short: string;
  items: string[];
  position: "north" | "east" | "south" | "west" | "core";
};
