import type { ResultSection } from "@/types/project";

import { motion } from "framer-motion";

import { Eyebrow } from "./eyebrow";

interface Props {
  section: ResultSection;
}

export function Outcome({ section }: Props) {
  return (
    <section className="space-y-10">
      <Eyebrow>OUTCOME</Eyebrow>

      <div className="space-y-6">
        <h2 className="text-3xl md:text-5xl tracking-[-0.06em] leading-[1.05] text-(--color-text-primary) max-w-2xl">
          {section.headline}
        </h2>

        {section.body && (
          <p className="text-(--color-text-secondary) text-lg leading-relaxed max-w-2xl">
            {section.body}
          </p>
        )}

        {!!section.metrics?.length && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-10">
            {section.metrics.map((metric) => (
              <motion.div
                key={metric.label}
                whileHover={{
                  y: -4,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="relative overflow-hidden rounded-3xl border border-(--color-border-subtle) bg-(--color-bg-secondary)/80 backdrop-blur-xl p-7"
              >
                <div className="absolute inset-0 bg-(--color-accent-muted) opacity-20 blur-3xl" />

                <div className="relative flex flex-col items-center justify-center text-center">
                  <p className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) mb-4">
                    {metric.label}
                  </p>

                  <p className="text-3xl md:text-4xl font-semibold tracking-tighter text-(--color-gold) drop-shadow-[0_0_28px_var(--color-gold)]">
                    {metric.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
