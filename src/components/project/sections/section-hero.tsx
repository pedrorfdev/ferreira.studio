// components/project/sections/section-hero.tsx
// ============================================================
// First section of the case study.
// Shows project title, tagline, meta info, and hero image.
// Appears immediately after the clip-path expansion completes.
// ============================================================

import { motion } from "framer-motion"
import { SectionReveal } from "@/components/project/section-reveal"
import { cn } from "@/lib/cn"
import { fadeInSlow } from "@/lib/motion"
import type { ProjectData } from "@/types/project"

interface Props {
    project: ProjectData
}

const STATUS_LABEL: Record<ProjectData["status"], string> = {
    "shipped": "Shipped",
    "in progress": "In Progress",
    "concept": "Concept",
}

export function SectionHero({ project }: Props) {
    return (
        <section className="min-h-screen flex flex-col justify-end pb-16 px-8 md:px-16 pt-28 relative">

            {/* Hero background image — subtle, behind content */}
            {project.heroImage && (
                <motion.div
                    className="absolute inset-0 z-0"
                    variants={fadeInSlow}
                    initial="hidden"
                    animate="visible"
                >
                    <img
                        src={project.heroImage}
                        alt=""
                        aria-hidden
                        className="w-full h-full object-cover opacity-20"
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/60 to-transparent" />
                </motion.div>
            )}

            <div className="relative z-10 max-w-4xl">
                {/* Meta row — year, status, tags */}
                <SectionReveal className="flex items-center gap-3 flex-wrap mb-6">
                    <span className="text-xs tabular-nums text-[var(--color-text-tertiary)]">
                        {project.year}
                    </span>

                    <span className="text-[var(--color-border)]">·</span>

                    <span
                        className={cn(
                            "text-xs uppercase tracking-[0.1em] px-2.5 py-0.5 rounded-full border",
                            project.status === "shipped"
                                ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                                : "border-[var(--color-border)] text-[var(--color-text-tertiary)]"
                        )}
                    >
                        {STATUS_LABEL[project.status]}
                    </span>

                    <span className="text-[var(--color-border)]">·</span>

                    <div className="flex gap-1.5 flex-wrap">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </SectionReveal>

                {/* Title */}
                <SectionReveal delay={0.05}>
                    <h1 className="font-display text-6xl md:text-8xl font-semibold tracking-[-0.03em] leading-none text-[var(--color-text-primary)] mb-4">
                        {project.title}
                    </h1>
                </SectionReveal>

                {/* Tagline */}
                <SectionReveal delay={0.1}>
                    <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
                        {project.tagline}
                    </p>
                </SectionReveal>

                {/* Scroll hint */}
                <SectionReveal delay={0.2} className="mt-12">
                    <div className="flex items-center gap-3 text-[var(--color-text-tertiary)]">
                        <div className="w-px h-8 bg-current opacity-40" />
                        <span className="text-xs uppercase tracking-[0.15em]">Scroll to explore</span>
                    </div>
                </SectionReveal>
            </div>
        </section>
    )
}