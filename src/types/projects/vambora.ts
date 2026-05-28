import type {
  BaseSection,
  DecisionSection,
  ResultSection,
  LocalizedProjectData,
} from "../project";

export interface TimelineItem {
  title: string;
  description: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface TimelineSection {
  headline: string;
  items: TimelineItem[];
}

export interface FeaturesSection {
  headline: string;
  items: FeatureItem[];
}

export interface VamboraSections {
  problem: BaseSection;

  idea: BaseSection;

  analysis: BaseSection;

  timeline: TimelineSection;

  features: FeaturesSection;

  technicalDecisions: DecisionSection;

  result: ResultSection;
}

export type VamboraProject = LocalizedProjectData<VamboraSections>;
