import type { DecisionSection } from "@/types/project";
import { DecisionAccordion } from "./decision-accordion";
interface Props {
  section: DecisionSection;
}
export function TechnicalDecisions({ section }: Props) {
  return (
    <section className="space-y-10">
      {" "}
      <div className="space-y-5">
        {" "}
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent)">
          {" "}
          TECHNICAL DECISIONS{" "}
        </p>{" "}
        <h2 className="text-3xl md:text-5xl tracking-[-0.06em] leading-[1.04] text-(--color-text-primary)">
          {" "}
          {section.headline}{" "}
        </h2>{" "}
      </div>{" "}
      <div className="space-y-4">
        {" "}
        {section.decisions.map((decision) => (
          <DecisionAccordion
            key={decision.title}
            title={decision.title}
            why={decision.why}
            trade={decision.trade}
          />
        ))}{" "}
      </div>{" "}
    </section>
  );
}
