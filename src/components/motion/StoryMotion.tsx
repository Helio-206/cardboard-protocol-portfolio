"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function StoryMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 28, rotate: -0.6, opacity: 0 },
          {
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
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
