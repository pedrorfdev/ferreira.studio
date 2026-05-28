import type {
  BaseSection,
  ListSection,
  DecisionSection,
  ResultSection,
  LocalizedProjectData,
} from "../project";

export interface BravioFeatureItem {
  title: string;
  description: string;
}

export interface BravioFeaturesSection {
  headline: string;
  items: BravioFeatureItem[];
}

export interface BravioSections {
  problem: BaseSection;

  vision: BaseSection;

  operations: ListSection;

  platform: BaseSection;

  features: BravioFeaturesSection;

  technicalDecisions: DecisionSection;

  result: ResultSection;

  future: BaseSection;
}

export type BravioProject = LocalizedProjectData<BravioSections>;
