// layouts/vambora/components/decisions-tabs.tsx
// Fix: crash ao fechar accordion — active nunca vira -1
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DecisionSection } from "@/types/project";
import { Header } from "./header";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  section: DecisionSection;
}

export function DecisionsTabs({ section }: Props) {
  const { t } = useI18n();
  const decisions = section.decisions;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  if (!decisions.length) return null;
  const current = decisions[active];

  return (
    <section className="px-6 md:px-10 py-32">
      <div className="max-w-5xl mx-auto">
        <Header eyebrow={t.project.technical} title={section.headline} />

        {/* DESKTOP */}
        <div className="hidden md:block">
          <div className="flex gap-2 flex-wrap mt-14">
            {decisions.map((d, i) => (
              <button
                key={d.title}
                onClick={() => setActive(i)}
                className={[
                  "px-4 py-2 rounded-full text-sm transition-all border cursor-pointer",
                  active === i
                    ? "bg-(--color-accent) border-(--color-accent) text-white"
                    : "bg-(--color-bg-secondary)/80 border-(--color-border) text-(--color-text-secondary) hover:border-(--color-accent)/40",
                ].join(" ")}
              >
                {d.title}
              </button>
            ))}
          </div>
          <motion.div
            key={current.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-3xl border border-(--color-border) bg-(--color-bg-secondary)/80 backdrop-blur-xl p-8"
          >
            <p className="text-(--color-text-secondary) leading-relaxed mb-8">
              {current.why}
            </p>
            {current.trade && (
              <div className="pt-6 border-t border-(--color-border)">
                <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent) mb-3">
                  {t.project.tradeoff}
                </p>
                <p className="text-(--color-text-secondary)">{current.trade}</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* MOBILE — open separado de active, nunca null para current */}
        <div className="md:hidden mt-10 flex flex-col divide-y divide-(--color-border-subtle)">
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
                        ? "text-(--color-accent)"
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
                      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 space-y-4">
                        <p className="text-sm text-(--color-text-secondary) leading-relaxed">
                          {d.why}
                        </p>
                        {d.trade && (
                          <div className="pt-3 border-t border-(--color-border-subtle)">
                            <p className="text-xs uppercase tracking-[0.15em] text-(--color-accent) mb-2">
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
