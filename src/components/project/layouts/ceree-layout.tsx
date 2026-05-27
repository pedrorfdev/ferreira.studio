// components/project/layouts/ceree-layout.tsx
// Layout editorial lento: tipografia grande, ouro, espaço generoso
import { useProjectContent } from "@/hooks/use-project-content"
import { SectionReveal } from "@/components/project/section-reveal"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/cn"
import { Sparkles, Heart, Lock, Star } from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData; scrollY: number }
const LIST_ICONS = [Sparkles, Heart, Lock, Star, Sparkles]

export function CereeLayout({ project }: Props) {
    const { t } = useI18n()
    const content = useProjectContent(project)
    const items = content.sections.solution?.items ?? []
    const decisions = content.sections.technicalDecisions?.decisions ?? []

    return (
        <div className="flex flex-col">
            {/* HERO — editorial, slow */}
            <section className="min-h-screen flex flex-col justify-center px-8 md:px-20 relative">
                <div className="absolute inset-0">
                    {project.media?.src
                        ? <img src={project.media.src} alt="" className="w-full h-full object-cover opacity-15" loading="lazy" decoding="async" />
                        : <MediaPlaceholder variant="bg" aspect="" className="w-full h-full opacity-10" />
                    }
                    <div className="absolute inset-0 bg-linear-to-b from-(--color-bg-primary)/50 via-transparent to-(--color-bg-primary)" />
                </div>
                <div className="relative z-10 max-w-3xl">
                    <SectionReveal>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-(--color-gold) mb-10">
                            Private Events · {project.year}
                        </p>
                    </SectionReveal>
                    <SectionReveal delay={0.1}>
                        <h1 className="font-display font-light tracking-[-0.02em] leading-none mb-8"
                            style={{ fontSize: "clamp(4.5rem, 12vw, 10rem)" }}>
                            <span className="text-(--color-gold)">C</span>
                            <span className="text-(--color-text-primary)">erée</span>
                        </h1>
                    </SectionReveal>
                    <SectionReveal delay={0.16}>
                        <p className="text-base md:text-lg text-(--color-text-secondary) max-w-md leading-relaxed font-light">
                            {content.tagline}
                        </p>
                    </SectionReveal>
                </div>
            </section>

            {/* HERO IMAGE */}
            <SectionReveal className="px-8 md:px-20 mb-28">
                <div className="rounded-2xl overflow-hidden border border-(--color-gold)/20 shadow-2xl">
                    {project.heroVideo
                        ? <video src={project.heroVideo} autoPlay muted loop playsInline poster={project.heroImage} className="w-full aspect-video object-cover" />
                        : project.heroImage
                            ? <img src={project.heroImage} alt={project.title} className="w-full aspect-video object-cover" loading="lazy" />
                            : <MediaPlaceholder variant="hero" aspect="aspect-video" label="Cerée — Private Event Experience" />
                    }
                </div>
            </SectionReveal>

            {/* PROBLEMA | IDEIA — editorial side by side */}
            <section className="px-8 md:px-20 mb-28 max-w-5xl mx-auto w-full">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    <SectionReveal>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-(--color-text-tertiary) mb-5">
                            {t.project.sections.problem}
                        </p>
                        <h2 className="font-display text-2xl md:text-3xl font-light tracking-[-0.02em] leading-tight text-(--color-text-primary) mb-5">
                            {content.sections.problem?.headline}
                        </h2>
                        <p className="text-sm text-(--color-text-secondary) leading-relaxed font-light">
                            {content.sections.problem?.body}
                        </p>
                    </SectionReveal>
                    <SectionReveal delay={0.1}>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-(--color-gold) mb-5">
                            {t.project.sections.idea}
                        </p>
                        <h2 className="font-display text-2xl md:text-3xl font-light tracking-[-0.02em] leading-tight text-(--color-text-primary) mb-5">
                            {content.sections.idea?.headline}
                        </h2>
                        <p className="text-sm text-(--color-text-secondary) leading-relaxed font-light">
                            {content.sections.idea?.body}
                        </p>
                    </SectionReveal>
                </div>
            </section>

            {/* ANÁLISE — blockquote editorial */}
            <section className="px-8 md:px-20 mb-28 max-w-4xl mx-auto w-full border-t border-(--color-border-subtle) pt-24">
                <SectionReveal>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-(--color-text-tertiary) mb-8">
                        {t.project.sections.analysis}
                    </p>
                </SectionReveal>
                <SectionReveal delay={0.08}>
                    <blockquote className="font-display text-2xl md:text-4xl font-light tracking-[-0.02em] leading-snug
                                 text-(--color-text-primary) border-l-2 border-(--color-gold) pl-8 mb-8">
                        {content.sections.analysis?.headline}
                    </blockquote>
                </SectionReveal>
                <SectionReveal delay={0.14}>
                    <p className="text-sm md:text-base text-(--color-text-secondary) leading-relaxed font-light max-w-2xl">
                        {content.sections.analysis?.body}
                    </p>
                </SectionReveal>
            </section>

            {/* SOLUÇÃO — lista elegante */}
            <section className="px-8 md:px-20 mb-28 max-w-4xl mx-auto w-full border-t border-(--color-border-subtle) pt-24">
                <SectionReveal className="mb-12">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-(--color-text-tertiary) mb-4">
                        {t.project.sections.solution}
                    </p>
                    <h2 className="font-display text-3xl font-light tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.solution?.headline}
                    </h2>
                </SectionReveal>
                <div className="flex flex-col divide-y divide-(--color-border-subtle)">
                    {items.map((item, i) => {
                        const Icon = LIST_ICONS[i % LIST_ICONS.length]
                        return (
                            <SectionReveal key={i} delay={i * 0.07}>
                                <div className="flex items-center gap-5 py-5">
                                    <Icon size={13} className="text-(--color-gold) shrink-0" />
                                    <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">{item}</p>
                                </div>
                            </SectionReveal>
                        )
                    })}
                </div>
            </section>

            {/* DECISÕES + RESULTADO — grid gold cards */}
            <section className="px-8 md:px-20 mb-28 max-w-4xl mx-auto w-full border-t border-(--color-border-subtle) pt-24">
                <SectionReveal className="mb-10">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-(--color-text-tertiary) mb-4">
                        {t.project.sections.technical}
                    </p>
                    <h2 className="font-display text-3xl font-light tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.technicalDecisions?.headline}
                    </h2>
                </SectionReveal>
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                    {decisions.map((dec, i) => (
                        <SectionReveal key={i} delay={i * 0.08}>
                            <div className={cn("p-6 md:p-7 rounded-2xl border h-full",
                                i === 0
                                    ? "border-(--color-gold)/40 bg-(--color-gold-muted)"
                                    : "border-(--color-border) bg-(--color-bg-secondary)")}>
                                <h3 className={cn("font-display text-base md:text-lg font-medium mb-3",
                                    i === 0 ? "text-(--color-gold)" : "text-(--color-text-primary)")}>
                                    {dec.title}
                                </h3>
                                <p className="text-sm text-(--color-text-secondary) leading-relaxed mb-3">{dec.why}</p>
                                {dec.trade && (
                                    <p className="text-xs text-(--color-text-tertiary) italic">{dec.trade}</p>
                                )}
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </section>

            {/* RESULTADO */}
            <section className="px-8 md:px-20 max-w-4xl mx-auto w-full border-t border-(--color-border-subtle) pt-24">
                <SectionReveal>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-(--color-gold) mb-6">
                        {t.project.sections.result}
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl font-light tracking-[-0.02em] text-(--color-text-primary) mb-8">
                        {content.sections.result?.headline}
                    </h2>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {content.sections.result?.metrics?.map((m, i) => (
                            <div key={i} className={cn("p-5 rounded-xl text-center border",
                                i === 0
                                    ? "border-(--color-gold)/40 bg-(--color-gold-muted)"
                                    : "border-(--color-border) bg-(--color-bg-secondary)")}>
                                <div className={cn("font-display text-2xl font-semibold mb-1",
                                    i === 0 ? "text-(--color-gold)" : "text-(--color-text-primary)")}>
                                    {m.value}
                                </div>
                                <div className="text-[10px] uppercase tracking-widest text-(--color-text-tertiary)">
                                    {m.label}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm md:text-base text-(--color-text-secondary) leading-relaxed font-light max-w-2xl">
                        {content.sections.result?.body}
                    </p>
                </SectionReveal>
            </section>
        </div>
    )
}