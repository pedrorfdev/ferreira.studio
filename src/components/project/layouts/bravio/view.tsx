import type { BravioProject } from "@/types/projects/bravio";
import { Background } from "./components/background";
import { Hero } from "./components/hero";
import { EditorialBlock } from "./components/editorial-block";
import { SolutionGrid } from "./components/solution-grid";
import { TechnicalDecisions } from "./components/technical-decisions";
import { Result } from "./components/result";
interface Props {
  project: BravioProject;
  scrollY: number;
}
export function BravioView({ project }: Props) {
  const sections = project.sections;
  return (
    <main className="relative overflow-hidden">
      {" "}
      <Background project={project} /> <Hero project={project} />{" "}
      <div className="relative px-6 md:px-10">
        {" "}
        <div className="max-w-4xl mx-auto space-y-36">
          {" "}
          <EditorialBlock
            eyebrow="PROBLEM"
            headline={sections.problem.headline}
            body={sections.problem.body}
          />{" "}
          <EditorialBlock
            eyebrow="IDEA"
            headline={sections.idea.headline}
            body={sections.idea.body}
          />{" "}
          <EditorialBlock
            eyebrow="ANALYSIS"
            headline={sections.analysis.headline}
            body={sections.analysis.body}
          />{" "}
          <SolutionGrid section={sections.solution} />{" "}
          <TechnicalDecisions section={sections.technicalDecisions} />{" "}
          <Result section={sections.result} />{" "}
        </div>{" "}
      </div>{" "}
    </main>
  );
}
