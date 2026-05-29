import type { ResultSection } from "@/types/project";

interface Props {
  section: ResultSection;
  eyebrow: string;
}

export function Result({ section, eyebrow }: Props) {
  return (
    <section className="pb-40">
      <div className="space-y-16">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold) mb-6">
            {eyebrow}
          </p>

          <h2 className="text-3xl md:text-5xl tracking-[-0.06em] leading-[1.02] text-(--color-text-primary)">
            {section.headline}
          </h2>

          {section.body && (
            <p className="mt-8 text-lg leading-relaxed text-(--color-text-secondary)">
              {section.body}
            </p>
          )}
        </div>

        {section.metrics && (
          <div className="grid md:grid-cols-3 gap-px border border-(--color-border)">
            {section.metrics.map((metric) => (
              <div
                key={metric.label}
                className="
              bg-(--color-bg-secondary)
              px-8 py-10
            "
              >
                <p className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) mb-4">
                  {metric.label}
                </p>

                <p className="text-4xl font-semibold tracking-tight text-(--color-gold)">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
