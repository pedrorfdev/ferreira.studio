// components/shell/background-layer.tsx
// ============================================================
// Fundo persistente com suporte a vídeo.
// - Na home sem hover: vídeo global de fundo (heroVideo do projeto
//   OU um vídeo global configurável)
// - No hover de projeto: media do projeto (video ou imagem)
// - Imagens carregadas com loading="lazy" e decoding="async"
// - Crossfade suave entre estados
// ============================================================

import { AnimatePresence, motion } from "framer-motion"
import { backgroundCrossfade } from "@/lib/motion"
import { useAppStore } from "@/store/use-app-store"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { AppState } from "@/types/project"

// Vídeo global de fundo na home — coloca em public/media/hero-bg.mp4
// Se não existir ainda, fica com o placeholder animado
const GLOBAL_BG_VIDEO = "/media/hero-bg.mp4"

export function BackgroundLayer() {
    const appState = useAppStore((s) => s.appState)
    const hoveredProject = useAppStore((s) => s.hoveredProject)
    const activeProject = useAppStore((s) => s.activeProject)

    const isProject = appState === AppState.PROJECT || appState === AppState.EXPANDING
    const project = isProject ? activeProject : hoveredProject

    return (
        <div className="absolute inset-0 z-0">
            {/* Base sempre presente */}
            <div className="absolute inset-0 bg-(--color-bg-primary)" />

            {/* Vídeo global de fundo — sempre tocando na home, sem hover */}
            <AnimatePresence>
                {!project && (
                    <motion.div
                        key="global-bg"
                        className="absolute inset-0"
                        variants={backgroundCrossfade}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <video
                            src={GLOBAL_BG_VIDEO}
                            autoPlay muted loop playsInline
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                // Esconde o vídeo se não existir ainda
                                ; (e.target as HTMLVideoElement).style.display = "none"
                            }}
                        />
                        {/* Placeholder só aparece se o vídeo falhar */}
                        <div className="absolute inset-0">
                            <MediaPlaceholder variant="bg" aspect="" className="w-full h-full opacity-20" />
                        </div>
                        <div className="absolute inset-0 bg-linear-to-t from-(--color-bg-primary)/60 to-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mídia do projeto no hover */}
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
                        {project.heroVideo ? (
                            // Vídeo do projeto — ideal para o hover
                            <video
                                src={project.heroVideo}
                                autoPlay muted loop playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : project.media?.src ? (
                            // Imagem de fundo do projeto
                            <img
                                src={project.media.src}
                                alt={project.media.alt ?? ""}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                                draggable={false}
                            />
                        ) : (
                            // Placeholder com identidade do projeto
                            <MediaPlaceholder variant="bg" aspect="" className="absolute inset-0 w-full h-full" />
                        )}
                        {/* Scrim */}
                        <div className="absolute inset-0 bg-(--color-scrim)" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}