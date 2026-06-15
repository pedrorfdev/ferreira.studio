// layouts/vellor/components/decision-tabs.tsx
// Fix: crash ao fechar accordion — open separado de active
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DecisionSection } from "@/types/project";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  section: DecisionSection;
  eyebrow?: string;
}

export function DecisionsTabs({ section, eyebrow }: Props) {
  const { t } = useI18n();
  const decisions = section.decisions;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  if (!decisions.length) return null;
  const current = decisions[active];

  return (
    <section className="px-6 md:px-10 py-24">
      <div className="max-w-5xl mx-auto">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold) mb-4">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl md:text-5xl tracking-[-0.06em] leading-[1.04] text-(--color-text-primary) mb-12">
          {section.headline}
        </h2>

        {/* DESKTOP */}
        <div className="hidden md:block">
          <div className="flex gap-2 flex-wrap">
            {decisions.map((d, i) => (
              <button
                key={d.title}
                onClick={() => setActive(i)}
                className={[
                  "px-4 py-2 rounded-full text-sm transition-all border cursor-pointer",
                  active === i
                    ? "bg-(--color-gold) border-(--color-gold) text-white"
                    : "bg-(--color-bg-secondary)/80 border-(--color-border) text-(--color-text-secondary) hover:border-(--color-gold)/50",
                ].join(" ")}
              >
                {d.title}
              </button>
            ))}
          </div>
          <motion.div
            key={current.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-3xl border border-(--color-border) bg-(--color-bg-secondary)/80 backdrop-blur-xl p-8"
          >
            <p className="text-(--color-text-secondary) leading-relaxed mb-8">
              {current.why}
            </p>
            {current.trade && (
              <div className="pt-6 border-t border-(--color-border)">
                <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold) mb-3">
                  {t.project.tradeoff}
                </p>
                <p className="text-(--color-text-secondary)">{current.trade}</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* MOBILE */}
        <div className="md:hidden flex flex-col divide-y divide-(--color-border-subtle)">
          {decisions.map((d, i) => {
            const isOpen = open === i;
            return (
              <div key={d.title}>
                <button
                  onClick={() => {
                    setActive(i);
                    setOpen(isOpen ? null : i);
                  }}
                  className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
                >
                  <span
                    className={[
                      "text-sm font-medium",
                      isOpen
                        ? "text-(--color-gold)"
                        : "text-(--color-text-primary)",
                    ].join(" ")}
                  >
                    {d.title}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown
                      size={16}
                      className="text-(--color-text-tertiary) shrink-0"
                    />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 space-y-4">
                        <p className="text-sm text-(--color-text-secondary) leading-relaxed">
                          {d.why}
                        </p>
                        {d.trade && (
                          <div className="pt-3 border-t border-(--color-border-subtle)">
                            <p className="text-xs uppercase tracking-[0.15em] text-(--color-gold) mb-2">
                              {t.project.tradeoff}
                            </p>
                            <p className="text-xs text-(--color-text-tertiary)">
                              {d.trade}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
