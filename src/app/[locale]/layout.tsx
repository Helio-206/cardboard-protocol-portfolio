import type { Metadata, Viewport } from "next";
import { CardboardImpactMotion } from "@/components/motion/CardboardImpactMotion";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { metadataByLocale } from "@/i18n/messages";

const baseUrl = new URL("https://heliomatondo.dev");

export const viewport: Viewport = { themeColor: "#735033", colorScheme: "light" };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const current = metadataByLocale[locale];
  const localePath = `/${locale}`;
  return {
    metadataBase: baseUrl,
    title: { default: current.title, template: "%s — Hélio Matondo" },
    description: current.description,
    applicationName: "CARDBOARD PROTOCOL",
    authors: [{ name: "Hélio Matondo" }],
    creator: "Hélio Matondo",
    publisher: "Hélio Matondo",
    keywords: [
      "Hélio Matondo",
      "full-stack software engineer",
      "systems architect",
      "distributed systems",
      "digital products",
    ],
    category: "technology",
    alternates: { canonical: localePath, languages: { en: "/en", pt: "/pt", "x-default": "/en" } },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    icons: { icon: "/icon", apple: "/apple-icon" },
    openGraph: {
      type: "website",
      url: localePath,
      locale: current.ogLocale,
      alternateLocale: locale === "en" ? "pt_AO" : "en_US",
      siteName: "Hélio Matondo",
      title: current.title,
      description: current.description,
      images: [
        {
          url: "/social/cardboard-protocol-og.jpg",
          width: 1731,
          height: 909,
          alt: "CARDBOARD PROTOCOL — Hélio Matondo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: current.title,
      description: current.description,
      images: ["/social/cardboard-protocol-og.jpg"],
    },
  };
}

export default function LocaleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CardboardImpactMotion />
      {children}
    </>
  );
}
