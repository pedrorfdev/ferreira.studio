import type { PraxisProject } from "@/types/projects";
import { motion } from "framer-motion";
import { useProjectContent } from "@/hooks/use-project-content";
import { ExternalLink, GitBranch } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  project: PraxisProject;
}

export function Hero({ project }: Props) {
  const { t } = useI18n();
  const content = useProjectContent(project);
  return (
    <section className="relative px-6 md:px-10 pt-28 md:pt-40 pb-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-(--color-accent) uppercase tracking-[0.28em] text-xs mb-7 font-medium">
            {t.project.status.live}
          </p>

          <motion.h1 className="text-5xl md:text-8xl tracking-[-0.08em] leading-none font-semibold">
            <span className="text-(--color-text-primary)">
              {project.title.slice(0, 3)}
            </span>

            <span className="text-(--color-accent) drop-shadow-[0_0_32px_var(--color-accent)]">
              {project.title.slice(3)}
            </span>
          </motion.h1>

          {/* Tagline traduzida via useProjectContent */}
          <p className="mt-8 max-w-2xl text-base md:text-xl leading-relaxed text-(--color-text-secondary)">
            {content.tagline}
          </p>

          <div className="flex gap-3 flex-wrap mt-10">
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-(--color-accent)
                           text-sm text-white/80 hover:opacity-90 transition-all"
              >
                <ExternalLink size={14} /> {t.actions.viewDemo}
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl
                           border border-zinc-500 bg-white/10 backdrop-blur-sm transition-all"
              >
                <GitBranch size={14} /> {t.actions.github}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
