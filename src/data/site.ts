import type { Locale } from "@/types/site";

export const site = {
  name: "Hélio Matondo",
  fullName: "Nataniel Hélio Matondo",
  title: "Full-Stack Software Engineer & Systems Architect",
  email: "Heliomatondo@gmail.com",
  github: "https://github.com/Helio-206",
  location: "Luanda / Worldwide",
  localeLabels: { en: "PT", pt: "EN" } satisfies Record<Locale, string>,
  copy: {
    en: {
      strapline: "A graphic novel about systems, code and ideas.",
      readStory: "Read the story",
      viewProjects: "View projects",
      origin: "Origin",
      engineer: "The engineer",
      systems: "Selected systems",
      process: "Engineering process",
      experiments: "Experiments",
      contact: "Contact",
    },
    pt: {
      strapline: "Uma graphic novel sobre sistemas, código e ideias.",
      readStory: "Ler a história",
      viewProjects: "Ver projetos",
      origin: "Origem",
      engineer: "O engenheiro",
      systems: "Sistemas selecionados",
      process: "Processo de engenharia",
      experiments: "Experimentos",
      contact: "Contacto",
    },
  },
};
