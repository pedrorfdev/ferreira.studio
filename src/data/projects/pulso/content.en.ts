// data/projects/pulso/content.en.ts
import type { PulsoSections } from "@/types/projects/pulso";

export const pulsoEn: PulsoSections = {
  before: {
    eyebrow: "Before Pulso",
    headline:
      "Most teams don't struggle to create schedules. They struggle to keep them running.",
    body: "As teams grow, availability changes, swaps happen and information spreads across conversations, spreadsheets and memory.",
    cards: [
      { title: "WhatsApp", status: "84 unread messages", variant: "accent" },
      {
        title: "Spreadsheet",
        status: "3 different versions",
        variant: "purple",
      },
      { title: "PDF Schedule", status: "Outdated", variant: "neutral" },
      { title: "Volunteer", status: "Not confirmed", variant: "gold" },
    ],
  },

  chaos: {
    eyebrow: "Operational chaos",
    headline: "Every new volunteer adds a new layer of coordination",
    body: "The real problem isn't assigning people. It's keeping everyone aligned when reality changes every week.",
    resolvedEyebrow: "Synchronized",
    items: [
      { title: "WhatsApp" },
      { title: "Spreadsheets" },
      { title: "Replacements" },
      { title: "Availability" },
      { title: "Responsibilities" },
      { title: "Follow-ups" },
      { title: "Leadership" },
      { title: "Uncertainty" },
    ],
  },

  solution: {
    headline: "A single operational pulse across every team",
    body: "Pulso centralizes schedules, availability and confirmations into a predictable workflow designed for volunteer operations.",
    items: [
      {
        title: "Team management",
        description:
          "Organize people through structured teams and responsibilities.",
      },
      {
        title: "Availability tracking",
        description:
          "Members communicate availability before assignments happen.",
      },
      {
        title: "Schedule creation",
        description: "Build schedules with complete operational visibility.",
      },
      {
        title: "Confirmation workflow",
        description: "Reduce uncertainty through explicit confirmations.",
      },
      {
        title: "Leadership visibility",
        description: "Understand coverage before operational issues appear.",
      },
      {
        title: "Mobile-first",
        description:
          "Designed around the reality of teams that operate through phones.",
      },
    ],
  },

  technicalDecisions: {
    headline: "Technical decisions",
    decisions: [
      {
        title: "RBAC from day one",
        why: "Leaders, coordinators and members require different visibility.",
        trade: "Permission management becomes more complex earlier.",
      },
      {
        title: "Lean infrastructure",
        why: "Validation speed matters more than premature scale.",
        trade: "Infrastructure constraints appear sooner as adoption grows.",
      },
      {
        title: "Operational simplicity",
        why: "The product avoids becoming another overloaded management system.",
        trade: "Advanced workflows remain intentionally postponed.",
      },
    ],
  },

  impact: {
    headline: "One source of truth for people, schedules and availability",
    body: "Pulso transforms coordination from a reactive process into a predictable operational system.",
    metrics: [
      { label: "Coordination", value: "Centralized" },
      { label: "Availability", value: "Visible" },
      { label: "Schedules", value: "Reliable" },
    ],
  },

  future: {
    headline:
      "Built for volunteer teams today. Designed for broader operations tomorrow.",
    body: "The same coordination model can support churches, events, schools, NGOs and any operation that depends on reliable scheduling.",
    steps: [
      { title: "Churches" },
      { title: "Multiple Teams" },
      { title: "Events" },
      { title: "NGOs" },
      { title: "Operations" },
    ],
  },
};
