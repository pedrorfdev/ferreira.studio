// components/project/sections/section-result.tsx
// ============================================================
// Redesign: métricas em cards grandes com accent,
// corpo de texto + link de volta ao topo
// ============================================================

import { SectionReveal } from "@/components/project/section-reveal"
import { useI18n } from "@/lib/i18n-context"
import { TrendingUp, ExternalLink, GitBranch } from "lucide-react"
import { cn } from "@/lib/cn"
import type { ProjectData } from "@/types/project"

export function SectionResult({ project }: { project: ProjectData }) {
    const { t } = useI18n()
    const data = project.sections.result
    if (!data) return null

    return (
        <section className="py-28 px-8 md:px-16 max-w-6xl mx-auto w-full
                        border-t border-(--color-border-subtle)">

            <SectionReveal className="flex items-center gap-2 mb-4">
                <TrendingUp size={13} className="text-(--color-accent)" />
                <span className="text-xs uppercase tracking-[0.18em] text-(--color-accent)">
                    {t.project.sections.result}
                </span>
            </SectionReveal>

            <SectionReveal delay={0.04}>
                <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-[-0.02em]
                       leading-tight text-(--color-text-primary) mb-12 max-w-2xl">
                    {data.headline}
                </h2>
            </SectionReveal>

            {/* Métricas — cards grandes */}
            {data.metrics && data.metrics.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                    {data.metrics.map((metric, i) => (
                        <SectionReveal key={i} delay={i * 0.07}>
                            <div className={cn(
                                "p-6 rounded-xl border h-full",
                                i === 0
                                    ? "bg-(--color-accent) border-(--color-accent)"
                                    : "bg-(--color-bg-secondary) border-(--color-border)"
                            )}>
                                <div className={cn(
                                    "font-display text-4xl font-bold tracking-[-0.02em] mb-2",
                                    i === 0 ? "text-white" : "text-(--color-text-primary)"
                                )}>
                                    {metric.value}
                                </div>
                                <div className={cn(
                                    "text-xs uppercase tracking-[0.12em]",
                                    i === 0 ? "text-white/70" : "text-(--color-text-tertiary)"
                                )}>
                                    {metric.label}
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-12 items-start">
                <SectionReveal delay={0.1}>
                    <p className="text-base text-(--color-text-secondary) leading-relaxed">
                        {data.body}
                    </p>
                </SectionReveal>

                {/* Links finais */}
                <SectionReveal delay={0.14}>
                    <div className="flex flex-col gap-3">
                        {project.links?.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 p-4 rounded-xl border border-(--color-border)
                           hover:border-(--color-accent) group transition-all duration-200">
                                <ExternalLink size={15} className="text-(--color-accent) shrink-0" />
                                <div>
                                    <div className="text-sm font-medium text-(--color-text-primary) group-hover:text-(--color-accent) transition-colors">
                                        View live demo
                                    </div>
                                    <div className="text-xs text-(--color-text-tertiary) truncate">
                                        {project.links.demo}
                                    </div>
                                </div>
                            </a>
                        )}
                        {project.links?.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 p-4 rounded-xl border border-(--color-border)
                           hover:border-(--color-border-strong) group transition-all duration-200">
                                <GitBranch size={15} className="text-(--color-text-tertiary) shrink-0" />
                                <div>
                                    <div className="text-sm font-medium text-(--color-text-primary) transition-colors">
                                        View source
                                    </div>
                                    <div className="text-xs text-(--color-text-tertiary) truncate">
                                        {project.links.github}
                                    </div>
                                </div>
                            </a>
                        )}
                    </div>
                </SectionReveal>
            </div>
        </section>
    )
}