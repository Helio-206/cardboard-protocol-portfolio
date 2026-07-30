import Link from "next/link";
import { LanguageToggle } from "@/components/navigation/LanguageToggle";
import {
  engineeringExperienceSlugs,
  engineeringHref,
  type EngineeringExperienceSlug,
  type LocalizedEngineeringProject,
} from "@/data/engineering";
import type { EngineeringUi } from "@/data/engineering/ui";
import type { Locale } from "@/i18n/config";

export function EngineeringArchiveShell({
  locale,
  project,
  projects,
  experience,
  ui,
  children,
}: {
  locale: Locale;
  project: LocalizedEngineeringProject;
  projects: LocalizedEngineeringProject[];
  experience: EngineeringExperienceSlug;
  ui: EngineeringUi;
  children: React.ReactNode;
}) {
  return (
    <main className={`engineering-archive engineering-archive--${project.accent}`}>
      <header className="engineering-toolbar">
        <Link href={`/${locale}/projects/${project.slug}/story`}>{ui.backToStory}</Link>
        <nav aria-label={ui.archiveLabel}>
          {engineeringExperienceSlugs.map((item) => (
            <Link
              key={item}
              href={engineeringHref(locale, project.slug, item)}
              aria-current={item === experience ? "page" : undefined}
            >
              {ui.viewLabels[item]}
            </Link>
          ))}
        </nav>
        <LanguageToggle
          locale={locale}
          label={locale === "en" ? "Switch to Portuguese" : "Mudar para inglês"}
        />
      </header>

      <section className="engineering-cover" aria-labelledby="engineering-title">
        <div>
          <p>
            {ui.archiveLabel} / CP-{project.slug.toUpperCase()}
          </p>
          <h1 id="engineering-title">{ui.viewLabels[experience]}</h1>
          <p>{project.description}</p>
        </div>
        <dl>
          <div>
            <dt>{ui.projectFile}</dt>
            <dd>{project.name}</dd>
          </div>
          <div>
            <dt>{ui.status}</dt>
            <dd>{project.status}</dd>
          </div>
          <div>
            <dt>{ui.repository}</dt>
            <dd>
              <a href={project.repository} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <nav className="engineering-project-tabs" aria-label={ui.projectFile}>
        {projects.map((item) => (
          <Link
            key={item.slug}
            href={engineeringHref(locale, item.slug, experience)}
            aria-current={item.slug === project.slug ? "page" : undefined}
          >
            <span>{item.shortName}</span>
            <small>{item.architecturalStyle}</small>
          </Link>
        ))}
      </nav>

      {children}
    </main>
  );
}
