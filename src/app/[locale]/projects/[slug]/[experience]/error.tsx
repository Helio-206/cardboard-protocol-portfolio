"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { engineeringUi } from "@/data/engineering/ui";
import { isLocale } from "@/i18n/config";

export default function EngineeringError({ reset }: { error: Error; reset: () => void }) {
  const params = useParams<{ locale: string; slug: string }>();
  const locale = isLocale(params.locale) ? params.locale : "en";
  const ui = engineeringUi[locale];
  return (
    <main className="engineering-route-state">
      <span aria-hidden="true">CP / ERROR</span>
      <h1>{ui.errorTitle}</h1>
      <p>{ui.errorBody}</p>
      <div>
        <button type="button" onClick={reset}>
          {ui.tryAgain}
        </button>
        <Link href={`/${locale}/projects/${params.slug}/story`}>{ui.backToStory}</Link>
      </div>
    </main>
  );
}
