"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const interactiveSelector = ["button:not(:disabled)", "a[href]", "summary", "[role='tab']"].join(
  ",",
);

const archiveRevealSelector = [
  ".engineering-cover",
  ".engineering-project-tabs > a",
  ".archive-workspace__heading",
  ".lab-board",
  ".lab-inspector",
  ".lab-controls",
  ".lab-event-log",
  ".evidence-filters",
  ".evidence-card",
  ".xray-toolbar",
  ".xray-map",
  ".xray-inspector",
  ".xray-text-alternative",
].join(",");

function reducedMotionEnabled() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function interactiveElement(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  const element = target.closest<HTMLElement>(interactiveSelector);
  if (!element || element.closest("[data-impact-off]") || element.matches("[data-impact-owned]")) {
    return null;
  }
  return element;
}

function runPressImpact(element: HTMLElement) {
  const cardLike = element.matches(
    "button, .ink-button, .paper-button, .engineering-project-tabs a, .engineering-toolbar a, .evidence-card summary",
  );
  const restingShadow = cardLike ? window.getComputedStyle(element).boxShadow : undefined;

  gsap.killTweensOf(element);
  gsap.fromTo(
    element,
    {
      x: 3,
      y: 4,
      scale: 0.92,
      rotate: 0.65,
      boxShadow: cardLike ? "0 0 0 rgba(24, 23, 20, 0)" : undefined,
      transformOrigin: "center",
    },
    {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      boxShadow: restingShadow,
      duration: 0.24,
      ease: "back.out(4.2)",
      clearProps: "transform,boxShadow",
      overwrite: "auto",
    },
  );
}

function stateEchoTarget(element: HTMLElement) {
  if (element.matches("summary")) return element.closest<HTMLElement>("details");
  if (element.matches("[role='tab']")) return document.querySelector<HTMLElement>(".xray-map");
  if (element.closest(".lab-controls, .lab-timeline")) {
    return document.querySelector<HTMLElement>(".lab-board");
  }
  if (element.closest(".xray-map")) {
    return document.querySelector<HTMLElement>(".xray-inspector");
  }
  return null;
}

function runStateEcho(element: HTMLElement) {
  const restingShadow = window.getComputedStyle(element).boxShadow;
  gsap.killTweensOf(element);
  gsap.fromTo(
    element,
    {
      y: 7,
      scale: 0.975,
      rotate: 0.4,
      boxShadow: "12px 14px 0 rgba(24, 23, 20, 0.28)",
      transformOrigin: "center top",
    },
    {
      y: 0,
      scale: 1,
      rotate: 0,
      boxShadow: restingShadow,
      duration: 0.23,
      ease: "back.out(3)",
      clearProps: "transform,boxShadow",
    },
  );
}

export function CardboardImpactMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotionEnabled()) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || reducedMotionEnabled()) return;
      const element = interactiveElement(event.target);
      if (element) runPressImpact(element);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (reducedMotionEnabled() || (event.key !== "Enter" && event.key !== " ")) {
        return;
      }
      const element = interactiveElement(event.target);
      if (element) runPressImpact(element);
    };

    const handleClick = (event: MouseEvent) => {
      if (reducedMotionEnabled()) return;
      const element = interactiveElement(event.target);
      if (!element) return;
      const echoTarget = stateEchoTarget(element);
      if (!echoTarget) return;
      window.requestAnimationFrame(() => runStateEcho(echoTarget));
    };

    document.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (reducedMotionEnabled()) return;

    gsap.registerPlugin(ScrollTrigger);
    const compact = window.matchMedia("(max-width: 600px)").matches;
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(archiveRevealSelector).forEach((element, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        gsap.fromTo(
          element,
          {
            autoAlpha: 0.18,
            x: direction * (compact ? 18 : 42),
            y: compact ? 22 : 36,
            rotate: direction * (compact ? 0.9 : 2.1),
            scale: 0.925,
            boxShadow: "18px 21px 0 rgba(24, 23, 20, 0.3)",
            transformOrigin: direction < 0 ? "left top" : "right top",
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: compact ? 0.28 : 0.36,
            ease: "back.out(2.8)",
            clearProps: "transform,opacity,visibility,boxShadow",
            scrollTrigger: {
              trigger: element,
              start: "top 94%",
              once: true,
            },
          },
        );
      });
    });

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [pathname]);

  return null;
}
