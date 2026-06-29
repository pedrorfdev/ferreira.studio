import type { ResultSection } from "@/types/project";
import { useI18n } from "@/lib/i18n-context";

import { Header } from "./header";

interface Props {
  section: ResultSection;
}

export function Result({ section }: Props) {
  const { t } = useI18n();
  return (
    <section className="px-6 md:px-10 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <Header eyebrow={t.project.result} title={section.headline} />

            {section.body && (
              <p
                className="
                  mt-8
                  text-lg
                  text-(--color-text-secondary)
                  leading-relaxed
                  max-w-xl
                "
              >
                {section.body}
              </p>
            )}
          </div>

          <div className="space-y-4">
            {section.metrics?.map((metric) => {
              const featured = metric.value.includes("8");

              return (
                <div
                  key={metric.label}
                  className={`
                    relative overflow-hidden
                    rounded-3xl
                    border
                    backdrop-blur-xl
                    p-8
                    transition-all
                    ${
                      featured
                        ? "border-(--color-accent)/40 bg-linear-to-br from-[#2563eb]/20 via-[#1d4ed8]/10 to-transparent"
                        : "border-(--color-border) bg-(--color-bg-secondary)/80"
                    }
                  `}
                >
                  {featured && (
                    <>
                      <div className="absolute inset-0 bg-blue-500/10 blur-3xl" />

                      <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl" />
                    </>
                  )}

                  <div className="relative">
                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-[0.18em]
                        text-(--color-text-secondary)
                        mb-3
                      "
                    >
                      {metric.label}
                    </p>

                    <p
                      className={`
                        text-4xl
                        font-semibold
                        tracking-tight
                        ${
                          featured
                            ? "text-[#60a5fa] drop-shadow-[0_0_28px_rgba(96,165,250,0.55)]"
                            : "text-(--color-gold)"
                        }
                      `}
                    >
                      {metric.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
