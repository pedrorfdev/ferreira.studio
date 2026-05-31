import type { BaseSection } from "@/types/project";

interface Props {
  section: BaseSection;
  eyebrow: string;
}

export function Experience({ section, eyebrow }: Props) {
  return (
    <section className="py-36">
      <div className="grid md:grid-cols-2 gap-20">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold) mb-6">
            {eyebrow}
          </p>
        </div>

        <div>
          <h2 className="text-3xl md:text-5xl tracking-[-0.06em] leading-[1.04] text-(--color-text-primary)">
            {section.headline}
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-(--color-text-secondary)">
            {section.body}
          </p>
        </div>
      </div>
    </section>
  );
}
