"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";

export function ReadingProgress({ locale }: { locale: Locale }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maximum > 0 ? Math.min(100, (window.scrollY / maximum) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="reading-progress" aria-label={`${messages[locale].accessibility.readingProgress}: ${Math.round(progress)}%`}>
      <span style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}
