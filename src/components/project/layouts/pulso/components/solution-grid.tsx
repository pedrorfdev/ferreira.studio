import { SolutionCard } from "./solution-card";

import type { PulsoSolutionSection } from "@/types/projects/pulso";

interface Props {
  section: PulsoSolutionSection;
  eyebrow: string;
}

export function SolutionGrid({ section, eyebrow }: Props) {
  return (
    <section className="py-40">
      <div className="max-w-6xl mx-auto px-6">
        <p className="mb-6 text-(--color-pulso-primary)">{eyebrow}</p>

        <h2 className="text-5xl text-(--color-text-primary)">
          {section.headline}
        </h2>

        <p className="mt-8 text-(--color-text-secondary)">{section.body}</p>

        <div
          className="
            mt-20
            grid
            md:grid-cols-3
            gap-6
          "
        >
          {section.items.map((item) => (
            <SolutionCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
