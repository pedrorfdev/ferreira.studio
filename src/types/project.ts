// ============================================================
// APP STATE
// ============================================================

import type { DeepPartial } from "./utils";

export const AppState = {
  LOADING: "LOADING",
  HOME: "HOME",
  HOVERING: "HOVERING",
  EXPANDING: "EXPANDING",
  PROJECT: "PROJECT",
  MENU_OPEN: "MENU_OPEN",
} as const;

export type AppState = (typeof AppState)[keyof typeof AppState];

// ============================================================
// CORE PROJECT TYPES
// ============================================================

export interface CardPosition {
  top: string;
  left: string;
}

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
}

export interface ProjectLinks {
  demo?: string;
  github?: string;
  website?: string;
}

// ============================================================
// CONTENT BLOCKS
// ============================================================

export interface BaseSection {
  headline: string;
  body: string;
}

export interface ListSection extends BaseSection {
  items: string[];
}

export interface DecisionSection {
  headline: string;
  decisions: TechnicalDecision[];
  collapsible?: boolean;
}

export interface ResultSection extends BaseSection {
  metrics?: Metric[];
}

export interface TechnicalDecision {
  title: string;
  why: string;
  trade?: string;
}

export interface Metric {
  label: string;
  value: string;
}

// ============================================================
// ASSISTANT
// ============================================================

export interface AssistantConfig {
  context: string;
  quickPrompts: string[];
}

// ============================================================
// PROJECT ENUMS
// ============================================================

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
  | "Events";

export type ProjectStatus = "live" | "in development" | "concept";

// ============================================================
// GENERIC PROJECT BASE
// ============================================================

export interface ProjectData<TSections> {
  id: string;

  title: string;

  tagline: string;

  tags: ProjectTag[];

  year: number;

  status: ProjectStatus;

  cardPosition: CardPosition;

  media: ProjectMedia;

  heroImage?: string;

  heroVideo?: string;

  links?: ProjectLinks;

  sections: TSections;

  assistant: AssistantConfig;
}

// ============================================================
// I18N PROJECT CONTENT
// ============================================================

export interface LocalizedProjectContent<TSections> {
  tagline?: string;

  sections?: DeepPartial<TSections>;
}

// ============================================================
// FINAL LOCALIZED PROJECT TYPE
// ============================================================

export type LocalizedProjectData<TSections> = ProjectData<TSections> & {
  pt?: LocalizedProjectContent<TSections>;
};
