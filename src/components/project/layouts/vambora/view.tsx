import type { VamboraProject } from "@/types/projects/vambora";

import { Hero } from "./components/hero";
import { Timeline } from "./components/timeline";
import { FeatureGrid } from "./components/feature-grid";
import { DecisionsTabs } from "./components/decisions-tabs";
import { Result } from "./components/result";

interface Props {
  project: VamboraProject;
  scrollY: number;
}

export function VamboraView({ project }: Props) {
  const sections = project.sections;

  return (
    <main className="relative overflow-hidden">
      <Hero project={project} />

      <Timeline items={sections.timeline.items} />

      <FeatureGrid
        headline={sections.features.headline}
        items={sections.features.items}
      />

      <DecisionsTabs section={sections.technicalDecisions} />

      <Result section={sections.result} />
    </main>
  );
}
