import Image from "next/image";
import { ComicPanel } from "@/components/project-story/ComicPanel";
import type {
  StoryChapter as StoryChapterData,
  StoryUiMessages,
} from "@/data/project-stories/types";

export function StoryChapter({
  chapter,
  pageNumber,
  totalPages,
  ui,
  hidden,
  scene,
}: {
  chapter: StoryChapterData;
  pageNumber: number;
  totalPages: number;
  ui: StoryUiMessages;
  hidden: boolean;
  scene?: {
    image: string;
    alt: string;
    caption: string;
  };
}) {
  const physicalPageNumber = pageNumber + 1;

  return (
    <article
      id={`page-${pageNumber}`}
      className={`story-book__leaf story-chapter${scene ? " story-chapter--scene" : ""}`}
      aria-labelledby={`story-chapter-${chapter.number}`}
      hidden={hidden}
    >
      <header className="story-chapter__header">
        <p>
          {ui.chapter} {chapter.number}
        </p>
        <div>
          <h2 id={`story-chapter-${chapter.number}`} tabIndex={-1}>
            {chapter.title}
          </h2>
          <p>{chapter.summary}</p>
        </div>
      </header>

      {scene ? (
        <figure className="story-scene">
          <div className="story-scene__image">
            <Image
              src={scene.image}
              alt={scene.alt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              quality={84}
            />
          </div>
          <figcaption>
            <span>{ui.conceptualReconstruction}</span>
            <p>{scene.caption}</p>
          </figcaption>
        </figure>
      ) : null}

      <div
        className={`story-chapter__panels story-chapter__panels--${Math.min(chapter.panels.length, 3)}`}
      >
        {chapter.panels.map((panel, panelIndex) => (
          <ComicPanel key={`${chapter.id}-${panelIndex}`} panel={panel} index={panelIndex} />
        ))}
      </div>

      <footer className="story-book__folio" aria-label={`${ui.page} ${physicalPageNumber}`}>
        <span>{String(physicalPageNumber).padStart(2, "0")}</span>
        <span>
          {ui.page} {physicalPageNumber} {ui.of} {totalPages}
        </span>
      </footer>
    </article>
  );
}
