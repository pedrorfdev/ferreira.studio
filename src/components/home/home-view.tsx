// components/home/home-view.tsx
// Mobile: sem card flutuante, lista ocupa tela inteira
// Desktop: layout original com cards flutuantes
import { motion } from "framer-motion"
import { ProjectList } from "@/components/home/project-list"
import { ProjectCard } from "@/components/home/project-card"
import { useI18n } from "@/lib/i18n-context"
import { fadeIn } from "@/lib/motion"

export function HomeView() {
    const { t } = useI18n()

    return (
        <motion.div
            className="fixed inset-0 z-10 flex flex-col justify-end"
            variants={fadeIn} initial="hidden" animate="visible" exit="exit"
        >
            {/* Lista de projetos
          Mobile: padding lateral menor, ocupa mais espaço
          Desktop: max-w-sm, canto inferior esquerdo */}
            <div className="relative z-10 px-6 md:px-10 pb-8 md:pb-10 w-full md:max-w-sm">
                <ProjectList />
            </div>

            {/* Identity — só desktop */}
            <motion.div
                className="absolute bottom-10 right-10 text-right hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <p className="text-xs uppercase tracking-[0.18em] text-(--color-text-tertiary)">
                    {t.home.role}
                </p>
                <p className="text-xs text-(--color-text-tertiary) mt-1 opacity-60">
                    {t.home.location}
                </p>
            </motion.div>

            {/* Card flutuante — só desktop (md+) */}
            <div className="hidden md:block">
                <ProjectCard />
            </div>
        </motion.div>
    )
}