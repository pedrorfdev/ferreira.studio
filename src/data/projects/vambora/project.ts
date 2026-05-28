import type { LocalizedProjectData } from "@/types/project";
import type { VamboraSections } from "@/types/projects/vambora";

import { vamboraEn } from "./content.en";
import { vamboraPt } from "./content.pt";

export const vamboraProject: LocalizedProjectData<VamboraSections> = {
  id: "vambora",

  title: "Vambora.ai",

  tagline:
    "AI-powered travel planning that compresses hours of research into minutes",

  tags: ["React", "Node.js", "AI", "Gemini", "TypeScript", "Full Stack"],

  year: 2024,

  status: "live",

  cardPosition: {
    top: "58%",
    left: "36%",
  },

  media: {
    type: "image",
    src: "/media/vambora-bg.jpg",
    alt: "Vambora.ai",
  },

  heroImage: "/media/vambora-hero.jpg",

  links: {
    demo: "",
    github: "",
  },

  sections: vamboraEn,

  pt: {
    tagline:
      "Planejamento de viagens com IA que transforma horas de pesquisa em minutos",

    sections: vamboraPt,
  },

  assistant: {
    context: `
You are a technical assistant in Pedro Ferreira's portfolio.

Answer questions about Vambora.ai — an AI travel itinerary generator.

Stack:
- React
- Node.js
- TypeScript
- Gemini API

Key insights:
- Prompt architecture mattered more than the model itself
- Structured JSON generation instead of prose
- State-based navigation instead of route-based flows
- Gemini chosen intentionally over GPT

Be technical, specific about tradeoffs, and explain product decisions clearly.
        `,

    quickPrompts: [
      "How does the prompt architecture work?",
      "Why Gemini instead of GPT?",
      "Why no Next.js?",
      "How did you handle model instability?",
      "What would you build next?",
    ],
  },
};
