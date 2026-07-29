import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/styles/project-story-book.css";
import { LocaleDocument } from "@/components/navigation/LocaleDocument";
import { ProjectStoryShell } from "@/components/project-story/ProjectStoryShell";
import { getProjectStory, projectStories } from "@/data/project-stories";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";

const baseUrl = new URL("https://heliomatondo.dev");

type StoryPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => projectStories.map((story) => ({ locale, slug: story.slug })));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { locale: localeValue, slug } = await params;
  const locale: Locale = isLocale(localeValue) ? localeValue : defaultLocale;
  const story = getProjectStory(slug);
  if (!story) notFound();

  const content = story.content[locale];
  const canonical = `/${locale}/projects/${story.slug}/story`;

  return {
    metadataBase: baseUrl,
    title: { absolute: story.seoTitle[locale] },
    description: content.description,
    alternates: {
      canonical,
      languages: {
        en: `/en/projects/${story.slug}/story`,
        pt: `/pt/projects/${story.slug}/story`,
        "x-default": `/en/projects/${story.slug}/story`,
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: "Hélio Matondo",
      locale: locale === "pt" ? "pt_AO" : "en_US",
      alternateLocale: locale === "pt" ? "en_US" : "pt_AO",
      title: story.seoTitle[locale],
      description: content.description,
      images: [
        {
          url: "/social/cardboard-protocol-og.jpg",
          width: 1731,
          height: 909,
          alt: `${story.content[locale].title} — CARDBOARD PROTOCOL`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: story.seoTitle[locale],
      description: content.description,
      images: ["/social/cardboard-protocol-og.jpg"],
    },
  };
}

export default async function ProjectStoryPage({ params }: StoryPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const story = getProjectStory(slug);
  if (!story) notFound();

  const content = story.content[locale];
  const url = `https://heliomatondo.dev/${locale}/projects/${story.slug}/story`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: story.seoTitle[locale],
    description: content.description,
    url,
    inLanguage: locale,
    author: { "@type": "Person", name: "Hélio Matondo" },
    about: content.thesis,
    isBasedOn: story.repository,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hélio Matondo",
        item: `https://heliomatondo.dev/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: content.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <LocaleDocument locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProjectStoryShell story={story} locale={locale} />
    </>
  );
}
