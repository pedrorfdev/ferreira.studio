import { useProjectContent } from "@/hooks/use-project-content";
import { useI18n } from "@/lib/i18n-context";
import { Hero } from "./components/hero";
import type { VellorProject } from "@/types/projects";
import { Vision } from "./components/vision";
import { Experience } from "./components/experience";
import { HighlightSection } from "./components/highlight-section";
import { DecisionsTabs } from "./components/decision-tabs";
import { Result } from "./components/result";
import { Problem } from "./components/problem";

interface Props {
  project: VellorProject;
}

export function VellorView({ project }: Props) {
  const content = useProjectContent(project);

  const { t } = useI18n();

  return (
    <>
      <Hero project={project} />
      <Problem section={content.sections.problem} eyebrow={t.project.problem} />

      <main className="max-w-7xl mx-auto px-6 md:px-10 space-y-16">
        <Vision section={content.sections.vision} eyebrow={t.project.vision} />

        <HighlightSection
          section={content.sections.highlights}
          eyebrow={t.project.highlights}
        />

        <Experience
          section={content.sections.experience}
          eyebrow={t.project.experience}
        />

        <DecisionsTabs section={content.sections.technicalDecisions} />

        <Result section={content.sections.result} eyebrow={t.project.result} />
      </main>
    </>
  );
}
