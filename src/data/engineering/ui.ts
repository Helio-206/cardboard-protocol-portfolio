import type { EvidenceCategory, EvidenceConfidence, EvidenceStatus } from "./types";
import type { Locale } from "@/i18n/config";

export type EngineeringUi = {
  archiveLabel: string;
  projectFile: string;
  repository: string;
  source: string;
  sourceUnavailable: string;
  lastReviewed: string;
  simulated: string;
  documented: string;
  verified: string;
  experimental: string;
  reset: string;
  start: string;
  next: string;
  pause: string;
  resume: string;
  autoRun: string;
  simulateFailure: string;
  recover: string;
  currentState: string;
  eventLog: string;
  inspector: string;
  closeInspector: string;
  noEvents: string;
  completed: string;
  paused: string;
  failed: string;
  idle: string;
  running: string;
  preparedData: string;
  openEvidence: string;
  openXray: string;
  openLab: string;
  runLab: string;
  enterEvidence: string;
  inspectRepository: string;
  all: string;
  search: string;
  searchPlaceholder: string;
  category: string;
  status: string;
  confidence: string;
  sortBy: string;
  noResults: string;
  clearFilters: string;
  claim: string;
  evidence: string;
  limitation: string;
  whyItMatters: string;
  doesNotProve: string;
  relatedArea: string;
  details: string;
  viewSource: string;
  externalLink: string;
  systemView: string;
  repositoryView: string;
  dependencyView: string;
  filterByType: string;
  clearSelection: string;
  copyPath: string;
  copied: string;
  dependencies: string;
  noDependencies: string;
  responsibility: string;
  path: string;
  alternateDiagram: string;
  loading: string;
  errorTitle: string;
  errorBody: string;
  tryAgain: string;
  backToStory: string;
  previousProject: string;
  nextProject: string;
  reviewed: string;
  areas: string;
  boundary: string;
  active: string;
  standby: string;
  pending: string;
  notCreated: string;
  notEvaluated: string;
  aggregate: string;
  membership: string;
  policy: string;
  eventKinds: Record<"event" | "failure" | "fallback", string>;
  categories: Record<EvidenceCategory, string>;
  statuses: Record<EvidenceStatus, string>;
  confidences: Record<EvidenceConfidence, string>;
  viewLabels: Record<"lab" | "evidence" | "x-ray", string>;
  experienceIntro: Record<"lab" | "evidence" | "x-ray", string>;
  metadata: Record<"lab" | "evidence" | "x-ray", { title: string; description: string }>;
};

export const engineeringUi: Record<Locale, EngineeringUi> = {
  en: {
    archiveLabel: "Engineering archive",
    projectFile: "Project File",
    repository: "Public repository",
    source: "Source",
    sourceUnavailable: "Source temporarily unavailable. Showing the last reviewed local snapshot.",
    lastReviewed: "Last reviewed",
    simulated: "Simulated",
    documented: "Documented",
    verified: "Verified",
    experimental: "Experimental",
    reset: "Reset simulation",
    start: "Start simulation",
    next: "Advance one step",
    pause: "Pause",
    resume: "Resume",
    autoRun: "Run automatically",
    simulateFailure: "Simulate failure",
    recover: "Apply fallback",
    currentState: "Current state",
    eventLog: "Event tape",
    inspector: "Inspector",
    closeInspector: "Close inspector",
    noEvents: "No events recorded. Start the simulation to generate a deterministic trace.",
    completed: "Completed",
    paused: "Paused",
    failed: "Failed",
    idle: "Ready",
    running: "Running",
    preparedData: "Prepared demonstration data",
    openEvidence: "Open related evidence",
    openXray: "Inspect related repository area",
    openLab: "Open related simulation",
    runLab: "Run System Lab",
    enterEvidence: "Enter Evidence Room",
    inspectRepository: "Inspect Repository",
    all: "All",
    search: "Search",
    searchPlaceholder: "Search claims, paths or architecture…",
    category: "Category",
    status: "Status",
    confidence: "Confidence",
    sortBy: "Sort by",
    noResults: "No reviewed evidence matches this inspection.",
    clearFilters: "Clear filters",
    claim: "Claim",
    evidence: "Public evidence",
    limitation: "Limitation",
    whyItMatters: "Why it matters",
    doesNotProve: "What it does not prove",
    relatedArea: "Related repository area",
    details: "Inspect evidence",
    viewSource: "View public source",
    externalLink: "opens in a new tab",
    systemView: "System View",
    repositoryView: "Repository View",
    dependencyView: "Dependency View",
    filterByType: "Filter by area type",
    clearSelection: "Clear selection",
    copyPath: "Copy path",
    copied: "Path copied",
    dependencies: "Dependencies",
    noDependencies: "No explicit dependency is represented in this reviewed snapshot.",
    responsibility: "Responsibility",
    path: "Public path",
    alternateDiagram: "Text alternative for the repository map",
    loading: "Opening reviewed archive snapshot…",
    errorTitle: "Archive view unavailable",
    errorBody: "The experience could not be assembled. The Project File remains available.",
    tryAgain: "Try again",
    backToStory: "Back to Project File",
    previousProject: "Previous project",
    nextProject: "Next project",
    reviewed: "Reviewed",
    areas: "Areas",
    boundary: "Boundary",
    active: "Active",
    standby: "Standby",
    pending: "Pending",
    notCreated: "Not created",
    notEvaluated: "Not evaluated",
    aggregate: "Aggregate",
    membership: "Membership",
    policy: "Policy",
    eventKinds: { event: "Event", failure: "Failure", fallback: "Fallback" },
    categories: {
      architecture: "Architecture",
      "repository-structure": "Repository Structure",
      documentation: "Documentation",
      testing: "Testing",
      "runtime-behaviour": "Runtime Behaviour",
      security: "Security",
      "product-scope": "Product Scope",
      "known-limitations": "Known Limitations",
      roadmap: "Roadmap",
      release: "Release",
      api: "API",
      "domain-model": "Domain Model",
    },
    statuses: {
      verified: "Verified",
      documented: "Documented",
      demonstrated: "Demonstrated",
      experimental: "Experimental",
      planned: "Planned",
      limited: "Limited",
      unknown: "Unknown",
    },
    confidences: { high: "High", medium: "Medium", low: "Low" },
    viewLabels: { lab: "Live System Lab", evidence: "Evidence Room", "x-ray": "Repository X-Ray" },
    experienceIntro: {
      lab: "Deterministic architecture behaviour, simulated locally from reviewed public evidence.",
      evidence: "Reviewed public claims with explicit confidence and proof boundaries.",
      "x-ray": "Architecturally significant repository areas, responsibilities and dependencies.",
    },
    metadata: {
      lab: {
        title: "Live System Lab",
        description:
          "A local interactive architecture simulation built from documented system behaviour.",
      },
      evidence: {
        title: "Evidence Room",
        description:
          "Reviewed public engineering evidence, confidence and explicit proof boundaries.",
      },
      "x-ray": {
        title: "Repository X-Ray",
        description: "An architectural map of significant areas in a public software repository.",
      },
    },
  },
  pt: {
    archiveLabel: "Arquivo de engenharia",
    projectFile: "Ficheiro do Projeto",
    repository: "Repositório público",
    source: "Fonte",
    sourceUnavailable:
      "Fonte temporariamente indisponível. A mostrar o último snapshot local revisto.",
    lastReviewed: "Última revisão",
    simulated: "Simulado",
    documented: "Documentado",
    verified: "Verificado",
    experimental: "Experimental",
    reset: "Reiniciar simulação",
    start: "Iniciar simulação",
    next: "Avançar uma etapa",
    pause: "Pausar",
    resume: "Retomar",
    autoRun: "Executar automaticamente",
    simulateFailure: "Simular falha",
    recover: "Aplicar fallback",
    currentState: "Estado atual",
    eventLog: "Fita de eventos",
    inspector: "Inspector",
    closeInspector: "Fechar inspector",
    noEvents: "Nenhum evento registado. Inicia a simulação para gerar um traço determinístico.",
    completed: "Concluído",
    paused: "Pausado",
    failed: "Falhou",
    idle: "Pronto",
    running: "Em execução",
    preparedData: "Dados de demonstração preparados",
    openEvidence: "Abrir evidência relacionada",
    openXray: "Inspecionar área relacionada",
    openLab: "Abrir simulação relacionada",
    runLab: "Executar System Lab",
    enterEvidence: "Entrar na Evidence Room",
    inspectRepository: "Inspecionar repositório",
    all: "Todos",
    search: "Pesquisar",
    searchPlaceholder: "Pesquisar claims, paths ou arquitetura…",
    category: "Categoria",
    status: "Estado",
    confidence: "Confiança",
    sortBy: "Ordenar por",
    noResults: "Nenhuma evidência revista corresponde a esta inspeção.",
    clearFilters: "Limpar filtros",
    claim: "Afirmação",
    evidence: "Evidência pública",
    limitation: "Limitação",
    whyItMatters: "Porque importa",
    doesNotProve: "O que isto não prova",
    relatedArea: "Área relacionada do repositório",
    details: "Inspecionar evidência",
    viewSource: "Ver fonte pública",
    externalLink: "abre num novo separador",
    systemView: "Vista do Sistema",
    repositoryView: "Vista do Repositório",
    dependencyView: "Vista de Dependências",
    filterByType: "Filtrar por tipo de área",
    clearSelection: "Limpar seleção",
    copyPath: "Copiar path",
    copied: "Path copiado",
    dependencies: "Dependências",
    noDependencies: "Nenhuma dependência explícita está representada neste snapshot revisto.",
    responsibility: "Responsabilidade",
    path: "Path público",
    alternateDiagram: "Alternativa textual para o mapa do repositório",
    loading: "A abrir o snapshot revisto do arquivo…",
    errorTitle: "Vista do arquivo indisponível",
    errorBody: "A experiência não pôde ser montada. O Ficheiro do Projeto continua disponível.",
    tryAgain: "Tentar novamente",
    backToStory: "Voltar ao Ficheiro do Projeto",
    previousProject: "Projeto anterior",
    nextProject: "Projeto seguinte",
    reviewed: "Revistas",
    areas: "Áreas",
    boundary: "Fronteira",
    active: "Ativo",
    standby: "Em espera",
    pending: "Pendente",
    notCreated: "Não criada",
    notEvaluated: "Não avaliada",
    aggregate: "Aggregate",
    membership: "Membership",
    policy: "Política",
    eventKinds: { event: "Evento", failure: "Falha", fallback: "Fallback" },
    categories: {
      architecture: "Arquitetura",
      "repository-structure": "Estrutura do Repositório",
      documentation: "Documentação",
      testing: "Testes",
      "runtime-behaviour": "Comportamento em Runtime",
      security: "Segurança",
      "product-scope": "Escopo do Produto",
      "known-limitations": "Limitações Conhecidas",
      roadmap: "Roadmap",
      release: "Release",
      api: "API",
      "domain-model": "Modelo de Domínio",
    },
    statuses: {
      verified: "Verificado",
      documented: "Documentado",
      demonstrated: "Demonstrado",
      experimental: "Experimental",
      planned: "Planeado",
      limited: "Limitado",
      unknown: "Desconhecido",
    },
    confidences: { high: "Alta", medium: "Média", low: "Baixa" },
    viewLabels: { lab: "Live System Lab", evidence: "Evidence Room", "x-ray": "Repository X-Ray" },
    experienceIntro: {
      lab: "Comportamento arquitetural determinístico, simulado localmente a partir de evidência pública revista.",
      evidence: "Afirmações públicas revistas com confiança explícita e fronteiras da prova.",
      "x-ray":
        "Áreas arquiteturalmente significativas, responsabilidades e dependências do repositório.",
    },
    metadata: {
      lab: {
        title: "Live System Lab",
        description:
          "Uma simulação arquitetural interativa local baseada no comportamento documentado do sistema.",
      },
      evidence: {
        title: "Evidence Room",
        description:
          "Evidência pública de engenharia revista, confiança e fronteiras explícitas da prova.",
      },
      "x-ray": {
        title: "Repository X-Ray",
        description: "Um mapa arquitetural das áreas significativas de um repositório público.",
      },
    },
  },
};
