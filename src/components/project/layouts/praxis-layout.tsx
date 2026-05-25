// components/project/layouts/praxis-layout.tsx
// Fix: carousel maior + centralizado, links visíveis, texto em cards correto
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
    AlertTriangle, Lightbulb, TrendingUp,
    ExternalLink, GitBranch, CheckCircle2,
    Stethoscope, Database, FileText, Code2, Layers
} from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData; scrollY: number }

const SOLUTION_ICONS = [Stethoscope, Database, FileText, Code2, Layers]

const slideVariants: Variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.2, ease: "easeIn" } }),
}

export function PraxisLayout({ project }: Props) {
    const { t } = useI18n()
    const content = useProjectContent(project)
    const [[slide, dir], setSlide] = useState([0, 0])
    const [openDec, setOpenDec] = useState<number | null>(0)

    const items = content.sections.solution?.items ?? []
    const decisions = content.sections.technicalDecisions?.decisions ?? []

    function paginate(newDir: number) {
        const next = slide + newDir
        if (next < 0 || next >= items.length) return
        setSlide([next, newDir])
    }

    return (
        <div className="flex flex-col">

            {/* HERO */}
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
                    <SectionReveal delay={0.14} className="flex flex-wrap gap-2 mb-10">
                        {project.tags.map((tag) => (
                            <span key={tag} className="text-[10px] uppercase tracking-widest
                border border-(--color-accent)/30 text-(--color-accent)
                rounded-full px-3 py-1">{tag}</span>
                        ))}
                    </SectionReveal>
                    {/* Links — só renderiza se existir */}
                    <SectionReveal delay={0.18} className="flex gap-3 flex-wrap">
                        {project.links?.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
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

            {/* HERO IMAGE */}
            <SectionReveal className="px-8 md:px-16 mb-24">
                <div className="rounded-2xl overflow-hidden border border-(--color-border-subtle) shadow-2xl">
                    {project.heroImage
                        ? <img src={project.heroImage} alt={project.title} className="w-full aspect-video object-cover" />
                        : <MediaPlaceholder variant="hero" aspect="aspect-video" label="Praxis — Clinical Interface" />}
                </div>
            </SectionReveal>

            {/* PROBLEM */}
            <section className="px-8 md:px-16 mb-28 max-w-6xl mx-auto w-full">
                <div className="grid md:grid-cols-[auto_1fr] gap-16 items-start">
                    <SectionReveal>
                        <div className="flex flex-col items-center gap-3 md:sticky md:top-28">
                            <div className="w-12 h-12 rounded-xl bg-(--color-accent-muted) flex items-center justify-center">
                                <AlertTriangle size={20} className="text-(--color-accent)" />
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.18em] text-(--color-accent)">
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

            {/* SOLUTION — carousel grande centralizado */}
            <section className="mb-28 border-t border-(--color-border-subtle) pt-24">
                <SectionReveal className="px-8 md:px-16 mb-10 max-w-6xl mx-auto">
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) block mb-3">
                        {t.project.sections.solution}
                    </span>
                    <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.solution?.headline}
                    </h2>
                </SectionReveal>

                {/* Carousel — card grande centralizado */}
                <div className="flex flex-col items-center px-8 md:px-16 max-w-3xl mx-auto w-full">
                    <div className="relative w-full overflow-hidden">
                        <AnimatePresence custom={dir} mode="wait">
                            <motion.div
                                key={slide}
                                custom={dir}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="w-full"
                            >
                                {items[slide] && (() => {
                                    const Icon = SOLUTION_ICONS[slide % SOLUTION_ICONS.length]
                                    return (
                                        <div className="flex flex-col items-center text-center gap-6 p-10 md:p-14
                                    rounded-2xl border border-(--color-border)
                                    bg-(--color-bg-secondary) min-h-[240px] justify-center">
                                            {/* Ícone grande */}
                                            <div className="w-16 h-16 rounded-2xl bg-(--color-accent) flex items-center justify-center shrink-0">
                                                <Icon size={28} className="text-white" />
                                            </div>
                                            {/* Número do slide */}
                                            <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary)">
                                                {String(slide + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                                            </span>
                                            {/* Texto do item */}
                                            <p className="text-xl md:text-2xl font-display font-medium tracking-[-0.01em]
                                    text-(--color-text-primary) leading-snug max-w-md">
                                                {items[slide]}
                                            </p>
                                        </div>
                                    )
                                })()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Controles centralizados */}
                    <div className="flex items-center gap-4 mt-6">
                        <button onClick={() => paginate(-1)} disabled={slide === 0}
                            className={cn(
                                "w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer",
                                slide === 0
                                    ? "border-(--color-border-subtle) text-(--color-text-tertiary) opacity-40 cursor-not-allowed"
                                    : "border-(--color-accent) text-(--color-accent) hover:bg-(--color-accent-muted)"
                            )}>
                            <ChevronLeft size={18} />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {items.map((_, i) => (
                                <button key={i} onClick={() => setSlide([i, i > slide ? 1 : -1])}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                                        i === slide
                                            ? "w-8 bg-(--color-accent)"
                                            : "w-1.5 bg-(--color-border-strong) hover:bg-(--color-text-tertiary)"
                                    )} />
                            ))}
                        </div>

                        <button onClick={() => paginate(1)} disabled={slide === items.length - 1}
                            className={cn(
                                "w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer",
                                slide === items.length - 1
                                    ? "border-(--color-border-subtle) text-(--color-text-tertiary) opacity-40 cursor-not-allowed"
                                    : "border-(--color-accent) text-(--color-accent) hover:bg-(--color-accent-muted)"
                            )}>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ANALYSIS */}
            <section className="px-8 md:px-16 mb-28 max-w-6xl mx-auto w-full border-t border-(--color-border-subtle) pt-28">
                <SectionReveal className="flex items-center gap-2 mb-10">
                    <Lightbulb size={13} className="text-(--color-gold)" />
                    <span className="text-xs uppercase tracking-widest text-(--color-text-tertiary)">
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

            {/* TECHNICAL DECISIONS — accordion */}
            <section className="px-8 md:px-16 mb-28 max-w-6xl mx-auto w-full border-t border-(--color-border-subtle) pt-28">
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
                                                transition={{ duration: 0.28, ease: "easeOut" }}
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

            {/* RESULT */}
            <section className="px-8 md:px-16 max-w-6xl mx-auto w-full border-t border-(--color-border-subtle) pt-28">
                <SectionReveal className="flex items-center gap-2 mb-6">
                    <TrendingUp size={13} className="text-(--color-accent)" />
                    <span className="text-xs uppercase tracking-widest text-(--color-accent)">
                        {t.project.sections.result}
                    </span>
                </SectionReveal>
                <SectionReveal delay={0.04}>
                    <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-(--color-text-primary) mb-10">
                        {content.sections.result?.headline}
                    </h2>
                </SectionReveal>
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
                                    i === 0 ? "text-white/80" : "text-(--color-text-tertiary)")}>
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