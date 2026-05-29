// ============================================================
// layouts/praxis/view.tsx
// ============================================================

import type { PraxisProject } from "@/types/projects/index";

import { Background } from "./components/background";
import { Hero } from "./components/hero";
import { EditorialBlock } from "./components/editorial-block";
import { Workflow } from "./components/workflow";
import { TechnicalDecisions } from "./components/technical-decisions";
import { Outcome } from "./components/outcome";

interface Props {
  project: PraxisProject;
}

export function PraxisView({ project }: Props) {
  const sections = project.sections;

  return (
    <main className="relative w-full overflow-hidden">
      <Background project={project} />

      <Hero project={project} />

      <div className="relative px-6 md:px-10">
        <div className="mx-auto max-w-3xl space-y-36">
          <EditorialBlock
            eyebrow="DISCOVERY"
            headline={sections.discovery.headline}
            body={sections.discovery.body}
          />

          <EditorialBlock
            eyebrow="PERSPECTIVE"
            headline={sections.perspective.headline}
            body={sections.perspective.body}
          />

          <Workflow section={sections.workflow} />

          <EditorialBlock
            eyebrow="ARCHITECTURE"
            headline={sections.architecture.headline}
            body={sections.architecture.body}
          />

          <TechnicalDecisions section={sections.technicalDecisions} />

          <Outcome section={sections.outcome} />

          <EditorialBlock
            eyebrow="FUTURE"
            headline={sections.future.headline}
            body={sections.future.body}
            bottomSpacing
          />
        </div>
      </div>
    </main>
  );
}
