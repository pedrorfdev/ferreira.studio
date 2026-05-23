// components/home/home-view.tsx
// Stub — implementado na Phase 2
import { motion } from "framer-motion"
export function HomeView() {
    return (
        <motion.div
            className="fixed inset-0 z-10 flex items-end justify-start p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <p className="text-[var(--color-text-tertiary)] text-sm">Home — Phase 2</p>
        </motion.div>
    )
}