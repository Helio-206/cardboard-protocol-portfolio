"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { gsap } from "gsap";
import { LanguageToggle } from "@/components/navigation/LanguageToggle";
import { StoryChapter } from "@/components/project-story/StoryChapter";
import { StoryProgress } from "@/components/project-story/StoryProgress";
import type { ProjectStoryEditionData } from "@/data/project-stories/types";
import { storyUi } from "@/data/project-stories/ui";
import type { Locale } from "@/i18n/config";

const desktopQuery = "(min-width: 901px)";

function clampPage(page: number, total: number) {
  return Math.min(total - 1, Math.max(0, page));
}

function visiblePagesFor(page: number, total: number, desktop: boolean) {
  if (!desktop || page === 0 || page === total - 1) return new Set([page]);

  const spreadStart = page % 2 === 1 ? page : page - 1;
  return new Set([spreadStart, Math.min(spreadStart + 1, total - 2)]);
}

function previousTarget(page: number, total: number, desktop: boolean) {
  if (!desktop) return clampPage(page - 1, total);
  if (page === total - 1) return Math.max(1, total - 3);
  if (page <= 1) return 0;
  return Math.max(1, (page % 2 === 1 ? page : page - 1) - 2);
}

function nextTarget(page: number, total: number, desktop: boolean) {
  if (!desktop) return clampPage(page + 1, total);
  if (page === 0) return 1;

  const spreadStart = page % 2 === 1 ? page : page - 1;
  return spreadStart + 2 > total - 2 ? total - 1 : spreadStart + 2;
}

export function StoryBookReader({
  story,
  locale,
}: {
  story: ProjectStoryEditionData;
  locale: Locale;
}) {
  const content = story.content;
  const ui = storyUi[locale];
  const totalPages = content.chapters.length + 2;
  const projectAnchor = story.projectSlug === "recall" ? "experiments" : "systems";
  const [currentPage, setCurrentPage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const stageRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogClosing = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const visiblePages = useMemo(
    () => visiblePagesFor(currentPage, totalPages, isDesktop),
    [currentPage, isDesktop, totalPages],
  );

  const navigateTo = useCallback(
    (target: number) => {
      const nextPage = clampPage(target, totalPages);
      if (nextPage === currentPage) return;

      setDirection(nextPage > currentPage ? "forward" : "backward");
      setCurrentPage(nextPage);
      window.requestAnimationFrame(() => {
        stageRef.current?.scrollIntoView({
          block: "start",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
      });
    },
    [currentPage, totalPages],
  );

  const goPrevious = useCallback(() => {
    navigateTo(previousTarget(currentPage, totalPages, isDesktop));
  }, [currentPage, isDesktop, navigateTo, totalPages]);

  const goNext = useCallback(() => {
    navigateTo(nextTarget(currentPage, totalPages, isDesktop));
  }, [currentPage, isDesktop, navigateTo, totalPages]);

  useEffect(() => {
    const media = window.matchMedia(desktopQuery);
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#page-${currentPage}`);
  }, [currentPage]);

  useLayoutEffect(() => {
    const spread = stageRef.current?.querySelector<HTMLElement>(".story-book__spread");
    if (!spread || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const leaves = spread.querySelectorAll<HTMLElement>(".story-book__leaf:not([hidden])");
    const forward = direction === "forward";
    const timeline = gsap.timeline();

    timeline.fromTo(
      leaves,
      {
        autoAlpha: 0.35,
        xPercent: forward ? 105 : -105,
        rotateY: forward ? -18 : 18,
        rotateZ: forward ? -1.1 : 1.1,
        scale: 0.985,
        transformPerspective: 1400,
        transformOrigin: forward ? "left center" : "right center",
        boxShadow: forward
          ? "-18px 18px 0 rgba(24, 23, 20, 0.2)"
          : "18px 18px 0 rgba(24, 23, 20, 0.2)",
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility,boxShadow",
      },
    );

    return () => {
      timeline.kill();
      gsap.killTweensOf(leaves);
    };
  }, [currentPage, direction, isDesktop]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goPrevious();
      }
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        goNext();
      }
      if (event.key === "Home") {
        event.preventDefault();
        navigateTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        navigateTo(totalPages - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrevious, navigateTo, totalPages]);

  const openIndex = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    dialog.showModal();
    dialogClosing.current = false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(dialog, { clearProps: "all" });
      return;
    }

    const stampColor =
      story.accent === "blue" ? "rgba(49, 92, 114, 0.72)" : "rgba(164, 67, 53, 0.72)";
    gsap
      .timeline()
      .fromTo(
        dialog,
        {
          autoAlpha: 0,
          y: -48,
          rotate: -4,
          scale: 0.78,
          transformPerspective: 1200,
          boxShadow: `28px 30px 0 ${stampColor}`,
        },
        {
          autoAlpha: 1,
          y: 10,
          rotate: 1.6,
          scale: 1.06,
          duration: 0.2,
          ease: "power4.out",
        },
      )
      .to(dialog, {
        y: 0,
        rotate: 0,
        scale: 1,
        boxShadow: `10px 12px 0 ${stampColor}`,
        duration: 0.3,
        ease: "bounce.out",
        clearProps: "transform,opacity,visibility,boxShadow",
      });
  };

  const closeIndex = useCallback((): Promise<void> => {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialogClosing.current) return Promise.resolve();
    dialogClosing.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(dialog, { clearProps: "all" });
      dialog.close();
      dialogClosing.current = false;
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      gsap.to(dialog, {
        autoAlpha: 0,
        y: 16,
        rotate: 1,
        scale: 0.98,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          dialog.close();
          dialogClosing.current = false;
          resolve();
        },
      });
    });
  }, []);

  const selectPage = async (page: number) => {
    await closeIndex();
    navigateTo(page);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const horizontal = touch.clientX - start.x;
    const vertical = touch.clientY - start.y;
    if (Math.abs(horizontal) < 58 || Math.abs(horizontal) <= Math.abs(vertical)) return;
    if (horizontal < 0) goNext();
    else goPrevious();
  };

  return (
    <main
      className={`project-story story-book project-story--${story.accent}`}
      style={{ "--story-cover-image": `url("${story.sceneImage}")` } as CSSProperties}
    >
      <StoryProgress current={currentPage} total={totalPages} label={ui.readingProgress} />

      <header className="story-book__toolbar">
        <Link href={`/${locale}#${projectAnchor}`}>{ui.backToProject}</Link>
        <button type="button" onClick={openIndex} aria-label={ui.openIndex}>
          {ui.indexShort}
        </button>
        <LanguageToggle locale={locale} label={ui.switchLanguage} />
      </header>

      <div
        ref={stageRef}
        className="story-book__stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="story-book__spread"
          data-direction={direction}
          data-single={visiblePages.size === 1 ? "true" : "false"}
          key={`${currentPage}-${isDesktop ? "spread" : "page"}`}
        >
          <article
            id="page-0"
            className="story-book__leaf story-book__cover"
            hidden={!visiblePages.has(0)}
          >
            <div className="story-book__cover-meta">
              <span>{story.caseNumber}</span>
              <span>{story.status}</span>
            </div>
            <div className="story-book__cover-title">
              <p>{ui.protocolLabel}</p>
              <h1>{content.title}</h1>
              <p>{content.subtitle}</p>
            </div>
            <div className="story-book__cover-footer">
              <div>
                <span>{ui.coreThesis}</span>
                <p>{content.thesis}</p>
              </div>
              <button type="button" onClick={() => navigateTo(1)}>
                {ui.beginReading}
              </button>
            </div>
          </article>

          {content.chapters.map((chapter, chapterIndex) => {
            const pageNumber = chapterIndex + 1;
            return (
              <StoryChapter
                key={chapter.id}
                chapter={chapter}
                pageNumber={pageNumber}
                totalPages={totalPages}
                ui={ui}
                hidden={!visiblePages.has(pageNumber)}
                scene={
                  chapterIndex === 0
                    ? {
                        image: story.sceneImage,
                        alt: story.sceneAlt,
                        caption: story.sceneCaption,
                      }
                    : undefined
                }
              />
            );
          })}

          <article
            id={`page-${totalPages - 1}`}
            className="story-book__leaf story-book__back-cover"
            hidden={!visiblePages.has(totalPages - 1)}
          >
            <p>{ui.backCover}</p>
            <blockquote>{content.finalLine}</blockquote>
            <div>
              <a href={story.repository} target="_blank" rel="noreferrer">
                {ui.repository}
              </a>
              <button type="button" onClick={() => navigateTo(0)}>
                {ui.readAgain}
              </button>
              <Link href={`/${locale}#${projectAnchor}`}>{ui.backToProject}</Link>
            </div>
          </article>
        </div>
      </div>

      <nav className="story-book__controls" aria-label={ui.readingProgress}>
        <button type="button" onClick={goPrevious} disabled={currentPage === 0}>
          {ui.previousPage}
        </button>
        <p aria-live="polite">
          <span>{ui.page}</span> {currentPage + 1} {ui.of} {totalPages}
          <small>{ui.swipeHint}</small>
        </p>
        <button type="button" onClick={goNext} disabled={currentPage === totalPages - 1}>
          {ui.nextPage}
        </button>
      </nav>

      <dialog
        ref={dialogRef}
        className="story-book__index"
        aria-labelledby="story-index-title"
        onCancel={(event) => {
          event.preventDefault();
          void closeIndex();
        }}
        onClick={(event) => {
          if (event.currentTarget === event.target) void closeIndex();
        }}
      >
        <header>
          <h2 id="story-index-title">{ui.tableOfContents}</h2>
          <button type="button" onClick={() => void closeIndex()}>
            {ui.closeIndex}
          </button>
        </header>
        <ol>
          <li>
            <button
              type="button"
              aria-current={currentPage === 0 ? "page" : undefined}
              onClick={() => selectPage(0)}
            >
              <span>00</span>
              {content.title}
            </button>
          </li>
          {content.chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <button
                type="button"
                aria-current={visiblePages.has(index + 1) ? "page" : undefined}
                onClick={() => selectPage(index + 1)}
              >
                <span>{chapter.number}</span>
                {chapter.title}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              aria-current={currentPage === totalPages - 1 ? "page" : undefined}
              onClick={() => selectPage(totalPages - 1)}
            >
              <span>{String(totalPages - 1).padStart(2, "0")}</span>
              {ui.backCover}
            </button>
          </li>
        </ol>
      </dialog>
    </main>
  );
}
