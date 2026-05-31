import type { BaseSection } from "@/types/project";

interface Props {
  section: BaseSection;
  eyebrow: string;
}

export function Problem({ section, eyebrow }: Props) {
  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <p
          className="
            text-xs
            uppercase
            tracking-[0.18em]
            text-(--color-gold)
            mb-5
          "
        >
          {eyebrow}
        </p>

        <h2
          className="
            text-3xl md:text-5xl
            tracking-[-0.06em]
            leading-[1.04]
            text-(--color-text-primary)
          "
        >
          {section.headline}
        </h2>

        {section.body && (
          <p
            className="
              mt-8
              text-lg
              leading-relaxed
              text-(--color-text-secondary)
            "
          >
            {section.body}
          </p>
        )}
      </div>
    </section>
  );
}
