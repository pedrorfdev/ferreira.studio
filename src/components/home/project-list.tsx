// components/home/project-list.tsx
// ============================================================
// Lista de projetos — hover controla o store.
// Itens são div com role="button" e cursor-pointer.
// O CLIQUE para abrir projeto fica no ProjectCard.
// Mas adicionamos cursor-pointer e visual feedback no item
// para que o usuário saiba que pode interagir com o card.
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
    const openProject = useAppStore((s) => s.openProject)

    const isHovered = hoveredProject?.id === project.id
    const anyHovered = hoveredProject !== null

    // Clique no item lista abre o projeto direto (sem card como intermediário)
    // usando posição aproximada do centro da tela
    function handleClick() {
        const vw = window.innerWidth
        const vh = window.innerHeight
        openProject(project, {
            top: vh * 0.4,
            left: vw * 0.15,
            width: vw * 0.3,
            height: vh * 0.2,
        })
    }

    return (
        <motion.div
            variants={slideUp}
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            onMouseEnter={() => setHovered(project)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "flex items-baseline gap-4 w-full py-3 select-none cursor-pointer",
                index !== 0 && "border-t border-(--color-border-subtle)",
                "transition-opacity duration-300 ease-out",
                anyHovered && !isHovered ? "opacity-25" : "opacity-100",
            )}
        >
            {/* Index */}
            <span className="text-xs tabular-nums text-(--color-text-tertiary) w-5 shrink-0">
                {String(index + 1).padStart(2, "0")}
            </span>

            {/* Title */}
            <span className={cn(
                "font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-none",
                "transition-colors duration-200",
                isHovered
                    ? "text-(--color-text-primary)"
                    : "text-(--color-text-secondary)",
            )}>
                {project.title}
            </span>

            {/* Arrow on hover */}
            <motion.span
                className="ml-auto text-(--color-accent) text-sm leading-none shrink-0"
                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                transition={{ duration: 0.18 }}
                aria-hidden
            >
                →
            </motion.span>

            {/* Status */}
            {project.status === "in progress" && (
                <span className="text-[10px] uppercase tracking-[0.12em] text-(--color-text-tertiary)
                         border border-(--color-border) rounded-full px-2 py-0.5 shrink-0">
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