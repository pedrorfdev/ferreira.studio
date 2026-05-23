// components/project/sections/section-problem.tsx
import { SectionReveal } from "@/components/project/section-reveal"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData }

export function SectionProblem({ project }: Props) {
    const data = project.sections.problem
    if (!data) return null

    return (
        <section className="py-24 px-8 md:px-16 max-w-5xl mx-auto w-full">
            <SectionReveal>
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent)] mb-6 block">
                    The Problem
                </span>
            </SectionReveal>

            <SectionReveal delay={0.05}>
                <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-tight text-[var(--color-text-primary)] mb-8 max-w-2xl">
                    {data.headline}
                </h2>
            </SectionReveal>

            <SectionReveal delay={0.1}>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                    {data.body}
                </p>
            </SectionReveal>
        </section>
    )
}