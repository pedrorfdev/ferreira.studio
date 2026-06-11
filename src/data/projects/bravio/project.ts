import type { LocalizedProjectData } from "@/types/project";
import type { BravioSections } from "@/types/projects/bravio";

import { bravioEn } from "./content.en";
import { bravioPt } from "./content.pt";

export const bravioProject: LocalizedProjectData<BravioSections> = {
  id: "bravio",

  title: "Bravio",

  tagline:
    "Operational visibility platform for agricultural logistics and field operations",

  tags: ["React", "Node.js", "PostgreSQL", "TypeScript", "Agro", "Full Stack"],

  year: 2026,

  status: "in development",

  cardPosition: {
    top: "42%",
    left: "60%",
  },

  media: {
    type: "image",
    src: "/media/bravio-bg.jpg",
    alt: "Bravio",
  },

  heroImage: "/media/bravio-hero.jpg",

  sections: bravioEn,

  pt: {
    tagline: "Plataforma de visibilidade operacional para logística agrícola",

    sections: bravioPt,
  },

  assistant: {
    context: `
Bravio is an operational platform focused on agricultural logistics and field visibility.

Main topics:
- offline-first architecture
- mobile-first workflows
- field usability
- operational simplicity
- rural connectivity limitations
        `,

    quickPrompts: [
      "Why offline-first?",
      "Why mobile-first web instead of native?",
      "What problem does Bravio solve?",
    ],
    quickPromptsPt: [
      "Por que offline-first?",
      "Por que web mobile-first em vez de nativo?",
      "Qual problema o Bravio resolve?",
    ],
  },
};
