import type { MetadataRoute } from "next";
import { projectStories } from "@/data/project-stories";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const storyEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    projectStories.map((story) => ({
      url: `https://heliomatondo.dev/${locale}/projects/${story.slug}/story`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return [
    {
      url: "https://heliomatondo.dev/en",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://heliomatondo.dev/pt",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...storyEntries,
  ];
}
