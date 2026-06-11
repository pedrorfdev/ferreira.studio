import type { DecisionSection } from "@/types/project";

import { DecisionAccordion } from "./decision-accordion";
import { Eyebrow } from "./eyebrow";

interface Props {
  section: DecisionSection;
}

export function TechnicalDecisions({ section }: Props) {
  return (
    <section className="space-y-10">
      <Eyebrow>TECHNICAL DECISIONS</Eyebrow>

      <div className="space-y-5">
        <h2 className="text-3xl md:text-5xl tracking-[-0.06em] leading-[1.05] text-(--color-text-primary)">
          {section.headline}
        </h2>

        <div className="pt-4 space-y-4">
          {section.decisions.map((decision) => (
            <DecisionAccordion
              key={decision.title}
              title={decision.title}
              why={decision.why}
              trade={decision.trade}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
