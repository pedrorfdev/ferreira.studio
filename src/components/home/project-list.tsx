// components/home/project-list.tsx
// ============================================================
// Lista de projetos na home.
// IMPORTANTE: o clique aqui NÃO abre o projeto.
// Só controla hover (setHovered) — o ProjectCard é quem
// captura o DOMRect e chama openProject.
// ============================================================

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
    const hoveredProject = useAppStore((s) => s.hoveredProject)
    const setHovered = useAppStore((s) => s.setHovered)

    const isHovered = hoveredProject?.id === project.id
    const anyHovered = hoveredProject !== null

    return (
        <motion.div
            variants={slideUp}
            // div, não button — não é clicável aqui
            // O clique para abrir está no ProjectCard
            onMouseEnter={() => setHovered(project)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "flex items-baseline gap-4 w-full py-3 select-none",
                index !== 0 && "border-t border-[var(--color-border-subtle)]",
                "transition-opacity duration-300 ease-out",
                anyHovered && !isHovered ? "opacity-25" : "opacity-100",
            )}
        >
            {/* Index */}
            <span className="text-xs tabular-nums text-[var(--color-text-tertiary)] w-5 shrink-0">
                {String(index + 1).padStart(2, "0")}
            </span>

            {/* Title */}
            <span
                className={cn(
                    "font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-none",
                    "transition-colors duration-200",
                    isHovered ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]",
                )}
            >
                {project.title}
            </span>

            {/* Status badge */}
            {project.status === "in progress" && (
                <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)] border border-[var(--color-border)] rounded-full px-2 py-0.5 ml-auto shrink-0">
                    In progress
                </span>
            )}
        </motion.div>
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
                <ProjectItem key={project.id} project={project} index={index} />
            ))}
        </motion.div>
    )
}