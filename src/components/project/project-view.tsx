// components/project/project-view.tsx
// Stub — implementado na Phase 3
import { motion } from "framer-motion"
import type { ProjectData } from "@/types/project"
interface Props { project: ProjectData }
export function ProjectView({ project }: Props) {
    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-[var(--color-bg-primary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <p className="text-[var(--color-text-secondary)]">{project.title} — Phase 3</p>
        </motion.div>
    )
}