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
                px-4 py-2 rounded-full text-sm transition-all
                ${
                  active === index
                    ? "bg-(--color-accent) text-white"
                    : "bg-white/4 text-white/60 hover:bg-white/7"
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
            bg-white/3
            backdrop-blur-xl
            p-8
          "
        >
          <p className="text-white/80 leading-relaxed mb-8">{current.why}</p>

          {current.trade && (
            <div className="pt-6 border-t border-white/6">
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

              <p className="text-white/60">{current.trade}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
