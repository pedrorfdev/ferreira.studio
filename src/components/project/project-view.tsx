// components/project/project-view.tsx
// ============================================================
// - Nav global some quando projeto abre (z-index abaixo do view)
// - ProjectNav pill aparece no topo centralizado
// - Clip-path parte das coords reais do card flutuante
// - data-project aplica tema CSS do projeto
// - theme light funciona: var() herda do root/.dark/.light
// ============================================================

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { useAppStore } from "@/store/use-app-store"
import { useClipPathTransition } from "@/hooks/use-clip-path-transition"
import { AppState } from "@/types/project"
import type { ProjectData } from "@/types/project"
import { transitions } from "@/lib/motion"
import { ProjectNav } from "@/components/project/project-nav"

import { SectionHero } from "@/components/project/sections/section-hero"
import { SectionProblem } from "@/components/project/sections/section-problem"
import { SectionIdea } from "@/components/project/sections/section-idea"
import { SectionSolution } from "@/components/project/sections/section-solution"
import { SectionAnalysis } from "@/components/project/sections/section-analysis"
import { SectionTechnicalDecisions } from "@/components/project/sections/section-technical-decisions"
import { SectionResult } from "@/components/project/sections/section-result"

interface Props { project: ProjectData }

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
            {/* ProjectNav — pill centralizado, fora do motion.div
          para não ser afetado pelo clip-path */}
            <motion.div
                className="fixed inset-0 z-[92] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
            >
                <ProjectNav
                    project={project}
                    scrollY={scrollY}
                    onClose={closeProject}
                />
            </motion.div>

            {/* View principal com clip-path */}
            <motion.div
                data-project={project.id}
                className="fixed inset-0 z-20 bg-[var(--color-bg-primary)] flex flex-col"
                initial={{ clipPath: origin }}
                animate={{ clipPath: expanded }}
                exit={{ clipPath: origin }}
                transition={transitions.cinematic}
                onAnimationComplete={handleAnimationComplete}
            >
                {/* Scroll progress bar */}
                <div className="absolute top-0 left-0 right-0 h-px z-10 bg-[var(--color-border-subtle)] pointer-events-none">
                    <motion.div
                        className="h-full bg-[var(--color-accent)] origin-left"
                        style={{ scaleX: progress }}
                    />
                </div>

                {/* Scroll container — pt-20 pra não ficar embaixo do pill */}
                <div
                    ref={containerRef}
                    className="flex-1 overflow-y-auto overscroll-none"
                >
                    <div className="pt-20">
                        <SectionHero project={project} />
                        <SectionProblem project={project} />
                        <SectionIdea project={project} />
                        <SectionSolution project={project} />
                        <SectionAnalysis project={project} />
                        <SectionTechnicalDecisions project={project} />
                        <SectionResult project={project} />
                        <div className="h-32" />
                    </div>
                </div>
            </motion.div>
        </>
    )
}