import { motion } from "framer-motion";
import { ExternalLink, GitBranch, ArrowRight } from "lucide-react";
import type { BravioProject } from "@/types/projects/bravio";
import { Background } from "./background";
import { useI18n } from "@/lib/i18n-context";
import { useProjectContent } from "@/hooks/use-project-content";

interface Props {
  project: BravioProject;
}

export function Hero({ project }: Props) {
  const content = useProjectContent(project);
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden min-h-screen">
      <Background image={project.media.src} />

      {/* Scrim reduzido — não sufoca a imagem no light */}
      <div className="absolute inset-0 bg-linear-to-b from-black/45 via-black/20 to-(--color-bg-primary)" />

      {/* Glow verde sutil */}
      <div className="absolute inset-0 bg-(--color-project-glow) opacity-30 mix-blend-screen" />

      <div className="relative z-10 min-h-screen flex items-center px-6 md:px-10 pt-28 pb-40">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl"
          >
            {/* Status badge */}
            <p className="text-(--color-gold)/90 uppercase tracking-[0.24em] text-xs mb-8 font-medium">
              {t.project.status.inDevelopment}
            </p>

            {/* Título: sempre branco sobre a imagem de fundo */}
            <h1 className="text-6xl md:text-8xl tracking-[-0.08em] leading-[0.92] font-semibold text-white">
              <span className="text-(--color-project-primary) drop-shadow-[0_0_32px_var(--color-accent)]">
                {project.title.slice(0, 2)}
              </span>
              {project.title.slice(2)}
            </h1>

            {/* Tagline: branco com opacidade */}
            <p className="mt-10 max-w-3xl text-lg md:text-2xl leading-relaxed text-white/75">
              {content.tagline}
            </p>

            <div className="flex gap-3 flex-wrap mt-12">
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
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
          {t.project.scrollHint}
        </p>
        <ArrowRight size={18} className="text-(--color-gold) rotate-90" />
      </motion.div>
    </section>
  );
}
