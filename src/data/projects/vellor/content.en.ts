import type { VellorSections } from "@/types/projects/vellor";

export const vellorEn: VellorSections = {
  problem: {
    headline:
      "Private events still depend on fragmented communication and manual coordination",

    body: "Hosts often manage confirmations through WhatsApp, spreadsheets and scattered conversations, creating operational friction and a poor guest experience.",
  },

  vision: {
    headline: "The invitation should feel like part of the event itself",

    body: "Vellor treats RSVP not as administration, but as the first touchpoint of the experience. Every interaction should feel intentional, elegant and personal.",
  },

  experience: {
    headline: "Luxury comes from clarity, not visual excess",

    body: "The goal was never to create flashy interfaces. The challenge was designing something refined while keeping every interaction effortless.",
  },

  highlights: {
    headline: "Designed around hosts and guests",

    items: [
      {
        title: "Curated event pages",
        description:
          "Every event receives a dedicated experience tailored to its identity.",
      },
      {
        title: "Private RSVP flows",
        description:
          "Guests access exclusive confirmation journeys designed around simplicity.",
      },
      {
        title: "Guest management",
        description:
          "Centralized visibility without forcing hosts into complex software.",
      },
      {
        title: "Mobile-first experience",
        description:
          "Most invitations are opened on phones. The experience starts there.",
      },
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
        title: "Password-protected events",
        why: "Creates lightweight exclusivity.",
        trade: "Credentials can still be shared.",
      },
      {
        title: "Custom event experiences",
        why: "Perception matters as much as functionality.",
        trade: "More design effort per event.",
      },
    ],
  },

  result: {
    headline: "Validated through real event workflows",

    body: "Vellor already supports invitation, RSVP and guest management flows for private events.",
  },
};
