import type { PulsoProject } from "@/types/projects/pulso";

import { useProjectContent } from "@/hooks/use-project-content";
import { useI18n } from "@/lib/i18n-context";

import { Hero } from "./components/hero";
import { BeforePulso } from "./components/before";
import { SolutionGrid } from "./components/solution-grid";
import { DecisionBoard } from "./components/decision-board";
import { Impact } from "./components/impact";
import { FutureVision } from "./components/future-vision";

interface Props {
  project: PulsoProject;
}

export function PulsoView({ project }: Props) {
  const content = useProjectContent(project);
  const { t } = useI18n();

  const sections = content.sections;

  return (
    <>
      <Hero project={project} />

      <main className="max-w-7xl mx-auto px-6 md:px-10 space-y-40">
        <BeforePulso
          before={sections.before}
          chaos={sections.chaos}
          beforeLabel={t.project.before}
          chaosLabel={t.project.chaos}
        />

        <SolutionGrid
          section={sections.solution}
          eyebrow={t.project.solution}
        />

        <DecisionBoard
          section={sections.technicalDecisions}
          eyebrow={t.project.technical}
        />

        <Impact section={sections.impact} eyebrow={t.project.impact} />

        <FutureVision section={sections.future} eyebrow={t.project.future} />
      </main>
    </>
  );
}
