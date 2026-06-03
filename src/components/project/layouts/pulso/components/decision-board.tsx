// decision-board.tsx
// Card selecionado em accent + drawer animado do lado do card selecionado
// Sem texto hardcoded — usa section e t do i18n
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DecisionSection } from "@/types/project";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  section: DecisionSection;
  eyebrow: string;
}

export function DecisionBoard({ section, eyebrow }: Props) {
  const { t } = useI18n();
  const [active, setActive] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleSelect(index: number) {
    setActive((prev) => (prev === index ? null : index));
  }

  const current = active !== null ? section.decisions[active] : null;

  return (
    <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent) font-semibold mb-4">
          {eyebrow}
        </p>
        <h2 className="text-4xl md:text-5xl font-black tracking-[-0.04em] text-(--color-text-primary)">
          {section.headline}
        </h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Cards */}
        <div className="flex flex-col gap-3 w-full lg:w-[340px] shrink-0">
          {section.decisions.map((decision, index) => {
            const isActive = active === index;
            return (
              <motion.button
                key={decision.title}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onClick={() => handleSelect(index)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={!isActive ? { x: 4 } : {}}
                className={`
                  w-full text-left rounded-[20px] p-6 border
                  transition-all duration-300 cursor-pointer relative overflow-hidden
                  ${
                    isActive
                      ? "bg-(--color-accent) border-(--color-accent)"
                      : "bg-(--color-bg-secondary) border-(--color-border) hover:border-(--color-accent)/40"
                  }
                `}
              >
                {/* Glow no card ativo */}
                {isActive && (
                  <motion.div
                    layoutId="card-glow"
                    className="absolute inset-0 rounded-[20px]"
                    style={{
                      boxShadow:
                        "0 0 40px color-mix(in oklch, var(--color-accent) 30%, transparent)",
                    }}
                  />
                )}
                <div className="relative flex items-center justify-between gap-3">
                  <span
                    className={`font-semibold text-base leading-snug ${
                      isActive ? "text-white" : "text-(--color-text-primary)"
                    }`}
                  >
                    {decision.title}
                  </span>
                  <motion.div
                    animate={{
                      rotate: isActive ? 45 : 0,
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-sm font-bold
                      ${isActive ? "border-white/50 text-white" : "border-(--color-border) text-(--color-text-tertiary)"}`}
                  >
                    +
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Drawer — spring, slide da direita */}
        <div className="flex-1 w-full">
          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={current.title}
                initial={{ opacity: 0, x: 56, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="rounded-[28px] border border-(--color-border) bg-(--color-bg-secondary) p-8 md:p-10"
              >
                <div className="mb-8">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-(--color-accent) font-semibold mb-3">
                    {t.project.tradeoff === "Tradeoff" ? "Why" : "Por que"}
                  </p>
                  <p className="text-(--color-text-primary) leading-relaxed text-base">
                    {current.why}
                  </p>
                </div>

                {current.trade && (
                  <>
                    <div className="w-full h-px bg-(--color-border-subtle) mb-8" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-(--color-accent) font-semibold mb-3">
                        {t.project.tradeoff}
                      </p>
                      <p className="text-(--color-text-secondary) leading-relaxed text-sm">
                        {current.trade}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[200px] rounded-[28px] border border-dashed border-(--color-border-subtle)
                           flex items-center justify-center"
              >
                <p className="text-sm text-(--color-text-tertiary)">
                  {t.project.decision} →
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
