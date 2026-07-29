import { notFound } from "next/navigation";
import { LocaleDocument } from "@/components/navigation/LocaleDocument";
import { isLocale } from "@/i18n/config";
import { PortfolioHome } from "../page";

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <LocaleDocument locale={locale} />
      <PortfolioHome locale={locale} />
    </>
  );
}
