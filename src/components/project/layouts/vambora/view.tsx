import type { VamboraProject } from "@/types/projects/vambora";
import { useProjectContent } from "@/hooks/use-project-content";
import { Hero } from "./components/hero";
import { Timeline } from "./components/timeline";
import { FeatureGrid } from "./components/feature-grid";
import { DecisionsTabs } from "./components/decisions-tabs";
import { Result } from "./components/result";

interface Props {
  project: VamboraProject;
}

export function VamboraView({ project }: Props) {
  const { sections } = useProjectContent(project);

  return (
    <main className="relative overflow-hidden">
      <Hero project={project} />

      {sections.timeline?.items?.length > 0 && (
        <Timeline items={sections.timeline.items} />
      )}

      {sections.features && (
        <FeatureGrid
          headline={sections.features.headline}
          items={sections.features.items ?? []}
        />
      )}

      {sections.technicalDecisions && (
        <DecisionsTabs section={sections.technicalDecisions} />
      )}

      {sections.result && <Result section={sections.result} />}
    </main>
  );
}
