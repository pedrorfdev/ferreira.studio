// components/project/sections/section-analysis.tsx

import { SectionReveal } from "@/components/project/section-reveal"
import { useI18n } from "@/lib/i18n-context"
import { Lightbulb } from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData }

export function SectionAnalysis({ project }: Props) {
    const { t } = useI18n()
    const data = project.sections.analysis
    if (!data) return null

    return (
        <section className="py-28 px-8 md:px-16 max-w-6xl mx-auto w-full
                        border-t border-[var(--color-border-subtle)]">
            <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">

                <SectionReveal className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Lightbulb size={13} className="text-[var(--color-gold)]" />
                        <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                            {t.project.sections.analysis}
                        </span>
                    </div>
                    <div className="font-display text-[9rem] font-bold leading-none
                          text-[var(--color-gold)]/10 select-none mt-4" aria-hidden>
                        03
                    </div>
                </SectionReveal>

                <div className="flex flex-col gap-8">
                    <SectionReveal>
                        {/* Quote editorial com borda gold */}
                        <blockquote className="font-display text-2xl md:text-3xl font-medium
                                   tracking-[-0.02em] leading-snug
                                   text-[var(--color-text-primary)]
                                   border-l-2 border-[var(--color-gold)] pl-6">
                            {data.headline}
                        </blockquote>
                    </SectionReveal>

                    <SectionReveal delay={0.08}>
                        <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                            {data.body}
                        </p>
                    </SectionReveal>
                </div>
            </div>
        </section>
    )
}