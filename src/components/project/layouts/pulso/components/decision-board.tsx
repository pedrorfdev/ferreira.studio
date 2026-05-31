import { useState } from "react";

import { DecisionPanel } from "./decision-panel";

import type { DecisionSection } from "@/types/project";

interface Props {
  section: DecisionSection;
}

export function DecisionBoard({ section }: Props) {
  const [active, setActive] = useState(0);

  return (
    <section className="py-40">
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          grid
          md:grid-cols-[280px_1fr]
          gap-10
        "
      >
        <div className="space-y-4">
          {section.decisions.map((decision, index) => (
            <button
              key={decision.title}
              onClick={() => setActive(index)}
              className="
                  w-full
                  text-left
                  p-5
                  rounded-2xl
                  border
                  border-(--color-border)
                  bg-(--color-bg-secondary)
                "
            >
              {decision.title}
            </button>
          ))}
        </div>

        <DecisionPanel decision={section.decisions[active]} />
      </div>
    </section>
  );
}
