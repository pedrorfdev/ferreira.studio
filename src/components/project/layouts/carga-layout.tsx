// components/project/layouts/carga-layout.tsx
// Layout: Hero → Problema|Ideia (lado a lado) → Timeline solução
//         → Análise highlight → Decisões dropdowns → Resultado
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useProjectContent } from "@/hooks/use-project-content"
import { SectionReveal } from "@/components/project/section-reveal"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/cn"
import {
    Truck, BarChart3, Wifi, Smartphone, Leaf,
    Sun, AlertTriangle, Sparkles, Lightbulb,
    ChevronDown, Github
} from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData; scrollY: number }
const TIMELINE_ICONS = [Truck, BarChart3, Wifi, Smartphone, Leaf]

export function CargaLayout({ project }: Props) {
    const { t } = useI18n()
    const content = useProjectContent(project)
    const [open, setOpen] = useState<number | null>(null)
    const decisions = content.sections.technicalDecisions?.decisions ?? []
    const items = content.sections.solution?.items ?? []

    return (
        <div className="flex flex-col">
            {/* HERO */}
            <section className="min-h-[80vh] flex flex-col justify-end px-6 md:px-16 pb-16 relative">
                <div className="absolute inset-0">
                    {project.media?.src
                        ? <img src={project.media.src} alt="" className="w-full h-full object-cover opacity-25" loading="lazy" decoding="async" />
                        : <MediaPlaceholder variant="bg" aspect="" className="w-full h-full opacity-20" />
                    }
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent" />
                </div>
                <div className="relative z-10 max-w-5xl">
                    <SectionReveal>
                        <div className="flex items-center gap-2 mb-5">
                            <Leaf size={12} className="text-[var(--color-accent)]" />
                            <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
                                Agro · {project.year}
                            </span>
                        </div>
                    </SectionReveal>
                    <SectionReveal delay={0.06}>
                        <h1 className="font-display font-bold tracking-[-0.03em] leading-none mb-4"
                            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}>
                            <span className="text-[var(--color-accent)]">C</span>
                            <span className="text-[var(--color-text-primary)]">arga</span>
                        </h1>
                    </SectionReveal>
                    <SectionReveal delay={0.1}>
                        <p className="text-lg text-[var(--color-text-secondary)] max-w-xl leading-relaxed mb-8">
                            {content.tagline}
                        </p>
                    </SectionReveal>
                    {project.links?.github && (
                        <SectionReveal delay={0.14}>
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] transition-colors">
                                <Github size={12} /> GitHub
                            </a>
                        </SectionReveal>
                    )}
                </div>
            </section>

            {/* HERO IMAGE */}
            <SectionReveal className="px-6 md:px-16 mb-20">
                <div className="rounded-xl overflow-hidden border border-[var(--color-border-subtle)] shadow-2xl">
                    {project.heroVideo
                        ? <video src={project.heroVideo} autoPlay muted loop playsInline poster={project.heroImage} className="w-full aspect-video object-cover" />
                        : project.heroImage
                            ? <img src={project.heroImage} alt={project.title} className="w-full aspect-video object-cover" loading="lazy" />
                            : <MediaPlaceholder variant="hero" aspect="aspect-video" label="Carga — Operations Dashboard" />
                    }
                </div>
            </SectionReveal>

            {/* PROBLEMA | IDEIA — lado a lado */}
            <section className="px-6 md:px-16 mb-16 max-w-6xl mx-auto w-full">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <SectionReveal>
                        <div className="p-6 md:p-8 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] h-full flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-muted)] flex items-center justify-center shrink-0">
                                    <AlertTriangle size={14} className="text-[var(--color-accent)]" />
                                </div>
                                <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
                                    {t.project.sections.problem}
                                </span>
                            </div>
                            <h2 className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] leading-snug">
                                {content.sections.problem?.headline}
                            </h2>
                            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
                                {content.sections.problem?.body}
                            </p>
                        </div>
                    </SectionReveal>
                    <SectionReveal delay={0.08}>
                        <div className="p-6 md:p-8 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] h-full flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-[var(--color-gold-muted)] flex items-center justify-center shrink-0">
                                    <Sun size={14} className="text-[var(--color-gold)]" />
                                </div>
                                <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]">
                                    {t.project.sections.idea}
                                </span>
                            </div>
                            <h2 className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] leading-snug">
                                {content.sections.idea?.headline}
                            </h2>
                            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
                                {content.sections.idea?.body}
                            </p>
                        </div>
                    </SectionReveal>
                </div>
            </section>

            {/* ANÁLISE — destaque horizontal */}
            <section className="px-6 md:px-16 mb-16 max-w-6xl mx-auto w-full">
                <SectionReveal>
                    <div className="p-6 md:p-8 rounded-2xl border border-[var(--color-gold)]/20 bg-[var(--color-gold-muted)] flex flex-col md:flex-row gap-5 md:gap-8 items-start">
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="w-9 h-9 rounded-xl bg-[var(--color-gold)] flex items-center justify-center">
                                <Lightbulb size={16} className="text-white" />
                            </div>
                            <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] md:hidden">
                                {t.project.sections.analysis}
                            </span>
                        </div>
                        <div>
                            <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] hidden md:block mb-2">
                                {t.project.sections.analysis}
                            </span>
                            <h2 className="font-display text-lg md:text-2xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] leading-snug mb-3">
                                {content.sections.analysis?.headline}
                            </h2>
                            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                {content.sections.analysis?.body}
                            </p>
                        </div>
                    </div>
                </SectionReveal>
            </section>

            {/* SOLUÇÃO — timeline vertical */}
            <section className="px-6 md:px-16 mb-20 max-w-4xl mx-auto w-full border-t border-[var(--color-border-subtle)] pt-16">
                <SectionReveal className="mb-10">
                    <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] block mb-2">
                        {t.project.sections.solution}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
                        {content.sections.solution?.headline}
                    </h2>
                </SectionReveal>
                <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--color-border)] hidden md:block" />
                    <div className="flex flex-col gap-6">
                        {items.map((item, i) => {
                            const Icon = TIMELINE_ICONS[i % TIMELINE_ICONS.length]
                            return (
                                <SectionReveal key={i} delay={i * 0.07}>
                                    <div className="flex items-start gap-5 md:gap-6">
                                        <div className={cn("w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 z-10 bg-[var(--color-bg-primary)]",
                                            i === 0 ? "border-[var(--color-accent)] bg-[var(--color-accent)]" : "border-[var(--color-border)]")}>
                                            <Icon size={14} className={i === 0 ? "text-white" : "text-[var(--color-accent)]"} />
                                        </div>
                                        <div className="pt-1.5">
                                            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item}</p>
                                        </div>
                                    </div>
                                </SectionReveal>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* DECISÕES — dropdowns */}
            <section className="px-6 md:px-16 mb-20 max-w-6xl mx-auto w-full border-t border-[var(--color-border-subtle)] pt-16">
                <SectionReveal className="mb-8">
                    <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] block mb-2">
                        {t.project.sections.technical}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
                        {content.sections.technicalDecisions?.headline}
                    </h2>
                </SectionReveal>
                <div className="flex flex-col gap-3">
                    {decisions.map((dec, i) => (
                        <SectionReveal key={i} delay={i * 0.07}>
                            <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
                                <button onClick={() => setOpen(open === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 cursor-pointer bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] transition-colors">
                                    <span className="font-display text-base font-semibold text-[var(--color-text-primary)] text-left">
                                        {dec.title}
                                    </span>
                                    <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                        <ChevronDown size={16} className="text-[var(--color-text-tertiary)] shrink-0" />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {open === i && (
                                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                                            transition={{ duration: 0.25, ease: "easeOut" }} className="overflow-hidden">
                                            <div className="px-5 pb-5 bg-[var(--color-bg-secondary)]">
                                                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">{dec.why}</p>
                                                {dec.trade && (
                                                    <div className="pt-3 border-t border-[var(--color-border-subtle)]">
                                                        <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-accent)] block mb-1">
                                                            {t.project.tradeoff}
                                                        </span>
                                                        <p className="text-xs text-[var(--color-text-tertiary)]">{dec.trade}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </section>

            {/* RESULTADO */}
            <section className="px-6 md:px-16 max-w-6xl mx-auto w-full border-t border-[var(--color-border-subtle)] pt-16">
                <SectionReveal>
                    <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent)] block mb-4">
                        {t.project.sections.result}
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] mb-6">
                        {content.sections.result?.headline}
                    </h2>
                    <p className="text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                        {content.sections.result?.body}
                    </p>
                </SectionReveal>
            </section>
        </div>
    )
}