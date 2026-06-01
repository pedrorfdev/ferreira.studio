import type {
  DecisionSection,
  ResultSection,
  LocalizedProjectData,
} from "../project";

export interface ChaosItem {
  title: string;
}

export interface ChaosSection {
  headline: string;
  body: string;
  items: ChaosItem[];
}

export interface PulsoFeatureItem {
  title: string;
  description: string;
}

export interface PulsoSolutionSection {
  headline: string;
  body: string;
  items: PulsoFeatureItem[];
}

export interface FutureStep {
  title: string;
}

export interface FutureSection {
  headline: string;
  body: string;
  steps: FutureStep[];
}

export interface BeforeCard {
  title: string;
  status: string;

  variant: "accent" | "gold" | "neutral" | "purple";
}

export interface BeforeSection {
  headline: string;
  body: string;
  eyebrow: string;

  cards: BeforeCard[];
}

export interface PulsoSections {
  before: BeforeSection;

  chaos: ChaosSection;

  solution: PulsoSolutionSection;

  technicalDecisions: DecisionSection;

  impact: ResultSection;

  future: FutureSection;
}

export type PulsoProject = LocalizedProjectData<PulsoSections>;
