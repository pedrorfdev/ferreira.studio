import type { PulsoSolutionSection } from "@/types/projects/pulso";

interface Props {
  section: PulsoSolutionSection;
  eyebrow: string;
}

export function SolutionGrid({ section, eyebrow }: Props) {
  return (
    <section className="space-y-12">
      <div className="space-y-5">
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold)">
          {eyebrow}
        </p>

        <h2 className="max-w-4xl text-3xl md:text-5xl tracking-[-0.06em] leading-[1.04] text-(--color-text-primary)">
          {section.headline}
        </h2>

        <p className="max-w-3xl text-lg leading-relaxed text-(--color-text-secondary)">
          {section.body}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {section.items.map((item) => (
          <div
            key={item.title}
            className="
              rounded-[28px]
              border border-(--color-border)
              bg-(--color-bg-secondary)
              p-7
            "
          >
            <h3 className="text-lg font-medium text-(--color-text-primary)">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-(--color-text-secondary)">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
