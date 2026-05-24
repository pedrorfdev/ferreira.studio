// components/project/sections/section-idea.tsx

import { SectionReveal } from "@/components/project/section-reveal"
import { useI18n } from "@/lib/i18n-context"
import { Sparkles } from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData }

export function SectionIdea({ project }: Props) {
    const { t } = useI18n()
    const data = project.sections.idea
    if (!data) return null

    return (
        <section className="py-28 px-8 md:px-16 max-w-6xl mx-auto w-full
                        border-t border-[var(--color-border-subtle)]">

            <SectionReveal className="flex items-center gap-2 mb-12">
                <Sparkles size={13} className="text-[var(--color-accent)]" />
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                    {t.project.sections.idea}
                </span>
            </SectionReveal>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                <SectionReveal delay={0.04}>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em]
                         leading-tight text-[var(--color-text-primary)]">
                        {data.headline}
                    </h2>
                </SectionReveal>

                <SectionReveal delay={0.08}>
                    <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                        {data.body}
                    </p>
                </SectionReveal>
            </div>
        </section>
    )
}