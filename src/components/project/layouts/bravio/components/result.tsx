import type { ResultSection } from "@/types/project";
interface Props {
  section: ResultSection;
}
export function Result({ section }: Props) {
  return (
    <section className="pb-36">
      {" "}
      <div className="grid md:grid-cols-2 gap-16">
        {" "}
        <div>
          {" "}
          <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent) mb-6">
            {" "}
            RESULT{" "}
          </p>{" "}
          <h2 className="text-3xl md:text-5xl tracking-[-0.06em] leading-[1.04] text-(--color-text-primary)">
            {" "}
            {section.headline}{" "}
          </h2>{" "}
          {section.body && (
            <p className="mt-8 text-lg leading-relaxed text-(--color-text-secondary)">
              {" "}
              {section.body}{" "}
            </p>
          )}{" "}
        </div>{" "}
        {section.metrics && (
          <div className="space-y-4">
            {" "}
            {section.metrics.map((metric) => (
              <div
                key={metric.label}
                className=" rounded-3xl border border-(--color-border) bg-(--color-bg-secondary) p-8 "
              >
                {" "}
                <p className="text-xs uppercase tracking-[0.18em] text-(--color-text-secondary) mb-4">
                  {" "}
                  {metric.label}{" "}
                </p>{" "}
                <p className="text-4xl tracking-tight font-semibold text-(--color-accent)">
                  {" "}
                  {metric.value}{" "}
                </p>{" "}
              </div>
            ))}{" "}
          </div>
        )}{" "}
      </div>{" "}
    </section>
  );
}
