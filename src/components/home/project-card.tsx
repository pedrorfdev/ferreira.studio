// components/home/project-card.tsx
import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"
import { useAppStore } from "@/store/use-app-store"
import { useCardPosition } from "@/hooks/use-card-position"
import { projects } from "@/data/projects"
import type { ProjectData } from "@/types/project"

// ease como string resolve o erro de tipo do Framer Motion
const CARD_REVEAL: Variants = {
    hidden: { opacity: 0, scale: 0.90, filter: "blur(8px)" },
    visible: {
        opacity: 1, scale: 1, filter: "blur(0px)",
        transition: { duration: 0.32, ease: "easeOut" },
    },
    exit: {
        opacity: 0, scale: 0.94, filter: "blur(4px)",
        transition: { duration: 0.2, ease: "easeIn" },
    },
}

interface CardProps {
    project: ProjectData
    index: number
}

function Card({ project, index }: CardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const openProject = useAppStore((s) => s.openProject)
    const slot = useCardPosition(index)
    const [clicking, setClicking] = useState(false)

    function handleClick() {
        if (clicking || !ref.current) return
        setClicking(true)
        setTimeout(() => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()
            openProject(project, {
                top: rect.top, left: rect.left,
                width: rect.width, height: rect.height,
            })
        }, 200)
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
            animate={clicking ? { scale: 1.08, opacity: 1, filter: "blur(0px)" } : "visible"}
            exit="exit"
            style={{
                position: "fixed",
                top: slot.top,
                left: slot.left,
                transform: "translate(-50%, -50%)",
                zIndex: 25,
            }}
            className="w-80 md:w-96 rounded-lg overflow-hidden cursor-pointer
                 border border-white/10 shadow-2xl
                 hover:border-white/20 transition-[border-color] duration-300"
        >
            <div className="w-full overflow-hidden bg-(--color-bg-tertiary)"
                style={{ aspectRatio: "16/7" }}>
                {project.heroImage ? (
                    <img src={project.heroImage} alt={project.title}
                        className="w-full h-full object-cover" draggable={false} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center
                          bg-linear-to-br from-(--color-bg-secondary) to-(--color-bg-tertiary)">
                        <span className="font-display text-sm font-semibold text-(--color-text-tertiary)">
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
                <Card key={hoveredProject.id} project={hoveredProject} index={hoveredIndex} />
            )}
        </AnimatePresence>
    )
}