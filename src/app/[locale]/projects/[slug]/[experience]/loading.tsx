"use client";

import { useParams } from "next/navigation";
import { engineeringUi } from "@/data/engineering/ui";
import { isLocale } from "@/i18n/config";

export default function EngineeringLoading() {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params.locale) ? params.locale : "en";
  return (
    <main className="engineering-route-state" aria-live="polite" aria-busy="true">
      <span aria-hidden="true">CP / LOADING</span>
      <p>{engineeringUi[locale].loading}</p>
    </main>
  );
}
