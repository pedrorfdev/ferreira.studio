// components/project/sections/section-hero.tsx
// ============================================================
// Hero redesenhado:
// - Vídeo de fundo com placeholder animado
// - Título gigante com accent color
// - Links de demo e GitHub
// - Tags com ícones Lucide
// - Stats row visual
// ============================================================

import { motion } from "framer-motion"
import { SectionReveal } from "@/components/project/section-reveal"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { cn } from "@/lib/cn"
import { fadeInSlow } from "@/lib/motion"
import { useI18n } from "@/lib/i18n-context"
import {
    ExternalLink, GitBranch, Clock, Zap,
    CheckCircle2, Circle
} from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData }

const STATUS_CONFIG = {
    "shipped": { label: "Shipped", Icon: CheckCircle2, accent: true },
    "in progress": { label: "In Progress", Icon: Zap, accent: false },
    "concept": { label: "Concept", Icon: Circle, accent: false },
}

export function SectionHero({ project }: Props) {
    const { t } = useI18n()
    const status = STATUS_CONFIG[project.status]

    return (
        <section className="relative min-h-[95vh] flex flex-col">

            {/* Background media — full bleed, 60% height */}
            <div className="absolute inset-0 z-0">
                {project.heroImage ? (
                    <motion.div
                        className="absolute inset-0"
                        variants={fadeInSlow}
                        initial="hidden"
                        animate="visible"
                    >
                        <img
                            src={project.heroImage}
                            alt=""
                            aria-hidden
                            className="w-full h-full object-cover opacity-15"
                            draggable={false}
                        />
                    </motion.div>
                ) : (
                    // Placeholder com grid animado nas cores do projeto
                    <MediaPlaceholder variant="bg" aspect="" className="absolute inset-0 w-full h-full" />
                )}

                {/* Gradient bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/70 to-[var(--color-bg-primary)]/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-end flex-1 px-8 md:px-16 pb-16 pt-8 max-w-6xl w-full mx-auto">

                {/* Top meta row */}
                <SectionReveal className="flex items-center gap-3 flex-wrap mb-10">
                    {/* Status badge com ícone */}
                    <div className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs",
                        status.accent
                            ? "border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent-muted)]"
                            : "border-[var(--color-border)] text-[var(--color-text-tertiary)]"
                    )}>
                        <status.Icon size={11} />
                        <span className="uppercase tracking-[0.1em]">{status.label}</span>
                    </div>

                    <span className="text-[var(--color-border-strong)]">·</span>
                    <span className="text-xs tabular-nums text-[var(--color-text-tertiary)]">{project.year}</span>

                    <span className="text-[var(--color-border-strong)]">·</span>

                    {/* Tags */}
                    <div className="flex gap-1.5 flex-wrap">
                        {project.tags.map((tag) => (
                            <span key={tag}
                                className="text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]
                           border border-[var(--color-border-subtle)] rounded-full px-2 py-0.5">
                                {tag}
                            </span>
                        ))}
                    </div>
                </SectionReveal>

                {/* Title — accent on key word */}
                <SectionReveal delay={0.06}>
                    <h1 className="font-display font-semibold tracking-[-0.03em] leading-none mb-6"
                        style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}>
                        {/* Primeira palavra em accent, resto normal */}
                        <span className="text-[var(--color-accent)]">{project.title.split(" ")[0]}</span>
                        {project.title.includes(" ") && (
                            <span className="text-[var(--color-text-primary)]">
                                {" "}{project.title.split(" ").slice(1).join(" ")}
                            </span>
                        )}
                    </h1>
                </SectionReveal>

                {/* Tagline */}
                <SectionReveal delay={0.1}>
                    <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed mb-10">
                        {project.tagline}
                    </p>
                </SectionReveal>

                {/* Links row */}
                <SectionReveal delay={0.14} className="flex items-center gap-4 flex-wrap mb-12">
                    {project.links?.demo && (
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm
                         bg-[var(--color-accent)] text-white
                         hover:opacity-85 transition-opacity duration-200"
                        >
                            <ExternalLink size={13} />
                            Live demo
                        </a>
                    )}
                    {project.links?.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm
                         border border-[var(--color-border)]
                         text-[var(--color-text-secondary)]
                         hover:border-[var(--color-border-strong)]
                         hover:text-[var(--color-text-primary)]
                         transition-all duration-200"
                        >
                            <GitBranch size={13} />
                            GitHub
                        </a>
                    )}

                    {/* Scroll hint */}
                    <div className="flex items-center gap-2.5 text-[var(--color-text-tertiary)] ml-auto">
                        <Clock size={11} />
                        <span className="text-xs uppercase tracking-[0.15em]">
                            {t.project.scrollHint}
                        </span>
                    </div>
                </SectionReveal>

                {/* Hero image / video placeholder — grande, visual */}
                <SectionReveal delay={0.18}>
                    <div className="w-full rounded-xl overflow-hidden border border-[var(--color-border-subtle)] shadow-2xl">
                        {project.heroVideo ? (
                            <video
                                src={project.heroVideo}
                                autoPlay muted loop playsInline
                                className="w-full aspect-video object-cover"
                            />
                        ) : project.heroImage ? (
                            <img
                                src={project.heroImage}
                                alt={project.title}
                                className="w-full aspect-video object-cover"
                            />
                        ) : (
                            <MediaPlaceholder
                                variant="hero"
                                aspect="aspect-video"
                                label={`${project.title} — Interface`}
                            />
                        )}
                    </div>
                </SectionReveal>
            </div>
        </section>
    )
}