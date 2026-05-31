import type {
  BaseSection,
  DecisionSection,
  ResultSection,
  LocalizedProjectData,
} from "../project";

export interface HighlightItem {
  title: string;
  description: string;
}

export interface HighlightSection {
  headline: string;
  items: HighlightItem[];
}

export interface VellorSections {
  problem: BaseSection;

  vision: BaseSection;

  experience: BaseSection;

  highlights: HighlightSection;

  technicalDecisions: DecisionSection;

  result: ResultSection;
}

export type VellorProject = LocalizedProjectData<VellorSections>;
