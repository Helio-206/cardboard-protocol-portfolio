import type { Project } from "@/types/site";

type ProjectCopy = Pick<
  Project,
  "eyebrow" | "status" | "context" | "approach" | "architecture" | "result"
>;

export const projectTranslations: Record<string, ProjectCopy> = {
  kanda: {
    eyebrow: "Tecnologia cívica / mobile",
    status: "MVP",
    context:
      "Uma aplicação mobile comunitária para reportar e acompanhar ocorrências urbanas em Angola.",
    approach:
      "Um fluxo mobile focado em reporte, visibilidade no mapa e estado comunitário simples, em vez de um painel municipal excessivo.",
    architecture: [
      "Reporte centrado no telemóvel",
      "Persistência local",
      "Mapa de ocorrências",
      "Navegação Expo",
    ],
    result:
      "Um MVP público que enquadra o reporte cívico como um fluxo claro e nativo para mobile.",
  },
  voidnet: {
    eyebrow: "Infraestrutura distribuída / investigação",
    status: "Base inicial",
    context:
      "Um ecossistema experimental de rede descentralizada construído sobre o transporte existente da internet.",
    approach:
      "Definir fronteiras explícitas para protocolo tipado, identidade, transporte e runtime antes de procurar uma superfície de aplicação polida.",
    architecture: [
      "Transporte libp2p + QUIC",
      "Identidade Ed25519",
      "Frames tipados",
      "Fronteiras DNS e runtime",
    ],
    result:
      "Uma base documentada de Fase 1 com node, CLI, chat e interfaces browser; apresentada rigorosamente como infraestrutura exploratória.",
  },
  "kaya-cli": {
    eyebrow: "Comunicação local-first",
    status: "v0.1.1",
    context:
      "Um sistema de comunicação descentralizado e offline-first para redes locais, com caminhos diretos e por relay opcionais.",
    approach:
      "Separar protocolo, transporte, segurança, persistência e interface do operador em crates Rust explícitos.",
    architecture: [
      "Descoberta UDP multicast",
      "Mensagens diretas cifradas",
      "Relay opcional",
      "Persistência local",
    ],
    result:
      "Um sistema modular de comunicação em rede local, com documentação pública e artefactos de lançamento.",
  },
  abn: {
    eyebrow: "Plataforma empresarial / monorepo",
    status: "Base em desenvolvimento",
    context:
      "Um ecossistema digital pensado para empresas africanas operarem e crescerem a partir de uma plataforma coordenada.",
    approach:
      "Definir domínio, permissões, eventos, observabilidade e infraestrutura como preocupações de plataforma de primeira ordem.",
    architecture: [
      "Apps Next.js + NestJS",
      "Núcleo de identidade e organização",
      "PostgreSQL + Redis",
      "Pacotes de domínio e ADRs",
    ],
    result:
      "Um monorepo executável e documentação empresarial substancial; módulos de negócio mais amplos permanecem intencionalmente fora de escopo.",
  },
  sgfe: {
    eyebrow: "Sistemas de finanças públicas",
    status: "Sistema full-stack",
    context:
      "Um sistema para gestão, execução, monitorização e auditoria de operações de finanças públicas.",
    approach:
      "Modelar fluxos fiscais, controlo de acesso e auditabilidade através de um frontend dedicado e backend Java.",
    architecture: [
      "Domínio de execução orçamental",
      "RBAC e logs de auditoria",
      "Modelo de sessão JWT",
      "Dados geridos por migrações",
    ],
    result:
      "Uma base de código pública com limites de domínio documentados e comandos de validação.",
  },
  recall: {
    eyebrow: "Infraestrutura de aprendizagem",
    status: "Produto de investigação",
    context:
      "Um fluxo de base de conhecimento para cursos em vídeo, transcrição, reconstrução curricular e pesquisa.",
    approach:
      "Separar experiência web, API, workers de fila e pesquisa num pipeline de ingestão documentado.",
    architecture: ["Web Next.js", "FastAPI", "Filas Redis", "PostgreSQL", "Índice de pesquisa"],
    result:
      "Incluído como experimento porque a sua arquitetura de ingestão assíncrona amplia a narrativa de sistemas.",
  },
  kuilu: {
    eyebrow: "Gestão de filas / PWA",
    status: "Experimento",
    context: "Um conceito de gestão digital de filas para estabelecimentos físicos.",
    approach: "Uma PWA mobile-first ligada a um backend Java reativo.",
    architecture: ["Filas virtuais", "PWA pronta para offline", "API reativa", "PostgreSQL"],
    result:
      "Colocado nos experimentos: o repositório público documenta um escopo coerente, mas não é apresentado como sistema principal.",
  },
};
