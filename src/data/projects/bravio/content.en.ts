import type { BravioSections } from "@/types/projects/bravio";

export const bravioEn: BravioSections = {
  problem: {
    headline:
      "Operational losses stay invisible without centralized visibility",

    body: "Small and mid-sized agricultural operations still rely heavily on manual tracking, fragmented communication, and informal controls.",
  },

  idea: {
    headline: "Create operational clarity before operational complexity",

    body: "Bravio focuses on creating a lightweight operational layer for logistics and field visibility before introducing ERP-level complexity.",
  },

  analysis: {
    headline: "Field usability matters more than feature quantity",

    body: "Operators are not thinking about software while working. Interactions need to feel immediate, resilient, and obvious even in unstable environments.",
  },

  solution: {
    headline: "A reliability-first operational platform",

    body: "Bravio centralizes logistics visibility, operational tracking, and financial monitoring into a single mobile-first workflow.",

    items: [
      {
        title: "Load tracking",
        description:
          "Track operational loads and field movements with centralized visibility.",
      },

      {
        title: "Incident history",
        description:
          "Maintain structured operational history for failures and interruptions.",
      },

      {
        title: "Financial visibility",
        description:
          "Monitor operational costs and profitability per logistics flow.",
      },

      {
        title: "Offline-first workflows",
        description:
          "Keep operations functional even under unstable rural connectivity.",
      },

      {
        title: "Mobile-first execution",
        description:
          "Designed primarily for field operators instead of office environments.",
      },
    ],
  },

  technicalDecisions: {
    headline: "Technical decisions",

    decisions: [
      {
        title: "Offline-first architecture",

        why: "Stable connectivity cannot be assumed in rural environments.",

        trade: "Synchronization complexity increases substantially.",
      },

      {
        title: "IndexedDB persistence",

        why: "Operational data must survive unstable or interrupted connections.",

        trade: "Client-side synchronization becomes harder to maintain.",
      },

      {
        title: "Web mobile-first instead of native",

        why: "Avoids installation friction and enables immediate access across devices.",

        trade: "Some device-native capabilities become harder to access.",
      },
    ],
  },

  result: {
    headline: "Operational infrastructure currently in progress",

    body: "Bravio is being structured around real agricultural workflows before scaling implementation.",

    metrics: [
      {
        label: "Architecture",
        value: "Offline-first",
      },

      {
        label: "Environment",
        value: "Field-ready",
      },

      {
        label: "Status",
        value: "In Progress",
      },
    ],
  },
};
