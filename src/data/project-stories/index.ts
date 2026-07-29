import { africanBusinessNetworkStory } from "@/data/project-stories/african-business-network";
import { kayaStory } from "@/data/project-stories/kaya";
import { recallStory } from "@/data/project-stories/recall";
import type { ProjectStory, ProjectStorySlug } from "@/data/project-stories/types";

export const projectStories = [
  kayaStory,
  africanBusinessNetworkStory,
  recallStory,
] satisfies ProjectStory[];

export function getProjectStory(slug: string): ProjectStory | undefined {
  return projectStories.find((story) => story.slug === slug);
}

export function isProjectStorySlug(slug: string): slug is ProjectStorySlug {
  return projectStories.some((story) => story.slug === slug);
}
