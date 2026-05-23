// components/menu/menu-overlay.tsx
// Stub — implementado na Phase 4
import { motion } from "framer-motion"
export function MenuOverlay() {
    return (
        <motion.div
            className="fixed inset-0 z-[80] bg-[var(--color-bg-primary)] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <p className="text-[var(--color-text-tertiary)] text-sm">Menu — Phase 4</p>
        </motion.div>
    )
}