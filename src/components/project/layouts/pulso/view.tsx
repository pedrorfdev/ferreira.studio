import { useProjectContent } from "@/hooks/use-project-content";
import type { PulsoProject } from "@/types/projects/pulso";

import { Hero } from "./components/hero";
import { BeforePulso } from "./components/before";
import { ChaosMap } from "./components/chaos-map";
import { SpectrumReveal } from "./components/spectrum/spectrum-reveal";
import { SolutionGrid } from "./components/solution-grid";
import { DecisionBoard } from "./components/decision-board";
import { Impact } from "./components/impact";
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

        {/* Container para o Gradient Apple-like englobando as duas seções */}
        <div className="relative">
          {/* Light Mode Gradient (Wine / Carmesim Suave) */}
          <div
            className="absolute inset-0 pointer-events-none -z-10 dark:hidden"
            style={{
              background: `
                linear-gradient(to bottom,
                  var(--color-bg-primary) 0%,
                  color-mix(in oklch, #600418 15%, var(--color-bg-primary)) 20%,
                  color-mix(in oklch, #600418 15%, var(--color-bg-primary)) 80%,
                  var(--color-bg-primary) 100%
                )
              `,
            }}
          />
          {/* Dark Mode Gradient (Original) */}
          <div
            className="absolute inset-0 pointer-events-none -z-10 hidden dark:block"
            style={{
              background: `
                linear-gradient(to bottom,
                  var(--color-bg-primary) 0%,
                  color-mix(in oklch, var(--color-accent) 15%, var(--color-bg-primary)) 20%,
                  color-mix(in oklch, var(--color-accent) 15%, var(--color-bg-primary)) 80%,
                  var(--color-bg-primary) 100%
                )
              `,
            }}
          />
          {/* Spectrum + headline aqui — SolutionGrid vem colado logo abaixo sem repetir título */}
          <SpectrumReveal headline={sections.solution.headline} />

          {/* hideHeader — não renderiza eyebrow nem headline no grid */}
          <div className="relative z-20 -mt-16 md:-mt-24">
            <SolutionGrid section={sections.solution} hideHeader />
          </div>
        </div>

        <DecisionBoard
          section={sections.technicalDecisions}
          eyebrow={sections.technicalDecisions.headline}
        />

        <Impact section={sections.impact} />

        <FutureVision section={sections.future} />
      </main>
    </>
  );
}
