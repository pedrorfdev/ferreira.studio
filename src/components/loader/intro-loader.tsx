// components/loader/intro-loader.tsx
// Usa useI18n para texto traduzido no loader
import { useEffect } from "react"
import { motion } from "framer-motion"
import { useAppStore } from "@/store/use-app-store"
import { useI18n } from "@/lib/i18n-context"
import { staggerContainer, loaderReveal, loaderExit } from "@/lib/motion"

const LOADER_DURATION = 1800

export function IntroLoader() {
    const finishLoading = useAppStore((s) => s.finishLoading)
    const { t } = useI18n()

    useEffect(() => {
        const timer = setTimeout(finishLoading, LOADER_DURATION)
        return () => clearTimeout(timer)
    }, [finishLoading])

    return (
        <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center bg-(--color-bg-primary)"
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
                <motion.h1
                    className="font-display text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-(--color-text-primary)"
                    variants={loaderReveal}
                >
                    Pedro Ferreira
                </motion.h1>
                <motion.p
                    className="text-xs tracking-[0.18em] uppercase text-(--color-text-tertiary)"
                    variants={loaderReveal}
                >
                    {t.loader.role}
                </motion.p>
                <motion.div
                    className="mt-2 h-px w-10 bg-(--color-accent)"
                    variants={loaderReveal}
                />
            </motion.div>
        </motion.div>
    )
}