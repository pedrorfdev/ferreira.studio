import { motion } from "framer-motion";
import { useState } from "react";

import type { DecisionSection } from "@/types/project";

import { Header } from "./header";

interface Props {
  section: DecisionSection;
}

export function DecisionsTabs({ section }: Props) {
  const [active, setActive] = useState(0);

  const decisions = section.decisions;

  if (!decisions.length) return null;

  const current = decisions[active];

  return (
    <section className="px-6 md:px-10 py-32">
      <div className="max-w-5xl mx-auto">
        <Header eyebrow="TECHNICAL DECISIONS" title={section.headline} />

        <div className="flex gap-2 flex-wrap mt-14">
          {decisions.map((decision, index) => (
            <button
              key={decision.title}
              onClick={() => setActive(index)}
              className={`
                px-4 py-2 rounded-full text-sm transition-all border
                ${
                  active === index
                    ? "bg-(--color-accent) border-(--color-accent) text-white shadow-[0_0_24px_var(--color-accent)]"
                    : "bg-(--color-bg-secondary)/80 border-(--color-border) text-(--color-text-secondary) hover:border-(--color-accent)/40 hover:text-(--color-text-primary)"
                }
              `}
            >
              {decision.title}
            </button>
          ))}
        </div>

        <motion.div
          key={current.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            mt-8
            rounded-3xl
            border border-(--color-border)
            bg-(--color-bg-secondary)/80
            backdrop-blur-xl
            p-8
            relative
            overflow-hidden
          "
        >
          <div className="absolute inset-0 bg-(--color-accent)/5 blur-3xl pointer-events-none" />

          <div className="relative">
            <p className="text-(--color-text-secondary) leading-relaxed mb-8">
              {current.why}
            </p>

            {current.trade && (
              <div className="pt-6 border-t border-(--color-border)">
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.18em]
                    text-(--color-accent)
                    mb-3
                  "
                >
                  Tradeoff
                </p>

                <p className="text-(--color-text-secondary)">{current.trade}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
