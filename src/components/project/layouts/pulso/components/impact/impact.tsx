import type { ResultSection } from "@/types/project";

import { ImpactSlide } from "./impact-slide";

interface Props {
  section: ResultSection;
}

export function Impact({ section }: Props) {
  if (!section.metrics) return null;

  return (
    <section className="relative">
      {section.metrics.map((metric) => (
        <ImpactSlide
          key={metric.label}
          label={metric.label}
          value={metric.value}
        />
      ))}
    </section>
  );
}
