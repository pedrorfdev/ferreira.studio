// types/project.ts
export const AppState = {
    LOADING: "LOADING",
    HOME: "HOME",
    HOVERING: "HOVERING",
    EXPANDING: "EXPANDING",
    PROJECT: "PROJECT",
    MENU_OPEN: "MENU_OPEN",
} as const

export type AppState = typeof AppState[keyof typeof AppState]

export interface CardPosition { top: string; left: string }
export interface ProjectMedia { type: "image" | "video"; src: string; alt?: string; poster?: string }
export interface ProjectLinks { demo?: string; github?: string }

export interface CaseStudySection {
    problem?: { headline: string; body: string }
    idea?: { headline: string; body: string }
    solution?: {
        headline: string
        body: string
        items?: string[]
    }
    analysis?: { headline: string; body: string }
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

export interface TechnicalDecision { title: string; why: string; trade?: string }
export interface Metric { label: string; value: string }

export interface AssistantConfig {
    context: string
    quickPrompts: string[]
}

export type ProjectTag =
    | "React" | "Node.js" | "PostgreSQL" | "Tailwind"
    | "AI" | "Gemini" | "TypeScript" | "Product"
    | "Full Stack" | "Healthcare" | "Agro" | "Events"

// status agora inclui "live" (usado no projects.ts)
export type ProjectStatus = "live" | "in development" | "concept"

export interface ProjectData {
    id: string
    title: string
    tagline: string
    tags: ProjectTag[]
    year: number
    status: ProjectStatus
    cardPosition: CardPosition
    media: ProjectMedia
    heroImage?: string
    heroVideo?: string
    links?: ProjectLinks
    sections: CaseStudySection
    assistant: AssistantConfig
    pt?: {
        tagline?: string
        sections?: Partial<CaseStudySection>
    }
}