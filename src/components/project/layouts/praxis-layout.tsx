// components/project/layouts/praxis-layout.tsx
// ============================================================
// PRAXIS — Layout clínico e preciso
// Hero → problema em split → solução em carrossel horizontal
// → análise com quote → decisões em accordion → resultado
// Cores: petróleo + cyan (via CSS vars do data-project)
// ============================================================

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useProjectContent } from "@/hooks/use-project-content"
import { SectionReveal } from "@/components/project/section-reveal"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/cn"
import {
    ChevronLeft, ChevronRight, ChevronDown,
    AlertTriangle, Lightbulb, TrendingUp,
    ExternalLink, GitBranch, CheckCircle2, Stethoscope,
    Database, FileText, Code2, Layers
} from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData; scrollY: number }

const SOLUTION_ICONS = [Stethoscope, Database, FileText, Code2, Layers]

export function PraxisLayout({ project }: Props) {
    const { t } = useI18n()
    const content = useProjectContent(project)
    const [slide, setSlide] = useState(0)
    const [openDec, setOpenDec] = useState<number | null>(0)

    const items = content.sections.solution?.items ?? []
    const decisions = content.sections.technicalDecisions?.decisions ?? []

    return (
        <div className="flex flex-col">

            {/* ── HERO ─────────────────────────────────────────── */}
            <section className="min-h-[80vh] flex flex-col justify-end px-8 md:px-16 pb-16 relative">
                <div className="absolute inset-0 pointer-events-none">
                    <MediaPlaceholder variant="bg" aspect="" className="w-full h-full opacity-30" />
                    <div className="absolute inset-0 bg-linear-to-t from-(--color-bg-primary) via-(--color-bg-primary)/60 to-transparent" />
                </div>

                <div className="relative z-10 max-w-5xl">
                    <SectionReveal>
                        <div className="flex items-center gap-2 mb-6">
                            <CheckCircle2 size={12} className="text-(--color-accent)" />
                            <span className="text-xs uppercase tracking-[0.18em] text-(--color-accent)">Shipped · {project.year}</span>
                        </div>
                    </SectionReveal>

                    <SectionReveal delay={0.06}>
                        <h1 className="font-display font-semibold tracking-[-0.03em] leading-none mb-4"
                            style={{ fontSize: "clamp(3.5rem, 9vw, 6.5rem)" }}>
                            <span className="text-(--color-accent)">Prax</span>
                            <span className="text-(--color-text-primary)">is</span>
                        </h1>
                    </SectionReveal>

                    <SectionReveal delay={0.1}>
                        <p className="text-xl text-(--color-text-secondary) max-w-xl leading-relaxed mb-8">
                            {content.tagline}
                        </p>
                    </SectionReveal>

                    {/* Tags row */}
                    <SectionReveal delay={0.14} className="flex flex-wrap gap-2 mb-10">
                        {project.tags.map((tag) => (
                            <span key={tag} className="text-[10px] uppercase tracking-widest
                border border-(--color-accent)/30 text-(--color-accent)
                rounded-full px-3 py-1">
                                {tag}
                            </span>
                        ))}
                    </SectionReveal>

                    {/* Links */}
                    <SectionReveal delay={0.18} className="flex gap-3">
                        {project.links?.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm
                bg-(--color-accent) text-white hover:opacity-85 transition-opacity">
                                <ExternalLink size={12} /> Live demo
                            </a>
                        )}
                        {project.links?.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm
                border border-(--color-border) text-(--color-text-secondary)
                hover:border-(--color-accent) transition-colors">
                                <GitBranch size={12} /> GitHub
                            </a>
                        )}
                    </SectionReveal>
                </div>
            </section>

            {/* ── HERO IMAGE ───────────────────────────────────── */}
            <SectionReveal className="px-8 md:px-16 mb-24">
                <div className="rounded-2xl overflow-hidden border border-(--color-border-subtle) shadow-2xl">
                    {project.heroImage
                        ? <img src={project.heroImage} alt={project.title} className="w-full aspect-video object-cover" />
                        : <MediaPlaceholder variant="hero" aspect="aspect-video" label="Praxis — Clinical Interface" />
                    }
                </div>
            </SectionReveal>

            {/* ── PROBLEM — split layout ────────────────────────── */}
            <section className="px-8 md:px-16 mb-28 max-w-6xl mx-auto w-full">
                <div className="grid md:grid-cols-[auto_1fr] gap-16 items-start">
                    <SectionReveal>
                        <div className="flex flex-col items-center gap-3 md:sticky md:top-28">
                            <div className="w-12 h-12 rounded-xl bg-(--color-accent-muted) flex items-center justify-center">
                                <AlertTriangle size={20} className="text-(--color-accent)" />
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.18em] text-(--color-accent) writing-vertical">
                                {t.project.sections.problem}
                            </span>
                        </div>
                    </SectionReveal>

                    <div>
                        <SectionReveal>
                            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-[-0.02em]
                             text-(--color-text-primary) leading-tight mb-8">
                                {content.sections.problem?.headline}
                            </h2>
                        </SectionReveal>
                        <SectionReveal delay={0.08}>
                            <p className="text-lg text-(--color-text-secondary) leading-relaxed mb-8">
                                {content.sections.problem?.body}
                            </p>
                        </SectionReveal>
                        <SectionReveal delay={0.12}>
                            <div className="p-5 rounded-xl bg-(--color-accent-muted) border border-(--color-accent)/20">
                                <p className="text-sm text-(--color-accent) italic">
                                    "{content.sections.problem?.headline}"
                                </p>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </section>

            {/* ── SOLUTION — carrossel horizontal ──────────────── */}
            <section className="mb-28">
                <SectionReveal className="px-8 md:px-16 mb-8 max-w-6xl mx-auto">
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary)">
                        {t.project.sections.solution}
                    </span>
                    <h2 className="font-display text-4xl font-semibold tracking-[-0.02em]
                         text-(--color-text-primary) mt-3">
                        {content.sections.solution?.headline}
                    </h2>
                </SectionReveal>

                {/* Carrossel */}
                <div className="relative px-8 md:px-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="p-8 rounded-2xl border border-(--color-border)
                         bg-(--color-bg-secondary) min-h-[180px] flex flex-col gap-4"
                        >
                            {items[slide] && (
                                <>
                                    <div className="w-10 h-10 rounded-xl bg-(--color-accent) flex items-center justify-center shrink-0">
                                        {(() => { const Icon = SOLUTION_ICONS[slide % SOLUTION_ICONS.length]; return <Icon size={18} className="text-white" /> })()}
                                    </div>
                                    <p className="text-lg text-(--color-text-primary) font-medium leading-relaxed">
                                        {items[slide]}
                                    </p>
                                    <span className="text-xs text-(--color-text-tertiary) mt-auto">
                                        {slide + 1} / {items.length}
                                    </span>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Controles */}
                    <div className="flex items-center gap-3 mt-4">
                        <button onClick={() => setSlide((s) => Math.max(0, s - 1))}
                            disabled={slide === 0}
                            className={cn("w-9 h-9 rounded-full border flex items-center justify-center transition-all",
                                slide === 0
                                    ? "border-(--color-border-subtle) text-(--color-text-tertiary) opacity-40"
                                    : "border-(--color-accent) text-(--color-accent) hover:bg-(--color-accent-muted)"
                            )}>
                            <ChevronLeft size={16} />
                        </button>
                        <div className="flex gap-1.5">
                            {items.map((_, i) => (
                                <button key={i} onClick={() => setSlide(i)}
                                    className={cn("h-1 rounded-full transition-all duration-300",
                                        i === slide ? "w-6 bg-(--color-accent)" : "w-1.5 bg-(--color-border-strong)"
                                    )} />
                            ))}
                        </div>
                        <button onClick={() => setSlide((s) => Math.min(items.length - 1, s + 1))}
                            disabled={slide === items.length - 1}
                            className={cn("w-9 h-9 rounded-full border flex items-center justify-center transition-all",
                                slide === items.length - 1
                                    ? "border-(--color-border-subtle) text-(--color-text-tertiary) opacity-40"
                                    : "border-(--color-accent) text-(--color-accent) hover:bg-(--color-accent-muted)"
                            )}>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ── ANALYSIS — editorial quote ────────────────────── */}
            <section className="px-8 md:px-16 mb-28 max-w-6xl mx-auto w-full
                          border-t border-(--color-border-subtle) pt-28">
                <SectionReveal className="flex items-center gap-2 mb-10">
                    <Lightbulb size={13} className="text-(--color-gold)" />
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary)">
                        {t.project.sections.analysis}
                    </span>
                </SectionReveal>
                <SectionReveal delay={0.06}>
                    <blockquote className="font-display text-2xl md:text-3xl font-medium tracking-[-0.02em]
                                 leading-snug text-(--color-text-primary)
                                 border-l-2 border-(--color-gold) pl-6 mb-10 max-w-2xl">
                        {content.sections.analysis?.headline}
                    </blockquote>
                </SectionReveal>
                <SectionReveal delay={0.1}>
                    <p className="text-base text-(--color-text-secondary) leading-relaxed max-w-2xl">
                        {content.sections.analysis?.body}
                    </p>
                </SectionReveal>
            </section>

            {/* ── TECHNICAL DECISIONS — accordion ──────────────── */}
            <section className="px-8 md:px-16 mb-28 max-w-6xl mx-auto w-full
                          border-t border-(--color-border-subtle) pt-28">
                <SectionReveal className="mb-10">
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) block mb-3">
                        {t.project.sections.technical}
                    </span>
                    <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.technicalDecisions?.headline}
                    </h2>
                </SectionReveal>

                <div className="flex flex-col divide-y divide-(--color-border-subtle)">
                    {decisions.map((dec, i) => (
                        <SectionReveal key={i} delay={i * 0.06}>
                            <button
                                onClick={() => setOpenDec(openDec === i ? null : i)}
                                className="w-full text-left py-5 flex items-start justify-between gap-4 cursor-pointer group"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[10px] tabular-nums text-(--color-accent)">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className="font-display text-lg font-semibold text-(--color-text-primary)
                                   group-hover:text-(--color-accent) transition-colors">
                                            {dec.title}
                                        </h3>
                                    </div>
                                    <AnimatePresence>
                                        {openDec === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-sm text-(--color-text-secondary) leading-relaxed mt-3 mb-2">
                                                    {dec.why}
                                                </p>
                                                {dec.trade && (
                                                    <div className="flex items-start gap-2 mt-3 pt-3 border-t border-(--color-border-subtle)">
                                                        <span className="text-[10px] uppercase tracking-widest text-(--color-accent) shrink-0 mt-0.5">
                                                            {t.project.tradeoff}
                                                        </span>
                                                        <p className="text-sm text-(--color-text-tertiary)">{dec.trade}</p>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <motion.div
                                    animate={{ rotate: openDec === i ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-(--color-text-tertiary) shrink-0 mt-1"
                                >
                                    <ChevronDown size={16} />
                                </motion.div>
                            </button>
                        </SectionReveal>
                    ))}
                </div>
            </section>

            {/* ── RESULT ───────────────────────────────────────── */}
            <section className="px-8 md:px-16 max-w-6xl mx-auto w-full
                          border-t border-(--color-border-subtle) pt-28">
                <SectionReveal className="flex items-center gap-2 mb-6">
                    <TrendingUp size={13} className="text-(--color-accent)" />
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-accent)">
                        {t.project.sections.result}
                    </span>
                </SectionReveal>
                <SectionReveal delay={0.04}>
                    <h2 className="font-display text-4xl font-semibold tracking-[-0.02em]
                         text-(--color-text-primary) mb-10">
                        {content.sections.result?.headline}
                    </h2>
                </SectionReveal>

                {/* Métricas em row */}
                <SectionReveal delay={0.08}>
                    <div className="grid grid-cols-3 gap-4 mb-10">
                        {content.sections.result?.metrics?.map((m, i) => (
                            <div key={i} className={cn(
                                "p-5 rounded-xl border",
                                i === 0
                                    ? "bg-(--color-accent) border-(--color-accent)"
                                    : "bg-(--color-bg-secondary) border-(--color-border)"
                            )}>
                                <div className={cn("font-display text-3xl font-bold mb-1",
                                    i === 0 ? "text-white" : "text-(--color-text-primary)")}>
                                    {m.value}
                                </div>
                                <div className={cn("text-[10px] uppercase tracking-widest",
                                    i === 0 ? "text-white/70" : "text-(--color-text-tertiary)")}>
                                    {m.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionReveal>

                <SectionReveal delay={0.12}>
                    <p className="text-base text-(--color-text-secondary) leading-relaxed max-w-2xl">
                        {content.sections.result?.body}
                    </p>
                </SectionReveal>
            </section>
        </div>
    )
}