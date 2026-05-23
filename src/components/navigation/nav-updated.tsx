// components/navigation/nav.tsx
// ============================================================
// Atualizado na Phase 4 para usar i18n.
// ============================================================

import { motion } from "framer-motion"
import { useAppStore } from "@/store/use-app-store"
import { useMenuStore } from "@/store/use-menu-store"
import { useI18n } from "@/lib/i18n-context"
import { AppState } from "@/types/project"
import { cn } from "@/lib/cn"

export function Nav() {
    const appState = useAppStore((s) => s.appState)
    const closeProject = useAppStore((s) => s.closeProject)
    const isMenuOpen = useMenuStore((s) => s.isOpen)
    const toggleMenu = useMenuStore((s) => s.toggle)
    const closeMenu = useMenuStore((s) => s.close)
    const { t } = useI18n()

    const isInsideProject =
        appState === AppState.PROJECT ||
        appState === AppState.EXPANDING

    function handleLogoClick() {
        if (isMenuOpen) closeMenu()
        if (isInsideProject) closeProject()
    }

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-[90]",
                "flex items-center justify-between",
                "px-6 md:px-10 h-16",
                isInsideProject && "border-b border-[var(--color-border-subtle)]"
            )}
        >
            {/* Logo */}
            <motion.button
                onClick={handleLogoClick}
                className={cn(
                    "font-display text-sm font-medium tracking-[-0.01em]",
                    "text-[var(--color-text-primary)]",
                    "transition-opacity duration-200 hover:opacity-60",
                    "cursor-pointer select-none"
                )}
                whileTap={{ scale: 0.97 }}
            >
                Pedro Ferreira
            </motion.button>

            {/* Right side */}
            <div className="flex items-center gap-5">
                {/* Menu button */}
                <motion.button
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? t.nav.close : t.nav.menu}
                    aria-expanded={isMenuOpen}
                    className="relative flex flex-col justify-center gap-[5px] w-6 h-6 cursor-pointer select-none text-[var(--color-text-primary)]"
                    whileTap={{ scale: 0.92 }}
                >
                    <motion.span
                        className="block h-px bg-current origin-center"
                        animate={isMenuOpen
                            ? { rotate: 45, y: 5.5 }
                            : { rotate: 0, y: 0 }
                        }
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    />
                    <motion.span
                        className="block h-px bg-current origin-center"
                        animate={isMenuOpen
                            ? { opacity: 0, scaleX: 0 }
                            : { opacity: 1, scaleX: 1 }
                        }
                        transition={{ duration: 0.2 }}
                    />
                    <motion.span
                        className="block h-px bg-current origin-center"
                        animate={isMenuOpen
                            ? { rotate: -45, y: -5.5 }
                            : { rotate: 0, y: 0 }
                        }
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    />
                </motion.button>
            </div>
        </nav>
    )
}