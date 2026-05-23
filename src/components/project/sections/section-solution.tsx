// components/project/sections/section-solution.tsx
import { SectionReveal } from "@/components/project/section-reveal"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData }

export function SectionSolution({ project }: Props) {
    const data = project.sections.solution
    if (!data) return null

    return (
        <section className="py-24 px-8 md:px-16 max-w-5xl mx-auto w-full border-t border-[var(--color-border-subtle)]">
            <SectionReveal>
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-6 block">
                    The Solution
                </span>
            </SectionReveal>

            <SectionReveal delay={0.05}>
                <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight text-[var(--color-text-primary)] mb-6 max-w-xl">
                    {data.headline}
                </h2>
            </SectionReveal>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                <SectionReveal delay={0.1}>
                    <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                        {data.body}
                    </p>
                </SectionReveal>

                {data.items && data.items.length > 0 && (
                    <SectionReveal delay={0.15}>
                        <ul className="flex flex-col gap-3">
                            {data.items.map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]"
                                >
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-accent)] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </SectionReveal>
                )}
            </div>
        </section>
    )
}