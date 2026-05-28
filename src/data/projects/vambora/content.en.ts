import type { VamboraSections } from "@/types/projects/vambora";

export const vamboraEn: VamboraSections = {
  problem: {
    headline: "Planning a trip still feels unnecessarily exhausting",

    body: "Even simple trips require hours of research across blogs, videos, maps, and booking platforms. Most people spend more time organizing information than actually deciding what they want to experience.",
  },

  idea: {
    headline: "Test the usefulness of AI before polishing the interface",

    body: "The initial focus wasn't visual design or feature quantity. The real question was whether AI could generate travel plans that felt coherent, practical, and genuinely useful.",
  },

  analysis: {
    headline: "Prompt architecture mattered more than the model itself",

    body: "Early generations looked impressive but frequently broke in logistics, timing, and budgeting. The breakthrough came from restructuring prompts into guided reasoning flows instead of relying on open-ended generation.",
  },

  solution: {
    headline: "Travel planning compressed into a single conversation",

    body: "Users describe destination, budget, duration, and preferences. Vambora generates a contextual travel plan with activities, logistics, estimated costs, and day-by-day suggestions.",

    items: [
      "Conversational trip planning flow",
      "Structured itinerary generation",
      "Budget-aware recommendations",
      "Fast generation with fallback model handling",
      "Fluid state-based navigation experience",
    ],
  },

  technicalDecisions: {
    headline: "Key technical decisions",

    decisions: [
      {
        title: "Gemini instead of GPT",

        why: "Gemini provided a strong free tier for experimentation and structured generation tasks.",

        trade:
          "Smaller ecosystem and occasional instability required additional fallback handling.",
      },

      {
        title: "No Next.js — intentional simplicity",

        why: "The product behaves more like a fluid client-side application than a content-heavy website.",

        trade:
          "Less flexibility if the platform later requires SEO-heavy experiences.",
      },

      {
        title: "State-driven navigation instead of routing",

        why: "The experience was designed to feel continuous and conversational.",

        trade: "Harder to deep-link or persist complex navigation states.",
      },

      {
        title: "Structured generation over free-form prompting",

        why: "Open-ended prompts produced visually convincing but operationally inconsistent itineraries.",

        trade:
          "Prompt architecture became significantly more complex to maintain.",
      },
    ],
  },

  result: {
    headline: "From research overload to actionable planning",

    body: "Vambora transformed a fragmented planning experience into a fast and focused interaction.",

    metrics: [
      {
        label: "Planning flow",
        value: "Structured",
      },

      {
        label: "Generation time",
        value: "< 8s",
      },

      {
        label: "Status",
        value: "Published",
      },
    ],
  },
};
