import { StoryBookReader } from "@/components/project-story/StoryBookReader";
import type { ProjectStory } from "@/data/project-stories/types";
import type { Locale } from "@/i18n/config";

export function ProjectStoryShell({ story, locale }: { story: ProjectStory; locale: Locale }) {
  return (
    <StoryBookReader
      locale={locale}
      story={{
        slug: story.slug,
        projectSlug: story.projectSlug,
        sceneImage: story.sceneImage,
        sceneAlt: story.sceneAlt[locale],
        sceneCaption: story.sceneCaption[locale],
        caseNumber: story.caseNumber[locale],
        status: story.status[locale],
        repository: story.repository,
        accent: story.accent,
        content: story.content[locale],
      }}
    />
  );
}
