import type { BravioSections } from "@/types/projects/bravio";

export const bravioEn: BravioSections = {
  problem: {
    headline:
      "Operational losses stay invisible without centralized visibility",

    body: "Small and mid-sized agricultural operations still rely heavily on manual tracking, fragmented communication, and informal controls.",
  },

  idea: {
    headline: "Create operational clarity before operational complexity",

    body: "The goal isn't to replicate a traditional ERP. Bravio focuses on creating a lightweight operational layer for field logistics and load visibility.",
  },

  analysis: {
    headline: "Field usability matters more than feature quantity",

    body: "Operators in the field are not thinking about software while working. Every interaction must be fast, resilient, and obvious.",
  },

  solution: {
    headline: "A mobile-first operational logistics platform",

    body: "Bravio centralizes operational registration, tracking, incident management, and financial visibility.",

    items: [
      "Load registration and tracking",
      "Operational incident history",
      "Financial visibility per operation",
      "Offline-first architecture",
      "Mobile-first workflows",
    ],
  },

  technicalDecisions: {
    headline: "Technical decisions",

    decisions: [
      {
        title: "Offline-first architecture",

        why: "Stable internet cannot be assumed in rural environments.",

        trade: "Synchronization complexity increases substantially.",
      },

      {
        title: "IndexedDB for local persistence",

        why: "Operational data needs to survive unstable connectivity.",

        trade: "State synchronization becomes harder.",
      },

      {
        title: "Web mobile-first instead of native apps",

        why: "Avoids installation friction and works immediately across devices.",

        trade: "Some native capabilities become harder to access.",
      },
    ],
  },

  result: {
    headline: "Operational architecture currently in progress",

    body: "Bravio is being structured around real-world agricultural operational flows before scaling implementation.",
  },
};
