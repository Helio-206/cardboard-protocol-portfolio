import type { TimelineEntry } from "@/types/site";
import type { Locale } from "@/i18n/config";

export const timeline: TimelineEntry[] = [
  {
    period: "2022–2023",
    title: "Foundation",
    detail: "Started building web applications and studying software fundamentals.",
  },
  {
    period: "2023–2024",
    title: "Systems",
    detail: "Expanded into full-stack systems, relational databases and networking.",
  },
  {
    period: "2024–2025",
    title: "Structure",
    detail: "Worked on larger platforms, product architecture and developer tooling.",
  },
  {
    period: "2025–Present",
    title: "Scale",
    detail:
      "Exploring enterprise systems, distributed architecture, civic technology and digital ecosystems.",
  },
];

export const timelineByLocale: Record<Locale, TimelineEntry[]> = {
  en: timeline,
  pt: [
    { period: "2022–2023", title: "Fundamentos", detail: "Começou a desenvolver aplicações web e a estudar fundamentos de software." },
    { period: "2023–2024", title: "Sistemas", detail: "Expandiu para sistemas full-stack, bases de dados relacionais e redes." },
    { period: "2024–2025", title: "Estrutura", detail: "Trabalhou em plataformas maiores, arquitetura de produto e ferramentas para programadores." },
    { period: "2025–Presente", title: "Escala", detail: "Explora sistemas empresariais, arquitetura distribuída, tecnologia cívica e ecossistemas digitais." },
  ],
};
