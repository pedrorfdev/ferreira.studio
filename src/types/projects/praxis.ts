import type {
  BaseSection,
  ListSection,
  DecisionSection,
  ResultSection,
  LocalizedProjectData,
} from "../project";

export interface PraxisSections {
  discovery: BaseSection;

  perspective: BaseSection;

  workflow: ListSection;

  architecture: BaseSection;

  technicalDecisions: DecisionSection;

  outcome: ResultSection;

  future: BaseSection;
}

export type PraxisProject = LocalizedProjectData<PraxisSections>;
