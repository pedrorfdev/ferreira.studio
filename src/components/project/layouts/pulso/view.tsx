import { Hero } from "./components/hero";

import { BeforePulso } from "./components/before";
import { ChaosMap } from "./components/chaos-map";

import { SolutionGrid } from "./components/solution-grid";

import { DecisionBoard } from "./components/decision-board";

import { Impact } from "./components/impact";

import { FutureVision } from "./components/future-vision";

import { useProjectContent } from "@/hooks/use-project-content";
import { useI18n } from "@/lib/i18n-context";

import type { PulsoProject } from "@/types/projects";

interface Props {
  project: PulsoProject;
}

export function PulsoView({ project }: Props) {
  const { t } = useI18n();

  const content = useProjectContent(project);

  return (
    <>
      <Hero project={project} />

      <main>
        <BeforePulso
          section={content.sections.before}
          eyebrow={t.project.before}
        />

        <ChaosMap section={content.sections.chaos} eyebrow={t.project.chaos} />

        <SolutionGrid
          section={content.sections.solution}
          eyebrow={t.project.solution}
        />

        <DecisionBoard section={content.sections.technicalDecisions} />

        <Impact section={content.sections.impact} />

        <FutureVision
          section={content.sections.future}
          eyebrow={t.project.future}
        />
      </main>
    </>
  );
}
