import { ChaosNode } from "./chaos-node";

import type { ChaosSection } from "@/types/projects/pulso";

interface Props {
  section: ChaosSection;
  eyebrow: string;
}

export function ChaosMap({ section, eyebrow }: Props) {
  return (
    <section
      className="
        relative
        h-screen
        overflow-hidden
        flex
        items-center
      "
    >
      <div className="absolute inset-0">
        <svg viewBox="0 0 1200 800" className="w-full h-full">
          {section.items.map((item, index) => (
            <ChaosNode
              key={item.title}
              label={item.title}
              x={120 + ((index * 130) % 900)}
              y={120 + ((index * 170) % 500)}
            />
          ))}
        </svg>
      </div>

      <div
        className="
          relative
          z-10
          max-w-4xl
          mx-auto
          text-center
          px-6
        "
      >
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
            mx-auto
            text-lg
            text-(--color-text-secondary)
          "
        >
          {section.body}
        </p>
      </div>
    </section>
  );
}
