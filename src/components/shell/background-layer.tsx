// components/shell/background-layer.tsx
// ============================================================
// Fundo persistente — crossfade entre projetos.
// Quando não há mídia real usa MediaPlaceholder animado.
// ============================================================

import { AnimatePresence, motion } from "framer-motion"
import { backgroundCrossfade } from "@/lib/motion"
import { useAppStore } from "@/store/use-app-store"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { AppState } from "@/types/project"

export function BackgroundLayer() {
    const appState = useAppStore((s) => s.appState)
    const hoveredProject = useAppStore((s) => s.hoveredProject)
    const activeProject = useAppStore((s) => s.activeProject)

    const project =
        appState === AppState.PROJECT || appState === AppState.EXPANDING
            ? activeProject
            : hoveredProject

    return (
        <div className="absolute inset-0 z-0">
            {/* Base escura sempre presente */}
            <div className="absolute inset-0 bg-(--color-bg-primary)" />

            <AnimatePresence>
                {project && (
                    <motion.div
                        key={project.id}
                        className="absolute inset-0"
                        variants={backgroundCrossfade}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Mídia real ou placeholder */}
                        {project.media?.src ? (
                            project.media.type === "image" ? (
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
                                    autoPlay muted loop playsInline
                                    className="w-full h-full object-cover"
                                />
                            )
                        ) : (
                            // Placeholder com identidade do projeto
                            <MediaPlaceholder
                                variant="bg"
                                aspect=""
                                className="absolute inset-0 w-full h-full"
                            />
                        )}

                        {/* Scrim */}
                        <div className="absolute inset-0 bg-(--color-scrim)" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}