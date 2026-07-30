"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function StoryMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const compact = window.matchMedia("(max-width: 600px)").matches;
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element, index) => {
        const cardLike = element.matches(
          ".paper-sheet, .project-issue, .timeline__entry, .private-files, .systems-map",
        );
        const direction = index % 2 === 0 ? -1 : 1;
        gsap.fromTo(
          element,
          {
            autoAlpha: cardLike ? 0.18 : 0,
            x: direction * (cardLike ? (compact ? 18 : 48) : compact ? 10 : 24),
            y: cardLike ? (compact ? 24 : 42) : compact ? 16 : 25,
            rotate: direction * (cardLike ? (compact ? 1 : 2.5) : 0.8),
            scale: cardLike ? 0.91 : 0.97,
            boxShadow: cardLike ? "18px 21px 0 rgba(24, 23, 20, 0.3)" : undefined,
            transformOrigin: direction < 0 ? "left top" : "right top",
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: cardLike ? (compact ? 0.28 : 0.36) : 0.3,
            ease: cardLike ? "back.out(2.8)" : "power4.out",
            clearProps: "transform,opacity,visibility,boxShadow",
            scrollTrigger: { trigger: element, start: "top 90%", once: true },
          },
        );
      });
      gsap.fromTo(
        ".hero-artifact",
        { rotate: -1.8, y: 36 },
        {
          rotate: 0.8,
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: ".cover", start: "top top", end: "bottom top", scrub: 0.8 },
        },
      );
    });
    return () => context.revert();
  }, []);

  return null;
}
