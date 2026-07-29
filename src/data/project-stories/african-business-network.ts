import type { ProjectStory, StoryChapter } from "@/data/project-stories/types";

const en: StoryChapter[] = [
  {
    id: "trigger",
    number: "01",
    title: "The Trigger",
    summary:
      "Business operations existed across disconnected tools with no common identity or context.",
    panels: [
      {
        kind: "terminal",
        title: "A fragmented desk",
        lines: [
          "spreadsheet   invoice tool   chat",
          "banking       inventory      government form",
          "payment       logistics      documents",
        ],
      },
      {
        kind: "caption",
        stamp: "FIELD OBSERVATION",
        body: [
          "The problem was not the absence of software. Every operational action lived in a different system, with a different identity and data model.",
          "An African business should not rebuild its digital identity whenever it enters another workflow, partner network or country.",
        ],
      },
    ],
  },
  {
    id: "assumption",
    number: "02",
    title: "The Hidden Assumption",
    summary:
      "Business software is designed as isolated products while the business remains one continuous entity.",
    panels: [
      {
        kind: "decision",
        stamp: "ASSUMPTION",
        title: "Software fragments the business",
        body: [
          "ERP, CRM, payments and marketplaces each solve one area.",
          "The architectural question became: what must remain common across every operation?",
        ],
      },
      {
        kind: "technical",
        items: [
          "Organization identity",
          "Memberships, roles and permissions",
          "Trust and documents",
          "Events and audit",
          "Integrations",
          "Country and financial context",
        ],
      },
    ],
  },
  {
    id: "first-model",
    number: "03",
    title: "The First Model",
    summary:
      "The first implementation needed foundational boundaries, not the surface area of the final vision.",
    panels: [
      {
        kind: "limits",
        stamp: "REJECTED — TOO MUCH SURFACE AREA",
        items: [
          "CRM",
          "Invoices",
          "Inventory",
          "Payments",
          "Marketplace",
          "Documents",
          "Automation",
          "AI",
          "Logistics",
        ],
      },
      {
        kind: "decision",
        stamp: "REWORKED",
        title: "Foundation first",
        body: [
          "Identity, Organization, Membership, roles and permissions became the initial boundary.",
          "Common contracts, events, data and API definitions establish what future modules will depend on.",
        ],
      },
    ],
  },
  {
    id: "friction",
    number: "04",
    title: "The Friction",
    summary:
      "The vision spans countries and providers, but implementing that future immediately would destroy clarity.",
    panels: [
      {
        kind: "technical",
        title: "Long-term pressure",
        items: [
          "Countries and fiscal regimes",
          "Currencies, languages and time zones",
          "Banks, governments and telecoms",
          "Logistics, insurance and global platforms",
          "Unstable connectivity",
        ],
      },
      {
        kind: "caption",
        body: [
          "The danger was not thinking too small.",
          "The danger was implementing the 15-year architecture in the first release.",
        ],
      },
      {
        kind: "limits",
        items: [
          "Premature microservices",
          "Distributed consistency",
          "Fragmented deployments",
          "Unclear ownership",
          "Infrastructure without validated use cases",
        ],
      },
    ],
  },
  {
    id: "breakthrough",
    number: "05",
    title: "The Breakthrough",
    summary:
      "Start as a well-partitioned modular monolith and extract only under measurable pressure.",
    panels: [
      {
        kind: "decision",
        stamp: "SYSTEM BOUNDARY",
        title: "Modular monolith first",
        body: [
          "Transactional simplicity stays intact while domains and contracts remain isolated.",
          "Microservices should emerge through controlled extraction, not ideology.",
        ],
      },
      {
        kind: "technical",
        stamp: "NEXT EXTRACTION",
        items: [
          "Independent scale",
          "Dedicated team",
          "Regulatory or security isolation",
          "Different SLA",
          "Special computational workload",
          "Critical third-party integration",
        ],
      },
    ],
  },
  {
    id: "system",
    number: "06",
    title: "The System",
    summary: "A layered platform with bounded contexts based on business capabilities.",
    panels: [
      {
        kind: "flow",
        title: "Platform layers",
        steps: ["Experience", "API", "Application", "Domain", "Infrastructure", "Platform"],
        tone: "blue",
      },
      {
        kind: "terminal",
        title: "Monorepo",
        lines: [
          "apps/      api (NestJS)  web (Next.js)",
          "packages/  domain events permissions validation",
          "docs/      journeys model contracts ADRs diagrams",
          "infra/     Docker Kubernetes Helm Terraform",
        ],
      },
      {
        kind: "decision",
        title: "Selective patterns",
        body: [
          "Events describe facts after successful state changes, not disguised commands.",
          "CQRS and event sourcing remain selective: only where divergent models or complete historical truth justify the complexity.",
        ],
      },
    ],
  },
  {
    id: "trade-offs",
    number: "07",
    title: "Trade-offs",
    summary:
      "The design protects the long-term model while constraining the implementation surface.",
    panels: [
      {
        kind: "decision",
        title: "Broad vision / narrow MVP",
        body: [
          "Preserve the long-term model in documentation; restrict implementation to foundational domains.",
        ],
      },
      {
        kind: "decision",
        title: "Documentation before expansion",
        body: [
          "Define journeys, domain, permissions, events and contracts before multiplying features.",
        ],
      },
      {
        kind: "decision",
        title: "Multi-country and AI readiness",
        body: [
          "Model extension points without pretending regulatory coverage or forcing AI into every operation.",
        ],
      },
    ],
  },
  {
    id: "limits",
    number: "08",
    title: "Current Limits",
    summary: "Implemented foundation and future modules remain visibly separated.",
    panels: [
      {
        kind: "technical",
        stamp: "VERIFIED",
        title: "Implemented",
        items: [
          "pnpm monorepo and Turborepo",
          "Next.js web bootstrap",
          "NestJS API bootstrap",
          "PostgreSQL and Redis",
          "Enterprise MVP documentation",
          "Initial Identity and Organization foundation",
        ],
      },
      {
        kind: "limits",
        stamp: "CURRENT LIMIT",
        title: "Not implemented",
        items: [
          "Invoices and payments",
          "Inventory and contacts",
          "Documents and automation",
          "Production AI workflows",
          "External integrations",
        ],
      },
    ],
  },
  {
    id: "change",
    number: "09",
    title: "What I Would Change",
    summary: "Evolution remains tied to observable architecture pressure.",
    panels: [
      {
        kind: "technical",
        stamp: "NEXT EXTRACTION",
        items: [
          "Executable architecture tests",
          "Outbox and event contract versioning",
          "Tenant isolation tests and policy simulation",
          "Country capability registry",
          "Offline-tolerant workflows",
          "Regional and ledger boundaries",
          "Integration sandbox and public SDK",
          "Module extraction only after measurable pressure",
        ],
      },
    ],
  },
  {
    id: "technical-file",
    number: "10",
    title: "Technical File",
    summary: "The current platform foundation and its explicit boundaries.",
    panels: [
      {
        kind: "terminal",
        stamp: "VERIFIED",
        lines: [
          "web: Next.js + TypeScript",
          "api: NestJS",
          "data: PostgreSQL + Redis",
          "workspace: pnpm + Turborepo",
          "architecture: modular monolith",
          "domains: Identity + Organization foundation",
          "evidence: requirements, journeys, contracts, ADRs",
        ],
      },
      {
        kind: "caption",
        body: [
          "African Business Network was designed as a foundation from which operational systems could emerge without fragmenting the business underneath them.",
        ],
      },
    ],
  },
];

const pt: StoryChapter[] = [
  {
    id: "trigger",
    number: "01",
    title: "O Gatilho",
    summary: "As operações existiam em ferramentas desligadas, sem identidade ou contexto comum.",
    panels: [
      {
        kind: "terminal",
        title: "Uma secretária fragmentada",
        lines: [
          "folha de cálculo   faturação   chat",
          "banco              inventário  formulário público",
          "pagamento          logística   documentos",
        ],
      },
      {
        kind: "caption",
        stamp: "OBSERVAÇÃO",
        body: [
          "O problema não era a ausência de software. Cada ação operacional vivia num sistema diferente, com identidade e modelo de dados próprios.",
          "Uma empresa africana não deveria reconstruir a sua identidade digital sempre que entra noutro fluxo, rede de parceiros ou país.",
        ],
      },
    ],
  },
  {
    id: "assumption",
    number: "02",
    title: "A Suposição Oculta",
    summary:
      "O software empresarial é desenhado como produtos isolados, enquanto a empresa continua a ser uma entidade única.",
    panels: [
      {
        kind: "decision",
        stamp: "SUPOSIÇÃO",
        title: "O software fragmenta a empresa",
        body: [
          "ERP, CRM, pagamentos e marketplaces resolvem áreas separadas.",
          "A questão arquitetural tornou-se: o que precisa de permanecer comum em todas as operações?",
        ],
      },
      {
        kind: "technical",
        items: [
          "Identidade da organização",
          "Membros, papéis e permissões",
          "Confiança e documentos",
          "Eventos e auditoria",
          "Integrações",
          "Contexto nacional e financeiro",
        ],
      },
    ],
  },
  {
    id: "first-model",
    number: "03",
    title: "O Primeiro Modelo",
    summary:
      "A primeira implementação precisava de fronteiras fundacionais, não da superfície da visão final.",
    panels: [
      {
        kind: "limits",
        stamp: "REJEITADO — SUPERFÍCIE EXCESSIVA",
        items: [
          "CRM",
          "Faturas",
          "Inventário",
          "Pagamentos",
          "Marketplace",
          "Documentos",
          "Automação",
          "IA",
          "Logística",
        ],
      },
      {
        kind: "decision",
        stamp: "RETRABALHADO",
        title: "Fundação primeiro",
        body: [
          "Identidade, Organização, Membros, papéis e permissões tornaram-se a fronteira inicial.",
          "Contratos, eventos, dados e APIs comuns definem aquilo de que os módulos futuros dependerão.",
        ],
      },
    ],
  },
  {
    id: "friction",
    number: "04",
    title: "A Fricção",
    summary:
      "A visão atravessa países e fornecedores, mas implementar esse futuro de imediato destruiria a clareza.",
    panels: [
      {
        kind: "technical",
        title: "Pressão de longo prazo",
        items: [
          "Países e regimes fiscais",
          "Moedas, idiomas e fusos horários",
          "Bancos, governos e operadoras",
          "Logística, seguros e plataformas globais",
          "Conectividade instável",
        ],
      },
      {
        kind: "caption",
        body: [
          "O perigo não era pensar pequeno.",
          "O perigo era implementar a arquitetura de 15 anos na primeira versão.",
        ],
      },
      {
        kind: "limits",
        items: [
          "Microsserviços prematuros",
          "Consistência distribuída",
          "Deploys fragmentados",
          "Responsabilidade pouco clara",
          "Infraestrutura sem casos validados",
        ],
      },
    ],
  },
  {
    id: "breakthrough",
    number: "05",
    title: "A Viragem",
    summary:
      "Começar com um monólito modular bem particionado e extrair apenas sob pressão mensurável.",
    panels: [
      {
        kind: "decision",
        stamp: "FRONTEIRA DO SISTEMA",
        title: "Monólito modular primeiro",
        body: [
          "A simplicidade transacional mantém-se enquanto domínios e contratos ficam isolados.",
          "Microsserviços devem surgir por extração controlada, não por ideologia.",
        ],
      },
      {
        kind: "technical",
        stamp: "PRÓXIMA EXTRAÇÃO",
        items: [
          "Escala independente",
          "Equipa dedicada",
          "Isolamento regulatório ou de segurança",
          "SLA diferente",
          "Carga computacional especial",
          "Integração externa crítica",
        ],
      },
    ],
  },
  {
    id: "system",
    number: "06",
    title: "O Sistema",
    summary: "Uma plataforma em camadas, com bounded contexts baseados em capacidades de negócio.",
    panels: [
      {
        kind: "flow",
        title: "Camadas da plataforma",
        steps: ["Experiência", "API", "Aplicação", "Domínio", "Infraestrutura", "Plataforma"],
        tone: "blue",
      },
      {
        kind: "terminal",
        title: "Monorepo",
        lines: [
          "apps/      api (NestJS)  web (Next.js)",
          "packages/  domain events permissions validation",
          "docs/      journeys model contracts ADRs diagrams",
          "infra/     Docker Kubernetes Helm Terraform",
        ],
      },
      {
        kind: "decision",
        title: "Padrões seletivos",
        body: [
          "Eventos descrevem factos depois de mudanças válidas, não comandos disfarçados.",
          "CQRS e event sourcing só entram onde modelos divergentes ou verdade histórica completa justificam o custo.",
        ],
      },
    ],
  },
  {
    id: "trade-offs",
    number: "07",
    title: "Trade-offs",
    summary: "O desenho protege o modelo de longo prazo e restringe a superfície implementada.",
    panels: [
      {
        kind: "decision",
        title: "Visão ampla / MVP estreito",
        body: [
          "Preservar o modelo de longo prazo na documentação; limitar a implementação aos domínios fundacionais.",
        ],
      },
      {
        kind: "decision",
        title: "Documentar antes de expandir",
        body: [
          "Definir jornadas, domínio, permissões, eventos e contratos antes de multiplicar funcionalidades.",
        ],
      },
      {
        kind: "decision",
        title: "Prontidão multinacional e IA",
        body: [
          "Modelar extensões sem fingir cobertura regulatória nem forçar IA em cada operação.",
        ],
      },
    ],
  },
  {
    id: "limits",
    number: "08",
    title: "Limites Atuais",
    summary: "A fundação implementada e os módulos futuros permanecem claramente separados.",
    panels: [
      {
        kind: "technical",
        stamp: "VERIFICADO",
        title: "Implementado",
        items: [
          "Monorepo pnpm e Turborepo",
          "Bootstrap web Next.js",
          "Bootstrap API NestJS",
          "PostgreSQL e Redis",
          "Documentação Enterprise MVP",
          "Fundação inicial de Identidade e Organização",
        ],
      },
      {
        kind: "limits",
        stamp: "LIMITE ATUAL",
        title: "Não implementado",
        items: [
          "Faturas e pagamentos",
          "Inventário e contactos",
          "Documentos e automação",
          "Workflows de IA em produção",
          "Integrações externas",
        ],
      },
    ],
  },
  {
    id: "change",
    number: "09",
    title: "O Que Mudaria",
    summary: "A evolução permanece ligada a pressão arquitetural observável.",
    panels: [
      {
        kind: "technical",
        stamp: "PRÓXIMA EXTRAÇÃO",
        items: [
          "Testes executáveis de arquitetura",
          "Outbox e versionamento de eventos",
          "Testes de isolamento tenant e simulação de políticas",
          "Registo de capacidades por país",
          "Fluxos tolerantes a offline",
          "Fronteiras regionais e de ledger",
          "Sandbox de integrações e SDK público",
          "Extração de módulos apenas sob pressão mensurável",
        ],
      },
    ],
  },
  {
    id: "technical-file",
    number: "10",
    title: "Ficheiro Técnico",
    summary: "A fundação atual da plataforma e as suas fronteiras explícitas.",
    panels: [
      {
        kind: "terminal",
        stamp: "VERIFICADO",
        lines: [
          "web: Next.js + TypeScript",
          "api: NestJS",
          "dados: PostgreSQL + Redis",
          "workspace: pnpm + Turborepo",
          "arquitetura: monólito modular",
          "domínios: fundação Identity + Organization",
          "evidência: requisitos, jornadas, contratos, ADRs",
        ],
      },
      {
        kind: "caption",
        body: [
          "African Business Network foi desenhada como uma fundação da qual podem surgir sistemas operacionais sem fragmentar a empresa que existe por baixo.",
        ],
      },
    ],
  },
];

export const africanBusinessNetworkStory: ProjectStory = {
  id: "african-business-network-story",
  slug: "african-business-network",
  projectSlug: "abn",
  sceneImage: "/project-media/story/african-business-network-origin.webp",
  sceneAlt: {
    en: "An empty back-office desk with fragmented business documents surrounding a platform architecture drawing.",
    pt: "Uma secretária de back-office vazia com documentos empresariais fragmentados em torno de um desenho de arquitetura de plataforma.",
  },
  sceneCaption: {
    en: "The business remained one entity. Its operations had been divided across unrelated systems.",
    pt: "A empresa continuava a ser uma só entidade. As suas operações estavam divididas por sistemas sem relação entre si.",
  },
  caseNumber: { en: "CASE FILE 02", pt: "DOSSIER 02" },
  classification: {
    en: "ENTERPRISE PLATFORM / MODULAR MONOLITH",
    pt: "PLATAFORMA EMPRESARIAL / MONÓLITO MODULAR",
  },
  status: {
    en: "FOUNDATION IN PROGRESS",
    pt: "FUNDAÇÃO EM DESENVOLVIMENTO",
  },
  repository: "https://github.com/Helio-206/african-business-network",
  accent: "blue",
  seoTitle: {
    en: "African Business Network — Enterprise Platform Architecture | Hélio Matondo",
    pt: "African Business Network — Arquitetura de Plataforma Empresarial | Hélio Matondo",
  },
  content: {
    en: {
      title: "AFRICAN BUSINESS NETWORK",
      subtitle: "Shared operational infrastructure for African businesses.",
      description:
        "A technical case study about platform foundations, domain boundaries and controlled architectural evolution.",
      thesis:
        "A business should preserve one digital identity across operations, partners and countries.",
      chapters: en,
      finalLine:
        "Many operational systems can emerge without fragmenting the business underneath them.",
    },
    pt: {
      title: "AFRICAN BUSINESS NETWORK",
      subtitle: "Infraestrutura operacional partilhada para empresas africanas.",
      description:
        "Um estudo técnico sobre fundações de plataforma, fronteiras de domínio e evolução arquitetural controlada.",
      thesis:
        "Uma empresa deve preservar uma identidade digital comum através de operações, parceiros e países.",
      chapters: pt,
      finalLine:
        "Muitos sistemas operacionais podem surgir sem fragmentar a empresa que existe por baixo.",
    },
  },
};
