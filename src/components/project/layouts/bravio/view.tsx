import type { BravioProject } from "@/types/projects/bravio";

import { useProjectContent } from "@/hooks/use-project-content";

import { Hero } from "./components/hero";
import { HighlightSection } from "./components/highlight-section";
import { SolutionGrid } from "./components/solution-grid";
import { TechnicalDecisions } from "./components/technical-decisions";
import { Result } from "./components/result";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  project: BravioProject;
}

export function BravioView({ project }: Props) {
  const content = useProjectContent(project);
  const { t } = useI18n();

  if (!content?.sections) return null;

  const { sections } = content;

  return (
    <main className="relative overflow-hidden">
      <Hero project={project} />

      <div className="relative z-10 px-6 md:px-10">
        <div className="max-w-6xl mx-auto space-y-28 md:space-y-36">
          <div className="grid gap-5 md:grid-cols-[1fr_0.9fr] items-start">
            <HighlightSection
              eyebrow="PROBLEM"
              headline={sections.problem.headline}
              body={sections.problem.body}
              variant="accent"
            />

            <HighlightSection
              eyebrow="IDEA"
              headline={sections.idea.headline}
              body={sections.idea.body}
              variant="outline"
            />
          </div>

          <HighlightSection
            eyebrow="ANALYSIS"
            headline={sections.analysis.headline}
            body={sections.analysis.body}
            variant="glass"
          />

          <SolutionGrid section={sections.solution} />

          <TechnicalDecisions section={sections.technicalDecisions} />

          <Result
            section={sections.result}
            eyebrow={t.project.sections.result}
          />
        </div>
      </div>
    </main>
  );
}
