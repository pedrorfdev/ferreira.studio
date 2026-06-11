import type { PulsoProject } from "@/types/projects/pulso";
import { useProjectContent } from "@/hooks/use-project-content";
import { TextureLayer } from "./background/texture-layer";

interface Props {
  project: PulsoProject;
}

export function Hero({ project }: Props) {
  const content = useProjectContent(project);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <TextureLayer />

      <div className="relative z-20 text-center px-8 max-w-5xl">
        <h1 className="text-7xl md:text-[10rem] font-black tracking-[-0.08em] text-(--color-text-primary)">
          PULSO
        </h1>

        <p className="mt-8 text-xl md:text-2xl text-(--color-text-secondary)">
          {content.tagline}
        </p>
      </div>
    </section>
  );
}
