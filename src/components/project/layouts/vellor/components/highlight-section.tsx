import type { HighlightSection } from "@/types/projects/vellor";

interface Props {
  section: HighlightSection;
  eyebrow: string;
}

export function HighlightSection({ section, eyebrow }: Props) {
  return (
    <section className="py-36">
      <div className="space-y-16">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold) mb-6">
            {eyebrow}
          </p>

          <h2 className="text-4xl md:text-6xl tracking-[-0.06em] leading-[1.02] text-(--color-text-primary)">
            {section.headline}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px border border-(--color-border)">
          {section.items.map((item) => (
            <div
              key={item.title}
              className="
                bg-(--color-bg-secondary)
                p-10
              "
            >
              <h3 className="text-xl text-(--color-text-primary)">
                {item.title}
              </h3>

              <p className="mt-5 text-(--color-text-secondary) leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
