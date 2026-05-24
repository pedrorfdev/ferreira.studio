// components/home/project-card.tsx
// ============================================================
// ÚNICO responsável por abrir o projeto.
// Fluxo: hover → card aparece → click → scale up → clip-path expande
//
// O scale no click é feito via animate state local antes de
// chamar openProject, dando o efeito de "lançamento" do card.
// O DOMRect capturado APÓS o scale garante que a expansão
// parte das dimensões corretas do card animado.
// ============================================================

import { useRef, useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { useAppStore } from "@/store/use-app-store"
import { useCardPosition } from "@/hooks/use-card-position"
import { projects } from "@/data/projects"
import type { ProjectData } from "@/types/project"

const CARD_REVEAL: Variants = {
    hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        filter: "blur(3px)",
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
}

interface CardProps {
    project: ProjectData
    index: number
}

function Card({ project, index }: CardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const openProject = useAppStore((s) => s.openProject)
    const position = useCardPosition(index)
    const [clicking, setClicking] = useState(false)

    function handleClick() {
        if (clicking || !ref.current) return
        setClicking(true)

        // Pequeno delay para o scale animation rodar primeiro
        // depois captura o DOMRect e abre
        setTimeout(() => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()
            openProject(project, {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            })
        }, 180)
    }

    return (
        <motion.div
            ref={ref}
            role="button"
            tabIndex={0}
            aria-label={`Open ${project.title}`}
            onClick={handleClick}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            variants={CARD_REVEAL}
            initial="hidden"
            animate={clicking ? { scale: 1.60, filter: "blur(0px)", opacity: 1 } : "visible"}
            exit="exit"
            transition={clicking
                ? { duration: 0.18, ease: [0.34, 1.56, 0.64, 1] }
                : undefined
            }
            style={{
                position: "fixed",
                top: position.top,
                left: position.left,
                transform: "translate(-50%, -50%)",
                // Elevação via z-index pra ficar acima do background
                zIndex: 25,
            }}
            className="w-72 md:w-2xl rounded-lg overflow-hidden cursor-pointer
                 border border-white/10 shadow-2xl"
        >
            {/* Imagem — aspect 16:10 */}
            <div className="aspect-16/10 w-full overflow-hidden bg-(--color-bg-tertiary)">
                {project.heroImage ? (
                    <img
                        src={project.heroImage}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-(--color-bg-secondary)">
                        <span className="font-display text-sm text-(--color-text-tertiary)">
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