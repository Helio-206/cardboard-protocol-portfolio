import type { ProjectStory, StoryChapter } from "@/data/project-stories/types";

const en: StoryChapter[] = [
  {
    id: "trigger",
    number: "01",
    title: "The Trigger",
    summary: "The cloud was treated as mandatory, even when everyone was already in the same room.",
    panels: [
      {
        kind: "caption",
        stamp: "FIELD OBSERVATION",
        body: [
          "People can be in the same room, connected to the same network, and still depend on a server thousands of kilometres away to speak to each other.",
          "The first question was not how to build another messaging interface. It was whether the cloud needed to exist in the loop at all.",
        ],
      },
      {
        kind: "flow",
        title: "The inherited route",
        steps: ["Device", "Internet", "Cloud", "Central identity", "Internet", "Device"],
        tone: "red",
      },
    ],
  },
  {
    id: "assumption",
    number: "02",
    title: "The Hidden Assumption",
    summary:
      "Communication systems assume permanent infrastructure for groups that may only be temporary.",
    panels: [
      {
        kind: "decision",
        stamp: "ASSUMPTION",
        title: "Permanence",
        body: [
          "Accounts are permanent. Servers are permanent. Identity is centralized. But many human groups are temporary.",
          "KAYA starts from the opposite model: the digital space appears when the group appears and fades when the group leaves.",
        ],
      },
      {
        kind: "flow",
        title: "Boundary after removal",
        steps: ["Peer", "Local network", "Peer"],
        tone: "blue",
      },
    ],
  },
  {
    id: "first-model",
    number: "03",
    title: "The First Model",
    summary: "Prove local presence, rooms and messaging before investing in a broader interface.",
    panels: [
      {
        kind: "technical",
        stamp: "PROTOCOL",
        title: "Smallest credible system",
        items: [
          "Automatic LAN peer discovery",
          "Public rooms and direct messages",
          "Terminal interface",
          "No login, cloud or central server",
        ],
      },
      {
        kind: "caption",
        title: "Why terminal-first",
        body: [
          "The terminal kept the binary light, the state inspectable and the interaction model visible on modest hardware.",
          "It was a product decision: prove the network and command model before paying for GUI complexity.",
        ],
      },
    ],
  },
  {
    id: "friction",
    number: "04",
    title: "The Friction",
    summary: "The first model worked only while the network behaved like the diagram.",
    panels: [
      {
        kind: "limits",
        stamp: "REWORKED",
        items: [
          "Multicast can be blocked",
          "Peers disappear and routes become stale",
          "Identity without accounts still requires trust",
          "Secure direct messages require cryptographic sessions",
          "File transfers and reachability can fail",
          "Public rooms and secure DMs have different security properties",
        ],
      },
      {
        kind: "caption",
        body: [
          "The first model worked only under an ideal network.",
          "The real problem began when the network stopped behaving like the diagram.",
        ],
      },
    ],
  },
  {
    id: "breakthrough",
    number: "05",
    title: "The Breakthrough",
    summary: "Preserve local-first as the primary path while adding controlled alternatives.",
    panels: [
      {
        kind: "decision",
        stamp: "SYSTEM BOUNDARY",
        title: "Local remains preferred",
        body: [
          "Direct TCP, VPN addressing and an optional WAN relay extend reach without redefining the product as cloud-first.",
          "Encrypted payloads may cross intermediate nodes without exposing plaintext. Mesh remains explicitly experimental.",
        ],
      },
      {
        kind: "technical",
        items: [
          "Trust fingerprints",
          "Ed25519 and X25519 identity material",
          "Encrypted DM sessions",
          "TTL, route scoring and route inspection",
          "Persistent local configuration and peer cache",
        ],
      },
    ],
  },
  {
    id: "system",
    number: "06",
    title: "The System",
    summary: "Networking, identity, commands, persistence and UI remain separate concerns.",
    panels: [
      {
        kind: "terminal",
        title: "Rust workspace",
        lines: [
          "app      commands   direct    events",
          "files    mesh       peer      persistence",
          "protocol relay      rooms     security",
          "shared   transport  ui        sdk",
        ],
      },
      {
        kind: "flow",
        title: "Runtime event flow",
        steps: [
          "LAN discovery",
          "Peer state",
          "Room membership",
          "Packet validation",
          "Event bus",
          "UI update",
        ],
        tone: "blue",
      },
      {
        kind: "flow",
        title: "Secure DM flow",
        steps: [
          "Peer identity",
          "Fingerprint",
          "Key agreement",
          "Encrypted session",
          "Selected transport",
          "Recipient decryption",
        ],
        tone: "ink",
      },
    ],
  },
  {
    id: "trade-offs",
    number: "07",
    title: "Trade-offs",
    summary: "Every dependency extends one capability and introduces a visible cost.",
    panels: [
      {
        kind: "decision",
        title: "Rust + terminal UI",
        body: [
          "Safety, concurrency, networking control and native distribution.",
          "Trade-off: a terminal interface is not suitable for every end user.",
        ],
      },
      {
        kind: "decision",
        title: "Multicast + optional relay",
        body: [
          "Multicast minimizes local setup; relay extends reach.",
          "Trade-off: multicast is not universal and relay must not become an invisible central dependency.",
        ],
      },
      {
        kind: "decision",
        title: "Experimental mesh",
        body: [
          "Mesh explores resilience across local routes.",
          "Trade-off: topology, routing and security become substantially more complex.",
        ],
      },
    ],
  },
  {
    id: "limits",
    number: "08",
    title: "Current Limits",
    summary: "The limitations remain explicit because the system is exploratory infrastructure.",
    panels: [
      {
        kind: "limits",
        stamp: "CURRENT LIMIT",
        items: [
          "Automatic discovery requires IPv4 UDP multicast",
          "Mesh routing is experimental",
          "Public rooms are plaintext",
          "File chunks are not relayed through mesh",
          "No general NAT traversal or mobile client",
          "Cryptography has not received an external audit",
          "Not a finished production communications platform",
        ],
      },
    ],
  },
  {
    id: "change",
    number: "09",
    title: "What I Would Change",
    summary: "Future work is framed as disciplined extraction, not as completed functionality.",
    panels: [
      {
        kind: "technical",
        stamp: "NEXT EXTRACTION",
        items: [
          "Formal protocol versioning and property-based tests",
          "Stronger threat modelling and external cryptographic audit",
          "NAT traversal and discovery transport research",
          "Better observability and chaos testing",
          "Mobile or desktop client above the SDK",
          "Resumable file transfer and more precise trust UX",
        ],
      },
    ],
  },
  {
    id: "technical-file",
    number: "10",
    title: "Technical File",
    summary: "The implementation evidence behind the product thesis.",
    panels: [
      {
        kind: "terminal",
        stamp: "VERIFIED",
        lines: [
          "language: Rust",
          "runtime: Tokio",
          "ui: Ratatui",
          "identity: Ed25519 + X25519",
          "encryption: ChaCha20-Poly1305",
          "discovery: UDP multicast",
          "reach: direct / optional relay / experimental mesh",
        ],
      },
      {
        kind: "caption",
        body: [
          "KAYA began as a communication tool. It became an argument: a local network can be social infrastructure, not merely plumbing.",
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
    summary:
      "A cloud era tratada como obrigatória, mesmo quando todas as pessoas já estavam na mesma sala.",
    panels: [
      {
        kind: "caption",
        stamp: "OBSERVAÇÃO",
        body: [
          "As pessoas podem estar na mesma sala, ligadas à mesma rede, e ainda depender de um servidor a milhares de quilómetros para comunicar.",
          "A primeira pergunta não foi como criar outra interface de mensagens. Foi se a cloud precisava realmente de existir no circuito.",
        ],
      },
      {
        kind: "flow",
        title: "A rota herdada",
        steps: [
          "Dispositivo",
          "Internet",
          "Cloud",
          "Identidade central",
          "Internet",
          "Dispositivo",
        ],
        tone: "red",
      },
    ],
  },
  {
    id: "assumption",
    number: "02",
    title: "A Suposição Oculta",
    summary:
      "Sistemas de comunicação assumem infraestrutura permanente para grupos que podem ser temporários.",
    panels: [
      {
        kind: "decision",
        stamp: "SUPOSIÇÃO",
        title: "Permanência",
        body: [
          "Contas são permanentes. Servidores são permanentes. A identidade é centralizada. Mas muitos grupos humanos são temporários.",
          "KAYA começa pelo modelo oposto: o espaço digital surge quando o grupo surge e desaparece quando o grupo parte.",
        ],
      },
      {
        kind: "flow",
        title: "Fronteira depois da remoção",
        steps: ["Peer", "Rede local", "Peer"],
        tone: "blue",
      },
    ],
  },
  {
    id: "first-model",
    number: "03",
    title: "O Primeiro Modelo",
    summary:
      "Provar presença local, salas e mensagens antes de investir numa interface mais ampla.",
    panels: [
      {
        kind: "technical",
        stamp: "PROTOCOLO",
        title: "Menor sistema credível",
        items: [
          "Descoberta automática de peers na LAN",
          "Salas públicas e mensagens diretas",
          "Interface de terminal",
          "Sem login, cloud ou servidor central",
        ],
      },
      {
        kind: "caption",
        title: "Porquê terminal primeiro",
        body: [
          "O terminal manteve o binário leve, o estado inspecionável e o modelo de interação visível em hardware modesto.",
          "Foi uma decisão de produto: provar a rede e os comandos antes de assumir a complexidade de uma GUI.",
        ],
      },
    ],
  },
  {
    id: "friction",
    number: "04",
    title: "A Fricção",
    summary: "O primeiro modelo só funcionava enquanto a rede se comportava como o diagrama.",
    panels: [
      {
        kind: "limits",
        stamp: "RETRABALHADO",
        items: [
          "Multicast pode ser bloqueado",
          "Peers desaparecem e as rotas ficam obsoletas",
          "Identidade sem contas continua a exigir confiança",
          "Mensagens diretas seguras exigem sessões criptográficas",
          "Transferências e alcance podem falhar",
          "Salas públicas e DMs seguras têm propriedades distintas",
        ],
      },
      {
        kind: "caption",
        body: [
          "O primeiro modelo funcionava apenas numa rede ideal.",
          "O problema real começou quando a rede deixou de se comportar como o diagrama.",
        ],
      },
    ],
  },
  {
    id: "breakthrough",
    number: "05",
    title: "A Viragem",
    summary: "Preservar local-first como caminho principal e acrescentar alternativas controladas.",
    panels: [
      {
        kind: "decision",
        stamp: "FRONTEIRA DO SISTEMA",
        title: "Local continua preferencial",
        body: [
          "TCP direto, endereçamento VPN e relay WAN opcional ampliam o alcance sem transformar o produto em cloud-first.",
          "Payloads cifrados podem atravessar nós intermédios sem expor plaintext. A mesh permanece explicitamente experimental.",
        ],
      },
      {
        kind: "technical",
        items: [
          "Fingerprints de confiança",
          "Material de identidade Ed25519 e X25519",
          "Sessões de DM cifradas",
          "TTL, pontuação e inspeção de rotas",
          "Configuração e cache local persistentes",
        ],
      },
    ],
  },
  {
    id: "system",
    number: "06",
    title: "O Sistema",
    summary:
      "Rede, identidade, comandos, persistência e UI permanecem responsabilidades separadas.",
    panels: [
      {
        kind: "terminal",
        title: "Workspace Rust",
        lines: [
          "app      commands   direct    events",
          "files    mesh       peer      persistence",
          "protocol relay      rooms     security",
          "shared   transport  ui        sdk",
        ],
      },
      {
        kind: "flow",
        title: "Fluxo de eventos",
        steps: [
          "Descoberta LAN",
          "Estado do peer",
          "Participação em sala",
          "Validação do pacote",
          "Event bus",
          "Atualização da UI",
        ],
        tone: "blue",
      },
      {
        kind: "flow",
        title: "Fluxo de DM segura",
        steps: [
          "Identidade",
          "Fingerprint",
          "Acordo de chave",
          "Sessão cifrada",
          "Transporte escolhido",
          "Decifragem",
        ],
        tone: "ink",
      },
    ],
  },
  {
    id: "trade-offs",
    number: "07",
    title: "Trade-offs",
    summary: "Cada dependência amplia uma capacidade e introduz um custo visível.",
    panels: [
      {
        kind: "decision",
        title: "Rust + terminal",
        body: [
          "Segurança, concorrência, controlo de rede e distribuição nativa.",
          "Custo: uma interface terminal não serve todos os utilizadores.",
        ],
      },
      {
        kind: "decision",
        title: "Multicast + relay opcional",
        body: [
          "Multicast reduz configuração local; relay amplia alcance.",
          "Custo: multicast não é universal e o relay não pode tornar-se uma dependência central invisível.",
        ],
      },
      {
        kind: "decision",
        title: "Mesh experimental",
        body: [
          "A mesh explora resiliência entre rotas locais.",
          "Custo: topologia, routing e segurança tornam-se muito mais complexos.",
        ],
      },
    ],
  },
  {
    id: "limits",
    number: "08",
    title: "Limites Atuais",
    summary: "Os limites permanecem explícitos porque o sistema é infraestrutura exploratória.",
    panels: [
      {
        kind: "limits",
        stamp: "LIMITE ATUAL",
        items: [
          "Descoberta automática exige IPv4 UDP multicast",
          "Routing mesh é experimental",
          "Salas públicas usam plaintext",
          "Chunks de ficheiros não passam pela mesh",
          "Sem NAT traversal geral ou cliente mobile",
          "Criptografia sem auditoria externa",
          "Não é uma plataforma de comunicação pronta para produção",
        ],
      },
    ],
  },
  {
    id: "change",
    number: "09",
    title: "O Que Mudaria",
    summary:
      "A evolução futura é tratada como extração disciplinada, não como funcionalidade concluída.",
    panels: [
      {
        kind: "technical",
        stamp: "PRÓXIMA EXTRAÇÃO",
        items: [
          "Versionamento formal do protocolo e testes baseados em propriedades",
          "Threat modelling e auditoria criptográfica externa",
          "Pesquisa de NAT traversal e transportes de descoberta",
          "Melhor observabilidade e chaos testing",
          "Cliente mobile ou desktop sobre o SDK",
          "Transferência retomável e UX de confiança mais precisa",
        ],
      },
    ],
  },
  {
    id: "technical-file",
    number: "10",
    title: "Ficheiro Técnico",
    summary: "A evidência de implementação por trás da tese do produto.",
    panels: [
      {
        kind: "terminal",
        stamp: "VERIFICADO",
        lines: [
          "linguagem: Rust",
          "runtime: Tokio",
          "ui: Ratatui",
          "identidade: Ed25519 + X25519",
          "cifra: ChaCha20-Poly1305",
          "descoberta: UDP multicast",
          "alcance: direto / relay opcional / mesh experimental",
        ],
      },
      {
        kind: "caption",
        body: [
          "KAYA começou como ferramenta de comunicação. Tornou-se um argumento: uma rede local pode ser infraestrutura social, não apenas canalização.",
        ],
      },
    ],
  },
];

export const kayaStory: ProjectStory = {
  id: "kaya-story",
  slug: "kaya",
  projectSlug: "kaya-cli",
  sceneImage: "/project-media/story/kaya-origin.webp",
  sceneAlt: {
    en: "An empty night desk with a laptop, router, network cables and a hand-drawn topology.",
    pt: "Uma secretária vazia à noite com computador, router, cabos de rede e uma topologia desenhada à mão.",
  },
  sceneCaption: {
    en: "Before the interface, there was a simpler question: why should two nearby devices need a distant server?",
    pt: "Antes da interface, existia uma pergunta mais simples: porque deveriam dois dispositivos próximos precisar de um servidor distante?",
  },
  caseNumber: { en: "CASE FILE 01", pt: "DOSSIER 01" },
  classification: {
    en: "LOCAL-FIRST COMMUNICATION / RUST",
    pt: "COMUNICAÇÃO LOCAL-FIRST / RUST",
  },
  status: { en: "v0.1.1 / EXPLORATORY", pt: "v0.1.1 / EXPLORATÓRIO" },
  repository: "https://github.com/Helio-206/KAYA-CLI",
  accent: "red",
  seoTitle: {
    en: "KAYA CLI — Offline-First Communication System | Hélio Matondo",
    pt: "KAYA CLI — Sistema de Comunicação Offline-First | Hélio Matondo",
  },
  content: {
    en: {
      title: "KAYA CLI",
      subtitle: "Physical proximity as temporary digital infrastructure.",
      description:
        "A technical case study about local-first communication, explicit trust and resilient network paths.",
      thesis: "Physical proximity should be enough to create temporary digital infrastructure.",
      chapters: en,
      finalLine: "A local network can be social infrastructure, not merely plumbing.",
    },
    pt: {
      title: "KAYA CLI",
      subtitle: "Proximidade física como infraestrutura digital temporária.",
      description:
        "Um estudo técnico sobre comunicação local-first, confiança explícita e caminhos de rede resilientes.",
      thesis:
        "A proximidade física deve ser suficiente para criar infraestrutura digital temporária.",
      chapters: pt,
      finalLine: "Uma rede local pode ser infraestrutura social, não apenas canalização.",
    },
  },
};
