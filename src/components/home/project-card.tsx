// components/home/project-card.tsx
// ============================================================
// Card flutuante no hover:
// - Só imagem, sem texto
// - Maior (w-72 md:w-80), menos arredondado (rounded-lg)
// - Aspect ratio 16/10 — mais largo e impactante
// - Ao clicar captura SEU PRÓPRIO DOMRect (não o item da lista)
//   para que o clip-path expanda a partir daqui
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
        // Captura a posição DESTE card — o clip-path vai partir daqui
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
                // Translada para o centro do card ficar na posição
                transform: "translate(-50%, -50%)",
            }}
            className="w-72 md:w-80 rounded-lg overflow-hidden cursor-pointer
                 border border-white/10 shadow-2xl
                 hover:border-white/20 transition-[border-color] duration-300
                 hover:scale-[1.02] transition-transform"
        >
            {/* Imagem apenas — aspect 16:10 */}
            <div className="aspect-[16/10] w-full bg-[var(--color-bg-tertiary)] overflow-hidden">
                {project.heroImage ? (
                    <img
                        src={project.heroImage}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[var(--color-bg-secondary)]">
                        <span className="font-display text-sm text-[var(--color-text-tertiary)]">
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