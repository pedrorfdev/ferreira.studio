import type {
  BaseSection,
  ListSection,
  DecisionSection,
  ResultSection,
} from "@/types/project";

export interface BravioSections {
  problem: BaseSection;

  idea: BaseSection;

  analysis: BaseSection;

  solution: ListSection;

  technicalDecisions: DecisionSection;

  result: ResultSection;
}
