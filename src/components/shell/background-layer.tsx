// components/shell/background-layer.tsx
// ============================================================
// Persistent background media layer.
// Crossfades between project backgrounds on hover/active.
// Falls back to a neutral dark base when no project is hovered.
// ============================================================

import { AnimatePresence, motion } from "framer-motion"
import { backgroundCrossfade } from "@/lib/motion"
import { useAppStore } from "@/store/use-app-store"
import { AppState } from "@/types/project"

export function BackgroundLayer() {
    const appState = useAppStore((s) => s.appState)
    const hoveredProject = useAppStore((s) => s.hoveredProject)
    const activeProject = useAppStore((s) => s.activeProject)

    // Priority: active project > hovered project > null (base)
    const project =
        appState === AppState.PROJECT || appState === AppState.EXPANDING
            ? activeProject
            : hoveredProject

    return (
        // Fills the screen, sits at z-0
        <div className="absolute inset-0 z-0">

            {/* Base — solid dark color always visible underneath */}
            <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />

            {/* Project media — crossfades on project change */}
            <AnimatePresence>
                {project?.media && (
                    <motion.div
                        key={project.id}
                        className="absolute inset-0"
                        variants={backgroundCrossfade}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {project.media.type === "image" ? (
                            <img
                                src={project.media.src}
                                alt={project.media.alt ?? ""}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        ) : (
                            <video
                                src={project.media.src}
                                poster={project.media.poster}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        )}

                        {/* Dark scrim — keeps text readable over any background */}
                        <div className="absolute inset-0 bg-[var(--color-scrim)]" />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}