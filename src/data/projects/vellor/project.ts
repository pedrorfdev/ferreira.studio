import type { LocalizedProjectData } from "@/types/project";
import type { VellorSections } from "@/types/projects/vellor";

import { vellorEn } from "./content.en";
import { vellorPt } from "./content.pt";

export const vellorProject: LocalizedProjectData<VellorSections> = {
  id: "vellor",

  title: "Vellor",

  tagline: "Modern RSVP and event experience platform for curated gatherings",

  tags: ["React", "Node.js", "TypeScript", "Events", "Product"],

  year: 2026,

  status: "in development",

  cardPosition: {
    top: "65%",
    left: "44%",
  },

  media: {
    type: "image",
    src: "/media/vellor-bg.jpg",
    alt: "Vellor",
  },

  heroImage: "/media/vellor-hero.jpg",

  sections: vellorEn,

  pt: {
    tagline: "Plataforma moderna de RSVP para eventos e experiências refinadas",

    sections: vellorPt,
  },

  assistant: {
    context: `
Vellor is a premium RSVP and private event platform.

Focus on:
- elegant UX
- emotional product design
- operational simplicity
- lightweight infrastructure
        `,

    quickPrompts: [
      "Why use Google Sheets?",
      "What makes Vellor different?",
      "How does the private RSVP flow work?",
    ],
  },
};
