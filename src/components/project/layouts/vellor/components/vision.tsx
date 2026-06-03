import type { BaseSection } from "@/types/project";

interface Props {
  section: BaseSection;
  eyebrow: string;
}

export function Vision({ section, eyebrow }: Props) {
  return (
    <section className="py-36">
      <div className="max-w-4xl">
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold) mb-6">
          {eyebrow}
        </p>

        <h2 className="text-4xl md:text-6xl tracking-[-0.06em] leading-[1.02] text-(--color-text-primary)">
          {section.headline}
        </h2>

        <p className="mt-8 text-xl leading-relaxed text-(--color-text-secondary)">
          {section.body}
        </p>
      </div>
    </section>
  );
}
