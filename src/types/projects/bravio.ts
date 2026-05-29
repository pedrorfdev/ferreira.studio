import type {
  BaseSection,
  DecisionSection,
  ResultSection,
  LocalizedProjectData,
} from "../project";

export interface SolutionItem {
  title: string;
  description: string;
}

export interface SolutionSection {
  headline: string;
  body?: string;
  items: SolutionItem[];
}

export interface BravioSections {
  problem: BaseSection;

  idea: BaseSection;

  analysis: BaseSection;

  solution: SolutionSection;

  technicalDecisions: DecisionSection;

  result: ResultSection;
}

export type BravioProject = LocalizedProjectData<BravioSections>;
