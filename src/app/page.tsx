import Image from "next/image";
import { CardboardSurface } from "@/components/cardboard/CardboardSurface";
import { PaperSheet } from "@/components/cardboard/PaperSheet";
import { TapeStrip } from "@/components/cardboard/TapeStrip";
import { ChapterHeading } from "@/components/comic/ChapterHeading";
import { NarrationBox } from "@/components/comic/NarrationBox";
import { TechnicalStamp } from "@/components/comic/TechnicalStamp";
import { StoryMotion } from "@/components/motion/StoryMotion";
import { ChapterNavigation } from "@/components/navigation/ChapterNavigation";
import { ReadingProgress } from "@/components/navigation/ReadingProgress";
import { ProjectIssue } from "@/components/projects/ProjectIssue";
import { BlueprintDiagram } from "@/components/ui/BlueprintDiagram";
import { CodeFragment } from "@/components/ui/CodeFragment";
import { InkArrow } from "@/components/ui/InkArrow";
import { defaultLocale, type Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import { experiments, projects } from "@/data/projects";
import { site } from "@/data/site";
import { skillClustersByLocale } from "@/data/skills";
import { timelineByLocale } from "@/data/timeline";

export function PortfolioHome({ locale = defaultLocale }: { locale?: Locale }) {
  const content = messages[locale];
  const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(content.chapters.contact.whatsappMessage)}`;
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: "https://heliomatondo.dev",
    jobTitle: site.title,
    email: site.email,
    sameAs: [site.github],
    knowsAbout: [
      "Software engineering",
      "Systems architecture",
      "Distributed systems",
      "Digital products",
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <ReadingProgress locale={locale} />
      <ChapterNavigation locale={locale} />
      <StoryMotion />

      <CardboardSurface className="cover" aria-labelledby="cover-title">
        <header className="cover__bar">
          <p>CARDBOARD PROTOCOL</p>
          <p>ISSUE 001</p>
          <p>2022 — {content.cover.present}</p>
        </header>
        <div className="cover__grid">
          <div className="cover__content" data-reveal>
            <TechnicalStamp tone="red">{content.cover.archive}</TechnicalStamp>
            <h1 id="cover-title">
              HÉLIO
              <br />
              MATONDO
            </h1>
            <p className="cover__role">{content.cover.role.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p>
            <p className="cover__subhead">{content.cover.subtitle}</p>
            <div className="cover__actions">
              <a className="ink-button" href="#origin">
                {content.cover.readStory} <InkArrow />
              </a>
              <a className="paper-button" href="#systems">
                {content.cover.viewProjects}
              </a>
            </div>
            <p className="cover__location">{content.cover.location}</p>
          </div>
          <div
            className="hero-artifact"
            aria-label={content.cover.artifactLabel}
          >
            <Image
              src="/illustrations/cardboard-protocol-cover.png"
              alt={content.cover.imageAlt}
              width={941}
              height={1672}
              priority
              sizes="(max-width: 900px) 88vw, 48vw"
            />
          </div>
        </div>
        <a className="cover__scroll" href="#origin">
          {content.cover.scroll} <span>↓</span>
        </a>
      </CardboardSurface>

      <CardboardSurface
        id="origin"
        className="chapter chapter--origin"
        aria-labelledby="origin-title"
      >
        <ChapterHeading
          chapter={content.chapters.origin.label}
          headingId="origin-title"
          title={content.chapters.origin.title}
          note={content.chapters.origin.note}
        />
        <div className="comic-grid comic-grid--origin">
          <PaperSheet rotation="left" label="P. 01" data-reveal>
            <h3>{content.chapters.origin.panels[0].title}</h3>
            <p>{content.chapters.origin.panels[0].body}</p>
          </PaperSheet>
          <PaperSheet label="P. 02" data-reveal>
            <h3>{content.chapters.origin.panels[1].title}</h3>
            <p>{content.chapters.origin.panels[1].body}</p>
            <TapeStrip position="corner" />
          </PaperSheet>
          <PaperSheet rotation="right" label="P. 03" data-reveal>
            <h3>{content.chapters.origin.panels[2].title}</h3>
            <p>{content.chapters.origin.panels[2].body}</p>
          </PaperSheet>
          <NarrationBox>
            <strong>{content.cover.fieldNote}</strong>
            <p>{content.chapters.origin.fieldNote}</p>
          </NarrationBox>
        </div>
      </CardboardSurface>

      <CardboardSurface
        id="engineer"
        className="chapter chapter--engineer"
        tone="paper"
        aria-labelledby="engineer-title"
      >
        <ChapterHeading
          chapter={content.chapters.engineer.label}
          headingId="engineer-title"
          title={content.chapters.engineer.title}
          note={content.chapters.engineer.note}
        />
        <div className="systems-map" data-reveal>
          <div className="systems-map__wires" aria-hidden="true" />
          {skillClustersByLocale[locale].map((cluster) => (
            <PaperSheet
              key={cluster.name}
              className={`skill-node skill-node--${cluster.position}`}
              label={cluster.short}
            >
              <h3>{cluster.name}</h3>
              <ul>
                {cluster.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </PaperSheet>
          ))}
        </div>
        <section className="timeline" aria-label={content.chapters.engineer.timelineLabel}>
          {timelineByLocale[locale].map((entry) => (
            <article key={entry.period} className="timeline__entry" data-reveal>
              <p>{entry.period}</p>
              <h3>{entry.title}</h3>
              <span>{entry.detail}</span>
            </article>
          ))}
        </section>
      </CardboardSurface>

      <CardboardSurface
        id="systems"
        className="chapter chapter--systems"
        aria-labelledby="systems-title"
      >
        <ChapterHeading
          chapter={content.chapters.systems.label}
          headingId="systems-title"
          title={content.chapters.systems.title}
          note={content.chapters.systems.note}
        />
        <div className="project-stack">
          {projects.map((project) => (
            <ProjectIssue key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      </CardboardSurface>

      <CardboardSurface
        id="process"
        className="chapter chapter--process"
        tone="paper"
        aria-labelledby="process-title"
      >
        <ChapterHeading
          chapter={content.chapters.process.label}
          headingId="process-title"
          title={content.chapters.process.title}
          note={content.chapters.process.note}
        />
        <div className="process-layout">
          <BlueprintDiagram locale={locale} />
          <PaperSheet rotation="right" label={content.chapters.process.protocol} className="process-sheet" data-reveal>
            <ol>
              {content.chapters.process.steps.map((item, index) => (
                <li key={item}>
                  <span>0{index + 1}</span>
                  {item}
                  <i>→</i>
                </li>
              ))}
            </ol>
            <p>{content.chapters.process.statement}</p>
          </PaperSheet>
          <PaperSheet label={content.chapters.process.safeSnippet} className="process-code" data-reveal>
            <CodeFragment />
          </PaperSheet>
        </div>
      </CardboardSurface>

      <CardboardSurface
        id="experiments"
        className="chapter chapter--experiments"
        aria-labelledby="experiments-title"
      >
        <ChapterHeading
          chapter={content.chapters.experiments.label}
          headingId="experiments-title"
          title={content.chapters.experiments.title}
          note={content.chapters.experiments.note}
        />
        <div className="experiment-wall">
          {experiments.map((project) => (
            <ProjectIssue key={project.slug} project={project} locale={locale} compact />
          ))}
        </div>
        <div className="private-files" data-reveal>
          <TechnicalStamp tone="ink">{content.chapters.experiments.privateLabel}</TechnicalStamp>
          <p>{content.chapters.experiments.privateNote}</p>
        </div>
      </CardboardSurface>

      <CardboardSurface
        id="contact"
        className="chapter chapter--contact"
        tone="deep"
        aria-labelledby="contact-title"
      >
        <ChapterHeading
          chapter={content.chapters.contact.label}
          headingId="contact-title"
          title={content.chapters.contact.title}
          note={content.chapters.contact.note}
        />
        <PaperSheet className="contact-sheet" rotation="left" label={content.chapters.contact.backCover} data-reveal>
          <h2 id="contact-title">
            {content.chapters.contact.heading.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}
          </h2>
          <p>{content.chapters.contact.body}</p>
          <a className="ink-button" href={whatsappHref} target="_blank" rel="noreferrer">
            {content.chapters.contact.cta} <InkArrow />
          </a>
          <div className="contact-sheet__links">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub / Helio-206 ↗
            </a>
          </div>
          <TechnicalStamp tone="red">{content.chapters.contact.stamp}</TechnicalStamp>
        </PaperSheet>
        <footer>
          © {new Date().getFullYear()} HÉLIO MATONDO <span>{content.chapters.contact.end}</span>
        </footer>
      </CardboardSurface>
    </main>
  );
}

export default function Home() {
  return <PortfolioHome />;
}
