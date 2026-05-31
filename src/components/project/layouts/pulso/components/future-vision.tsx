import type { BaseSection } from "@/types/project";

interface Props {
  section: BaseSection;
  eyebrow: string;
}

export function FutureVision({ section, eyebrow }: Props) {
  return (
    <section
      className="
        rounded-[40px]
        border border-(--color-border)
        bg-(--color-bg-secondary)
        p-10 md:p-16
      "
    >
      <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold)">
        {eyebrow}
      </p>

      <h2 className="mt-6 text-3xl md:text-5xl tracking-[-0.06em] leading-[1.04] text-(--color-text-primary)">
        {section.headline}
      </h2>

      <p className="mt-8 max-w-3xl text-lg leading-relaxed text-(--color-text-secondary)">
        {section.body}
      </p>
    </section>
  );
}
