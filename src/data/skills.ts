import type { SkillCluster } from "@/types/site";
import type { Locale } from "@/i18n/config";

export const skillClusters: SkillCluster[] = [
  {
    name: "Interface engineering",
    short: "01 / Interface",
    position: "north",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "HTML", "CSS"],
  },
  {
    name: "Backend systems",
    short: "02 / Backend",
    position: "east",
    items: ["Node.js", "Express", "Java", "Spring Boot", "Python", "Rust", "REST APIs"],
  },
  {
    name: "Data",
    short: "03 / Data",
    position: "south",
    items: ["PostgreSQL", "MySQL", "Redis", "Supabase", "PostGIS", "Prisma"],
  },
  {
    name: "Architecture",
    short: "04 / Architecture",
    position: "west",
    items: [
      "Clean Architecture",
      "Domain-Driven Design",
      "Event-Driven Architecture",
      "Distributed Systems",
      "Microservices",
    ],
  },
  {
    name: "Infrastructure",
    short: "Core / Infrastructure",
    position: "core",
    items: [
      "Docker",
      "Linux",
      "GitHub Actions",
      "Vercel",
      "TCP/IP",
      "VLANs",
      "Cisco routing & switching",
    ],
  },
];

export const skillClustersByLocale: Record<Locale, SkillCluster[]> = {
  en: skillClusters,
  pt: skillClusters.map((cluster) => ({
    ...cluster,
    name:
      {
        "Interface engineering": "Engenharia de interface",
        "Backend systems": "Sistemas backend",
        Data: "Dados",
        Architecture: "Arquitetura",
        Infrastructure: "Infraestrutura",
      }[cluster.name] ?? cluster.name,
    short:
      {
        "01 / Interface": "01 / Interface",
        "02 / Backend": "02 / Backend",
        "03 / Data": "03 / Dados",
        "04 / Architecture": "04 / Arquitetura",
        "Core / Infrastructure": "Núcleo / Infraestrutura",
      }[cluster.short] ?? cluster.short,
  })),
};
