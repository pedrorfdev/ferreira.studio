import type {
  BaseSection,
  ListSection,
  DecisionSection,
  ResultSection,
  LocalizedProjectData,
} from "../project";

export interface PulsoInsightItem {
  title: string;
  description: string;
}

export interface PulsoInsightsSection {
  headline: string;
  items: PulsoInsightItem[];
}

export interface PulsoSections {
  problem: BaseSection;

  insight: BaseSection;

  workflow: ListSection;

  analysis: BaseSection;

  insights: PulsoInsightsSection;

  technicalDecisions: DecisionSection;

  result: ResultSection;

  future: BaseSection;
}

export type PulsoProject = LocalizedProjectData<PulsoSections>;
