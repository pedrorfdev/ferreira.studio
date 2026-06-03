import { useProjectContent } from "@/hooks/use-project-content";

import type { PulsoProject } from "@/types/projects/pulso";

import { Hero } from "./components/hero";
import { BeforePulso } from "./components/before";
import { ChaosMap } from "./components/chaos/chaos-map";
import { SpectrumReveal } from "./components/spectrum/spectrum-reveal";
import { SolutionGrid } from "./components/solution-grid";
import { DecisionBoard } from "./components/decision-board";
import { Impact } from "./components/impact/impact";
import { FutureVision } from "./components/future-vision";

interface Props {
  project: PulsoProject;
}

export function PulsoView({ project }: Props) {
  const { sections } = useProjectContent(project);

  return (
    <>
      <Hero project={project} />

      <main className="relative overflow-hidden">
        <BeforePulso section={sections.before} />

        <ChaosMap section={sections.chaos} />

        <SpectrumReveal headline={sections.solution.headline} />

        <SolutionGrid
          section={sections.solution}
          eyebrow={sections.solution.headline}
        />

        <DecisionBoard
          section={sections.technicalDecisions}
          eyebrow={sections.technicalDecisions.headline}
        />

        <Impact section={sections.impact} />

        <FutureVision
          title={sections.future.headline}
          steps={sections.future.steps.map((step) => step.title)}
        />
      </main>
    </>
  );
}
