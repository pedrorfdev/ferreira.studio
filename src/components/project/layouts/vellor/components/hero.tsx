// layouts/vellor/components/hero.tsx
// Light fix CRÍTICO: texto legível — usa text-white sobre imagem
// Scrim menor, cor do Vellor (gold) nos detalhes
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

      {/* Scrim bem reduzido — imagem respira */}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/15 to-(--color-bg-primary)" />

      <div className="relative z-10 min-h-screen flex items-center px-6 md:px-10 pt-24 pb-40">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            {/* Status em gold — cor âncora do Vellor */}
            <p className="text-(--color-gold) uppercase tracking-[0.28em] text-[11px] mb-8 font-medium">
              {t.project.status.inDevelopment}
            </p>

            {/* Título: text-white forçado — legível sobre qualquer fundo */}
            <h1 className="text-6xl md:text-8xl tracking-[-0.09em] leading-[0.92] font-semibold text-white">
              {project.title}
            </h1>

            {/* Tagline: branco com opacidade */}
            <p className="mt-10 max-w-2xl text-xl md:text-2xl leading-relaxed text-white/75">
              {content.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
          {t.project.scrollHint}
        </p>
        <ArrowRight size={18} className="text-(--color-gold) rotate-90" />
      </motion.div>
    </section>
  );
}
