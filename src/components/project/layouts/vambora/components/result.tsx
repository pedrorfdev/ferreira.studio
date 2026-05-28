import type { ResultSection } from "@/types/project";

import { Header } from "./header";

interface Props {
  section: ResultSection;
}

export function Result({ section }: Props) {
  return (
    <section className="px-6 md:px-10 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <Header eyebrow="RESULT" title={section.headline} />

            {section.body && (
              <p
                className="
                mt-8
                text-lg
                text-white/70
                leading-relaxed
                max-w-xl
              "
              >
                {section.body}
              </p>
            )}
          </div>

          <div className="space-y-4">
            {section.metrics?.map((metric) => (
              <div
                key={metric.label}
                className="
                  rounded-3xl
                  border border-(--color-border)
                  bg-white/3
                  backdrop-blur-xl
                  p-8
                "
              >
                <p
                  className="
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-white/40
                  mb-3
                "
                >
                  {metric.label}
                </p>

                <p
                  className="
                  text-4xl
                  font-semibold
                  tracking-tight
                  text-(--color-accent)
                "
                >
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
