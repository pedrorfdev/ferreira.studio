// components/project/layouts/pulso-layout.tsx
// Layout energético: cards em masonry, progresso visual, vermelho+magenta
import { useProjectContent } from "@/hooks/use-project-content"
import { SectionReveal } from "@/components/project/section-reveal"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/cn"
import { Radio, Users, Calendar, DollarSign, Bell, Zap, GitBranch } from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData; scrollY: number }

const ITEM_ICONS = [Calendar, Users, Radio, DollarSign, Bell]

export function PulsoLayout({ project }: Props) {
    const { t } = useI18n()
    const content = useProjectContent(project)
    const items = content.sections.solution?.items ?? []
    const decisions = content.sections.technicalDecisions?.decisions ?? []

    return (
        <div className="flex flex-col">
            {/* HERO — energético */}
            <section className="min-h-[80vh] flex flex-col justify-end px-8 md:px-16 pb-16 relative overflow-hidden">
                {/* Animated orbs */}
                <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-(--color-accent)/8 blur-3xl pointer-events-none" />
                <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-(--color-gold)/8 blur-2xl pointer-events-none" />
                <div className="absolute inset-0">
                    <MediaPlaceholder variant="bg" aspect="" className="w-full h-full opacity-15" />
                    <div className="absolute inset-0 bg-linear-to-t from-(--color-bg-primary) to-transparent" />
                </div>

                <div className="relative z-10 max-w-5xl">
                    <SectionReveal>
                        <div className="flex items-center gap-2 mb-6">
                            <Radio size={12} className="text-(--color-accent)" />
                            <span className="text-xs uppercase tracking-[0.18em] text-(--color-accent)">
                                Operations · {project.year}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent) animate-pulse" />
                        </div>
                    </SectionReveal>
                    <SectionReveal delay={0.06}>
                        <h1 className="font-display font-bold tracking-[-0.03em] leading-none mb-4"
                            style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>
                            <span className="text-(--color-accent)">Pul</span>
                            <span className="text-(--color-text-primary)">so</span>
                        </h1>
                    </SectionReveal>
                    <SectionReveal delay={0.1}>
                        <p className="text-xl text-(--color-text-secondary) max-w-xl leading-relaxed mb-8">
                            {content.tagline}
                        </p>
                    </SectionReveal>
                    {project.links?.github && (
                        <SectionReveal delay={0.14}>
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
                border border-(--color-border) text-(--color-text-secondary)
                hover:border-(--color-accent) transition-colors">
                                <GitBranch size={12} /> GitHub
                            </a>
                        </SectionReveal>
                    )}
                </div>
            </section>

            {/* HERO IMAGE */}
            <SectionReveal className="px-8 md:px-16 mb-24">
                <div className="rounded-xl overflow-hidden border border-(--color-border-subtle)">
                    {project.heroImage
                        ? <img src={project.heroImage} alt={project.title} className="w-full aspect-video object-cover" />
                        : <MediaPlaceholder variant="hero" aspect="aspect-video" label="Pulso — Team Operations" />
                    }
                </div>
            </SectionReveal>

            {/* PROBLEM */}
            <section className="px-8 md:px-16 mb-28 max-w-6xl mx-auto w-full">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <SectionReveal>
                        <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) block mb-4">
                            {t.project.sections.problem}
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em]
                           text-(--color-text-primary) leading-tight">
                            {content.sections.problem?.headline}
                        </h2>
                    </SectionReveal>
                    <SectionReveal delay={0.08}>
                        <p className="text-base text-(--color-text-secondary) leading-relaxed">
                            {content.sections.problem?.body}
                        </p>
                    </SectionReveal>
                </div>
            </section>

            {/* SOLUTION — masonry cards */}
            <section className="px-8 md:px-16 mb-28 max-w-6xl mx-auto w-full
                          border-t border-(--color-border-subtle) pt-24">
                <SectionReveal className="mb-10">
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) block mb-3">
                        {t.project.sections.solution}
                    </span>
                    <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.solution?.headline}
                    </h2>
                </SectionReveal>

                {/* Grid irregular */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {items.map((item, i) => {
                        const Icon = ITEM_ICONS[i % ITEM_ICONS.length]
                        const isWide = i === 0 || i === 3
                        return (
                            <SectionReveal key={i} delay={i * 0.06}
                                className={cn(isWide && "col-span-2 md:col-span-2")}>
                                <div className={cn(
                                    "p-5 rounded-xl border h-full flex flex-col gap-3",
                                    i === 0
                                        ? "bg-(--color-accent) border-(--color-accent) min-h-[120px]"
                                        : "bg-(--color-bg-secondary) border-(--color-border) hover:border-(--color-accent)/40 transition-colors"
                                )}>
                                    <Icon size={16} className={i === 0 ? "text-white" : "text-(--color-accent)"} />
                                    <p className={cn("text-sm leading-relaxed",
                                        i === 0 ? "text-white/90" : "text-(--color-text-secondary)")}>
                                        {item}
                                    </p>
                                </div>
                            </SectionReveal>
                        )
                    })}
                </div>
            </section>

            {/* TECHNICAL — lista simples com highlight */}
            <section className="px-8 md:px-16 mb-28 max-w-6xl mx-auto w-full
                          border-t border-(--color-border-subtle) pt-24">
                <SectionReveal className="mb-10">
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) block mb-3">
                        {t.project.sections.technical}
                    </span>
                    <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.technicalDecisions?.headline}
                    </h2>
                </SectionReveal>
                <div className="flex flex-col gap-4">
                    {decisions.map((dec, i) => (
                        <SectionReveal key={i} delay={i * 0.08}>
                            <div className="flex gap-6 p-5 rounded-xl bg-(--color-bg-secondary) border border-(--color-border)">
                                <div className="flex flex-col items-center gap-2 shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-(--color-accent-muted) flex items-center justify-center">
                                        <Zap size={12} className="text-(--color-accent)" />
                                    </div>
                                    {i < decisions.length - 1 && <div className="w-px flex-1 bg-(--color-border-subtle)" />}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-display text-base font-semibold text-(--color-text-primary) mb-2">
                                        {dec.title}
                                    </h3>
                                    <p className="text-sm text-(--color-text-secondary) leading-relaxed">{dec.why}</p>
                                    {dec.trade && (
                                        <p className="text-xs text-(--color-text-tertiary) mt-2 italic">{dec.trade}</p>
                                    )}
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </section>

            {/* RESULT */}
            <section className="px-8 md:px-16 max-w-6xl mx-auto w-full
                          border-t border-(--color-border-subtle) pt-24">
                <SectionReveal>
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-accent) block mb-4">
                        {t.project.sections.result}
                    </span>
                    <h2 className="font-display text-4xl font-semibold tracking-[-0.02em]
                         text-(--color-text-primary) mb-8">
                        {content.sections.result?.headline}
                    </h2>
                    <p className="text-base text-(--color-text-secondary) leading-relaxed max-w-2xl">
                        {content.sections.result?.body}
                    </p>
                </SectionReveal>
            </section>
        </div>
    )
}