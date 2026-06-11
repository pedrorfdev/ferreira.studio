import type { LocalizedProjectData } from "@/types/project";
import type { PraxisSections } from "@/types/projects/praxis";

import { praxisEn } from "./content.en";
import { praxisPt } from "./content.pt";

export const praxisProject: LocalizedProjectData<PraxisSections> = {
  id: "praxis",

  title: "Praxis",

  tagline:
    "Clinical operations platform built around how Occupational Therapists actually work",

  tags: [
    "React",
    "Node.js",
    "PostgreSQL",
    "TypeScript",
    "Healthcare",
    "Full Stack",
  ],

  year: 2024,

  status: "live",

  cardPosition: {
    top: "28%",
    left: "54%",
  },

  media: {
    type: "image",
    src: "/media/praxis-bg.jpg",
    alt: "Praxis",
  },

  heroImage: "/media/praxis-hero.jpg",

  links: {
    demo: "https://praxis-web-one.vercel.app/",
    github: "https://github.com/pedrorfdev/Praxis",
  },

  sections: praxisEn,

  pt: {
    tagline:
      "Plataforma clínica construída em torno da rotina real de terapeutas ocupacionais",

    sections: praxisPt,
  },

  assistant: {
    context: `
You are a technical assistant embedded in Pedro Ferreira's portfolio.

Answer questions about Praxis — a clinical management platform built for Occupational Therapists in Brazil.

Stack:
- React
- Node.js
- PostgreSQL + PGVector
- TypeScript
- Tailwind
- shadcn/ui
- Tiptap

Key decisions:
- JSONB for anamneses
- PGVector for future semantic retrieval
- Tiptap for rich-text clinical writing

The platform is already used in a real clinical environment.

Be technical, honest about tradeoffs, and speak like someone deeply familiar with the architecture and product decisions.
        `,

    quickPrompts: [
      "Why PostgreSQL with PGVector instead of a simpler setup?",
      "How did you model the anamnesis structure?",
      "What was the hardest technical challenge?",
      "Why use JSONB?",
      "What comes next for Praxis?",
    ],
    quickPromptsPt: [
      "Por que PostgreSQL com PGVector em vez de algo mais simples?",
      "Como você modelou a estrutura das anamneses?",
      "Qual foi o maior desafio técnico?",
      "Por que usar JSONB?",
      "O que vem a seguir no Praxis?",
    ],
  },
};
