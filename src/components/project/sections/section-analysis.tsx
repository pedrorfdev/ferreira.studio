// components/project/sections/section-analysis.tsx
import { SectionReveal } from "@/components/project/section-reveal"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData }

export function SectionAnalysis({ project }: Props) {
    const data = project.sections.analysis
    if (!data) return null

    return (
        <section className="py-24 px-8 md:px-16 max-w-5xl mx-auto w-full border-t border-[var(--color-border-subtle)]">
            <SectionReveal>
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-6 block">
                    Analysis
                </span>
            </SectionReveal>

            {/* Large editorial quote-style headline */}
            <SectionReveal delay={0.05}>
                <blockquote className="font-display text-2xl md:text-3xl font-medium tracking-[-0.02em] leading-snug text-[var(--color-text-primary)] border-l-2 border-[var(--color-accent)] pl-6 mb-10 max-w-2xl">
                    {data.headline}
                </blockquote>
            </SectionReveal>

            <SectionReveal delay={0.1}>
                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                    {data.body}
                </p>
            </SectionReveal>
        </section>
    )
}