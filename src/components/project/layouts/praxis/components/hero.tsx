import type { PraxisProject } from "@/types/projects";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";

interface Props {
  project: PraxisProject;
}

export function Hero({ project }: Props) {
  return (
    <section className="relative px-6 md:px-10 pt-28 md:pt-40 pb-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-(--color-accent) uppercase tracking-[0.28em] text-xs mb-7 font-medium">
            Clinical Operations Platform
          </p>

          <motion.h1 className="text-5xl md:text-8xl tracking-[-0.08em] leading-none font-semibold">
            <span className="text-(--color-text-primary)">{project.title.slice(0, 3)}</span>

            <span className="text-(--color-accent) drop-shadow-[0_0_32px_var(--color-accent)]">
              {project.title.slice(3)}
            </span>
          </motion.h1>

          <p className="mt-8 max-w-2xl text-base md:text-xl leading-relaxed text-(--color-text-secondary)">
            {project.tagline}
          </p>

          <div className="flex gap-3 flex-wrap mt-10">
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-(--color-accent)
                           text-white text-sm hover:scale-[1.02] hover:opacity-90 transition-all"
              >
                <ExternalLink size={14} /> View Demo
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
                <GitBranch size={14} /> GitHub
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
