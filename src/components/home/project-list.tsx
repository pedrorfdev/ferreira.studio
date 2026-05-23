// components/home/project-list.tsx
// ============================================================
// Vertical list of projects shown on the home screen.
// Hover updates the global store (background crossfade + card).
// Click captures the card's DOMRect and triggers expansion.
// ============================================================

import { useRef } from "react"
import { motion } from "framer-motion"
import { useAppStore } from "@/store/use-app-store"
import { projects } from "@/data/projects"
import { cn } from "@/lib/cn"
import { staggerContainer, slideUp } from "@/lib/motion"
import type { ProjectData } from "@/types/project"

interface ProjectItemProps {
    project: ProjectData
    index: number
}

function ProjectItem({ project, index }: ProjectItemProps) {
    const ref = useRef<HTMLButtonElement>(null)
    const hoveredProject = useAppStore((s) => s.hoveredProject)
    const setHovered = useAppStore((s) => s.setHovered)
    const openProject = useAppStore((s) => s.openProject)

    const isHovered = hoveredProject?.id === project.id
    const anyHovered = hoveredProject !== null

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
        <motion.button
            ref={ref}
            variants={slideUp}
            onClick={handleClick}
            onMouseEnter={() => setHovered(project)}
            onMouseLeave={() => setHovered(null)}
            aria-label={`Open ${project.title} case study`}
            className={cn(
                // Layout
                "group flex items-baseline gap-4 w-full text-left",
                "py-3 cursor-pointer select-none",
                // Border top — subtle separator
                index !== 0 && "border-t border-[var(--color-border-subtle)]",
                // Transition
                "transition-opacity duration-300 ease-out",
                // Dim non-hovered items when any item is hovered
                anyHovered && !isHovered && "opacity-30",
                !anyHovered && "opacity-100",
            )}
        >
            {/* Index number — small, tertiary */}
            <span className="text-xs tabular-nums text-[var(--color-text-tertiary)] w-5 shrink-0">
                {String(index + 1).padStart(2, "0")}
            </span>

            {/* Project title */}
            <span
                className={cn(
                    "font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-none",
                    "transition-colors duration-200",
                    isHovered
                        ? "text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-secondary)]",
                )}
            >
                {project.title}
            </span>

            {/* Status badge — only on in-progress projects */}
            {project.status === "in progress" && (
                <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)] border border-[var(--color-border)] rounded-full px-2 py-0.5 ml-auto shrink-0">
                    In progress
                </span>
            )}

            {/* Arrow — appears on hover */}
            <motion.span
                className="ml-auto text-[var(--color-accent)] text-lg leading-none shrink-0"
                initial={{ opacity: 0, x: -6 }}
                animate={isHovered
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -6 }
                }
                transition={{ duration: 0.2 }}
                aria-hidden
            >
                →
            </motion.span>
        </motion.button>
    )
}

export function ProjectList() {
    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col w-full"
        >
            {projects.map((project, index) => (
                <ProjectItem
                    key={project.id}
                    project={project}
                    index={index}
                />
            ))}
        </motion.div>
    )
}