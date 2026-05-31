import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, GitBranch } from "lucide-react";

import type { PulsoProject } from "@/types/projects";

import { Background } from "./background";

import { useI18n } from "@/lib/i18n-context";
import { useProjectContent } from "@/hooks/use-project-content";

interface Props {
  project: PulsoProject;
}

export function Hero({ project }: Props) {
  const content = useProjectContent(project);

  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden min-h-screen">
      <Background image={project.media.src} />

      <div
        className="
          absolute inset-0
          bg-linear-to-b
          from-black/25
          via-black/55
          to-(--color-bg-primary)
        "
      />

      <div
        className="
          relative z-10
          min-h-screen
          flex items-center
          px-6 md:px-10
          pt-28 pb-40
        "
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl"
          >
            <p
              className="
                text-(--color-gold)
                uppercase
                tracking-[0.22em]
                text-xs
                mb-8
                font-medium
              "
            >
              {t.project.status.inDevelopment}
            </p>

            <h1
              className="
                text-6xl
                md:text-8xl
                tracking-[-0.08em]
                leading-[0.92]
                font-semibold
              "
            >
              <span className="text-(--color-project-primary)">
                {project.title}
              </span>
            </h1>

            <p
              className="
                mt-10
                max-w-3xl
                text-xl
                md:text-2xl
                leading-relaxed
                text-(--color-text-secondary)
              "
            >
              {content.tagline}
            </p>

            <div className="flex flex-wrap gap-3 mt-12">
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2
                    px-5 py-3
                    rounded-xl
                    bg-(--color-accent)
                    text-white
                    text-sm
                    transition-colors
                    hover:bg-(--color-accent-hover)
                  "
                >
                  <ExternalLink size={14} />
                  {t.actions.viewDemo}
                </a>
              )}

              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2
                    px-5 py-3
                    rounded-xl
                    border border-(--color-border)
                    bg-black/20
                    text-(--color-text-secondary)
                    text-sm
                    transition-all
                    hover:border-(--color-gold)
                    hover:text-(--color-text-primary)
                  "
                >
                  <GitBranch size={14} />
                  {t.actions.github}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="
          absolute
          bottom-28
          left-1/2
          -translate-x-1/2
          z-20
          flex flex-col items-center gap-4
        "
        animate={{ y: [0, 8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
      >
        <p
          className="
            text-[11px]
            uppercase
            tracking-[0.18em]
            text-(--color-text-secondary)
          "
        >
          {t.project.scrollHint}
        </p>

        <ArrowRight
          size={18}
          className="
            text-(--color-gold)
            rotate-90
          "
        />
      </motion.div>
    </section>
  );
}
