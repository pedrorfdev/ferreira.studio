// components/project/sections/section-idea.tsx
import { SectionReveal } from "@/components/project/section-reveal"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData }

export function SectionIdea({ project }: Props) {
    const data = project.sections.idea
    if (!data) return null

    return (
        <section className="py-24 px-8 md:px-16 max-w-5xl mx-auto w-full border-t border-[var(--color-border-subtle)]">
            <SectionReveal>
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-6 block">
                    The Idea
                </span>
            </SectionReveal>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                <SectionReveal delay={0.05}>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight text-[var(--color-text-primary)]">
                        {data.headline}
                    </h2>
                </SectionReveal>

                <SectionReveal delay={0.1}>
                    <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                        {data.body}
                    </p>
                </SectionReveal>
            </div>
        </section>
    )
}