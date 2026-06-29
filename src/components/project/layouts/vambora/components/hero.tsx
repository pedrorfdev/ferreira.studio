import { motion } from "framer-motion";
import { ExternalLink, GitBranch, ArrowRight } from "lucide-react";
import type { VamboraProject } from "@/types/projects/vambora";
import { Background } from "./background";
import { GlowBackground } from "./glow-background";
import { useI18n } from "@/lib/i18n-context";
import { useProjectContent } from "@/hooks/use-project-content";

interface Props {
  project: VamboraProject;
}

export function Hero({ project }: Props) {
  const { t } = useI18n();
  const { tagline } = useProjectContent(project);

  return (
    <section className="relative overflow-hidden">
      <Background image={project.media.src} />
      <GlowBackground />

      <div className="relative z-10 min-h-[72vh] flex items-center px-6 md:px-10 pt-28 md:pt-36 pb-32">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl md:text-8xl tracking-[-0.08em] leading-none font-semibold text-(--color-text-primary)">
              <span className="text-(--color-text-primary)">Vam</span>
              <span className="text-(--color-accent) drop-shadow-[0_0_42px_var(--color-accent)]">
                bora
              </span>
              <span className="text-(--color-gold)">.ai</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base md:text-xl leading-relaxed text-(--color-text-secondary)">
              {tagline}
            </p>

            <div className="flex gap-3 flex-wrap mt-10">
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-(--color-accent)
                             text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-(--color-accent)/20 transition-all"
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
                             border border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/10 backdrop-blur-md
                             text-(--color-text-primary) text-sm font-medium hover:bg-black/10 dark:hover:bg-white/20 transition-all shadow-sm"
                >
                  <GitBranch size={14} /> {t.actions.github}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <p className="text-[10px] uppercase tracking-[0.24em] text-(--color-accent)">
          {t.project.scrollHint}
        </p>
        <div
          className="w-10 h-10 rounded-full border border-(--color-border-subtle)
                        bg-(--color-bg-secondary)/80 backdrop-blur-xl flex items-center justify-center"
        >
          <ArrowRight size={16} className="text-(--color-accent) rotate-90" />
        </div>
      </motion.div>
    </section>
  );
}
