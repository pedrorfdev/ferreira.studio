import type { FutureSection } from "@/types/projects/pulso";

interface Props {
  section: FutureSection;
  eyebrow: string;
}

export function FutureVision({ section, eyebrow }: Props) {
  return (
    <section className="py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p
          className="
            text-xs
            uppercase
            tracking-[0.18em]
            text-(--color-pulso-primary)
          "
        >
          {eyebrow}
        </p>

        <h2
          className="
            mt-6
            text-5xl
            md:text-7xl
            tracking-[-0.08em]
            text-(--color-text-primary)
          "
        >
          {section.headline}
        </h2>

        <p
          className="
            mt-8
            max-w-3xl
            text-lg
            text-(--color-text-secondary)
          "
        >
          {section.body}
        </p>

        <div
          className="
            mt-24
            flex
            gap-16
            min-w-max
          "
        >
          {section.steps.map((step, index) => (
            <div
              key={step.title}
              className="
                flex
                items-center
                gap-16
              "
            >
              <div>
                <div
                  className="
                    w-4
                    h-4
                    rounded-full
                    bg-(--color-pulso-primary)
                    mb-4
                  "
                />

                <p
                  className="
                    text-xl
                    text-(--color-text-primary)
                  "
                >
                  {step.title}
                </p>
              </div>

              {index < section.steps.length - 1 && (
                <div
                  className="
                    w-24
                    h-px
                    bg-(--color-border)
                  "
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
