// components/project/layouts/carga-layout.tsx
// Layout industrial: timeline vertical + stats dashboard
import { useProjectContent } from "@/hooks/use-project-content"
import { SectionReveal } from "@/components/project/section-reveal"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/cn"
import { Truck, Wifi, Smartphone, BarChart3, GitBranch, ChevronDown } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData; scrollY: number }

const TIMELINE_ICONS = [Truck, BarChart3, Wifi, Smartphone]

export function CargaLayout({ project }: Props) {
    const { t } = useI18n()
    const content = useProjectContent(project)
    const [open, setOpen] = useState<number | null>(null)
    const decisions = content.sections.technicalDecisions?.decisions ?? []
    const items = content.sections.solution?.items ?? []

    return (
        <div className="flex flex-col">
            {/* HERO — industrial, denso */}
            <section className="min-h-[75vh] flex flex-col justify-end px-8 md:px-16 pb-16 relative">
                <div className="absolute inset-0">
                    <MediaPlaceholder variant="bg" aspect="" className="w-full h-full opacity-25" />
                    <div className="absolute inset-0 bg-linear-to-t from-(--color-bg-primary) to-transparent" />
                </div>
                <div className="relative z-10 max-w-5xl">
                    <SectionReveal>
                        <div className="flex items-center gap-2 mb-6">
                            <Truck size={13} className="text-(--color-accent)" />
                            <span className="text-xs uppercase tracking-[0.18em] text-(--color-accent)">
                                Agro · Logistics · {project.year}
                            </span>
                        </div>
                    </SectionReveal>
                    <SectionReveal delay={0.06}>
                        <h1 className="font-display font-bold tracking-[-0.03em] leading-none mb-4"
                            style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>
                            <span className="text-(--color-accent)">C</span>
                            <span className="text-(--color-text-primary)">arga</span>
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
                        : <MediaPlaceholder variant="hero" aspect="aspect-video" label="Carga — Operations Dashboard" />
                    }
                </div>
            </SectionReveal>

            {/* PROBLEM */}
            <section className="px-8 md:px-16 mb-28 max-w-6xl mx-auto w-full">
                <div className="grid md:grid-cols-2 gap-12">
                    <SectionReveal>
                        <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) block mb-4">
                            {t.project.sections.problem}
                        </span>
                        <h2 className="font-display text-3xl font-semibold tracking-[-0.02em]
                           text-(--color-text-primary) leading-tight">
                            {content.sections.problem?.headline}
                        </h2>
                    </SectionReveal>
                    <SectionReveal delay={0.08}>
                        <p className="text-base text-(--color-text-secondary) leading-relaxed mt-8 md:mt-0">
                            {content.sections.problem?.body}
                        </p>
                    </SectionReveal>
                </div>
            </section>

            {/* SOLUTION — timeline vertical */}
            <section className="px-8 md:px-16 mb-28 max-w-4xl mx-auto w-full
                          border-t border-(--color-border-subtle) pt-24">
                <SectionReveal className="mb-12">
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) block mb-3">
                        {t.project.sections.solution}
                    </span>
                    <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.solution?.headline}
                    </h2>
                </SectionReveal>

                <div className="relative">
                    {/* Linha vertical */}
                    <div className="absolute left-5 top-0 bottom-0 w-px bg-(--color-border)" />
                    <div className="flex flex-col gap-8">
                        {items.map((item, i) => {
                            const Icon = TIMELINE_ICONS[i % TIMELINE_ICONS.length]
                            return (
                                <SectionReveal key={i} delay={i * 0.07}>
                                    <div className="flex items-start gap-6">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 z-10",
                                            i === 0
                                                ? "bg-(--color-accent) border-(--color-accent)"
                                                : "bg-(--color-bg-primary) border-(--color-border)"
                                        )}>
                                            <Icon size={14} className={i === 0 ? "text-white" : "text-(--color-accent)"} />
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-sm text-(--color-text-secondary) leading-relaxed">{item}</p>
                                        </div>
                                    </div>
                                </SectionReveal>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* TECHNICAL DECISIONS — dropdowns */}
            <section className="px-8 md:px-16 mb-28 max-w-6xl mx-auto w-full
                          border-t border-(--color-border-subtle) pt-24">
                <SectionReveal className="mb-8">
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) block mb-3">
                        {t.project.sections.technical}
                    </span>
                    <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.technicalDecisions?.headline}
                    </h2>
                </SectionReveal>
                <div className="flex flex-col gap-3">
                    {decisions.map((dec, i) => (
                        <SectionReveal key={i} delay={i * 0.07}>
                            <div className="rounded-xl border border-(--color-border) overflow-hidden">
                                <button onClick={() => setOpen(open === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 cursor-pointer
                             bg-(--color-bg-secondary) hover:bg-(--color-bg-tertiary) transition-colors">
                                    <span className="font-display text-base font-semibold text-(--color-text-primary)">
                                        {dec.title}
                                    </span>
                                    <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                        <ChevronDown size={16} className="text-(--color-text-tertiary)" />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {open === i && (
                                        <motion.div
                                            initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-5 pt-0 bg-(--color-bg-secondary)">
                                                <p className="text-sm text-(--color-text-secondary) leading-relaxed mb-3">
                                                    {dec.why}
                                                </p>
                                                {dec.trade && (
                                                    <div className="pt-3 border-t border-(--color-border-subtle)">
                                                        <span className="text-[10px] uppercase tracking-[0.12em] text-(--color-accent) block mb-1">
                                                            {t.project.tradeoff}
                                                        </span>
                                                        <p className="text-xs text-(--color-text-tertiary)">{dec.trade}</p>
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