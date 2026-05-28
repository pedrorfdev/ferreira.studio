// Light: overlay branco a 55% em vez de 85%
// Dark: scrim preto a 55% em vez de 70%
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { backgroundCrossfade } from "@/lib/motion"
import { useAppStore } from "@/store/use-app-store"
import { useThemeStore } from "@/store/use-theme-store"
import { AppState } from "@/types/project"
import { AnimatePresence, motion } from "framer-motion"

const GLOBAL_BG_VIDEO = "/media/hero-bg.mp4"

export function BackgroundLayer() {
    const appState = useAppStore((s) => s.appState)
    const hoveredProject = useAppStore((s) => s.hoveredProject)
    const activeProject = useAppStore((s) => s.activeProject)
    const { theme } = useThemeStore()

    const isProject = appState === AppState.PROJECT || appState === AppState.EXPANDING
    const project = isProject ? activeProject : hoveredProject

    // Scrim adaptado ao tema — light precisa de menos opacidade
    const scrimClass = theme === "light"
        ? "bg-white/5"
        : "bg-black/30"

    return (
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-(--color-bg-primary)" />

            {/* Vídeo global da home */}
            <AnimatePresence>
                {!project && (
                    <motion.div key="global-bg" className="absolute inset-0"
                        variants={backgroundCrossfade} initial="hidden" animate="visible" exit="exit">
                        <video src={GLOBAL_BG_VIDEO} autoPlay muted loop playsInline
                            className="w-full h-full object-cover opacity-50"
                            onError={(e) => { (e.target as HTMLVideoElement).style.display = "none" }} />
                        <div className="absolute inset-0">
                            <MediaPlaceholder variant="bg" aspect="" className="w-full h-full opacity-15" />
                        </div>
                        <div className={`absolute inset-0 ${scrimClass}`} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mídia do projeto no hover */}
            <AnimatePresence>
                {project && (
                    <motion.div key={project.id} className="absolute inset-0"
                        variants={backgroundCrossfade} initial="hidden" animate="visible" exit="exit">
                        {project.heroVideo ? (
                            <video src={project.heroVideo} autoPlay muted loop playsInline
                                className="w-full h-full object-cover" />
                        ) : project.media?.src ? (
                            <img src={project.media.src} alt={project.media.alt ?? ""}
                                className="w-full h-full object-cover"
                                loading="lazy" decoding="async" draggable={false} />
                        ) : (
                            <MediaPlaceholder variant="bg" aspect="" className="absolute inset-0 w-full h-full" />
                        )}
                        <div className={`absolute inset-0 ${scrimClass}`} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}