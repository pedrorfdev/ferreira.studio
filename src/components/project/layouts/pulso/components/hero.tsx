import type { PulsoProject } from "@/types/projects/pulso";
import { useProjectContent } from "@/hooks/use-project-content";
import { ExternalLink, GitBranch } from "lucide-react";
import { TextureLayer } from "./background/texture-layer";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  project: PulsoProject;
}

export function Hero({ project }: Props) {
  const content = useProjectContent(project);
  const { t } = useI18n();

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

        <div className="flex gap-3 flex-wrap justify-center mt-12">
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-(--color-accent)
                         text-white text-sm hover:scale-[1.02] hover:opacity-90 transition-all"
            >
              <ExternalLink size={14} /> {t.actions.viewDemo}
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-(--color-border)
                         bg-(--color-bg-secondary)/80 backdrop-blur-xl text-(--color-text-secondary)
                         text-sm hover:border-(--color-accent) hover:text-(--color-text-primary) transition-all"
            >
              <GitBranch size={14} /> {t.actions.viewDemo}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
