import type { ResultSection } from "@/types/project";

interface Props {
  section: ResultSection;
  eyebrow: string;
}

export function Impact({ section, eyebrow }: Props) {
  return (
    <section className="space-y-12">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold)">
          {eyebrow}
        </p>

        <h2 className="mt-5 text-3xl md:text-5xl tracking-[-0.06em] text-(--color-text-primary)">
          {section.headline}
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-(--color-text-secondary)">
          {section.body}
        </p>
      </div>

      {section.metrics && (
        <div className="grid md:grid-cols-3 gap-px border border-(--color-border)">
          {section.metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-(--color-bg-secondary) px-8 py-10"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary)">
                {metric.label}
              </p>

              <p className="mt-4 text-4xl font-semibold text-(--color-gold)">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
