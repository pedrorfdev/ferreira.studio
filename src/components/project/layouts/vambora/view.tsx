import type { VamboraProject } from "@/types/projects/vambora";
import { useProjectContent } from "@/hooks/use-project-content";
import { Hero } from "./components/hero";
import { Timeline } from "./components/timeline";
import { FeatureGrid } from "./components/feature-grid";
import { DecisionsTabs } from "./components/decisions-tabs";
import { Result } from "./components/result";
import { HighlightSection } from "./components/highlight-section";

interface Props {
  project: VamboraProject;
}

export function VamboraView({ project }: Props) {
  const content = useProjectContent(project);

  console.log("Conteúdo do Hook:", content);
  if (!content || !content.sections) {
    return <div className="p-20 text-center">Carregando conteúdo...</div>;
  }
  const { sections } = content;

  return (
    <main className="relative overflow-hidden">
      <Hero project={project} />

      <section className="relative px-6 md:px-10 pt-10 pb-32">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="flex justify-start">
            <div className="w-full max-w-3xl">
              <HighlightSection
                eyebrow="PROBLEM"
                headline={sections.problem.headline}
                body={sections.problem.body}
                variant="accent"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-full max-w-3xl">
              <HighlightSection
                eyebrow="IDEA"
                headline={sections.idea.headline}
                body={sections.idea.body}
                variant="glass"
              />
            </div>
          </div>

          <div className="flex justify-center md:justify-start md:pl-24">
            <div className="w-full max-w-4xl">
              <HighlightSection
                eyebrow="ANALYSIS"
                headline={sections.analysis.headline}
                body={sections.analysis.body}
                variant="outline"
              />
            </div>
          </div>
        </div>
      </section>

      {sections.timeline && (
        <div className="pt-24 md:pt-32">
          <Timeline items={sections.timeline.items ?? []} />
        </div>
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
