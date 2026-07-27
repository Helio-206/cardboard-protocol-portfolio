import type { Project } from "@/types/site";

export const projects: Project[] = [
  {
    slug: "kanda",
    issue: "CASE 001",
    name: "KANDA",
    eyebrow: "Civic technology / mobile",
    status: "MVP",
    context:
      "A community mobile application for reporting and following urban occurrences in Angola.",
    approach:
      "A focused mobile flow for reporting, map visibility and lightweight community status instead of an overbuilt municipal dashboard.",
    architecture: ["Phone-first reporting", "Local persistence", "Occurrence map", "Expo routing"],
    technologies: ["React Native", "Expo", "TypeScript", "Zustand", "React Native Maps"],
    result: "A public MVP that frames civic reporting as a clear, mobile-native workflow.",
    links: [{ href: "https://github.com/Helio-206/kanda", label: "Repository", external: true }],
    accent: "red",
  },
  {
    slug: "voidnet",
    issue: "CASE 002",
    name: "VOIDNET",
    eyebrow: "Distributed infrastructure / research",
    status: "Foundation scaffold",
    context:
      "An experimental decentralized network ecosystem built above existing internet transport.",
    approach:
      "Establish typed protocol, identity, transport and runtime boundaries before pursuing a polished application surface.",
    architecture: [
      "libp2p + QUIC transport",
      "Ed25519 identity",
      "Typed frames",
      "DNS and runtime boundaries",
    ],
    technologies: ["Rust", "libp2p", "QUIC", "Tokio", "Sled"],
    result:
      "A documented Phase 1 foundation with node, CLI, chat and browser shells; presented accurately as exploratory infrastructure.",
    links: [{ href: "https://github.com/Helio-206/VOIDNET", label: "Repository", external: true }],
    accent: "blue",
  },
  {
    slug: "kaya-cli",
    issue: "CASE 003",
    name: "KAYA CLI",
    eyebrow: "Local-first communication",
    status: "v0.1.1",
    context:
      "An offline-first decentralized communication system for local networks, with optional direct and relay paths.",
    approach:
      "Separate protocol, transport, security, persistence and operator UI into explicit Rust crates.",
    architecture: [
      "UDP multicast discovery",
      "Encrypted direct messages",
      "Optional relay",
      "Local persistence",
    ],
    technologies: ["Rust", "Tokio", "Ratatui", "Ed25519", "X25519", "ChaCha20-Poly1305"],
    result:
      "A modular local-network communication system with public documentation and release artifacts.",
    links: [{ href: "https://github.com/Helio-206/KAYA-CLI", label: "Repository", external: true }],
    accent: "ink",
  },
  {
    slug: "abn",
    issue: "CASE 004",
    name: "AFRICAN BUSINESS NETWORK",
    eyebrow: "Enterprise platform / monorepo",
    status: "Foundation in progress",
    context:
      "A digital ecosystem conceived for African businesses to operate and grow from one coordinated platform.",
    approach:
      "Define domain, permissions, events, observability and infrastructure as first-class platform concerns.",
    architecture: [
      "Next.js + NestJS apps",
      "Identity + organization core",
      "PostgreSQL + Redis",
      "Domain packages and ADRs",
    ],
    technologies: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Redis", "Turborepo"],
    result:
      "An executable monorepo and substantial enterprise documentation; broader business modules remain intentionally out of scope.",
    links: [
      {
        href: "https://github.com/Helio-206/african-business-network",
        label: "Repository",
        external: true,
      },
    ],
    accent: "blue",
  },
  {
    slug: "sgfe",
    issue: "CASE 005",
    name: "SGFE",
    eyebrow: "Public finance systems",
    status: "Full-stack system",
    context:
      "A system for the management, execution, monitoring and auditing of public finance operations.",
    approach:
      "Model fiscal workflows, access control and auditability across a dedicated frontend and Java backend.",
    architecture: [
      "Budget execution domain",
      "RBAC + audit logs",
      "JWT session model",
      "Migration-managed data",
    ],
    technologies: ["Next.js", "Java 21", "Spring Boot", "MySQL", "Flyway"],
    result: "A public codebase with documented domain boundaries and validation commands.",
    links: [{ href: "https://github.com/Helio-206/SGFE", label: "Repository", external: true }],
    accent: "red",
  },
];

export const experiments: Project[] = [
  {
    slug: "recall",
    issue: "LAB 01",
    name: "RECALL",
    eyebrow: "Learning infrastructure",
    status: "Research product",
    context:
      "A knowledge-base workflow for video courses, transcription, curriculum reconstruction and search.",
    approach:
      "Separate web experience, API, queue workers and search into a documented ingestion pipeline.",
    architecture: ["Next.js web", "FastAPI", "Redis queues", "PostgreSQL", "Search index"],
    technologies: ["Next.js", "FastAPI", "Python", "Redis", "PostgreSQL"],
    result:
      "Included as an experiment because its asynchronous ingestion architecture broadens the systems narrative.",
    links: [{ href: "https://github.com/Helio-206/Recall", label: "Repository", external: true }],
    accent: "blue",
  },
  {
    slug: "kuilu",
    issue: "LAB 02",
    name: "KUILU",
    eyebrow: "Queue management / PWA",
    status: "Experiment",
    context: "A digital queue-management concept for physical establishments.",
    approach: "A mobile-first PWA paired with a reactive Java backend.",
    architecture: ["Virtual queues", "Offline-ready PWA", "Reactive API", "PostgreSQL"],
    technologies: ["Next.js", "Spring WebFlux", "R2DBC", "PostgreSQL"],
    result:
      "Placed in experiments: the public repository documents a coherent scope, but it is not presented as a flagship system.",
    links: [{ href: "https://github.com/Helio-206/Kuilu", label: "Repository", external: true }],
    accent: "ink",
  },
];
