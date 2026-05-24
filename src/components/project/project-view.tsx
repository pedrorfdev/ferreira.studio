// components/project/project-view.tsx
// ============================================================
// Close button corrigido — z-index 50 (acima da nav z-90
// não faz sentido, o close fica no layer do próprio view).
// O botão é parte do ProjectView, não da nav global,
// então fica dentro do motion.div que tem z-20.
// Fix: pointer-events-auto explícito + posição absoluta
// dentro do container (não fixed, que compete com a nav).
// ============================================================

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { useAppStore } from "@/store/use-app-store"
import { useClipPathTransition } from "@/hooks/use-clip-path-transition"
import { AppState } from "@/types/project"
import type { ProjectData } from "@/types/project"
import { transitions } from "@/lib/motion"
import { cn } from "@/lib/cn"
import { useI18n } from "@/lib/i18n-context"

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
    const { t } = useI18n()

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
            data-project={project.id}
            // z-20 — acima do background (z-0) e home (z-10),
            // abaixo da nav (z-90) e menu (z-80)
            className="fixed inset-0 z-20 bg-[var(--color-bg-primary)] flex flex-col"
            initial={{ clipPath: origin }}
            animate={{ clipPath: expanded }}
            exit={{ clipPath: origin }}
            transition={transitions.cinematic}
            onAnimationComplete={handleAnimationComplete}
        >
            {/* Scroll progress — topo */}
            <div className="absolute top-0 left-0 right-0 h-px z-10 bg-[var(--color-border-subtle)] pointer-events-none">
                <motion.div
                    className="h-full bg-[var(--color-accent)] origin-left"
                    style={{ scaleX: progress }}
                />
            </div>

            {/* Close button — absolute dentro do ProjectView,
          alinhado ao topo direito no espaço da nav (h-16) */}
            <motion.button
                onClick={(e) => {
                    e.stopPropagation()
                    closeProject()
                }}
                aria-label={t.project.close}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className={cn(
                    // Posicionado no mesmo row da nav (h-16 = 4rem)
                    "absolute top-0 right-6 md:right-10 z-10",
                    "h-16 flex items-center",
                    "text-xs uppercase tracking-[0.15em]",
                    "text-[var(--color-text-tertiary)]",
                    "hover:text-[var(--color-text-primary)]",
                    "transition-colors duration-200",
                    "cursor-pointer select-none",
                    // pointer-events explícito — garante clicabilidade
                    "pointer-events-auto"
                )}
            >
                {t.project.close}
            </motion.button>

            {/* Scrollable content — ocupa o espaço abaixo da nav */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto overscroll-none mt-16"
            >
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