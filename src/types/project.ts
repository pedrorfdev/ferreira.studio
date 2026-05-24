// types/project.ts
// ============================================================
// Core types for the portfolio data layer.
// ProjectData is the single source of truth shape —
// everything in data/projects.ts conforms to this.
// ============================================================

// ----------------------------------------------------------
// App State — all possible navigation states
// Zustand reads this enum to orchestrate the experience
// ----------------------------------------------------------
export const AppState = {
    LOADING: "LOADING",
    HOME: "HOME",
    HOVERING: "HOVERING",
    EXPANDING: "EXPANDING",
    PROJECT: "PROJECT",
    MENU_OPEN: "MENU_OPEN",
} as const;

export type AppState = typeof AppState[keyof typeof AppState];

// ----------------------------------------------------------
// Card position — seeded per project, stays consistent
// between renders. Values are percentages of the safe zone.
// ----------------------------------------------------------
export interface CardPosition {
    top: string  // e.g. "30%"
    left: string  // e.g. "55%"
}

// ----------------------------------------------------------
// Media — background image or video per project
// ----------------------------------------------------------
export interface ProjectMedia {
    type: "image" | "video"
    src: string
    alt?: string
    poster?: string  // video fallback image
}

// ----------------------------------------------------------
// Case study sections — each is optional so projects
// can have different depths of content
// ----------------------------------------------------------
export interface CaseStudySection {
    problem?: {
        headline: string
        body: string
    }
    idea?: {
        headline: string
        body: string
    }
    solution?: {
        headline: string
        body: string
        items?: string[]  // bullet highlights
    }
    analysis?: {
        headline: string
        body: string
    }
    technicalDecisions?: {
        headline: string
        decisions: TechnicalDecision[]
    }
    result?: {
        headline: string
        body: string
        metrics?: Metric[]
    }
}

export interface TechnicalDecision {
    title: string
    why: string
    trade?: string  // tradeoff acknowledged
}

export interface Metric {
    label: string
    value: string
}

// ----------------------------------------------------------
// Assistant — contextual prompts per project
// Powers the "Ask about this project" panel
// ----------------------------------------------------------
export interface AssistantConfig {
    context: string              // reservado para futura integração com API
    quickPrompts: string[]            // perguntas sugeridas na UI
    answers?: Record<string, string>  // prompt → resposta pré-escrita
}

// ----------------------------------------------------------
// Project tag — tech or domain labels
// ----------------------------------------------------------
export type ProjectTag =
    | "React"
    | "Node.js"
    | "PostgreSQL"
    | "Tailwind"
    | "AI"
    | "Gemini"
    | "TypeScript"
    | "Product"
    | "Full Stack"
    | "Healthcare"
    | "Agro"
    | "Events"

// ----------------------------------------------------------
// ProjectData — the complete shape
// data/projects.ts exports ProjectData[]
// ----------------------------------------------------------
export interface ProjectData {
    id: string           // unique slug, e.g. "praxis"
    title: string           // display name, e.g. "Praxis"
    tagline: string           // one-liner shown in hover card
    tags: ProjectTag[]
    year: number
    status: "shipped" | "in progress" | "concept"
    cardPosition: CardPosition     // fixed position for the hover card
    media: ProjectMedia     // background when hovered/active
    heroImage?: string           // large image inside case study hero
    sections: CaseStudySection
    assistant: AssistantConfig
    // i18n — optional PT override; EN is the base
    pt?: {
        tagline?: string
        sections?: Partial<CaseStudySection>
    }
    heroVideo?: string
    links?: {
        demo?: string
        github?: string
    }
}