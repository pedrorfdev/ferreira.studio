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

export interface MinimalProject {
  id: string;
  title: string;
}

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

export interface AssistantConfig {
  context: string;
  quickPrompts: string[];
  quickPromptsPt?: string[];
}

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
  | "Google Sheets"
  | "Product Design"
  | "Events";

export type ProjectStatus = "live" | "in development" | "concept";

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

export interface LocalizedProjectContent<TSections> {
  tagline?: string;

  sections?: DeepPartial<TSections>;
}

export type LocalizedProjectData<TSections> = ProjectData<TSections> & {
  pt?: LocalizedProjectContent<TSections>;
};
