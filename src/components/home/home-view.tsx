// components/home/home-view.tsx
// ============================================================
// Home state — substitui o stub da Phase 1.
// Layout: lista de projetos à esquerda, headline de identidade
// no canto inferior direito, card flutuante em posição variável.
// ============================================================

import { motion } from "framer-motion"
import { ProjectList } from "@/components/home/project-list"
import { ProjectCard } from "@/components/home/project-card"
import { fadeIn } from "@/lib/motion"

export function HomeView() {
    return (
        <motion.div
            className="fixed inset-0 z-10 flex flex-col justify-end pb-10 px-6 md:px-10 pt-20"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {/* Project list — bottom-left, constrained width */}
            <div className="w-full max-w-sm">
                <ProjectList />
            </div>

            {/* Identity headline — bottom-right */}
            <motion.div
                className="absolute bottom-10 right-10 text-right hidden md:block"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
            >
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                    Full Stack · Product Engineer
                </p>
                <p className="text-xs text-[var(--color-text-tertiary)] mt-1 opacity-60">
                    Based in Brazil
                </p>
            </motion.div>

            {/* Floating project card — position varies per project */}
            <ProjectCard />
        </motion.div>
    )
}