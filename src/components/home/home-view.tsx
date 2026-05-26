// components/home/home-view.tsx
// ============================================================
// Home com fundo de vídeo/imagem placeholder quando não há mídia
// ============================================================

import { motion } from "framer-motion"
import { ProjectList } from "@/components/home/project-list"
import { ProjectCard } from "@/components/home/project-card"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { useI18n } from "@/lib/i18n-context"
import { fadeIn } from "@/lib/motion"

export function HomeView() {
    const { t } = useI18n()

    return (
        <motion.div
            className="fixed inset-0 z-10 flex flex-col justify-end pb-10 px-6 md:px-10 pt-20"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {/* Placeholder de fundo quando não há mídia de projeto ativa */}
            {/* O BackgroundLayer já cuida do crossfade — esse é só o estado base */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <MediaPlaceholder variant="bg" aspect="" className="w-full h-full" />
            </div>

            {/* Project list */}
            <div className="relative z-10 w-full max-w-sm">
                <ProjectList />
            </div>

            {/* Identity */}
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

            {/* Floating card */}
            <ProjectCard />
        </motion.div>
    )
}