import type { Project } from "@/types/site";
import { PaperSheet } from "@/components/cardboard/PaperSheet";
import { TechnicalStamp } from "@/components/comic/TechnicalStamp";
import type { Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import { projectTranslations } from "@/data/project-translations";

export function ProjectIssue({
  project,
  locale,
  compact = false,
}: {
  project: Project;
  locale: Locale;
  compact?: boolean;
}) {
  const copy = locale === "pt" ? projectTranslations[project.slug] : project;
  const labels = messages[locale].project;
  return (
    <PaperSheet
      className={`project-issue project-issue--${project.accent} ${compact ? "project-issue--compact" : ""}`}
      label={project.issue}
      rotation={project.accent === "red" ? "left" : project.accent === "blue" ? "right" : "none"}
      data-reveal
    >
      <header>
        <p>{copy.eyebrow}</p>
        <TechnicalStamp tone={project.accent}>{copy.status}</TechnicalStamp>
      </header>
      <h3>{project.name}</h3>
      <p className="project-issue__context">{copy.context}</p>
      {!compact ? (
        <>
          <div className="project-issue__sequence">
            <div>
              <b>{labels.problem}</b>
              <p>{copy.context}</p>
            </div>
            <div>
              <b>{labels.approach}</b>
              <p>{copy.approach}</p>
            </div>
            <div>
              <b>{labels.result}</b>
              <p>{copy.result}</p>
            </div>
          </div>
          <div className="project-issue__architecture">
            <b>{labels.architecture}</b>
            <ul>
              {copy.architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="project-issue__result">{copy.result}</p>
      )}
      <footer>
        <div>
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
          >
            {locale === "pt" && link.label === "Repository" ? labels.repository : link.label} ↗
          </a>
        ))}
      </footer>
    </PaperSheet>
  );
}
