// components/navigation/nav.tsx
// ============================================================
// Nav global — some quando ProjectView está aberto.
// Dentro do projeto, a ProjectNav (pill) assume o controle.
// ============================================================

import { motion, AnimatePresence } from "framer-motion"
import { useAppStore } from "@/store/use-app-store"
import { useMenuStore } from "@/store/use-menu-store"
import { useThemeStore } from "@/store/use-theme-store"
import { useI18n } from "@/lib/i18n-context"
import { AppState } from "@/types/project"
import { cn } from "@/lib/cn"

function SunIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
    )
}
function MoonIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    )
}

export function Nav() {
    const appState = useAppStore((s) => s.appState)
    const isMenuOpen = useMenuStore((s) => s.isOpen)
    const toggleMenu = useMenuStore((s) => s.toggle)
    const closeMenu = useMenuStore((s) => s.close)
    const { theme, toggle: toggleTheme } = useThemeStore()
    const { lang, toggle: toggleLang } = useI18n()

    // Some quando projeto está aberto — ProjectNav assume
    const isProjectOpen =
        appState === AppState.PROJECT || appState === AppState.EXPANDING

    return (
        <AnimatePresence>
            {!isProjectOpen && (
                <motion.nav
                    key="global-nav"
                    className="fixed top-0 left-0 right-0 z-[90] flex items-center justify-between px-6 md:px-10 h-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* LEFT — hamburger + nome */}
                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={toggleMenu}
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMenuOpen}
                            className="flex flex-col justify-center gap-[5px] w-5 h-5 cursor-pointer
                         select-none text-[var(--color-text-primary)] shrink-0"
                            whileTap={{ scale: 0.9 }}
                        >
                            <motion.span className="block h-px bg-current origin-center"
                                animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            />
                            <motion.span className="block h-px bg-current origin-center"
                                animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                            <motion.span className="block h-px bg-current origin-center"
                                animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            />
                        </motion.button>

                        <motion.button
                            onClick={() => isMenuOpen && closeMenu()}
                            className="font-display text-sm font-medium tracking-[-0.01em]
                         text-[var(--color-text-primary)] hover:opacity-60
                         transition-opacity duration-200 cursor-pointer select-none"
                            whileTap={{ scale: 0.97 }}
                        >
                            Pedro Ferreira
                        </motion.button>
                    </div>

                    {/* RIGHT — theme + flags */}
                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]
                         transition-colors duration-200 cursor-pointer"
                            whileTap={{ scale: 0.9 }}
                        >
                            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                        </motion.button>

                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => lang !== "en" && toggleLang()}
                                title="English"
                                className={cn(
                                    "text-base leading-none cursor-pointer transition-opacity duration-200 select-none",
                                    lang === "en" ? "opacity-100" : "opacity-35 hover:opacity-60"
                                )}
                            >🇺🇸</button>
                            <button
                                onClick={() => lang !== "pt" && toggleLang()}
                                title="Português"
                                className={cn(
                                    "text-base leading-none cursor-pointer transition-opacity duration-200 select-none",
                                    lang === "pt" ? "opacity-100" : "opacity-35 hover:opacity-60"
                                )}
                            >🇧🇷</button>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    )
}