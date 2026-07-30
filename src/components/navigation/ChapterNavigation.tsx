"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { LanguageToggle } from "@/components/navigation/LanguageToggle";
import type { Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";

const chapterIds = ["origin", "engineer", "systems", "process", "experiments", "contact"] as const;

export function ChapterNavigation({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const navigationRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigation = messages[locale].navigation;

  useLayoutEffect(() => {
    const navigationElement = navigationRef.current;
    const toggle = toggleRef.current;
    const menu = menuRef.current;
    if (!open || !navigationElement || !toggle || !menu) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([toggle, menu, ...menu.children], { clearProps: "all" });
      return;
    }

    const context = gsap.context(() => {
      const items = Array.from(menu.children);
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          toggle,
          {
            scale: 0.9,
            x: 2,
            y: 3,
            boxShadow: "0 0 0 var(--ink)",
          },
          {
            scale: 1,
            x: 0,
            y: 0,
            boxShadow: "3px 3px 0 var(--ink)",
            duration: 0.12,
            ease: "back.out(3.5)",
            clearProps: "transform,boxShadow",
          },
        )
        .fromTo(
          menu,
          {
            autoAlpha: 0,
            x: 38,
            y: -24,
            rotate: 4.5,
            scale: 0.72,
            skewX: 1.8,
            transformOrigin: "right top",
            boxShadow: "22px 25px 0 rgba(24, 23, 20, 0.62)",
          },
          {
            autoAlpha: 1,
            x: -4,
            y: 7,
            rotate: -1.4,
            scale: 1.06,
            skewX: 0,
            duration: 0.14,
            ease: "power4.out",
          },
          0.025,
        )
        .to(menu, {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          boxShadow: "4px 5px 0 rgba(24, 23, 20, 0.35)",
          duration: 0.16,
          ease: "back.out(2.6)",
          clearProps: "transform,opacity,visibility,boxShadow",
        })
        .fromTo(
          items,
          { autoAlpha: 0, x: 13 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.12,
            stagger: 0.025,
            ease: "power2.out",
            clearProps: "transform,opacity,visibility",
          },
          "-=0.11",
        );
    }, navigationElement);

    return () => context.revert();
  }, [open]);

  return (
    <nav ref={navigationRef} className="chapter-nav" aria-label={navigation.index}>
      <button
        ref={toggleRef}
        type="button"
        className="chapter-nav__toggle"
        aria-expanded={open}
        aria-controls="chapter-index-menu"
        data-impact-owned
        onClick={() => setOpen((value) => !value)}
      >
        {navigation.index} <span>{open ? "−" : "+"}</span>
      </button>
      <div
        ref={menuRef}
        id="chapter-index-menu"
        className={`chapter-nav__menu ${open ? "is-open" : ""}`}
        hidden={!open}
      >
        <LanguageToggle locale={locale} label={navigation.switchLabel} />
        {chapterIds.map((id, index) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {navigation.chapters[index]}
          </a>
        ))}
      </div>
    </nav>
  );
}
