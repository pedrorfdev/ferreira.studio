// components/project/layouts/vambora-layout.tsx
// ============================================================
// VAMBORA — Layout dinâmico e fluido
// Hero full-bleed → problema em card grande centralizado
// → solução em grid de cards → decisões em tabs horizontais
// → resultado em split com número grande
// Cores: indigo + emerald (via CSS vars)
// ============================================================

import { useState } from "react"
import { motion } from "framer-motion"
import { useProjectContent } from "@/hooks/use-project-content"
import { SectionReveal } from "@/components/project/section-reveal"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/cn"
import {
    Map, Clock, Wallet, Users,
    ArrowRight, ExternalLink,
    Zap, Globe, Code2,
    GitBranch
} from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData; scrollY: number }

const ITEM_ICONS = [Map, Clock, Wallet, Users, Globe, Code2]

export function VamboraLayout({ project }: Props) {
    const { t } = useI18n()
    const content = useProjectContent(project)
    const [tab, setTab] = useState(0)

    const decisions = content.sections.technicalDecisions?.decisions ?? []
    const items = content.sections.solution?.items ?? []

    return (
        <div className="flex flex-col">

            {/* ── HERO — full bleed energético ─────────────────── */}
            <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 relative overflow-hidden">
                {/* Background animado */}
                <div className="absolute inset-0">
                    <MediaPlaceholder variant="bg" aspect="" className="w-full h-full opacity-20" />
                    <div className="absolute inset-0 bg-linear-to-br from-(--color-bg-primary) via-transparent to-(--color-bg-primary)" />
                </div>

                {/* Floating accent orb */}
                <div className="absolute right-10 top-1/3 w-64 h-64 rounded-full
                        bg-(--color-accent)/10 blur-3xl pointer-events-none" />
                <div className="absolute right-32 top-1/2 w-40 h-40 rounded-full
                        bg-(--color-gold)/10 blur-2xl pointer-events-none" />

                <div className="relative z-10 max-w-4xl">
                    <SectionReveal>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                            border border-(--color-accent)/30 bg-(--color-accent-muted) mb-8">
                            <Zap size={11} className="text-(--color-accent)" />
                            <span className="text-xs uppercase tracking-[0.12em] text-(--color-accent)">
                                AI-powered · {project.year}
                            </span>
                        </div>
                    </SectionReveal>

                    <SectionReveal delay={0.06}>
                        <h1 className="font-display font-semibold tracking-[-0.03em] leading-none mb-6"
                            style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}>
                            <span className="text-(--color-text-primary)">Vam</span>
                            <span className="text-(--color-accent)">bora</span>
                            <span className="text-(--color-gold)">.ai</span>
                        </h1>
                    </SectionReveal>

                    <SectionReveal delay={0.1}>
                        <p className="text-xl text-(--color-text-secondary) max-w-lg leading-relaxed mb-10">
                            {content.tagline}
                        </p>
                    </SectionReveal>

                    <SectionReveal delay={0.14} className="flex gap-3 flex-wrap">
                        {project.links?.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
                bg-(--color-accent) text-white hover:opacity-85 transition-opacity">
                                <ExternalLink size={13} /> Try it live
                            </a>
                        )}
                        {project.links?.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm
                border border-(--color-border) text-(--color-text-secondary)
                hover:border-(--color-accent)/50 transition-colors">
                                <GitBranch size={13} /> GitHub
                            </a>
                        )}
                    </SectionReveal>
                </div>

                {/* Scroll hint */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <div className="w-px h-8 bg-linear-to-b from-transparent to-(--color-accent)/50" />
                </motion.div>
            </section>

            {/* ── HERO IMAGE ───────────────────────────────────── */}
            <SectionReveal className="px-8 md:px-16 mb-24">
                <div className="rounded-2xl overflow-hidden border border-(--color-border-subtle) shadow-2xl">
                    {project.heroImage
                        ? <img src={project.heroImage} alt={project.title} className="w-full aspect-video object-cover" />
                        : <MediaPlaceholder variant="hero" aspect="aspect-video" label="Vambora.ai — Itinerary Generator" />
                    }
                </div>
            </SectionReveal>

            {/* ── PROBLEM — card grande centralizado ───────────── */}
            <section className="px-8 md:px-16 mb-28 max-w-4xl mx-auto w-full">
                <SectionReveal>
                    <div className="p-10 rounded-2xl border border-(--color-border)
                          bg-(--color-bg-secondary) relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 rounded-full
                            bg-(--color-accent)/5 blur-2xl" />
                        <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) block mb-6">
                            {t.project.sections.problem}
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em]
                           text-(--color-text-primary) leading-tight mb-6 relative z-10">
                            {content.sections.problem?.headline}
                        </h2>
                        <p className="text-base text-(--color-text-secondary) leading-relaxed relative z-10">
                            {content.sections.problem?.body}
                        </p>
                    </div>
                </SectionReveal>
            </section>

            {/* ── SOLUTION — grid de feature cards ─────────────── */}
            <section className="px-8 md:px-16 mb-28 max-w-6xl mx-auto w-full
                          border-t border-(--color-border-subtle) pt-24">
                <SectionReveal className="mb-10">
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) block mb-3">
                        {t.project.sections.solution}
                    </span>
                    <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.solution?.headline}
                    </h2>
                </SectionReveal>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((item, i) => {
                        const Icon = ITEM_ICONS[i % ITEM_ICONS.length]
                        const isFirst = i === 0
                        return (
                            <SectionReveal key={i} delay={i * 0.07}>
                                <div className={cn(
                                    "p-5 rounded-xl border h-full flex flex-col gap-4 transition-colors duration-200",
                                    isFirst
                                        ? "bg-(--color-accent) border-(--color-accent) col-span-1 sm:col-span-2 lg:col-span-1"
                                        : "bg-(--color-bg-secondary) border-(--color-border) hover:border-(--color-accent)/40"
                                )}>
                                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                                        isFirst ? "bg-white/20" : "bg-(--color-accent-muted)")}>
                                        <Icon size={16} className={isFirst ? "text-white" : "text-(--color-accent)"} />
                                    </div>
                                    <p className={cn("text-sm leading-relaxed",
                                        isFirst ? "text-white/90" : "text-(--color-text-secondary)")}>
                                        {item}
                                    </p>
                                </div>
                            </SectionReveal>
                        )
                    })}
                </div>
            </section>

            {/* ── TECHNICAL DECISIONS — tabs horizontais ────────── */}
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

                {/* Tab headers */}
                <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
                    {decisions.map((dec, i) => (
                        <button key={i} onClick={() => setTab(i)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0",
                                tab === i
                                    ? "bg-(--color-accent) text-white"
                                    : "bg-(--color-bg-secondary) text-(--color-text-tertiary) hover:text-(--color-text-primary)"
                            )}>
                            {dec.title}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 rounded-xl bg-(--color-bg-secondary) border border-(--color-border)"
                >
                    {decisions[tab] && (
                        <>
                            <p className="text-base text-(--color-text-primary) leading-relaxed mb-4">
                                {decisions[tab].why}
                            </p>
                            {decisions[tab].trade && (
                                <div className="pt-4 border-t border-(--color-border-subtle)">
                                    <span className="text-[10px] uppercase tracking-[0.12em] text-(--color-accent) block mb-2">
                                        {t.project.tradeoff}
                                    </span>
                                    <p className="text-sm text-(--color-text-secondary)">{decisions[tab].trade}</p>
                                </div>
                            )}
                        </>
                    )}
                </motion.div>
            </section>

            {/* ── RESULT — número grande + split ───────────────── */}
            <section className="px-8 md:px-16 max-w-6xl mx-auto w-full
                          border-t border-(--color-border-subtle) pt-24">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <SectionReveal>
                        <div className="flex flex-col gap-6">
                            <span className="text-xs uppercase tracking-[0.18em] text-(--color-accent)">
                                {t.project.sections.result}
                            </span>
                            <h2 className="font-display text-4xl font-semibold tracking-[-0.02em]
                             text-(--color-text-primary) leading-tight">
                                {content.sections.result?.headline}
                            </h2>
                            <p className="text-base text-(--color-text-secondary) leading-relaxed">
                                {content.sections.result?.body}
                            </p>
                            {project.links?.demo && (
                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-(--color-accent)
                             hover:opacity-70 transition-opacity">
                                    Try it yourself <ArrowRight size={13} />
                                </a>
                            )}
                        </div>
                    </SectionReveal>

                    <SectionReveal delay={0.08}>
                        <div className="grid grid-cols-1 gap-4">
                            {content.sections.result?.metrics?.map((m, i) => (
                                <div key={i} className={cn(
                                    "p-6 rounded-xl border flex items-center gap-6",
                                    i === 0
                                        ? "bg-(--color-accent) border-(--color-accent)"
                                        : "bg-(--color-bg-secondary) border-(--color-border)"
                                )}>
                                    <div className={cn("font-display text-4xl font-bold shrink-0",
                                        i === 0 ? "text-white" : "text-(--color-accent)")}>
                                        {m.value}
                                    </div>
                                    <div className={cn("text-xs uppercase tracking-widest",
                                        i === 0 ? "text-white/70" : "text-(--color-text-tertiary)")}>
                                        {m.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionReveal>
                </div>
            </section>
        </div>
    )
}