// components/project/sections/section-solution.tsx
// ============================================================
// Redesign: grid de feature cards com ícones Lucide,
// alternando card com fundo accent e sem fundo
// ============================================================

import { SectionReveal } from "@/components/project/section-reveal"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/cn"
import {
    Layers, Zap, Shield, BarChart3,
    Globe, Database, Smartphone, Star
} from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData }

// Ícones ciclados pelos items da solução
const ICONS = [Layers, Zap, Shield, BarChart3, Globe, Database, Smartphone, Star]

export function SectionSolution({ project }: Props) {
    const { t } = useI18n()
    const data = project.sections.solution
    if (!data) return null

    return (
        <section className="py-28 px-8 md:px-16 max-w-6xl mx-auto w-full
                        border-t border-[var(--color-border-subtle)]">

            {/* Header */}
            <SectionReveal className="flex items-center gap-2 mb-4">
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                    {t.project.sections.solution}
                </span>
            </SectionReveal>

            <div className="grid md:grid-cols-2 gap-16 mb-16">
                <SectionReveal delay={0.04}>
                    <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-[-0.02em]
                         leading-tight text-[var(--color-text-primary)]">
                        {data.headline}
                    </h2>
                </SectionReveal>
                <SectionReveal delay={0.08}>
                    <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mt-2">
                        {data.body}
                    </p>
                </SectionReveal>
            </div>

            {/* Feature cards grid */}
            {data.items && data.items.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.items.map((item, i) => {
                        const Icon = ICONS[i % ICONS.length]
                        // Card com fundo accent no primeiro e em alternados
                        const isAccent = i === 0

                        return (
                            <SectionReveal key={i} delay={i * 0.06}>
                                <div className={cn(
                                    "p-5 rounded-xl border h-full flex flex-col gap-4",
                                    "transition-colors duration-300",
                                    isAccent
                                        ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white"
                                        : "bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
                                )}>
                                    {/* Icon */}
                                    <div className={cn(
                                        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                                        isAccent
                                            ? "bg-white/20"
                                            : "bg-[var(--color-accent-muted)]"
                                    )}>
                                        <Icon size={16} className={isAccent ? "text-white" : "text-[var(--color-accent)]"} />
                                    </div>

                                    {/* Text */}
                                    <p className={cn(
                                        "text-sm leading-relaxed",
                                        isAccent ? "text-white/90" : "text-[var(--color-text-secondary)]"
                                    )}>
                                        {item}
                                    </p>
                                </div>
                            </SectionReveal>
                        )
                    })}
                </div>
            )}
        </section>
    )
}