// components/loader/intro-loader.tsx
// ============================================================
// Intro animation — shown once on first load.
// Displays "Pedro Ferreira" with a staggered reveal,
// then fades out and calls finishLoading() to transition
// to the HOME state. Unmounts via AnimatePresence in AppShell.
// ============================================================

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useAppStore } from "@/store/use-app-store"
import { loaderReveal, loaderExit, staggerContainer } from "@/lib/motion"

const LOADER_DURATION = 1800 // ms before triggering exit

export function IntroLoader() {
    const finishLoading = useAppStore((s) => s.finishLoading)

    useEffect(() => {
        const timer = setTimeout(finishLoading, LOADER_DURATION)
        return () => clearTimeout(timer)
    }, [finishLoading])

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-bg-primary)]"
            variants={loaderExit}
            initial="visible"
            exit="exit"
        >
            <motion.div
                className="flex flex-col items-center gap-3 select-none"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {/* Name — primary headline */}
                <motion.h1
                    className="font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]"
                    variants={loaderReveal}
                >
                    Pedro Ferreira
                </motion.h1>

                {/* Role — secondary line */}
                <motion.p
                    className="text-sm tracking-[0.18em] uppercase text-[var(--color-text-tertiary)]"
                    variants={loaderReveal}
                >
                    Product Engineer
                </motion.p>

                {/* Accent line — decorative, signals loading */}
                <motion.div
                    className="mt-2 h-px w-12 bg-[var(--color-accent)]"
                    variants={loaderReveal}
                />
            </motion.div>
        </motion.div>
    )
}