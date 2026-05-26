// components/project/sections/section-problem.tsx
// ============================================================
// Redesign: número grande em accent, headline bold,
// dois cards visuais lado a lado ilustrando antes/depois
// ============================================================

import { SectionReveal } from "@/components/project/section-reveal"
import { AlertTriangle } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData }

export function SectionProblem({ project }: Props) {
    const { t } = useI18n()
    const data = project.sections.problem
    if (!data) return null

    return (
        <section className="py-28 px-8 md:px-16 max-w-6xl mx-auto w-full">
            <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">

                {/* Left — label + ícone */}
                <SectionReveal className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <AlertTriangle size={13} className="text-[var(--color-accent)]" />
                        <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
                            {t.project.sections.problem}
                        </span>
                    </div>

                    {/* Número decorativo grande */}
                    <div className="font-display text-[9rem] font-bold leading-none
                          text-[var(--color-accent)]/10 select-none mt-4"
                        aria-hidden>
                        01
                    </div>
                </SectionReveal>

                {/* Right — headline + body */}
                <div className="flex flex-col gap-8 pt-1">
                    <SectionReveal>
                        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-[-0.02em]
                           leading-tight text-[var(--color-text-primary)]">
                            {/* Underline accent na última palavra */}
                            {data.headline.split(" ").slice(0, -1).join(" ")}{" "}
                            <span className="relative inline-block">
                                <span className="relative z-10">{data.headline.split(" ").slice(-1)}</span>
                                <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-[var(--color-accent)]/30 rounded-full" />
                            </span>
                        </h2>
                    </SectionReveal>

                    <SectionReveal delay={0.08}>
                        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                            {data.body}
                        </p>
                    </SectionReveal>

                    {/* Pain points card */}
                    <SectionReveal delay={0.14}>
                        <div className="p-5 rounded-xl border border-[var(--color-accent)]/20
                            bg-[var(--color-accent-muted)] backdrop-blur-sm">
                            <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3">
                                Core friction
                            </p>
                            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed italic">
                                "{data.headline}"
                            </p>
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    )
}