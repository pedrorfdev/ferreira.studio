import type { PulsoSections } from "@/types/projects/pulso";

export const pulsoEn: PulsoSections = {
  problem: {
    headline: "Team coordination breaks when communication becomes fragmented",

    body: "Schedules, confirmations, absences, and operational organization still happen through scattered WhatsApp messages and improvised spreadsheets.",
  },

  idea: {
    headline: "Replace operational chaos with synchronized routines",

    body: "Pulso started from a real organizational pain point inside volunteer teams and operational groups.",
  },

  analysis: {
    headline: "The hardest product decision is what not to build",

    body: "Operational platforms naturally tend toward feature overload. Pulso intentionally prioritizes simplicity.",
  },

  solution: {
    headline: "Schedules, confirmations, and operations in one place",

    body: "Pulso centralizes team coordination, confirmations, visibility, and operational tracking.",

    items: [
      "Schedule management",
      "Presence confirmations",
      "Absence and swap requests",
      "Leadership visibility dashboard",
      "Financial tracking",
    ],
  },

  technicalDecisions: {
    headline: "Technical decisions",

    decisions: [
      {
        title: "RBAC from the beginning",

        why: "Leadership and operational members require completely different visibility levels.",

        trade: "Permissions and authentication become more complex early.",
      },

      {
        title: "Lean infrastructure with free-tier services",

        why: "Validation speed matters more than scale optimization initially.",

        trade: "Infrastructure limitations appear earlier as adoption grows.",
      },

      {
        title: "Operational simplicity over feature density",

        why: "The product intentionally avoids becoming another overloaded management dashboard.",

        trade: "Advanced workflows are intentionally postponed.",
      },
    ],
  },

  result: {
    headline: "Architecture and product direction already defined",

    body: "Pulso is currently being structured around real operational routines observed in volunteer and organizational teams.",
  },
};
