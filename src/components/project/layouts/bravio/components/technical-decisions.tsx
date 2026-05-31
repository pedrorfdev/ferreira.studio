// views/projects/bravio/components/technical-decisions.tsx

import type { DecisionSection } from "@/types/project";

import { DecisionAccordion } from "./decision-accordion";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  section: DecisionSection;
}

export function TechnicalDecisions({ section }: Props) {
  const { t } = useI18n();
  return (
    <section className="space-y-10">
      <div className="space-y-5">
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold)">
          {t.project.technical}
        </p>

        <h2 className="text-3xl md:text-5xl tracking-[-0.06em] leading-[1.04] text-(--color-text-primary)">
          {section.headline}
        </h2>
      </div>

      <div className="space-y-4">
        {section.decisions.map((decision) => (
          <DecisionAccordion
            key={decision.title}
            title={decision.title}
            why={decision.why}
            trade={decision.trade}
            decisionLabel={t.project.decision}
            tradeoffLabel={t.project.tradeoff}
          />
        ))}
      </div>
    </section>
  );
}
