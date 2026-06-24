import type { LocalizedProjectData } from "@/types/project";
import type { VellorSections } from "@/types/projects";
import { vellorEn } from "./content.en";
import { vellorPt } from "./content.pt";

export const vellorProject: LocalizedProjectData<VellorSections> = {
  id: "vellor",

  title: "Vellor",

  tagline: "Modern RSVP and event experience platform for curated gatherings",

  tags: ["React", "TypeScript", "Node.js", "Google Sheets", "Product Design"],

  year: 2026,

  status: "in development",

  links: {
    demo: "#",
    github: "#",
  },

  cardPosition: {
    top: "65%",
    left: "44%",
  },

  media: {
    type: "image",
    src: "/media/vellor-bg.webp",
    alt: "Vellor",
  },

  heroImage: "/media/vellor-hero.webp",

  sections: vellorEn,

  pt: {
    tagline: "Plataforma moderna de RSVP para eventos e experiências refinadas",

    sections: vellorPt,
  },

  assistant: {
    context: `
Vellor is a premium RSVP and private event platform.

Main topics:
- digital invitations
- RSVP workflows
- event operations
- premium UX
- guest management
    `,

    quickPrompts: [
      "Why use Google Sheets?",
      "How does RSVP work?",
      "What makes Vellor different?",
    ],
    quickPromptsPt: [
      "Por que usar Google Sheets?",
      "Como funciona o RSVP?",
      "O que diferencia o Vellor?",
    ],
  },
};
