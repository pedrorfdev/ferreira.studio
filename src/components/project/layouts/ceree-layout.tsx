// components/project/layouts/ceree-layout.tsx
// Layout editorial lento: tipografia grande, espaço negativo, gold accents
import { useProjectContent } from "@/hooks/use-project-content"
import { SectionReveal } from "@/components/project/section-reveal"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/cn"
import { Sparkles, Heart, Lock } from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData; scrollY: number }

export function CereeLayout({ project }: Props) {
    const { t } = useI18n()
    const content = useProjectContent(project)
    const items = content.sections.solution?.items ?? []
    const decisions = content.sections.technicalDecisions?.decisions ?? []
    const ICONS = [Sparkles, Heart, Lock, Sparkles, Heart]

    return (
        <div className="flex flex-col">
            {/* HERO — editorial, slow, muito espaço */}
            <section className="min-h-screen flex flex-col justify-center px-8 md:px-20 relative">
                <div className="absolute inset-0">
                    <MediaPlaceholder variant="bg" aspect="" className="w-full h-full opacity-15" />
                    <div className="absolute inset-0 bg-linear-to-b from-(--color-bg-primary)/50 via-transparent to-(--color-bg-primary)" />
                </div>
                <div className="relative z-10 max-w-3xl">
                    <SectionReveal>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-(--color-gold) mb-12">
                            Private Events · {project.year}
                        </p>
                    </SectionReveal>
                    <SectionReveal delay={0.1}>
                        <h1 className="font-display font-light tracking-[-0.02em] leading-none mb-8"
                            style={{ fontSize: "clamp(5rem, 12vw, 10rem)" }}>
                            <span className="text-(--color-gold)">C</span>
                            <span className="text-(--color-text-primary)">erée</span>
                        </h1>
                    </SectionReveal>
                    <SectionReveal delay={0.16}>
                        <p className="text-lg text-(--color-text-secondary) max-w-md leading-relaxed font-light">
                            {content.tagline}
                        </p>
                    </SectionReveal>
                </div>
            </section>

            {/* HERO IMAGE */}
            <SectionReveal className="px-8 md:px-20 mb-32">
                <div className="rounded-2xl overflow-hidden">
                    {project.heroImage
                        ? <img src={project.heroImage} alt={project.title} className="w-full aspect-video object-cover" />
                        : <MediaPlaceholder variant="hero" aspect="aspect-video" label="Cerée — Private Event Experience" />
                    }
                </div>
            </SectionReveal>

            {/* PROBLEM — tipografia editorial grande */}
            <section className="px-8 md:px-20 mb-36 max-w-4xl mx-auto w-full">
                <SectionReveal>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-(--color-text-tertiary) mb-8">
                        {t.project.sections.problem}
                    </p>
                </SectionReveal>
                <SectionReveal delay={0.08}>
                    <h2 className="font-display text-4xl md:text-6xl font-light tracking-[-0.02em]
                         leading-tight text-(--color-text-primary) mb-10">
                        {content.sections.problem?.headline}
                    </h2>
                </SectionReveal>
                <SectionReveal delay={0.14}>
                    <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light max-w-2xl">
                        {content.sections.problem?.body}
                    </p>
                </SectionReveal>
            </section>

            {/* SOLUTION — lista elegante com gold */}
            <section className="px-8 md:px-20 mb-36 max-w-4xl mx-auto w-full
                          border-t border-(--color-border-subtle) pt-28">
                <SectionReveal className="mb-14">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-(--color-text-tertiary) mb-4">
                        {t.project.sections.solution}
                    </p>
                    <h2 className="font-display text-4xl font-light tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.solution?.headline}
                    </h2>
                </SectionReveal>
                <div className="flex flex-col divide-y divide-(--color-border-subtle)">
                    {items.map((item, i) => {
                        const Icon = ICONS[i % ICONS.length]
                        return (
                            <SectionReveal key={i} delay={i * 0.07}>
                                <div className="flex items-center gap-6 py-5">
                                    <Icon size={14} className="text-(--color-gold) shrink-0" />
                                    <p className="text-base text-(--color-text-secondary) font-light leading-relaxed">
                                        {item}
                                    </p>
                                </div>
                            </SectionReveal>
                        )
                    })}
                </div>
            </section>

            {/* TECHNICAL — cards limpos sem excesso */}
            <section className="px-8 md:px-20 mb-36 max-w-4xl mx-auto w-full
                          border-t border-(--color-border-subtle) pt-28">
                <SectionReveal className="mb-12">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-(--color-text-tertiary) mb-4">
                        {t.project.sections.technical}
                    </p>
                    <h2 className="font-display text-3xl font-light tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.technicalDecisions?.headline}
                    </h2>
                </SectionReveal>
                <div className="grid md:grid-cols-2 gap-4">
                    {decisions.map((dec, i) => (
                        <SectionReveal key={i} delay={i * 0.08}>
                            <div className={cn(
                                "p-7 rounded-2xl border h-full",
                                i === 0
                                    ? "border-(--color-gold)/40 bg-(--color-gold-muted)"
                                    : "border-(--color-border) bg-(--color-bg-secondary)"
                            )}>
                                <h3 className={cn("font-display text-lg font-medium mb-3",
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

            {/* RESULT */}
            <section className="px-8 md:px-20 max-w-4xl mx-auto w-full
                          border-t border-(--color-border-subtle) pt-28">
                <SectionReveal>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-(--color-gold) mb-6">
                        {t.project.sections.result}
                    </p>
                    <h2 className="font-display text-4xl font-light tracking-[-0.02em]
                         text-(--color-text-primary) mb-8">
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
                    <p className="text-base text-(--color-text-secondary) leading-relaxed font-light max-w-2xl">
                        {content.sections.result?.body}
                    </p>
                </SectionReveal>
            </section>
        </div>
    )
}