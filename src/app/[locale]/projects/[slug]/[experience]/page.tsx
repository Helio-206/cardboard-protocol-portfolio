import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EngineeringArchiveShell } from "@/components/engineering/EngineeringArchiveShell";
import { EvidenceRoom } from "@/components/engineering/EvidenceRoom";
import { LiveSystemLab } from "@/components/engineering/LiveSystemLab";
import { RepositoryXray } from "@/components/engineering/RepositoryXray";
import { LocaleDocument } from "@/components/navigation/LocaleDocument";
import {
  engineeringExperienceSlugs,
  engineeringHref,
  engineeringProjectSlugs,
  getEngineeringProject,
  isEngineeringExperienceSlug,
  isEngineeringProjectSlug,
  localizeEngineeringProject,
  localizeEngineeringProjects,
} from "@/data/engineering";
import { engineeringUi } from "@/data/engineering/ui";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";

const baseUrl = new URL("https://heliomatondo.dev");

export const dynamicParams = false;

type EngineeringPageProps = {
  params: Promise<{ locale: string; slug: string; experience: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    engineeringProjectSlugs.flatMap((slug) =>
      engineeringExperienceSlugs.map((experience) => ({ locale, slug, experience })),
    ),
  );
}

export async function generateMetadata({ params }: EngineeringPageProps): Promise<Metadata> {
  const values = await params;
  const locale: Locale = isLocale(values.locale) ? values.locale : defaultLocale;
  if (!isEngineeringProjectSlug(values.slug) || !isEngineeringExperienceSlug(values.experience)) {
    notFound();
  }

  const project = getEngineeringProject(values.slug);
  if (!project) notFound();
  const ui = engineeringUi[locale];
  const copy = ui.metadata[values.experience];
  const canonical = engineeringHref(locale, project.slug, values.experience);
  const title = `${project.name} — ${copy.title}`;

  return {
    metadataBase: baseUrl,
    title: { absolute: `${title} | Hélio Matondo` },
    description: copy.description,
    alternates: {
      canonical,
      languages: {
        en: engineeringHref("en", project.slug, values.experience),
        pt: engineeringHref("pt", project.slug, values.experience),
        "x-default": engineeringHref("en", project.slug, values.experience),
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Hélio Matondo",
      locale: locale === "pt" ? "pt_AO" : "en_US",
      alternateLocale: locale === "pt" ? "en_US" : "pt_AO",
      title,
      description: copy.description,
      images: [
        {
          url: "/social/cardboard-protocol-og.jpg",
          width: 1731,
          height: 909,
          alt: `${title} — CARDBOARD PROTOCOL`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.description,
      images: ["/social/cardboard-protocol-og.jpg"],
    },
  };
}

export default async function EngineeringPage({ params }: EngineeringPageProps) {
  const values = await params;
  if (
    !isLocale(values.locale) ||
    !isEngineeringProjectSlug(values.slug) ||
    !isEngineeringExperienceSlug(values.experience)
  ) {
    notFound();
  }

  const sourceProject = getEngineeringProject(values.slug);
  if (!sourceProject) notFound();

  const locale = values.locale;
  const project = localizeEngineeringProject(sourceProject, locale);
  const projects = localizeEngineeringProjects(locale);
  const ui = engineeringUi[locale];
  const canonical = `https://heliomatondo.dev${engineeringHref(
    locale,
    project.slug,
    values.experience,
  )}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type":
      values.experience === "lab"
        ? "WebApplication"
        : values.experience === "evidence"
          ? "CollectionPage"
          : "TechArticle",
    name: `${project.name} — ${ui.viewLabels[values.experience]}`,
    description: ui.metadata[values.experience].description,
    url: canonical,
    about: {
      "@type": "SoftwareSourceCode",
      name: project.name,
      codeRepository: project.repository,
    },
    author: { "@type": "Person", name: "Hélio Matondo" },
    inLanguage: locale,
  };

  return (
    <>
      <LocaleDocument locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <EngineeringArchiveShell
        locale={locale}
        project={project}
        projects={projects}
        experience={values.experience}
        ui={ui}
      >
        {values.experience === "lab" ? (
          <LiveSystemLab locale={locale} project={project} ui={ui} />
        ) : null}
        {values.experience === "evidence" ? (
          <EvidenceRoom locale={locale} projects={projects} initialProject={project.slug} ui={ui} />
        ) : null}
        {values.experience === "x-ray" ? (
          <RepositoryXray locale={locale} project={project} ui={ui} />
        ) : null}
      </EngineeringArchiveShell>
    </>
  );
}
