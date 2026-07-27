"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

export function LanguageToggle({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const nextLocale: Locale = locale === "en" ? "pt" : "en";
  const destination = pathname.replace(/^\/(en|pt)(?=\/|$)/, `/${nextLocale}`);

  return (
    <Link
      className="language-toggle"
      href={destination || `/${nextLocale}`}
      aria-label={label}
      onClick={() => window.localStorage.setItem("portfolio-locale", nextLocale)}
    >
      {nextLocale.toUpperCase()}
    </Link>
  );
}
