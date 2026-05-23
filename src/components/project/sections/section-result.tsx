// components/project/sections/section-result.tsx
import { SectionReveal } from "@/components/project/section-reveal"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData }

export function SectionResult({ project }: Props) {
    const data = project.sections.result
    if (!data) return null

    return (
        <section className="py-24 px-8 md:px-16 max-w-5xl mx-auto w-full border-t border-[var(--color-border-subtle)]">
            <SectionReveal>
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-6 block">
                    Result
                </span>
            </SectionReveal>

            <SectionReveal delay={0.05}>
                <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-tight text-[var(--color-text-primary)] mb-8 max-w-2xl">
                    {data.headline}
                </h2>
            </SectionReveal>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                <SectionReveal delay={0.1}>
                    <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                        {data.body}
                    </p>
                </SectionReveal>

                {data.metrics && data.metrics.length > 0 && (
                    <SectionReveal delay={0.15}>
                        <div className="flex flex-col gap-6">
                            {data.metrics.map((metric, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <span className="font-display text-3xl font-semibold text-[var(--color-text-primary)] tracking-[-0.02em]">
                                        {metric.value}
                                    </span>
                                    <span className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
                                        {metric.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </SectionReveal>
                )}
            </div>
        </section>
    )
}