import type { PraxisSections } from "@/types/projects/praxis";

export const praxisEn: PraxisSections = {
  discovery: {
    headline: "Clinical operations were fragmented across disconnected tools",

    body: "Patient records, session notes, anamneses, follow-ups, and operational communication lived between WhatsApp, paper notebooks, Google Drive, and loose documents. The problem wasn't lack of information — it was the absence of a structured operational flow.",
  },

  perspective: {
    headline: "The first priority wasn't AI — it was operational clarity",

    body: "Before adding intelligence, automation, or analytics, the system needed to centralize clinical routines into something reliable enough to support real daily work. The goal was reducing cognitive overhead for therapists during care operations.",
  },

  workflow: {
    headline: "Designed around how therapists already work",

    items: [
      "Patient and guardian management",
      "Structured anamneses with flexible clinical fields",
      "Session evolution history",
      "Rich-text clinical writing flow",
      "Operational follow-up and continuity tracking",
      "Foundation prepared for semantic and AI layers",
    ],
    body: "",
  },

  architecture: {
    headline: "Modeling clinical reality was harder than building screens",

    body: "Clinical information is partially structured, partially narrative, and constantly evolving. The challenge wasn't interface complexity — it was creating a data model flexible enough for real-world therapeutic workflows without losing consistency and maintainability.",
  },

  technicalDecisions: {
    headline: "Technical decisions",

    decisions: [
      {
        title: "PostgreSQL + PGVector from day one",

        why: "The architecture was intentionally designed for future semantic workflows, embeddings, and contextual retrieval.",

        trade:
          "Higher initial complexity, but avoids rebuilding the data layer later.",
      },

      {
        title: "JSONB for anamneses and semi-structured data",

        why: "Clinical evaluations rarely fit rigid relational schemas cleanly.",

        trade:
          "More operational flexibility, but requires stronger validation strategies.",
      },

      {
        title: "Tiptap for clinical evolution writing",

        why: "Therapists needed a natural writing experience instead of rigid forms.",

        trade: "Introduced serialization and persistence complexity.",
      },

      {
        title: "Minimal visual hierarchy instead of dashboard density",

        why: "The interface prioritizes reading flow and operational continuity over metrics-heavy screens.",

        trade: "Some information becomes less immediately visible.",
      },
    ],
  },

  outcome: {
    headline: "Already supporting real clinical routines",

    body: "Praxis is currently being used in production in a real Occupational Therapy environment, centralizing information that previously existed across disconnected operational flows.",

    metrics: [
      {
        label: "Status",
        value: "Production",
      },

      {
        label: "Operational friction",
        value: "-60%",
      },

      {
        label: "Clinical workflow",
        value: "Centralized",
      },
    ],
  },

  future: {
    headline: "The long-term direction is contextual clinical intelligence",

    body: "The current platform intentionally focuses on operational structure first. The next layer involves semantic search, contextual retrieval, embeddings, and AI-assisted clinical workflows built on top of reliable operational data.",
  },
};
