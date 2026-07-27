"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";

export function LocaleDocument({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
    window.localStorage.setItem("portfolio-locale", locale);
  }, [locale]);

  return null;
}
