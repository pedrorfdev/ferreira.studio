import type {
  BaseSection,
  ListSection,
  DecisionSection,
  ResultSection,
  LocalizedProjectData,
} from "../project";

export interface SolutionSection extends ListSection {}

export interface BravioSections {
  problem: BaseSection;

  idea: BaseSection;

  analysis: BaseSection;

  solution: SolutionSection;

  technicalDecisions: DecisionSection;

  result: ResultSection;
}

export type BravioProject = LocalizedProjectData<BravioSections>;
