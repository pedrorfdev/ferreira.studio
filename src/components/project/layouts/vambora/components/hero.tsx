import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, GitBranch } from "lucide-react";

import type { VamboraProject } from "@/types/projects/vambora";

import { Background } from "./background";
import { GlowBackground } from "./glow-background";

interface Props {
  project: VamboraProject;
  eyebrow?: string;
}

export function Hero({ project, eyebrow }: Props) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <Background image={project.media.src} />

      <GlowBackground />

      <div
        className="
        relative z-10
        min-h-screen
        flex items-center
        px-6 md:px-10
      "
      >
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {eyebrow && (
              <p
                className="
                text-(--color-accent)
                uppercase
                tracking-[0.28em]
                text-xs
                mb-7
                font-medium
              "
              >
                {eyebrow}
              </p>
            )}

            <h1
              className="
              text-6xl md:text-8xl
              tracking-[-0.08em]
              leading-none
              font-semibold
              text-white
            "
            >
              {project.title}
            </h1>

            <p
              className="
              mt-8
              max-w-2xl
              text-base md:text-xl
              leading-relaxed
              text-white/70
            "
            >
              {project.tagline}
            </p>

            <div className="flex gap-3 flex-wrap mt-10">
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2
                    px-5 py-3
                    rounded-full
                    bg-(--color-accent)
                    text-white
                    text-sm
                    hover:opacity-90
                    transition-opacity
                  "
                >
                  <ExternalLink size={14} />
                  Try it
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
                    rounded-full
                    border border-(--color-border)
                    text-white/70
                    text-sm
                    hover:border-(--color-accent)
                    transition-colors
                  "
                >
                  <GitBranch size={14} />
                  GitHub
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="
          absolute bottom-10 left-1/2
          -translate-x-1/2
        "
        animate={{ y: [0, 10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
      >
        <ArrowRight
          size={18}
          className="
            text-(--color-accent)
            rotate-90
          "
        />
      </motion.div>
    </section>
  );
}
