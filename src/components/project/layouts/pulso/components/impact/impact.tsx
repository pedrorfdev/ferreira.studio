// impact.tsx — scroll-snap nativo
// O scroll container do ProjectView recebe scroll-snap-type via className no view.tsx
// Cada item é um snap point — o browser trava automaticamente em cada um
// Sem JS, sem bugs, comportamento nativo perfeito
import { motion } from "framer-motion";
import type { ResultSection } from "@/types/project";

interface Props {
  section: ResultSection;
}

export function Impact({ section }: Props) {
  const metrics = section.metrics ?? [];
  if (!metrics.length) return null;

  return (
    <section>
      {metrics.map((metric) => (
        <div
          key={metric.label}
          // scroll-snap-align: start — trava aqui ao scrollar
          // h-dvh — ocupa exatamente a viewport
          className="h-dvh w-full flex flex-col items-center justify-center
                     overflow-hidden relative"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="absolute top-0 inset-x-0 h-px bg-(--color-accent)/15" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.8 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center justify-center text-center px-6"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-(--color-text-tertiary) mb-8">
              {metric.label}
            </p>
            <p
              className="font-black tracking-[-0.04em] leading-none text-(--color-text-primary)"
              style={{ fontSize: "clamp(4rem, 14vw, 12rem)" }}
            >
              {metric.value}
            </p>
          </motion.div>

          <div className="absolute bottom-0 inset-x-0 h-px bg-(--color-accent)/15" />
        </div>
      ))}
    </section>
  );
}
