import { useState } from "react";

import { useI18n } from "@/lib/i18n-context";

import type { DecisionSection } from "@/types/project";

interface Props {
  section: DecisionSection;
}

export function DecisionBoard({ section }: Props) {
  const { t } = useI18n();

  const [activeIndex, setActiveIndex] = useState(0);

  const activeDecision = section.decisions[activeIndex] ?? section.decisions[0];

  if (!activeDecision) return null;

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

      <div className="grid md:grid-cols-3 gap-4">
        {section.decisions.map((decision, index) => {
          const active = index === activeIndex;

          return (
            <button
              key={decision.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`
                text-left
                rounded-[24px]
                border
                p-6
                transition-all duration-300
                cursor-pointer
                ${
                  active
                    ? "border-(--color-gold) bg-(--color-gold-muted)"
                    : "border-(--color-border) bg-(--color-bg-secondary)"
                }
              `}
            >
              <p
                className={`
                  text-sm
                  leading-relaxed
                  ${
                    active
                      ? "text-(--color-text-primary)"
                      : "text-(--color-text-secondary)"
                  }
                `}
              >
                {decision.title}
              </p>
            </button>
          );
        })}
      </div>

      <div
        className="
          rounded-[32px]
          border border-(--color-border)
          bg-(--color-bg-secondary)
          overflow-hidden
        "
      >
        <div className="p-8 md:p-10 border-b border-(--color-border)">
          <h3 className="text-2xl md:text-3xl tracking-tight text-(--color-text-primary)">
            {activeDecision.title}
          </h3>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-(--color-border)">
            <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold) mb-5">
              {t.project.decision}
            </p>

            <p className="leading-relaxed text-(--color-text-secondary)">
              {activeDecision.why}
            </p>
          </div>

          <div className="p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold) mb-5">
              {t.project.tradeoff}
            </p>

            <p className="leading-relaxed text-(--color-text-secondary)">
              {activeDecision.trade ?? "—"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
