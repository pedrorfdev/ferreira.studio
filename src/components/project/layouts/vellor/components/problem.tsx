import type { BaseSection } from "@/types/project";

interface Props {
  section: BaseSection;
  eyebrow: string;
}

export function Problem({ section, eyebrow }: Props) {
  return (
    <section className="py-40">
      <div className="max-w-6xl mx-auto">
        <p className="mb-6 text-xs uppercase tracking-[0.18em] text-(--color-gold)">
          {eyebrow}
        </p>

        <h2
          className="
            max-w-4xl
            text-5xl
            md:text-7xl
            tracking-[-0.08em]
            leading-[0.98]
            text-(--color-text-primary)
          "
        >
          {section.headline}
        </h2>

        <p
          className="
            mt-10
            max-w-2xl
            text-xl
            leading-relaxed
            text-(--color-text-secondary)
          "
        >
          {section.body}
        </p>
      </div>
    </section>
  );
}
