import type {
  BaseSection,
  ListSection,
  DecisionSection,
  ResultSection,
  LocalizedProjectData,
} from "../project";

export interface VellorCapabilityItem {
  title: string;
  description: string;
}

export interface VellorCapabilitiesSection {
  headline: string;
  items: VellorCapabilityItem[];
}

export interface VellorSections {
  problem: BaseSection;

  market: BaseSection;

  workflow: ListSection;

  architecture: BaseSection;

  capabilities: VellorCapabilitiesSection;

  technicalDecisions: DecisionSection;

  result: ResultSection;

  future: BaseSection;
}

export type VellorProject = LocalizedProjectData<VellorSections>;
