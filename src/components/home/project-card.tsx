// components/home/project-card.tsx
// ============================================================
// Floating card that appears on project hover.
// Position is fixed per project (seeded, consistent).
// On click it captures its own DOMRect and passes to the store
// so the clip-path expansion in Phase 3 knows the origin.
// ============================================================

import { useRef } from "react"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { useAppStore } from "@/store/use-app-store"
import { useCardPosition } from "@/hooks/use-card-position"
import { cardReveal } from "@/lib/motion"
import { cn } from "@/lib/cn"
import { projects } from "@/data/projects"
import type { ProjectData } from "@/types/project"

// ── Single card ──────────────────────────────────────────────

interface CardProps {
    project: ProjectData
    index: number
}

function Card({ project, index }: CardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const openProject = useAppStore((s) => s.openProject)
    const position = useCardPosition(index)

    function handleClick() {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        openProject(project, {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        })
    }

    return (
        <motion.div
            ref={ref}
            role="button"
            tabIndex={0}
            aria-label={`Open ${project.title}`}
            onClick={handleClick}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            variants={cardReveal}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
                position: "fixed",
                top: position.top,
                left: position.left,
            }}
            className={cn(
                // Size
                "w-56 md:w-64",
                // Surface
                "rounded-xl overflow-hidden",
                "border border-[var(--color-border)]",
                "bg-[var(--color-overlay)]",
                "backdrop-blur-md",
                // Interaction
                "cursor-pointer",
                "transition-[border-color] duration-200",
                "hover:border-[var(--color-border-strong)]",
            )}
        >
            {/* Preview image */}
            <div className="aspect-video w-full overflow-hidden bg-[var(--color-bg-tertiary)]">
                {project.heroImage && (
                    <img
                        src={project.heroImage}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                )}
            </div>

            {/* Card body */}
            <div className="p-3 flex flex-col gap-1.5">
                {/* Title + year */}
                <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-semibold text-[var(--color-text-primary)] leading-none">
                        {project.title}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-tertiary)] tabular-nums shrink-0">
                        {project.year}
                    </span>
                </div>

                {/* Tagline */}
                <p className="text-xs text-[var(--color-text-secondary)] leading-snug line-clamp-2">
                    {project.tagline}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-0.5">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="text-[9px] uppercase tracking-[0.08em] text-[var(--color-text-tertiary)] border border-[var(--color-border-subtle)] rounded-full px-1.5 py-0.5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

// ── Container — renders the active card via AnimatePresence ──

export function ProjectCard() {
    const hoveredProject = useAppStore((s) => s.hoveredProject)

    // Find the index of the hovered project for stable positioning
    const hoveredIndex = hoveredProject
        ? projects.findIndex((p) => p.id === hoveredProject.id)
        : -1

    return (
        <AnimatePresence mode="wait">
            {hoveredProject && hoveredIndex !== -1 && (
                <Card
                    key={hoveredProject.id}
                    project={hoveredProject}
                    index={hoveredIndex}
                />
            )}
        </AnimatePresence>
    )
}