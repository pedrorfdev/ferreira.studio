import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import type { DecisionSection } from "@/types/project";

interface Props {
  section: DecisionSection;
  eyebrow: string;
}

export function DecisionBoard({ section, eyebrow }: Props) {
  const [active, setActive] = useState(0);

  const current = section.decisions[active];

  return (
    <section className="py-40">
      <div className="mb-16">
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-pulso-primary)">
          {eyebrow}
        </p>

        <h2 className="mt-4 text-5xl font-bold">{section.headline}</h2>
      </div>

      <div className="grid md:grid-cols-[320px_1fr] gap-10">
        <div className="space-y-4">
          {section.decisions.map((decision, index) => (
            <button
              key={decision.title}
              onClick={() => setActive(index)}
              className={`
                  w-full
                  text-left
                  rounded-[24px]
                  p-6
                  border
                  transition-all
                  ${
                    active === index
                      ? "bg-(--color-pulso-primary) border-(--color-pulso-primary)"
                      : "border-(--color-border)"
                  }
                `}
            >
              {decision.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -40,
            }}
            className="
              rounded-[32px]
              border
              border-(--color-border)
              p-10
              bg-(--color-bg-secondary)
            "
          >
            <div>
              <p className="text-(--color-pulso-primary)">WHY</p>

              <p className="mt-4">{current.why}</p>
            </div>

            <div className="mt-12">
              <p className="text-(--color-pulso-primary)">TRADEOFF</p>

              <p className="mt-4">{current.trade}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
