import { useState } from "react";

import { useI18n } from "@/lib/i18n-context";

import type { DecisionSection } from "@/types/project";

interface Props {
  section: DecisionSection;
  eyebrow: string;
}

export function DecisionBoard({ section, eyebrow }: Props) {
  const { t } = useI18n();

  const [activeIndex, setActiveIndex] = useState(0);

  const activeDecision = section.decisions[activeIndex];

  return (
    <section className="space-y-10">
      <div className="space-y-5">
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold)">
          {eyebrow}
        </p>

        <h2 className="text-3xl md:text-5xl tracking-[-0.06em] text-(--color-text-primary)">
          {section.headline}
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {section.decisions.map((decision, index) => {
          const active = index === activeIndex;

          return (
            <button
              key={decision.title}
              onClick={() => setActiveIndex(index)}
              className={`
                rounded-[24px]
                border
                p-6
                text-left
                transition-all
                ${
                  active
                    ? "border-(--color-gold) bg-(--color-accent-muted)"
                    : "border-(--color-border) bg-(--color-bg-secondary)"
                }
              `}
            >
              {decision.title}
            </button>
          );
        })}
      </div>

      <div className="rounded-[32px] border border-(--color-border) bg-(--color-bg-secondary)">
        <div className="p-8 border-b border-(--color-border)">
          <h3 className="text-2xl text-(--color-text-primary)">
            {activeDecision.title}
          </h3>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="p-8 border-b md:border-b-0 md:border-r border-(--color-border)">
            <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold) mb-4">
              {t.project.decision}
            </p>

            <p className="text-(--color-text-secondary)">
              {activeDecision.why}
            </p>
          </div>

          <div className="p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold) mb-4">
              {t.project.tradeoff}
            </p>

            <p className="text-(--color-text-secondary)">
              {activeDecision.trade}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
