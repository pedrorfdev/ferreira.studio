// components/project/layouts/pulso-layout.tsx
// Layout energético: Hero → Problema|Ideia → Análise highlight
//                    → Solução masonry → Decisões conectadas → Resultado
import { useProjectContent } from "@/hooks/use-project-content"
import { SectionReveal } from "@/components/project/section-reveal"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/cn"
import {
    Radio, Users, Calendar, DollarSign, Bell,
    AlertTriangle, Lightbulb, Zap, TrendingUp,
    GitBranch
} from "lucide-react"
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
            {/* HERO — energético, pulse dot */}
            <section className="min-h-[80vh] flex flex-col justify-end px-6 md:px-16 pb-16 relative overflow-hidden">
                <div className="absolute top-24 left-1/3 w-80 h-80 rounded-full bg-(--color-accent)/6 blur-3xl pointer-events-none" />
                <div className="absolute bottom-20 right-1/4 w-56 h-56 rounded-full bg-(--color-gold)/6 blur-2xl pointer-events-none" />
                <div className="absolute inset-0">
                    {project.media?.src
                        ? <img src={project.media.src} alt="" className="w-full h-full object-cover opacity-15" loading="lazy" decoding="async" />
                        : <MediaPlaceholder variant="bg" aspect="" className="w-full h-full opacity-10" />
                    }
                    <div className="absolute inset-0 bg-linear-to-t from-(--color-bg-primary) to-transparent" />
                </div>
                <div className="relative z-10 max-w-5xl">
                    <SectionReveal>
                        <div className="flex items-center gap-2 mb-5">
                            <Radio size={12} className="text-(--color-accent)" />
                            <span className="text-xs uppercase tracking-[0.18em] text-(--color-accent)">
                                Operations · {project.year}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent) animate-pulse ml-1" />
                        </div>
                    </SectionReveal>
                    <SectionReveal delay={0.06}>
                        <h1 className="font-display font-bold tracking-[-0.03em] leading-none mb-4"
                            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}>
                            <span className="text-(--color-accent)">Pul</span>
                            <span className="text-(--color-text-primary)">so</span>
                        </h1>
                    </SectionReveal>
                    <SectionReveal delay={0.1}>
                        <p className="text-lg text-(--color-text-secondary) max-w-xl leading-relaxed mb-8">
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
            <SectionReveal className="px-6 md:px-16 mb-20">
                <div className="rounded-xl overflow-hidden border border-(--color-border-subtle) shadow-2xl">
                    {project.heroVideo
                        ? <video src={project.heroVideo} autoPlay muted loop playsInline poster={project.heroImage} className="w-full aspect-video object-cover" />
                        : project.heroImage
                            ? <img src={project.heroImage} alt={project.title} className="w-full aspect-video object-cover" loading="lazy" />
                            : <MediaPlaceholder variant="hero" aspect="aspect-video" label="Pulso — Team Operations" />
                    }
                </div>
            </SectionReveal>

            {/* PROBLEMA | IDEIA — lado a lado */}
            <section className="px-6 md:px-16 mb-16 max-w-6xl mx-auto w-full">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <SectionReveal>
                        <div className="p-6 md:p-8 rounded-2xl bg-(--color-bg-secondary) border border-(--color-border) h-full flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-(--color-accent-muted) flex items-center justify-center shrink-0">
                                    <AlertTriangle size={14} className="text-(--color-accent)" />
                                </div>
                                <span className="text-xs uppercase tracking-[0.16em] text-(--color-accent)">
                                    {t.project.sections.problem}
                                </span>
                            </div>
                            <h2 className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em] text-(--color-text-primary) leading-snug">
                                {content.sections.problem?.headline}
                            </h2>
                            <p className="text-sm text-(--color-text-secondary) leading-relaxed flex-1">
                                {content.sections.problem?.body}
                            </p>
                        </div>
                    </SectionReveal>
                    <SectionReveal delay={0.08}>
                        <div className="p-6 md:p-8 rounded-2xl bg-(--color-bg-secondary) border border-(--color-border) h-full flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-(--color-gold-muted) flex items-center justify-center shrink-0">
                                    <Lightbulb size={14} className="text-(--color-gold)" />
                                </div>
                                <span className="text-xs uppercase tracking-[0.16em] text-(--color-gold)">
                                    {t.project.sections.idea}
                                </span>
                            </div>
                            <h2 className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em] text-(--color-text-primary) leading-snug">
                                {content.sections.idea?.headline}
                            </h2>
                            <p className="text-sm text-(--color-text-secondary) leading-relaxed flex-1">
                                {content.sections.idea?.body}
                            </p>
                        </div>
                    </SectionReveal>
                </div>
            </section>

            {/* ANÁLISE — banner vermelho */}
            <section className="px-6 md:px-16 mb-16 max-w-6xl mx-auto w-full">
                <SectionReveal>
                    <div className="p-6 md:p-8 rounded-2xl bg-(--color-accent) flex flex-col md:flex-row gap-5 md:gap-8 items-start">
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                                <Zap size={16} className="text-white" />
                            </div>
                            <span className="text-xs uppercase tracking-[0.16em] text-white/80 md:hidden">
                                {t.project.sections.analysis}
                            </span>
                        </div>
                        <div>
                            <span className="text-xs uppercase tracking-[0.16em] text-white/80 hidden md:block mb-2">
                                {t.project.sections.analysis}
                            </span>
                            <h2 className="font-display text-lg md:text-2xl font-semibold text-white leading-snug mb-3">
                                {content.sections.analysis?.headline}
                            </h2>
                            <p className="text-sm text-white/80 leading-relaxed">
                                {content.sections.analysis?.body}
                            </p>
                        </div>
                    </div>
                </SectionReveal>
            </section>

            {/* SOLUÇÃO — masonry grid irregular */}
            <section className="px-6 md:px-16 mb-20 max-w-6xl mx-auto w-full border-t border-(--color-border-subtle) pt-16">
                <SectionReveal className="mb-8">
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) block mb-2">
                        {t.project.sections.solution}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.solution?.headline}
                    </h2>
                </SectionReveal>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {items.map((item, i) => {
                        const Icon = ITEM_ICONS[i % ITEM_ICONS.length]
                        const isWide = i === 0 || i === 3
                        return (
                            <SectionReveal key={i} delay={i * 0.06}
                                className={cn(isWide && "col-span-2 md:col-span-2")}>
                                <div className={cn(
                                    "p-5 rounded-xl border h-full flex flex-col gap-3 transition-colors",
                                    i === 0
                                        ? "bg-(--color-accent) border-(--color-accent) min-h-[110px]"
                                        : "bg-(--color-bg-secondary) border-(--color-border) hover:border-(--color-accent)/40"
                                )}>
                                    <Icon size={15} className={i === 0 ? "text-white" : "text-(--color-accent)"} />
                                    <p className={cn("text-sm leading-relaxed",
                                        i === 0 ? "text-white" : "text-(--color-text-secondary)")}>{item}</p>
                                </div>
                            </SectionReveal>
                        )
                    })}
                </div>
            </section>

            {/* DECISÕES — connected list com linha vertical */}
            <section className="px-6 md:px-16 mb-20 max-w-6xl mx-auto w-full border-t border-(--color-border-subtle) pt-16">
                <SectionReveal className="mb-8">
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) block mb-2">
                        {t.project.sections.technical}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.technicalDecisions?.headline}
                    </h2>
                </SectionReveal>
                <div className="flex flex-col gap-4">
                    {decisions.map((dec, i) => (
                        <SectionReveal key={i} delay={i * 0.08}>
                            <div className="flex gap-5 p-5 md:p-6 rounded-xl bg-(--color-bg-secondary) border border-(--color-border)">
                                <div className="flex flex-col items-center gap-2 shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-(--color-accent-muted) flex items-center justify-center">
                                        <Zap size={12} className="text-(--color-accent)" />
                                    </div>
                                    {i < decisions.length - 1 && (
                                        <div className="w-px flex-1 bg-(--color-border-subtle) min-h-[16px]" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-display text-base font-semibold text-(--color-text-primary) mb-2">
                                        {dec.title}
                                    </h3>
                                    <p className="text-sm text-(--color-text-secondary) leading-relaxed">{dec.why}</p>
                                    {dec.trade && (
                                        <p className="text-xs text-(--color-text-tertiary) mt-2 italic">↳ {dec.trade}</p>
                                    )}
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </section>

            {/* RESULTADO */}
            <section className="px-6 md:px-16 max-w-6xl mx-auto w-full border-t border-(--color-border-subtle) pt-16">
                <SectionReveal>
                    <div className="flex items-center gap-2 mb-5">
                        <TrendingUp size={14} className="text-(--color-accent)" />
                        <span className="text-xs uppercase tracking-[0.18em] text-(--color-accent)">
                            {t.project.sections.result}
                        </span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em]
                         text-(--color-text-primary) mb-6">
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