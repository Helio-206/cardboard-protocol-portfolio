import type { ProjectStory, StoryChapter } from "@/data/project-stories/types";

const en: StoryChapter[] = [
  {
    id: "trigger",
    number: "01",
    title: "The Trigger",
    summary:
      "The internet already contained the courses, but not a reliable learning system around them.",
    panels: [
      {
        kind: "terminal",
        title: "Open tabs",
        lines: [
          "YouTube playlists   Coursera",
          "notes               bookmarks",
          "search history      partially watched videos",
        ],
      },
      {
        kind: "caption",
        stamp: "FIELD OBSERVATION",
        body: [
          "The internet already contained the courses.",
          "What it did not contain was a reliable way to turn those courses into a learning system.",
          "A saved video is not yet knowledge.",
        ],
      },
    ],
  },
  {
    id: "assumption",
    number: "02",
    title: "The Hidden Assumption",
    summary: "The video player was being treated as the learning environment instead of a source.",
    panels: [
      {
        kind: "decision",
        stamp: "ASSUMPTION",
        title: "Player as destination",
        body: [
          "A player provides playback, timeline, comments and recommendations.",
          "It does not naturally provide curriculum, searchable transcripts, prerequisites, persistent context, review questions or semantic retrieval.",
        ],
      },
      {
        kind: "caption",
        body: [
          "The first boundary to change was simple: the video should become a source, not the final interface.",
        ],
      },
    ],
  },
  {
    id: "first-model",
    number: "03",
    title: "The First Model",
    summary: "Convert one external URL into an internal learning object.",
    panels: [
      {
        kind: "flow",
        title: "First useful flow",
        steps: ["URL", "Metadata", "Learning Space", "Transcript", "Notes", "Progress", "Search"],
        tone: "blue",
      },
      {
        kind: "caption",
        title: "Learning Spaces",
        body: [
          "Spaces represent a subject or learning goal: Machine Learning, Advanced React or System Design.",
          "The first model focused on one action: paste a URL and convert the external video into an internal learning object.",
        ],
      },
    ],
  },
  {
    id: "friction",
    number: "04",
    title: "The Friction",
    summary:
      "A URL looked like one input but expanded into a long-running, failure-prone pipeline.",
    panels: [
      {
        kind: "limits",
        items: [
          "Videos, playlists and courses",
          "Duplicate or missing metadata",
          "Unavailable captions and long audio",
          "Transcription cost and job duration",
          "Partial failures and multiple languages",
          "Inactive workers and indexing delays",
          "Context-window and curriculum-order constraints",
        ],
      },
      {
        kind: "caption",
        body: [
          "The interface made ingestion look like one action.",
          "The system revealed that it was a pipeline.",
        ],
      },
    ],
  },
  {
    id: "breakthrough",
    number: "05",
    title: "The Breakthrough",
    summary:
      "Model learning conversion as separate asynchronous jobs with independent failure boundaries.",
    panels: [
      {
        kind: "flow",
        title: "Ingestion pipeline",
        steps: [
          "Validate source",
          "Detect platform",
          "Create job",
          "Extract metadata",
          "Queue transcript",
          "Index content",
          "Summarize",
          "Rebuild curriculum",
        ],
        tone: "red",
      },
      {
        kind: "decision",
        stamp: "PROTOCOL",
        title: "Captions-first",
        body: [
          "Existing captions are faster, cheaper and avoid unnecessary GPU work.",
          "Whisper remains necessary because not every source contains usable captions.",
        ],
      },
      {
        kind: "technical",
        title: "Independent queues",
        items: [
          "Ingestion",
          "Transcription",
          "AI summary",
          "Curriculum reconstruction",
          "Independent retry and scaling",
          "Failure isolation and observable status",
        ],
      },
    ],
  },
  {
    id: "system",
    number: "06",
    title: "The System",
    summary:
      "Web capture, API state, durable data, queues and workers form one inspectable pipeline.",
    panels: [
      {
        kind: "flow",
        title: "System boundary",
        steps: [
          "Browser / extension",
          "Next.js",
          "FastAPI",
          "PostgreSQL",
          "Redis queues",
          "Workers",
        ],
        tone: "blue",
      },
      {
        kind: "terminal",
        title: "Worker topology",
        lines: [
          "ingestion    yt-dlp",
          "transcript   FFmpeg + faster-whisper",
          "summary      heuristic / OpenRouter / Ollama",
          "curriculum   dependency graph + topological sort",
          "search       Meilisearch",
        ],
      },
      {
        kind: "decision",
        title: "AI cannot be a single point of failure",
        body: [
          "The heuristic provider preserves baseline functionality when remote or local model providers are unavailable.",
          "Manual curriculum reordering persists immediately without rebuilding the entire curriculum.",
        ],
      },
    ],
  },
  {
    id: "trade-offs",
    number: "07",
    title: "Trade-offs",
    summary: "The pipeline gains specialization while accepting explicit operational complexity.",
    panels: [
      {
        kind: "decision",
        title: "Next.js + FastAPI",
        body: [
          "The interface stays in Next.js; Python-native ingestion and transcription stay in FastAPI.",
          "Trade-off: two runtimes and more deployment complexity.",
        ],
      },
      {
        kind: "decision",
        title: "PostgreSQL + Meilisearch",
        body: [
          "PostgreSQL remains the source of truth; Meilisearch serves retrieval.",
          "Trade-off: indexing consistency must be managed.",
        ],
      },
      {
        kind: "decision",
        title: "RQ + Redis + extension",
        body: [
          "Explicit jobs and in-context capture reduce user friction.",
          "Trade-off: worker supervision, retry, authentication and configuration become operational concerns.",
        ],
      },
    ],
  },
  {
    id: "limits",
    number: "08",
    title: "Current Limits",
    summary:
      "Quality and availability depend on source media, workers, indexes and configured providers.",
    panels: [
      {
        kind: "limits",
        stamp: "CURRENT LIMIT",
        items: [
          "Transcription depends on audio quality and model size",
          "Larger Whisper models require stronger hardware",
          "Curriculum quality depends on metadata and provider",
          "Heuristic AI is reliable but lower quality",
          "Workers must run for asynchronous actions",
          "Search waits for indexing completion",
          "External platforms may change",
          "Job status currently uses polling",
          "Some providers require API keys",
        ],
      },
    ],
  },
  {
    id: "change",
    number: "09",
    title: "What I Would Change",
    summary:
      "The next iteration should make workflows more durable, attributable and resource-aware.",
    panels: [
      {
        kind: "technical",
        stamp: "NEXT EXTRACTION",
        items: [
          "Event-driven status instead of polling",
          "Durable and resumable workflows",
          "Transcript confidence and source provenance",
          "Summary citations linked to timestamps",
          "Semantic and hybrid search",
          "Spaced repetition and knowledge graph",
          "Stronger observability",
          "Resource-aware transcription scheduling",
          "User-controlled models and offline study exports",
        ],
      },
    ],
  },
  {
    id: "technical-file",
    number: "10",
    title: "Technical File",
    summary: "The tools and boundaries behind the learning conversion pipeline.",
    panels: [
      {
        kind: "terminal",
        stamp: "VERIFIED",
        lines: [
          "web: Next.js + Zustand + browser extension",
          "api: FastAPI + Pydantic + JWT",
          "data: PostgreSQL + SQLAlchemy",
          "queues: Redis + RQ",
          "media: yt-dlp + FFmpeg + faster-whisper",
          "search: Meilisearch",
          "providers: heuristic / OpenRouter / Ollama",
        ],
      },
      {
        kind: "caption",
        body: [
          "Recall began by saving videos. The system only became coherent when the video stopped being the destination and became raw material for a learning structure.",
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
      "A internet já continha os cursos, mas não um sistema de aprendizagem fiável à sua volta.",
    panels: [
      {
        kind: "terminal",
        title: "Separadores abertos",
        lines: [
          "playlists YouTube   Coursera",
          "notas               favoritos",
          "histórico            vídeos incompletos",
        ],
      },
      {
        kind: "caption",
        stamp: "OBSERVAÇÃO",
        body: [
          "A internet já continha os cursos.",
          "O que não continha era uma forma fiável de transformar esses cursos num sistema de aprendizagem.",
          "Um vídeo guardado ainda não é conhecimento.",
        ],
      },
    ],
  },
  {
    id: "assumption",
    number: "02",
    title: "A Suposição Oculta",
    summary: "O player era tratado como ambiente de aprendizagem em vez de fonte.",
    panels: [
      {
        kind: "decision",
        stamp: "SUPOSIÇÃO",
        title: "Player como destino",
        body: [
          "Um player oferece reprodução, timeline, comentários e recomendações.",
          "Não oferece naturalmente currículo, transcript pesquisável, pré-requisitos, contexto persistente, perguntas de revisão ou pesquisa semântica.",
        ],
      },
      {
        kind: "caption",
        body: [
          "A primeira fronteira a mudar era simples: o vídeo devia tornar-se fonte, não interface final.",
        ],
      },
    ],
  },
  {
    id: "first-model",
    number: "03",
    title: "O Primeiro Modelo",
    summary: "Converter um URL externo num objeto interno de aprendizagem.",
    panels: [
      {
        kind: "flow",
        title: "Primeiro fluxo útil",
        steps: [
          "URL",
          "Metadados",
          "Learning Space",
          "Transcript",
          "Notas",
          "Progresso",
          "Pesquisa",
        ],
        tone: "blue",
      },
      {
        kind: "caption",
        title: "Learning Spaces",
        body: [
          "Os espaços representam um tema ou objetivo: Machine Learning, React Avançado ou System Design.",
          "O primeiro modelo focou uma ação: colar um URL e converter o vídeo externo num objeto interno de aprendizagem.",
        ],
      },
    ],
  },
  {
    id: "friction",
    number: "04",
    title: "A Fricção",
    summary:
      "Um URL parecia uma entrada única, mas expandia-se num pipeline demorado e sujeito a falhas.",
    panels: [
      {
        kind: "limits",
        items: [
          "Vídeos, playlists e cursos",
          "Duplicados ou metadados em falta",
          "Legendas indisponíveis e áudio longo",
          "Custo e duração da transcrição",
          "Falhas parciais e vários idiomas",
          "Workers inativos e atrasos de indexação",
          "Limites de contexto e ordem curricular",
        ],
      },
      {
        kind: "caption",
        body: [
          "A interface fazia a ingestão parecer uma única ação.",
          "O sistema revelou que era um pipeline.",
        ],
      },
    ],
  },
  {
    id: "breakthrough",
    number: "05",
    title: "A Viragem",
    summary:
      "Modelar a conversão como jobs assíncronos separados, com fronteiras de falha independentes.",
    panels: [
      {
        kind: "flow",
        title: "Pipeline de ingestão",
        steps: [
          "Validar fonte",
          "Detetar plataforma",
          "Criar job",
          "Extrair metadados",
          "Enfileirar transcript",
          "Indexar",
          "Resumir",
          "Reconstruir currículo",
        ],
        tone: "red",
      },
      {
        kind: "decision",
        stamp: "PROTOCOLO",
        title: "Legendas primeiro",
        body: [
          "Legendas existentes são mais rápidas, baratas e evitam trabalho desnecessário de GPU.",
          "Whisper continua necessário porque nem toda fonte tem legendas utilizáveis.",
        ],
      },
      {
        kind: "technical",
        title: "Filas independentes",
        items: [
          "Ingestão",
          "Transcrição",
          "Resumo por IA",
          "Reconstrução curricular",
          "Retry e escala independentes",
          "Isolamento de falhas e estado observável",
        ],
      },
    ],
  },
  {
    id: "system",
    number: "06",
    title: "O Sistema",
    summary:
      "Captura web, estado da API, dados duráveis, filas e workers formam um pipeline inspecionável.",
    panels: [
      {
        kind: "flow",
        title: "Fronteira do sistema",
        steps: ["Browser / extensão", "Next.js", "FastAPI", "PostgreSQL", "Filas Redis", "Workers"],
        tone: "blue",
      },
      {
        kind: "terminal",
        title: "Topologia dos workers",
        lines: [
          "ingestion    yt-dlp",
          "transcript   FFmpeg + faster-whisper",
          "summary      heuristic / OpenRouter / Ollama",
          "curriculum   grafo + topological sort",
          "search       Meilisearch",
        ],
      },
      {
        kind: "decision",
        title: "IA não pode ser ponto único de falha",
        body: [
          "O provider heurístico preserva funcionalidade básica quando modelos remotos ou locais não estão disponíveis.",
          "A reordenação manual do currículo persiste imediatamente sem reconstruir tudo.",
        ],
      },
    ],
  },
  {
    id: "trade-offs",
    number: "07",
    title: "Trade-offs",
    summary: "O pipeline ganha especialização e aceita complexidade operacional explícita.",
    panels: [
      {
        kind: "decision",
        title: "Next.js + FastAPI",
        body: [
          "A interface permanece em Next.js; ingestão e transcrição Python ficam em FastAPI.",
          "Custo: dois runtimes e deploy mais complexo.",
        ],
      },
      {
        kind: "decision",
        title: "PostgreSQL + Meilisearch",
        body: [
          "PostgreSQL é a fonte de verdade; Meilisearch serve pesquisa.",
          "Custo: a consistência do índice precisa de gestão.",
        ],
      },
      {
        kind: "decision",
        title: "RQ + Redis + extensão",
        body: [
          "Jobs explícitos e captura em contexto reduzem fricção.",
          "Custo: supervisão, retries, autenticação e configuração tornam-se preocupações operacionais.",
        ],
      },
    ],
  },
  {
    id: "limits",
    number: "08",
    title: "Limites Atuais",
    summary:
      "Qualidade e disponibilidade dependem da fonte, dos workers, índices e providers configurados.",
    panels: [
      {
        kind: "limits",
        stamp: "LIMITE ATUAL",
        items: [
          "Transcrição depende do áudio e do modelo",
          "Modelos Whisper maiores exigem hardware mais forte",
          "Currículo depende dos metadados e provider",
          "IA heurística é fiável mas inferior",
          "Workers devem estar ativos",
          "Pesquisa depende da indexação",
          "Plataformas externas podem mudar",
          "Estado dos jobs usa polling",
          "Alguns providers exigem API keys",
        ],
      },
    ],
  },
  {
    id: "change",
    number: "09",
    title: "O Que Mudaria",
    summary:
      "A próxima iteração deve tornar os workflows mais duráveis, atribuíveis e conscientes de recursos.",
    panels: [
      {
        kind: "technical",
        stamp: "PRÓXIMA EXTRAÇÃO",
        items: [
          "Estado orientado a eventos em vez de polling",
          "Workflows duráveis e retomáveis",
          "Confiança do transcript e proveniência",
          "Citações ligadas a timestamps",
          "Pesquisa semântica e híbrida",
          "Spaced repetition e knowledge graph",
          "Observabilidade mais forte",
          "Agendamento consciente de recursos",
          "Modelos controlados pelo utilizador e exportação offline",
        ],
      },
    ],
  },
  {
    id: "technical-file",
    number: "10",
    title: "Ficheiro Técnico",
    summary: "As ferramentas e fronteiras do pipeline de conversão de aprendizagem.",
    panels: [
      {
        kind: "terminal",
        stamp: "VERIFICADO",
        lines: [
          "web: Next.js + Zustand + browser extension",
          "api: FastAPI + Pydantic + JWT",
          "dados: PostgreSQL + SQLAlchemy",
          "filas: Redis + RQ",
          "media: yt-dlp + FFmpeg + faster-whisper",
          "pesquisa: Meilisearch",
          "providers: heuristic / OpenRouter / Ollama",
        ],
      },
      {
        kind: "caption",
        body: [
          "Recall começou por guardar vídeos. O sistema só ficou coerente quando o vídeo deixou de ser o destino e passou a ser matéria-prima para uma estrutura de aprendizagem.",
        ],
      },
    ],
  },
];

export const recallStory: ProjectStory = {
  id: "recall-story",
  slug: "recall",
  projectSlug: "recall",
  sceneImage: "/project-media/story/recall-origin.webp",
  sceneAlt: {
    en: "An empty study desk with a laptop, headphones, transcript fragments and a curriculum diagram.",
    pt: "Uma secretária de estudo vazia com computador, auscultadores, fragmentos de transcrição e um diagrama curricular.",
  },
  sceneCaption: {
    en: "The content already existed. The missing part was a system capable of turning it into knowledge.",
    pt: "O conteúdo já existia. Faltava um sistema capaz de o transformar em conhecimento.",
  },
  caseNumber: { en: "CASE FILE 03", pt: "DOSSIER 03" },
  classification: {
    en: "LEARNING OS / ASYNCHRONOUS PIPELINE",
    pt: "LEARNING OS / PIPELINE ASSÍNCRONO",
  },
  status: { en: "RESEARCH PRODUCT", pt: "PRODUTO DE INVESTIGAÇÃO" },
  repository: "https://github.com/Helio-206/Recall",
  accent: "blue",
  seoTitle: {
    en: "Recall — Learning OS and Video Knowledge System | Hélio Matondo",
    pt: "Recall — Learning OS e Sistema de Conhecimento em Vídeo | Hélio Matondo",
  },
  content: {
    en: {
      title: "RECALL",
      subtitle: "Internet video converted into structured, searchable knowledge.",
      description:
        "A technical case study about asynchronous ingestion, transcription, search and curriculum reconstruction.",
      thesis:
        "A video should be a source for learning structure, not the final learning interface.",
      chapters: en,
      finalLine: "The video became raw material for a learning structure.",
    },
    pt: {
      title: "RECALL",
      subtitle: "Vídeo da internet convertido em conhecimento estruturado e pesquisável.",
      description:
        "Um estudo técnico sobre ingestão assíncrona, transcrição, pesquisa e reconstrução curricular.",
      thesis: "Um vídeo deve ser fonte para uma estrutura de aprendizagem, não a interface final.",
      chapters: pt,
      finalLine: "O vídeo tornou-se matéria-prima para uma estrutura de aprendizagem.",
    },
  },
};
