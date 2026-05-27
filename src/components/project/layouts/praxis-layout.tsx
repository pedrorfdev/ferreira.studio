// components/project/layouts/praxis-layout.tsx
// Layout completo: Hero → Problema|Análise → Ideia → Carousel Solução
//                  → Decisões accordion + Resultado lado a lado
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"
import { useProjectContent } from "@/hooks/use-project-content"
import { SectionReveal } from "@/components/project/section-reveal"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/cn"
import {
    ChevronLeft, ChevronRight, ChevronDown,
    AlertTriangle, Lightbulb, TrendingUp, Sparkles,
    ExternalLink, GitBranch, CheckCircle2,
    Stethoscope, Database, FileText, Code2, Layers
} from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData; scrollY: number }
const ICONS = [Stethoscope, Database, FileText, Code2, Layers]

const slideV: Variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 32 : -32 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.28, ease: "easeOut" } },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -32 : 32, transition: { duration: 0.18, ease: "easeIn" } }),
}

export function PraxisLayout({ project }: Props) {
    const { t } = useI18n()
    const content = useProjectContent(project)
    const [[slide, dir], setSlide] = useState([0, 0])
    const [openDec, setOpenDec] = useState<number | null>(0)

    const items = content.sections.solution?.items ?? []
    const decisions = content.sections.technicalDecisions?.decisions ?? []

    function paginate(d: number) {
        const next = slide + d
        if (next < 0 || next >= items.length) return
        setSlide([next, d])
    }

    return (
        <div className="flex flex-col">
            {/* HERO */}
            <section className="min-h-[85vh] flex flex-col justify-end px-6 md:px-16 pb-16 relative">
                <div className="absolute inset-0 pointer-events-none">
                    {project.media?.src
                        ? <img src={project.media.src} alt="" className="w-full h-full object-cover opacity-20" loading="lazy" decoding="async" />
                        : <MediaPlaceholder variant="bg" aspect="" className="w-full h-full opacity-20" />
                    }
                    <div className="absolute inset-0 bg-linear-to-t from-(--color-bg-primary) via-(--color-bg-primary)/70 to-transparent" />
                </div>
                <div className="relative z-10 max-w-5xl">
                    <SectionReveal>
                        <div className="flex items-center gap-2 mb-5">
                            <CheckCircle2 size={12} className="text-(--color-accent)" />
                            <span className="text-xs uppercase tracking-[0.18em] text-(--color-accent)">Live · {project.year}</span>
                        </div>
                    </SectionReveal>
                    <SectionReveal delay={0.06}>
                        <h1 className="font-display font-semibold tracking-[-0.03em] leading-none mb-4"
                            style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}>
                            <span className="text-(--color-accent)">Prax</span>
                            <span className="text-(--color-text-primary)">is</span>
                        </h1>
                    </SectionReveal>
                    <SectionReveal delay={0.1}>
                        <p className="text-lg text-(--color-text-secondary) max-w-xl leading-relaxed mb-8">
                            {content.tagline}
                        </p>
                    </SectionReveal>
                    <SectionReveal delay={0.14} className="flex gap-3 flex-wrap">
                        {project.links?.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-(--color-accent) text-white hover:opacity-85 transition-opacity">
                                <ExternalLink size={12} /> Live demo
                            </a>
                        )}
                        {project.links?.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-(--color-border) text-(--color-text-secondary) hover:border-(--color-accent) transition-colors">
                                <GitBranch size={12} /> GitHub
                            </a>
                        )}
                    </SectionReveal>
                </div>
            </section>

            {/* HERO IMAGE */}
            <SectionReveal className="px-6 md:px-16 mb-20">
                <div className="rounded-2xl overflow-hidden border border-(--color-border-subtle) shadow-2xl">
                    {project.heroVideo
                        ? <video src={project.heroVideo} autoPlay muted loop playsInline poster={project.heroImage} className="w-full aspect-video object-cover" />
                        : project.heroImage
                            ? <img src={project.heroImage} alt={project.title} className="w-full aspect-video object-cover" loading="lazy" />
                            : <MediaPlaceholder variant="hero" aspect="aspect-video" label="Praxis — Clinical Interface" />
                    }
                </div>
            </SectionReveal>

            {/* PROBLEMA | ANÁLISE — lado a lado */}
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
                                    {t.project.sections.analysis}
                                </span>
                            </div>
                            <h2 className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em] text-(--color-text-primary) leading-snug">
                                {content.sections.analysis?.headline}
                            </h2>
                            <p className="text-sm text-(--color-text-secondary) leading-relaxed flex-1">
                                {content.sections.analysis?.body}
                            </p>
                        </div>
                    </SectionReveal>
                </div>
            </section>

            {/* IDEIA — full width, destaque */}
            <section className="px-6 md:px-16 mb-20 max-w-6xl mx-auto w-full">
                <SectionReveal>
                    <div className="p-6 md:p-10 rounded-2xl border border-(--color-accent)/20
                          bg-(--color-accent-muted) relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-(--color-accent)/10 blur-3xl" />
                        <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
                            <div className="flex items-center gap-2 md:flex-col md:items-start shrink-0">
                                <div className="w-9 h-9 rounded-xl bg-(--color-accent) flex items-center justify-center">
                                    <Sparkles size={16} className="text-white" />
                                </div>
                                <span className="text-xs uppercase tracking-[0.16em] text-(--color-accent) md:mt-2">
                                    {t.project.sections.idea}
                                </span>
                            </div>
                            <div>
                                <h2 className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em]
                               text-(--color-text-primary) leading-snug mb-3">
                                    {content.sections.idea?.headline}
                                </h2>
                                <p className="text-sm text-(--color-text-secondary) leading-relaxed max-w-2xl">
                                    {content.sections.idea?.body}
                                </p>
                            </div>
                        </div>
                    </div>
                </SectionReveal>
            </section>

            {/* SOLUÇÃO — carousel altura fixa */}
            <section className="mb-20 border-t border-(--color-border-subtle) pt-16">
                <SectionReveal className="px-6 md:px-16 mb-8 max-w-6xl mx-auto">
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) block mb-2">
                        {t.project.sections.solution}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.solution?.headline}
                    </h2>
                </SectionReveal>
                <div className="flex flex-col items-center px-6 md:px-16 max-w-3xl mx-auto w-full">
                    {/* Altura fixa — sem layout shift */}
                    <div className="relative w-full h-52 md:h-56">
                        <AnimatePresence custom={dir} mode="wait">
                            <motion.div key={slide} custom={dir} variants={slideV}
                                initial="enter" animate="center" exit="exit"
                                className="absolute inset-0">
                                {items[slide] && (() => {
                                    const Icon = ICONS[slide % ICONS.length]
                                    return (
                                        <div className="flex flex-col items-center justify-center text-center gap-5 h-full px-6
                                    rounded-2xl border border-(--color-border) bg-(--color-bg-secondary)">
                                            <div className="w-14 h-14 rounded-2xl bg-(--color-accent) flex items-center justify-center shrink-0">
                                                <Icon size={24} className="text-white" />
                                            </div>
                                            <p className="text-base md:text-lg font-display font-medium tracking-[-0.01em]
                                    text-(--color-text-primary) leading-snug max-w-sm">
                                                {items[slide]}
                                            </p>
                                        </div>
                                    )
                                })()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className="flex items-center gap-4 mt-5">
                        <button onClick={() => paginate(-1)} disabled={slide === 0}
                            className={cn("w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-all",
                                slide === 0
                                    ? "border-(--color-border-subtle) text-(--color-text-tertiary) opacity-40 cursor-not-allowed"
                                    : "border-(--color-accent) text-(--color-accent) hover:bg-(--color-accent-muted)"
                            )}><ChevronLeft size={16} /></button>
                        <div className="flex gap-2">
                            {items.map((_, i) => (
                                <button key={i} onClick={() => setSlide([i, i > slide ? 1 : -1])}
                                    className={cn("h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                                        i === slide ? "w-8 bg-(--color-accent)" : "w-1.5 bg-(--color-border-strong)")} />
                            ))}
                        </div>
                        <button onClick={() => paginate(1)} disabled={slide === items.length - 1}
                            className={cn("w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-all",
                                slide === items.length - 1
                                    ? "border-(--color-border-subtle) text-(--color-text-tertiary) opacity-40 cursor-not-allowed"
                                    : "border-(--color-accent) text-(--color-accent) hover:bg-(--color-accent-muted)"
                            )}><ChevronRight size={16} /></button>
                    </div>
                </div>
            </section>

            {/* DECISÕES | RESULTADO — lado a lado */}
            <section className="px-6 md:px-16 mb-20 max-w-6xl mx-auto w-full border-t border-(--color-border-subtle) pt-16">
                <div className="grid md:grid-cols-2 gap-6 items-start">
                    {/* Decisões */}
                    <div className="flex flex-col gap-3">
                        <SectionReveal className="mb-4">
                            <span className="text-xs uppercase tracking-[0.16em] text-(--color-text-tertiary) block mb-1">
                                {t.project.sections.technical}
                            </span>
                            <h2 className="font-display text-xl font-semibold tracking-[-0.01em] text-(--color-text-primary)">
                                {content.sections.technicalDecisions?.headline}
                            </h2>
                        </SectionReveal>
                        {decisions.map((dec, i) => (
                            <SectionReveal key={i} delay={i * 0.05}>
                                <button onClick={() => setOpenDec(openDec === i ? null : i)}
                                    className="w-full text-left p-4 rounded-xl bg-(--color-bg-secondary)
                             border border-(--color-border) hover:border-(--color-accent)/40
                             transition-colors cursor-pointer group">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                            <span className="text-[10px] tabular-nums text-(--color-accent) shrink-0">{String(i + 1).padStart(2, "0")}</span>
                                            <span className="text-sm font-medium text-(--color-text-primary) group-hover:text-(--color-accent) transition-colors truncate">
                                                {dec.title}
                                            </span>
                                        </div>
                                        <motion.div animate={{ rotate: openDec === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                            <ChevronDown size={14} className="text-(--color-text-tertiary) shrink-0" />
                                        </motion.div>
                                    </div>
                                    <AnimatePresence>
                                        {openDec === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeOut" }}
                                                className="overflow-hidden">
                                                <p className="text-xs text-(--color-text-secondary) leading-relaxed mt-3">{dec.why}</p>
                                                {dec.trade && (
                                                    <p className="text-xs text-(--color-text-tertiary) mt-2 italic">↳ {dec.trade}</p>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </SectionReveal>
                        ))}
                    </div>

                    {/* Resultado */}
                    <SectionReveal delay={0.1}>
                        <div className="p-6 md:p-8 rounded-2xl bg-(--color-accent) flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                                <TrendingUp size={15} className="text-white/80" />
                                <span className="text-xs uppercase tracking-[0.16em] text-white/80">{t.project.sections.result}</span>
                            </div>
                            <h2 className="font-display text-xl md:text-2xl font-semibold text-white leading-snug">
                                {content.sections.result?.headline}
                            </h2>
                            <p className="text-sm text-white/80 leading-relaxed flex-1">
                                {content.sections.result?.body}
                            </p>
                            <div className="flex flex-col gap-3 pt-4 border-t border-white/20">
                                {content.sections.result?.metrics?.map((m, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span className="text-xs text-white/60 uppercase tracking-widest">{m.label}</span>
                                        <span className="font-display text-lg font-bold text-white">{m.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SectionReveal>
                </div>
            </section>
        </div>
    )
}