import type { VellorSections } from "@/types/projects/vellor";

export const vellorEn: VellorSections = {
  problem: {
    headline: "Private events still depend on WhatsApp and spreadsheets",

    body: "Emotionally meaningful events are usually managed through fragmented confirmations and improvised organization flows.",
  },

  idea: {
    headline: "Make the invitation feel part of the experience",

    body: "Vellor started from the idea that digital invitations should feel intentional, elegant, and personal.",
  },

  analysis: {
    headline: "Sophistication without visual overload",

    body: "The challenge wasn't adding effects — it was creating something elegant while remaining frictionless.",
  },

  solution: {
    headline: "Private event management with a premium digital layer",

    body: "Each event receives a personalized RSVP environment with centralized guest management.",

    items: [
      "Custom event pages",
      "Private RSVP flows",
      "Guest management",
      "Mobile-first premium experience",
      "Google Sheets operational backend",
    ],
  },

  technicalDecisions: {
    headline: "Technical decisions",

    decisions: [
      {
        title: "Google Sheets as operational backend",

        why: "Hosts already understand spreadsheets.",

        trade: "Scalability becomes limited over time.",
      },

      {
        title: "Password-based access",

        why: "Creates a lightweight sense of exclusivity.",

        trade: "Passwords can still be shared manually.",
      },

      {
        title: "Custom event experiences",

        why: "Emotional perception matters in this product category.",

        trade: "Higher design effort per event.",
      },
    ],
  },

  result: {
    headline: "Core RSVP flow already validated",

    body: "Vellor already supports real invitation and RSVP operational flows.",
  },
};
