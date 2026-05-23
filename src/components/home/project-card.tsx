// components/home/project-card.tsx
// ============================================================
// Card flutuante no hover — só imagem, sem texto.
// Ao clicar captura seu próprio DOMRect para que o clip-path
// expanda a partir da posição real do card na tela.
// ============================================================

import { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAppStore } from "@/store/use-app-store"
import { useCardPosition } from "@/hooks/use-card-position"
import { cardReveal } from "@/lib/motion"
import { projects } from "@/data/projects"
import type { ProjectData } from "@/types/project"

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
            style={{ position: "fixed", top: position.top, left: position.left }}
            className="w-52 md:w-64 rounded-xl overflow-hidden cursor-pointer
                 border border-white/10 shadow-2xl
                 hover:border-white/20 transition-[border-color] duration-200"
        >
            {/* Image only — aspect ratio 4:3 */}
            <div className="aspect-[4/3] w-full bg-[var(--color-bg-tertiary)] overflow-hidden">
                {project.heroImage ? (
                    <img
                        src={project.heroImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        draggable={false}
                    />
                ) : (
                    // Placeholder quando não há imagem ainda
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[var(--color-text-tertiary)] text-xs font-display">
                            {project.title}
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export function ProjectCard() {
    const hoveredProject = useAppStore((s) => s.hoveredProject)
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