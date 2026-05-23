// types/index.ts
// ============================================================
// Re-exports all types from a single entry point.
// Import from "@/types" everywhere — never from the file directly.
// ============================================================

export type {
    ProjectData,
    CaseStudySection,
    TechnicalDecision,
    Metric,
    AssistantConfig,
    CardPosition,
    ProjectMedia,
    ProjectTag,
} from "./project"

export { AppState } from "./project"