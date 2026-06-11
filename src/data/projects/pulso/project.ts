import type { LocalizedProjectData } from "@/types/project";
import type { PulsoSections } from "@/types/projects/pulso";

import { pulsoEn } from "./content.en";
import { pulsoPt } from "./content.pt";

export const pulsoProject: LocalizedProjectData<PulsoSections> = {
  id: "pulso",

  title: "Pulso",

  tagline:
    "Operational coordination platform for teams that still run on WhatsApp",

  tags: [
    "React",
    "Node.js",
    "PostgreSQL",
    "TypeScript",
    "Product",
    "Full Stack",
  ],

  year: 2026,

  status: "in development",

  cardPosition: {
    top: "35%",
    left: "62%",
  },

  media: {
    type: "image",
    src: "/media/pulso-bg.jpg",
    alt: "Pulso",
  },

  heroImage: "/media/pulso-hero.jpg",

  links: {
    demo: "#",
    github: "#",
  },

  sections: pulsoEn,

  pt: {
    tagline: "Plataforma de coordenação operacional para equipes e escalas",

    sections: pulsoPt,
  },

  assistant: {
    context: `
Pulso is an operational coordination platform.

Core themes:

- volunteer teams
- scheduling
- availability
- confirmations
- leadership visibility
- RBAC
- operational simplicity
- coordination workflows
    `,

    quickPrompts: [
      "Why RBAC from day one?",
      "What problem does Pulso solve?",
      "Why not use WhatsApp?",
    ],
    quickPromptsPt: [
      "Por que RBAC desde o início?",
      "Qual problema o Pulso resolve?",
      "Por que não usar WhatsApp?",
    ],
  },
};
