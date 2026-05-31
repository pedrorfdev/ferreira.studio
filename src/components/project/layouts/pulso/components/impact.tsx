import { ImpactSlide } from "./impact-slide";

import type { ResultSection } from "@/types/project";

interface Props {
  section: ResultSection;
}

export function Impact({ section }: Props) {
  return (
    <section>
      {section.metrics?.map((metric) => (
        <ImpactSlide
          key={metric.label}
          label={metric.label}
          value={metric.value}
        />
      ))}
    </section>
  );
}
