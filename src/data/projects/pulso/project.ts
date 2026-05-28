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

  year: 2025,

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

  sections: pulsoEn,

  pt: {
    tagline: "Plataforma de coordenação operacional para equipes",

    sections: pulsoPt,
  },

  assistant: {
    context: `
Pulso is an operational coordination platform for volunteer and organizational teams.

Main themes:
- RBAC
- operational simplicity
- schedule coordination
- confirmations
- WhatsApp replacement
        `,

    quickPrompts: [
      "Why RBAC from day one?",
      "Why not use Slack?",
      "What operational problem are you solving?",
    ],
  },
};
