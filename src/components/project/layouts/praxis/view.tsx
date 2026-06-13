import { useProjectContent } from "@/hooks/use-project-content";
import { useI18n } from "@/lib/i18n-context";
import type { PraxisProject } from "@/types/projects";

import { Hero } from "./components/hero";
import { Background } from "./components/background";
import { EditorialBlock } from "./components/editorial-block";
import { Workflow } from "./components/workflow";
import { TechnicalDecisions } from "./components/technical-decisions";
import { Outcome } from "./components/outcome";

interface Props {
  project: PraxisProject;
}

export function PraxisView({ project }: Props) {
  const { t } = useI18n();
  const { sections } = useProjectContent(project);

  return (
    <main className="relative overflow-hidden">
      <Background project={project} />

      <Hero project={project} />

      <div className="px-6 md:px-10 max-w-4xl mx-auto space-y-32 pb-32">
        {/* Discovery — eyebrow usa "problem" como categoria mais próxima */}
        <EditorialBlock
          eyebrow={t.project.problem}
          headline={sections.discovery.headline}
          body={sections.discovery.body}
        />

        {/* Perspective — eyebrow usa "vision" */}
        <EditorialBlock
          eyebrow={t.project.vision}
          headline={sections.perspective.headline}
          body={sections.perspective.body}
        />

        {/* Workflow — eyebrow interno via t.project.workflow */}
        <Workflow section={sections.workflow} />

        {/* Architecture */}
        <EditorialBlock
          eyebrow={t.project.architecture}
          headline={sections.architecture.headline}
          body={sections.architecture.body}
          bottomSpacing
        />

        {/* Technical decisions — eyebrow interno via t.project.technical */}
        <TechnicalDecisions section={sections.technicalDecisions} />

        {/* Outcome — eyebrow interno via t.project.result */}
        <Outcome section={sections.outcome} />

        {/* Future */}
        <EditorialBlock
          eyebrow={t.project.future}
          headline={sections.future.headline}
          body={sections.future.body}
        />
      </div>
    </main>
  );
}
