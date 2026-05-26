// components/project/project-nav.tsx
// ============================================================
// Fix i18n: useI18n() re-renderiza quando lang muda —
// mas o ProjectNav precisa estar dentro do I18nProvider,
// o que já está (main.tsx). O problema era que o toggle
// do lang estava chamando toggleLang mas o componente
// não re-renderizava por estar fora do React tree normal.
// Fix: usar key no I18nProvider ou garantir que o store
// de i18n usa useState corretamente — já está correto.
// O real fix é garantir que ProjectNav usa useI18n()
// diretamente e não props de cima.
// ============================================================

import { motion } from "framer-motion"
import { useMenuStore } from "@/store/use-menu-store"
import { useThemeStore } from "@/store/use-theme-store"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/cn"
import type { ProjectData } from "@/types/project"

function SunIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
    )
}
function MoonIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    )
}

interface Props {
    project: ProjectData
    scrollY: number
    onClose: () => void
}

export function ProjectNav({ project, scrollY, onClose }: Props) {
    // Consome os stores diretamente — garante re-render ao mudar
    const toggleMenu = useMenuStore((s) => s.toggle)
    const { theme, toggle: toggleTheme } = useThemeStore()
    // useI18n() aqui dentro — re-renderiza quando lang muda
    const { lang, toggle: toggleLang, t } = useI18n()

    const expanded = scrollY > 80

    return (
        <div className="fixed top-4 left-0 right-0 z-95 flex justify-center pointer-events-none">
            <motion.div
                layout
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className={cn(
                    "pointer-events-auto flex items-center gap-0",
                    "bg-(--color-bg-secondary)/90 backdrop-blur-xl",
                    "border border-(--color-border) shadow-xl overflow-hidden",
                    "transition-[border-radius] duration-400",
                    expanded ? "rounded-2xl" : "rounded-full",
                )}
            >
                {/* Menu button — aparece ao rolar */}
                <motion.button
                    onClick={toggleMenu}
                    aria-label="Open menu"
                    animate={expanded
                        ? { width: "auto", opacity: 1, paddingLeft: 16, paddingRight: 12 }
                        : { width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }
                    }
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="flex items-center gap-2 h-10 overflow-hidden
                     text-(--color-text-tertiary) hover:text-(--color-text-primary)
                     transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                    <span className="text-xs uppercase tracking-[0.12em]">Menu</span>
                </motion.button>

                {expanded && <span className="w-px h-4 bg-(--color-border) shrink-0" />}

                {/* Título */}
                <div className={cn(
                    "flex items-center transition-all duration-400",
                    expanded ? "px-4 h-10" : "px-5 h-9"
                )}>
                    <span className={cn(
                        "font-display font-semibold tracking-[-0.01em] text-(--color-text-primary) whitespace-nowrap transition-[font-size] duration-400",
                        expanded ? "text-sm" : "text-xs"
                    )}>
                        {project.title}
                    </span>
                </div>

                <span className="w-px h-4 bg-(--color-border) shrink-0" />

                {/* Controls */}
                <div className={cn(
                    "flex items-center gap-3 transition-all duration-400",
                    expanded ? "px-4 h-10" : "px-4 h-9"
                )}>
                    {/* Theme */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-colors cursor-pointer"
                    >
                        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                    </button>

                    {/* Lang flags — clicáveis, com feedback imediato */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => { if (lang !== "en") toggleLang() }}
                            title="English"
                            className={cn(
                                "text-sm leading-none cursor-pointer transition-opacity duration-150 select-none",
                                lang === "en" ? "opacity-100" : "opacity-35 hover:opacity-70"
                            )}
                        >🇺🇸</button>
                        <button
                            onClick={() => { if (lang !== "pt") toggleLang() }}
                            title="Português"
                            className={cn(
                                "text-sm leading-none cursor-pointer transition-opacity duration-150 select-none",
                                lang === "pt" ? "opacity-100" : "opacity-35 hover:opacity-70"
                            )}
                        >🇧🇷</button>
                    </div>

                    <span className="w-px h-3.5 bg-(--color-border) shrink-0" />

                    {/* Close */}
                    <button
                        onClick={onClose}
                        aria-label={t.project.close}
                        className="text-xs uppercase tracking-[0.15em] text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-colors cursor-pointer select-none whitespace-nowrap"
                    >
                        {t.project.close}
                    </button>
                </div>
            </motion.div>
        </div>
    )
}