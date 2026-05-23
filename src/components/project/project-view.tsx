// components/project/project-view.tsx
// ============================================================
// Aplica data-project="[id]" no container root —
// o CSS em project-themes.css usa esse seletor para trocar
// os tokens de cor/glow de cada projeto automaticamente.
// ============================================================

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { useAppStore } from "@/store/use-app-store"
import { useClipPathTransition } from "@/hooks/use-clip-path-transition"
import { AppState } from "@/types/project"
import type { ProjectData } from "@/types/project"
import { transitions } from "@/lib/motion"
import { cn } from "@/lib/cn"

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
    const [progress, setProgress] = useState(0)

    const handleScroll = useCallback(() => {
        const el = containerRef.current
        if (!el) return
        const max = el.scrollHeight - el.clientHeight
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
        setProgress(0)
    }, [project.id])

    function handleAnimationComplete() {
        if (appState === AppState.EXPANDING) setAppState(AppState.PROJECT)
    }

    return (
        <motion.div
            // data-project aplica o tema CSS do projeto automaticamente
            data-project={project.id}
            className="fixed inset-0 z-20 bg-[var(--color-bg-primary)]"
            initial={{ clipPath: origin }}
            animate={{ clipPath: expanded }}
            exit={{ clipPath: origin }}
            transition={transitions.cinematic}
            onAnimationComplete={handleAnimationComplete}
        >
            {/* Scroll progress bar */}
            <div className="fixed top-0 left-0 right-0 h-px z-30 bg-[var(--color-border-subtle)]">
                <motion.div
                    className="h-full bg-[var(--color-accent)] origin-left"
                    style={{ scaleX: progress }}
                />
            </div>

            {/* Close */}
            <motion.button
                onClick={closeProject}
                aria-label="Close project"
                className={cn(
                    "fixed top-5 right-6 md:right-10 z-30",
                    "text-xs uppercase tracking-[0.15em]",
                    "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]",
                    "transition-colors duration-200 cursor-pointer select-none"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                Close
            </motion.button>

            {/* Content */}
            <div ref={containerRef} className="h-full overflow-y-auto overscroll-none">
                <SectionHero project={project} />
                <SectionProblem project={project} />
                <SectionIdea project={project} />
                <SectionSolution project={project} />
                <SectionAnalysis project={project} />
                <SectionTechnicalDecisions project={project} />
                <SectionResult project={project} />
                <div className="h-32" />
            </div>
        </motion.div>
    )
}