"use client";

import { useState } from "react";
import { LanguageToggle } from "@/components/navigation/LanguageToggle";
import type { Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";

const chapterIds = ["origin", "engineer", "systems", "process", "experiments", "contact"] as const;

export function ChapterNavigation({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const navigation = messages[locale].navigation;

  return (
    <nav className="chapter-nav" aria-label={navigation.index}>
      <button
        type="button"
        className="chapter-nav__toggle"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {navigation.index} <span>{open ? "−" : "+"}</span>
      </button>
      <div className={`chapter-nav__menu ${open ? "is-open" : ""}`}>
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
