import type { BaseSection } from "@/types/project";

interface Props {
  before: BaseSection;
  chaos: BaseSection;

  beforeLabel: string;
  chaosLabel: string;
}

export function BeforePulso({ before, chaos, beforeLabel, chaosLabel }: Props) {
  return (
    <section className="grid lg:grid-cols-2 gap-8">
      <article
        className="
          rounded-[32px]
          border border-(--color-border)
          bg-(--color-bg-secondary)
          p-8 md:p-10
        "
      >
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold)">
          {beforeLabel}
        </p>

        <h2 className="mt-5 text-3xl md:text-4xl tracking-[-0.06em] text-(--color-text-primary)">
          {before.headline}
        </h2>

        <p className="mt-6 leading-relaxed text-(--color-text-secondary)">
          {before.body}
        </p>
      </article>

      <article
        className="
          rounded-[32px]
          border border-(--color-border)
          bg-(--color-bg-secondary)
          p-8 md:p-10
        "
      >
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold)">
          {chaosLabel}
        </p>

        <h2 className="mt-5 text-3xl md:text-4xl tracking-[-0.06em] text-(--color-text-primary)">
          {chaos.headline}
        </h2>

        <p className="mt-6 leading-relaxed text-(--color-text-secondary)">
          {chaos.body}
        </p>
      </article>
    </section>
  );
}
