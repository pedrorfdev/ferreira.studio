// components/project/layouts/vambora-layout.tsx
// Timeline em curva + tabs + resultado split
import { useState } from "react"
import { motion } from "framer-motion"
import { useProjectContent } from "@/hooks/use-project-content"
import { SectionReveal } from "@/components/project/section-reveal"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/cn"
import {
    Map, Clock, Wallet, Users, Globe, Code2,
    Zap, ExternalLink, GitBranch, ArrowRight
} from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData; scrollY: number }

const ITEM_ICONS = [Map, Clock, Wallet, Users, Globe, Code2]

export function VamboraLayout({ project }: Props) {
    const { t, lang } = useI18n()
    const content = useProjectContent(project)
    const [tab, setTab] = useState(0)
    const decisions = content.sections.technicalDecisions?.decisions ?? []
    const items = content.sections.solution?.items ?? []

    const timelineData = [
        { key: "problem", label: t.project.sections.problem, headline: content.sections.problem?.headline, body: content.sections.problem?.body },
        { key: "idea", label: t.project.sections.idea, headline: content.sections.idea?.headline, body: content.sections.idea?.body },
        { key: "solution", label: t.project.sections.solution, headline: content.sections.solution?.headline, body: content.sections.solution?.body },
        { key: "analysis", label: t.project.sections.analysis, headline: content.sections.analysis?.headline, body: content.sections.analysis?.body },
    ].filter(d => d.headline)

    return (
        <div className="flex flex-col">
            {/* HERO */}
            <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 relative overflow-hidden">
                <div className="absolute inset-0">
                    {project.media?.src
                        ? <img src={project.media.src} alt="" className="w-full h-full object-cover opacity-20" loading="lazy" decoding="async" />
                        : <MediaPlaceholder variant="bg" aspect="" className="w-full h-full opacity-15" />
                    }
                    <div className="absolute inset-0 bg-linear-to-br from-(--color-bg-primary) via-transparent to-(--color-bg-primary)" />
                </div>
                <div className="absolute right-16 top-1/3 w-72 h-72 rounded-full bg-(--color-accent)/8 blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-4xl">
                    <SectionReveal>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-accent)/30 bg-(--color-accent-muted) mb-8">
                            <Zap size={11} className="text-(--color-accent)" />
                            <span className="text-xs uppercase tracking-[0.12em] text-(--color-accent)">AI-powered · {project.year}</span>
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
                        <p className="text-xl text-(--color-text-secondary) max-w-lg leading-relaxed mb-10">{content.tagline}</p>
                    </SectionReveal>
                    <SectionReveal delay={0.14} className="flex gap-3 flex-wrap">
                        {project.links?.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-(--color-accent) text-white hover:opacity-85 transition-opacity">
                                <ExternalLink size={13} /> {lang === "pt" ? "Acessar" : "Try it live"}
                            </a>
                        )}
                        {project.links?.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border border-(--color-border) text-(--color-text-secondary) hover:border-(--color-accent)/50 transition-colors">
                                <GitBranch size={13} /> GitHub
                            </a>
                        )}
                    </SectionReveal>
                </div>
                <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                    <div className="w-px h-10 bg-linear-to-b from-transparent to-(--color-accent)/50 mx-auto" />
                </motion.div>
            </section>

            {/* HERO IMAGE */}
            <SectionReveal className="px-8 md:px-16 mb-32">
                <div className="rounded-2xl overflow-hidden border border-(--color-border-subtle) shadow-2xl">
                    {project.heroVideo
                        ? <video src={project.heroVideo} autoPlay muted loop playsInline poster={project.heroImage} className="w-full aspect-video object-cover" />
                        : project.heroImage
                            ? <img src={project.heroImage} alt={project.title} className="w-full aspect-video object-cover" loading="lazy" />
                            : <MediaPlaceholder variant="hero" aspect="aspect-video" label="Vambora.ai — Itinerary Generator" />
                    }
                </div>
            </SectionReveal>

            {/* TIMELINE EM CURVA */}
            <section className="px-6 md:px-16 mb-32 max-w-5xl mx-auto w-full">
                <SectionReveal className="text-center mb-16">
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary)">
                        {lang === "pt" ? "A jornada do produto" : "Product journey"}
                    </span>
                </SectionReveal>

                <div className="relative flex flex-col gap-8">
                    {/* Linha vertical pontilhada — só desktop */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-(--color-border) hidden md:block pointer-events-none" />

                    {timelineData.map((item, i) => {
                        const isLeft = i % 2 === 0
                        return (
                            <SectionReveal key={item.key} delay={i * 0.1}>
                                <div className={cn(
                                    "flex items-center gap-4 md:gap-0",
                                    "md:grid md:grid-cols-[1fr_auto_1fr]"
                                )}>
                                    {/* Conteúdo esquerda */}
                                    <div className={cn("md:pr-10", isLeft ? "md:block" : "md:invisible md:pointer-events-none")}>
                                        {isLeft && (
                                            <div className={cn("p-6 rounded-xl border h-full",
                                                i === 0
                                                    ? "bg-(--color-accent-muted) border-(--color-accent)/30"
                                                    : "bg-(--color-bg-secondary) border-(--color-border)"
                                            )}>
                                                <span className={cn("text-[10px] uppercase tracking-[0.16em] block mb-2",
                                                    i === 0 ? "text-(--color-accent)" : "text-(--color-text-tertiary)")}>
                                                    {item.label}
                                                </span>
                                                <h3 className="font-display text-lg font-semibold text-(--color-text-primary) leading-snug mb-2">
                                                    {item.headline}
                                                </h3>
                                                <p className="text-xs text-(--color-text-secondary) leading-relaxed line-clamp-3">{item.body}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Nó central */}
                                    <div className="flex flex-col items-center shrink-0 z-10">
                                        <div className={cn("w-10 h-10 rounded-full border-2 flex items-center justify-center",
                                            i === 0
                                                ? "bg-(--color-accent) border-(--color-accent)"
                                                : "bg-(--color-bg-primary) border-(--color-border)"
                                        )}>
                                            <span className={cn("font-display text-sm font-bold",
                                                i === 0 ? "text-white" : "text-(--color-text-tertiary)")}>
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Conteúdo direita */}
                                    <div className={cn("md:pl-10 flex-1 md:flex-none", !isLeft ? "md:block" : "md:invisible md:pointer-events-none")}>
                                        {!isLeft && (
                                            <div className="p-6 rounded-xl border bg-(--color-bg-secondary) border-(--color-border)">
                                                <span className="text-[10px] uppercase tracking-[0.16em] text-(--color-text-tertiary) block mb-2">
                                                    {item.label}
                                                </span>
                                                <h3 className="font-display text-lg font-semibold text-(--color-text-primary) leading-snug mb-2">
                                                    {item.headline}
                                                </h3>
                                                <p className="text-xs text-(--color-text-secondary) leading-relaxed line-clamp-3">{item.body}</p>
                                            </div>
                                        )}
                                        {/* Mobile — mostra direto */}
                                        <div className="md:hidden p-5 rounded-xl border bg-(--color-bg-secondary) border-(--color-border)">
                                            <span className="text-[10px] uppercase tracking-[0.16em] text-(--color-text-tertiary) block mb-2">{item.label}</span>
                                            <h3 className="font-display text-base font-semibold text-(--color-text-primary) leading-snug mb-1">{item.headline}</h3>
                                            <p className="text-xs text-(--color-text-secondary) leading-relaxed line-clamp-2">{item.body}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Seta entre nós */}
                                {i < timelineData.length - 1 && (
                                    <motion.div className="flex justify-center mt-2"
                                        animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
                                        <ArrowRight size={14} className="text-(--color-accent)/40 rotate-90" />
                                    </motion.div>
                                )}
                            </SectionReveal>
                        )
                    })}
                </div>
            </section>

            {/* FEATURE GRID */}
            <section className="px-8 md:px-16 mb-24 max-w-6xl mx-auto w-full border-t border-(--color-border-subtle) pt-20">
                <SectionReveal className="mb-8">
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) block mb-2">{t.project.sections.solution}</span>
                    <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.solution?.headline}
                    </h2>
                </SectionReveal>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((item, i) => {
                        const Icon = ITEM_ICONS[i % ITEM_ICONS.length]
                        return (
                            <SectionReveal key={i} delay={i * 0.06}>
                                <div className={cn("p-5 rounded-xl border h-full flex flex-col gap-3 transition-colors",
                                    i === 0 ? "bg-(--color-accent) border-(--color-accent)"
                                        : "bg-(--color-bg-secondary) border-(--color-border) hover:border-(--color-accent)/40")}>
                                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                        i === 0 ? "bg-white/20" : "bg-(--color-accent-muted)")}>
                                        <Icon size={15} className={i === 0 ? "text-white" : "text-(--color-accent)"} />
                                    </div>
                                    <p className={cn("text-sm leading-relaxed",
                                        i === 0 ? "text-white" : "text-(--color-text-secondary)")}>{item}</p>
                                </div>
                            </SectionReveal>
                        )
                    })}
                </div>
            </section>

            {/* DECISÕES — tabs */}
            <section className="px-8 md:px-16 mb-24 max-w-6xl mx-auto w-full border-t border-(--color-border-subtle) pt-20">
                <SectionReveal className="mb-6">
                    <span className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary) block mb-2">{t.project.sections.technical}</span>
                    <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-(--color-text-primary)">
                        {content.sections.technicalDecisions?.headline}
                    </h2>
                </SectionReveal>
                <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
                    {decisions.map((dec, i) => (
                        <button key={i} onClick={() => setTab(i)}
                            className={cn("px-4 py-2 rounded-lg text-xs whitespace-nowrap cursor-pointer transition-all shrink-0",
                                tab === i ? "bg-(--color-accent) text-white" : "bg-(--color-bg-secondary) text-(--color-text-tertiary) hover:text-(--color-text-primary)")}>
                            {dec.title}
                        </button>
                    ))}
                </div>
                <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
                    className="p-6 rounded-xl bg-(--color-bg-secondary) border border-(--color-border)">
                    {decisions[tab] && (
                        <>
                            <p className="text-sm text-(--color-text-primary) leading-relaxed mb-4">{decisions[tab].why}</p>
                            {decisions[tab].trade && (
                                <div className="pt-4 border-t border-(--color-border-subtle)">
                                    <span className="text-[10px] uppercase tracking-[0.12em] text-(--color-accent) block mb-2">{t.project.tradeoff}</span>
                                    <p className="text-xs text-(--color-text-secondary)">{decisions[tab].trade}</p>
                                </div>
                            )}
                        </>
                    )}
                </motion.div>
            </section>

            {/* RESULTADO */}
            <section className="px-8 md:px-16 max-w-6xl mx-auto w-full border-t border-(--color-border-subtle) pt-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <SectionReveal>
                        <span className="text-xs uppercase tracking-[0.18em] text-(--color-accent) block mb-4">{t.project.sections.result}</span>
                        <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-(--color-text-primary) leading-tight mb-6">
                            {content.sections.result?.headline}
                        </h2>
                        <p className="text-base text-(--color-text-secondary) leading-relaxed mb-6">{content.sections.result?.body}</p>
                        {project.links?.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-(--color-accent) hover:opacity-70 transition-opacity">
                                {lang === "pt" ? "Experimentar" : "Try it"} <ArrowRight size={13} />
                            </a>
                        )}
                    </SectionReveal>
                    <SectionReveal delay={0.08}>
                        <div className="flex flex-col gap-3">
                            {content.sections.result?.metrics?.map((m, i) => (
                                <div key={i} className={cn("p-5 rounded-xl border flex items-center gap-6",
                                    i === 0 ? "bg-(--color-accent) border-(--color-accent)" : "bg-(--color-bg-secondary) border-(--color-border)")}>
                                    <div className={cn("font-display text-4xl font-bold shrink-0",
                                        i === 0 ? "text-white" : "text-(--color-accent)")}>{m.value}</div>
                                    <div className={cn("text-xs uppercase tracking-widest",
                                        i === 0 ? "text-white/70" : "text-(--color-text-tertiary)")}>{m.label}</div>
                                </div>
                            ))}
                        </div>
                    </SectionReveal>
                </div>
            </section>
        </div>
    )
}