import type { Locale } from "@/i18n/config";

type Messages = {
  metadata: { title: string; description: string; ogLocale: string };
  navigation: { index: string; switchLabel: string; chapters: readonly string[] };
  cover: {
    present: string;
    subtitle: string;
    readStory: string;
    viewProjects: string;
    scroll: string;
    artifactLabel: string;
    role: string;
    fieldNote: string;
    archive: string;
    location: string;
    imageAlt: string;
  };
  chapters: {
    origin: {
      label: string;
      title: string;
      note: string;
      panels: readonly { title: string; body: string }[];
      fieldNote: string;
    };
    engineer: { label: string; title: string; note: string; timelineLabel: string };
    systems: { label: string; title: string; note: string };
    process: {
      label: string;
      title: string;
      note: string;
      steps: readonly string[];
      statement: string;
      protocol: string;
      safeSnippet: string;
    };
    experiments: {
      label: string;
      title: string;
      note: string;
      privateLabel: string;
      privateNote: string;
    };
    contact: {
      label: string;
      title: string;
      note: string;
      heading: string;
      body: string;
      cta: string;
      whatsappMessage: string;
      backCover: string;
      stamp: string;
      end: string;
    };
  };
  project: {
    problem: string;
    approach: string;
    result: string;
    architecture: string;
    repository: string;
  };
  blueprint: { label: string; title: string; note: string; nodes: readonly string[] };
  accessibility: { readingProgress: string };
};

export const messages: Record<Locale, Messages> = {
  en: {
    metadata: {
      title: "Hélio Matondo — Full-Stack Software Engineer",
      description:
        "Portfolio of Hélio Matondo, a full-stack software engineer and systems architect building scalable digital products and technical platforms.",
      ogLocale: "en_US",
    },
    navigation: {
      index: "Index",
      switchLabel: "Switch to Portuguese",
      chapters: [
        "01 / Origin",
        "02 / Engineer",
        "03 / Systems",
        "04 / Process",
        "05 / Experiments",
        "06 / Contact",
      ],
    },
    cover: {
      present: "PRESENT",
      subtitle: "A graphic novel about systems, code and ideas.",
      readStory: "READ THE STORY",
      viewProjects: "VIEW PROJECTS",
      scroll: "SCROLL TO OPEN",
      artifactLabel: "An archival technical collage of software architecture documentation",
      role: "FULL-STACK SOFTWARE ENGINEER\n& SYSTEMS ARCHITECT",
      fieldNote: "FIELD NOTE",
      archive: "ARCHIVE / HM-001",
      location: "LUANDA / WORLDWIDE",
      imageAlt: "An archival systems blueprint on cardboard",
    },
    chapters: {
      origin: {
        label: "CHAPTER 01",
        title: "ORIGIN",
        note: "A short record of how an interest in software became an interest in systems.",
        panels: [
          {
            title: "FIRST SIGNAL",
            body: "2022 — a practical curiosity for how digital products are assembled, tested and made useful.",
          },
          {
            title: "WIDER FRAME",
            body: "Web applications opened into databases, networks, infrastructure and the boundaries between services.",
          },
          {
            title: "THE WORK",
            body: "I design and build scalable digital systems, combining software engineering, product thinking and technical architecture.",
          },
        ],
        fieldNote: "Technology is most interesting when it survives real constraints.",
      },
      engineer: {
        label: "CHAPTER 02",
        title: "THE ENGINEER",
        note: "Capabilities mapped as a working system, not a list of percentages.",
        timelineLabel: "Technical timeline",
      },
      systems: {
        label: "CHAPTER 03",
        title: "SELECTED SYSTEMS",
        note: "Public evidence first. Each case is presented as a system, with its current state stated plainly.",
      },
      process: {
        label: "CHAPTER 04",
        title: "ENGINEERING PROCESS",
        note: "A repeatable investigation sequence for products that cannot be solved with a template.",
        steps: ["Observe", "Model", "Architect", "Build", "Validate", "Refine"],
        statement:
          "Every handoff receives an explicit constraint, an observable boundary and a validation path.",
        protocol: "PROTOCOL / 06",
        safeSnippet: "SAFE SNIPPET",
      },
      experiments: {
        label: "CHAPTER 05",
        title: "EXPERIMENTS",
        note: "Smaller files pinned to the research wall: useful signals, not filler.",
        privateLabel: "ARCHIVE NOTE",
        privateNote:
          "This issue documents public work only. Each entry links to evidence that can be independently reviewed.",
      },
      contact: {
        label: "CHAPTER 06",
        title: "CONTACT",
        note: "End of issue. Beginning of a difficult system.",
        heading: "Have a difficult\nsystem to build?",
        body: "I work on digital products, platforms and technical ideas that require more than a standard template.",
        cta: "START A CONVERSATION",
        whatsappMessage: "Hello Hélio, I would like to discuss a project.",
        backCover: "BACK COVER",
        stamp: "OPEN FOR THE RIGHT BRIEF",
        end: "ISSUE 001 / END OF FILE",
      },
    },
    project: {
      problem: "PROBLEM",
      approach: "APPROACH",
      result: "RESULT",
      architecture: "ARCHITECTURE",
      repository: "Repository",
    },
    blueprint: {
      label:
        "A systems diagram showing client, API gateway, service boundary, database, queue and worker",
      title: "SYSTEM MAP / 01",
      note: "Validate at the edge. Emit events after persistence. Observe every boundary.",
      nodes: ["WEB", "API\nGATEWAY", "SERVICE\nBOUNDARY", "POSTGRES", "EVENT\nQUEUE", "WORKER"],
    },
    accessibility: { readingProgress: "Reading progress" },
  },
  pt: {
    metadata: {
      title: "Hélio Matondo — Engenheiro de Software Full-Stack",
      description:
        "Portfólio de Hélio Matondo, engenheiro de software full-stack e arquiteto de sistemas que desenvolve produtos digitais escaláveis e plataformas técnicas.",
      ogLocale: "pt_AO",
    },
    navigation: {
      index: "Índice",
      switchLabel: "Mudar para inglês",
      chapters: [
        "01 / Origem",
        "02 / Engenheiro",
        "03 / Sistemas",
        "04 / Processo",
        "05 / Experimentos",
        "06 / Contacto",
      ],
    },
    cover: {
      present: "PRESENTE",
      subtitle: "Uma graphic novel sobre sistemas, código e ideias.",
      readStory: "LER A HISTÓRIA",
      viewProjects: "VER PROJETOS",
      scroll: "DESCER PARA ABRIR",
      artifactLabel: "Uma colagem técnica de arquivo sobre arquitetura de software",
      role: "ENGENHEIRO DE SOFTWARE FULL-STACK\nE ARQUITETO DE SISTEMAS",
      fieldNote: "NOTA DE CAMPO",
      archive: "ARQUIVO / HM-001",
      location: "LUANDA / GLOBAL",
      imageAlt: "Um blueprint de sistemas em cartão",
    },
    chapters: {
      origin: {
        label: "CAPÍTULO 01",
        title: "ORIGEM",
        note: "Um registo breve de como o interesse por software se tornou interesse por sistemas.",
        panels: [
          {
            title: "PRIMEIRO SINAL",
            body: "2022 — uma curiosidade prática sobre como os produtos digitais são construídos, testados e se tornam úteis.",
          },
          {
            title: "ENQUADRAMENTO",
            body: "As aplicações web abriram caminho para bases de dados, redes, infraestrutura e limites entre serviços.",
          },
          {
            title: "O TRABALHO",
            body: "Projeto e desenvolvo sistemas digitais escaláveis, combinando engenharia de software, pensamento de produto e arquitetura técnica.",
          },
        ],
        fieldNote: "A tecnologia torna-se interessante quando sobrevive a restrições reais.",
      },
      engineer: {
        label: "CAPÍTULO 02",
        title: "O ENGENHEIRO",
        note: "Capacidades mapeadas como um sistema de trabalho, não como uma lista de percentagens.",
        timelineLabel: "Linha temporal técnica",
      },
      systems: {
        label: "CAPÍTULO 03",
        title: "SISTEMAS SELECIONADOS",
        note: "Primeiro, evidência pública. Cada caso é apresentado como sistema, com o estado atual exposto com rigor.",
      },
      process: {
        label: "CAPÍTULO 04",
        title: "PROCESSO DE ENGENHARIA",
        note: "Uma sequência de investigação repetível para produtos que não se resolvem com um template.",
        steps: ["Observar", "Modelar", "Arquitetar", "Construir", "Validar", "Refinar"],
        statement:
          "Cada passagem recebe uma restrição explícita, um limite observável e um caminho de validação.",
        protocol: "PROTOCOLO / 06",
        safeSnippet: "TRECHO SEGURO",
      },
      experiments: {
        label: "CAPÍTULO 05",
        title: "EXPERIMENTOS",
        note: "Ficheiros menores fixados numa parede de investigação: sinais úteis, não preenchimento.",
        privateLabel: "NOTA DE ARQUIVO",
        privateNote:
          "Esta edição documenta apenas trabalho público. Cada entrada liga a evidência que pode ser revista de forma independente.",
      },
      contact: {
        label: "CAPÍTULO 06",
        title: "CONTACTO",
        note: "Fim da edição. Início de um sistema difícil.",
        heading: "Tem um sistema difícil\nde construir?",
        body: "Trabalho em produtos digitais, plataformas e ideias técnicas que exigem mais do que um template padrão.",
        cta: "INICIAR CONVERSA",
        whatsappMessage: "Olá Hélio, gostaria de conversar sobre um projeto.",
        backCover: "CONTRACAPA",
        stamp: "DISPONÍVEL PARA O BRIEF CERTO",
        end: "ISSUE 001 / FIM DO FICHEIRO",
      },
    },
    project: {
      problem: "PROBLEMA",
      approach: "ABORDAGEM",
      result: "RESULTADO",
      architecture: "ARQUITETURA",
      repository: "Repositório",
    },
    blueprint: {
      label:
        "Um diagrama de sistemas com cliente, gateway de API, limite de serviço, base de dados, fila e worker",
      title: "MAPA DO SISTEMA / 01",
      note: "Validar no limite. Emitir eventos após a persistência. Observar cada fronteira.",
      nodes: [
        "WEB",
        "GATEWAY\nDE API",
        "LIMITE\nDE SERVIÇO",
        "POSTGRES",
        "FILA\nDE EVENTOS",
        "WORKER",
      ],
    },
    accessibility: { readingProgress: "Progresso de leitura" },
  },
};

export const metadataByLocale = Object.fromEntries(
  Object.entries(messages).map(([locale, content]) => [locale, content.metadata]),
) as Record<Locale, Messages["metadata"]>;
