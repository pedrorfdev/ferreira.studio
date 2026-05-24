// components/project/project-view.tsx
// ============================================================
// Roteador de layouts — cada projeto usa um layout diferente.
// O layout é determinado pelo project.id.
// ============================================================

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { useAppStore } from "@/store/use-app-store"
import { useClipPathTransition } from "@/hooks/use-clip-path-transition"
import { AppState } from "@/types/project"
import type { ProjectData } from "@/types/project"
import { transitions } from "@/lib/motion"
import { ProjectNav } from "@/components/project/project-nav"

import { PraxisLayout } from "@/components/project/layouts/praxis-layout"
import { VamboraLayout } from "@/components/project/layouts/vambora-layout"
import { CargaLayout } from "@/components/project/layouts/carga-layout"
import { CereeLayout } from "@/components/project/layouts/ceree-layout"
import { PulsoLayout } from "@/components/project/layouts/pulso-layout"

interface Props { project: ProjectData }

// Mapeia id → componente de layout
function resolveLayout(project: ProjectData, scrollY: number) {
    const props = { project, scrollY }
    switch (project.id) {
        case "praxis": return <PraxisLayout  {...props} />
        case "vambora": return <VamboraLayout {...props} />
        case "carga": return <CargaLayout   {...props} />
        case "ceree": return <CereeLayout   {...props} />
        case "pulso": return <PulsoLayout   {...props} />
        default: return <PraxisLayout  {...props} />
    }
}

export function ProjectView({ project }: Props) {
    const setAppState = useAppStore((s) => s.setAppState)
    const closeProject = useAppStore((s) => s.closeProject)
    const appState = useAppStore((s) => s.appState)
    const { origin, expanded } = useClipPathTransition()

    const containerRef = useRef<HTMLDivElement>(null)
    const [scrollY, setScrollY] = useState(0)
    const [progress, setProgress] = useState(0)

    const handleScroll = useCallback(() => {
        const el = containerRef.current
        if (!el) return
        const max = el.scrollHeight - el.clientHeight
        setScrollY(el.scrollTop)
        setProgress(max > 0 ? el.scrollTop / max : 0)
    }, [])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        el.addEventListener("scroll", handleScroll, { passive: true })
        return () => el.removeEventListener("scroll", handleScroll)
    }, [handleScroll])

    useEffect(() => {
        containerRef.current?.scrollTo({ top: 0 })
        setScrollY(0)
        setProgress(0)
    }, [project.id])

    function handleAnimationComplete() {
        if (appState === AppState.EXPANDING) setAppState(AppState.PROJECT)
    }

    return (
        <>
            {/* ProjectNav pill — fora do clip-path */}
            <motion.div
                className="fixed inset-0 z-92 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
            >
                <ProjectNav project={project} scrollY={scrollY} onClose={closeProject} />
            </motion.div>

            {/* View principal */}
            <motion.div
                data-project={project.id}
                className="fixed inset-0 z-20 bg-(--color-bg-primary) flex flex-col"
                initial={{ clipPath: origin }}
                animate={{ clipPath: expanded }}
                exit={{ clipPath: origin }}
                transition={transitions.cinematic}
                onAnimationComplete={handleAnimationComplete}
            >
                {/* Progress bar */}
                <div className="absolute top-0 left-0 right-0 h-px z-10 bg-(--color-border-subtle) pointer-events-none">
                    <motion.div
                        className="h-full bg-(--color-accent) origin-left"
                        style={{ scaleX: progress }}
                    />
                </div>

                {/* Scroll container */}
                <div ref={containerRef} className="flex-1 overflow-y-auto overscroll-none">
                    <div className="pt-20">
                        {resolveLayout(project, scrollY)}
                    </div>
                    <div className="h-24" />
                </div>
            </motion.div>
        </>
    )
}