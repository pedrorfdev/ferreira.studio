import { OperationalSpectrum } from "./operational-spectrum";
import { BackgroundTexture } from "./background";

import { useProjectContent } from "@/hooks/use-project-content";

import type { PulsoProject } from "@/types/projects";

interface Props {
  project: PulsoProject;
}

export function Hero({ project }: Props) {
  const content = useProjectContent(project);

  return (
    <section
      className="
        relative
        h-screen
        overflow-hidden
        flex
        items-center
        justify-center
      "
    >
      <BackgroundTexture />

      <OperationalSpectrum />

      <div
        className="
          relative
          z-10
          text-center
          px-6
          max-w-5xl
        "
      >
        <h1
          className="
            text-7xl
            md:text-9xl
            font-black
            tracking-[-0.08em]
            text-(--color-text-primary)
          "
        >
          {project.title}
        </h1>

        <p
          className="
            mt-10
            text-lg
            md:text-xl
            leading-relaxed
            text-(--color-text-secondary)
          "
        >
          {content.sections.before.headline}
        </p>
      </div>
    </section>
  );
}
