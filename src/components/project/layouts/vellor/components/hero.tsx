import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { useI18n } from "@/lib/i18n-context";
import { useProjectContent } from "@/hooks/use-project-content";

import type { VellorProject } from "@/types/projects/vellor";

import { Background } from "./background";

interface Props {
  project: VellorProject;
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
          from-black/15
          via-black/25
          to-(--color-bg-primary)
        "
      />

      <div
        className="
          relative z-10
          min-h-screen
          flex items-center
          px-6 md:px-10
          pt-24 pb-40
        "
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <p
              className="
                text-(--color-gold)
                uppercase
                tracking-[0.24em]
                text-[11px]
                mb-8
              "
            >
              {t.project.status.inDevelopment}
            </p>

            <h1
              className="
                text-6xl
                md:text-8xl
                tracking-[-0.09em]
                leading-[0.92]
                font-semibold
                text-(--color-text-primary)
              "
            >
              {project.title}
            </h1>

            <p
              className="
                mt-10
                max-w-2xl
                text-xl
                md:text-2xl
                leading-relaxed
                text-(--color-text-secondary)
              "
            >
              {content.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="
          absolute
          bottom-24
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
            rotate-90
            text-(--color-gold)
          "
        />
      </motion.div>
    </section>
  );
}
