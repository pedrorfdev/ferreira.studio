// layouts/vellor/components/result.tsx
// Light fix: bordas das métricas em champagne gold
import type { ResultSection } from "@/types/project";

interface Props {
  section: ResultSection;
  eyebrow: string;
}

export function Result({ section, eyebrow }: Props) {
  return (
    <section className="py-40">
      <div className="max-w-5xl">
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold) mb-6">
          {eyebrow}
        </p>
        <h2 className="text-5xl md:text-7xl tracking-[-0.08em] leading-[0.98] text-(--color-text-primary)">
          {section.headline}
        </h2>
        {section.body && (
          <p className="mt-10 max-w-3xl text-xl leading-relaxed text-(--color-text-secondary)">
            {section.body}
          </p>
        )}
      </div>

      {section.metrics && (
        <div className="mt-24 grid md:grid-cols-3 gap-4">
          {section.metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-(--color-bg-secondary) px-8 py-10 rounded-2xl
                         border border-(--color-gold)/40"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary)">
                {metric.label}
              </p>
              <p className="mt-4 text-4xl text-(--color-gold)">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
