// components/menu/menu-overlay.tsx
// ============================================================
// Duas colunas deslizando de fora pra dentro.
// Coluna esquerda: About + Stack + lang/theme controls
// Coluna direita: Projetos com preview central + Contato
// Preview aparece no centro da tela ao hover em projeto
// ============================================================

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMenuStore } from "@/store/use-menu-store"
import { useAppStore } from "@/store/use-app-store"
import { useI18n } from "@/lib/i18n-context"
import { useThemeStore } from "@/store/use-theme-store"
import { projects } from "@/data/projects"
import { menuColumnLeft, menuColumnRight, menuScrim } from "@/lib/motion"
import { cn } from "@/lib/cn"
import type { ProjectData } from "@/types/project"
import { AppState } from "@/types/project"

// ── Config ────────────────────────────────────────────────────

const STACK = [
    "React", "TypeScript", "Node.js",
    "PostgreSQL", "Tailwind CSS", "Framer Motion",
    "Zustand", "Gemini API",
]

const SOCIAL = [
    { label: "GitHub", href: "https://github.com/pedroferreira" },
    { label: "LinkedIn", href: "https://linkedin.com/in/pedroferreira" },
    { label: "Email", href: "mailto:hello@ferreira.studio" },
]

// ── Preview central ────────────────────────────────────────────

function MenuProjectPreview({ project }: { project: ProjectData | null }) {
    return (
        <AnimatePresence mode="wait">
            {project && (
                <motion.div
                    key={project.id}
                    className={cn(
                        "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[85]",
                        "w-72 md:w-80 rounded-xl overflow-hidden",
                        "pointer-events-none", // não bloqueia o hover das colunas
                        "border border-white/10 shadow-2xl"
                    )}
                    initial={{ opacity: 0, scale: 0.94, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.96, filter: "blur(2px)" }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                    <div className="aspect-[4/3] bg-[var(--color-bg-tertiary)]">
                        {project.heroImage ? (
                            <img
                                src={project.heroImage}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="font-display text-sm text-[var(--color-text-tertiary)]">
                                    {project.title}
                                </span>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// ── Sun / Moon icons ─────────────────────────────────────────

function SunIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
    )
}
function MoonIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    )
}

// ── Main ─────────────────────────────────────────────────────

export function MenuOverlay() {
    const close = useMenuStore((s) => s.close)
    const openProject = useAppStore((s) => s.openProject)
    const closeProject = useAppStore((s) => s.closeProject)
    const appState = useAppStore((s) => s.appState)
    const { t, lang, toggle: toggleLang } = useI18n()
    const { theme, toggle: toggleTheme } = useThemeStore()

    const [previewProject, setPreviewProject] = useState<ProjectData | null>(null)

    function handleGoHome() {
        close()
        if (appState === AppState.PROJECT || appState === AppState.EXPANDING) {
            closeProject()
        }
    }

    function handleProjectClick(project: ProjectData) {
        close()
        setTimeout(() => {
            openProject(project, {
                top: window.innerHeight / 2 - 120,
                left: window.innerWidth / 2 - 160,
                width: 320,
                height: 240,
            })
        }, 320)
    }

    return (
        <div className="fixed inset-0 z-[80] flex overflow-hidden">

            {/* Scrim */}
            <motion.div
                className="absolute inset-0 bg-[var(--color-scrim)]"
                variants={menuScrim}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={close}
                aria-hidden
            />

            {/* Preview central */}
            <MenuProjectPreview project={previewProject} />

            {/* LEFT column */}
            <motion.div
                className={cn(
                    "relative z-10 flex flex-col justify-between",
                    "w-full max-w-[280px] md:max-w-xs h-full",
                    "px-8 py-8 pt-20 overflow-y-auto",
                    "bg-[var(--color-bg-primary)]",
                    "border-r border-[var(--color-border-subtle)]",
                )}
                variants={menuColumnLeft}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="flex flex-col gap-8">
                    {/* About */}
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-4 block">
                            {t.menu.about}
                        </span>
                        <p className="font-display text-lg font-semibold tracking-[-0.02em] leading-snug text-[var(--color-text-primary)] mb-3">
                            {t.about.headline}
                        </p>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            {t.about.body}
                        </p>
                    </div>

                    {/* Stack */}
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-3 block">
                            {t.menu.stack}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {STACK.map((item) => (
                                <span key={item}
                                    className="text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)] rounded-full px-2.5 py-1">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom controls */}
                <div className="flex flex-col gap-4 mt-8">

                    {/* Back to home */}
                    <button
                        onClick={handleGoHome}
                        className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-tertiary)]
                       hover:text-[var(--color-text-primary)] transition-colors duration-200
                       cursor-pointer text-left"
                    >
                        ← Home
                    </button>

                    {/* Theme + Lang row */}
                    <div className="flex items-center justify-between">

                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            aria-label={theme === "dark" ? "Switch to light" : "Switch to dark"}
                            className="flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]
                         hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
                        >
                            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                            <span className="uppercase tracking-[0.12em]">
                                {theme === "dark" ? "Light" : "Dark"}
                            </span>
                        </button>

                        {/* Lang flags */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => lang !== "en" && toggleLang()}
                                title="English"
                                aria-label="Switch to English"
                                className={cn(
                                    "text-base leading-none cursor-pointer transition-opacity duration-200 select-none",
                                    lang === "en" ? "opacity-100" : "opacity-35 hover:opacity-60"
                                )}
                            >🇺🇸</button>
                            <button
                                onClick={() => lang !== "pt" && toggleLang()}
                                title="Português"
                                aria-label="Mudar para Português"
                                className={cn(
                                    "text-base leading-none cursor-pointer transition-opacity duration-200 select-none",
                                    lang === "pt" ? "opacity-100" : "opacity-35 hover:opacity-60"
                                )}
                            >🇧🇷</button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* RIGHT column */}
            <motion.div
                className={cn(
                    "relative z-10 flex flex-col justify-between ml-auto",
                    "w-full max-w-[280px] md:max-w-xs h-full",
                    "px-8 py-8 pt-20 overflow-y-auto",
                    "bg-[var(--color-bg-primary)]",
                    "border-l border-[var(--color-border-subtle)]",
                )}
                variants={menuColumnRight}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {/* Projects list */}
                <div>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-4 block">
                        {t.menu.sections.projects}
                    </span>

                    <nav className="flex flex-col">
                        {projects.map((project, i) => (
                            <button
                                key={project.id}
                                onClick={() => handleProjectClick(project)}
                                onMouseEnter={() => setPreviewProject(project)}
                                onMouseLeave={() => setPreviewProject(null)}
                                className={cn(
                                    "flex items-baseline justify-between gap-4 w-full text-left",
                                    "py-3 cursor-pointer group",
                                    i !== 0 && "border-t border-[var(--color-border-subtle)]",
                                )}
                            >
                                <span className="font-display text-lg font-semibold tracking-[-0.01em]
                                 text-[var(--color-text-primary)]
                                 group-hover:text-[var(--color-accent)]
                                 transition-colors duration-200">
                                    {project.title}
                                </span>
                                <span className="text-xs text-[var(--color-text-tertiary)] tabular-nums shrink-0">
                                    {project.year}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Contact + Social */}
                <div className="mt-8">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-3 block">
                        {t.menu.contact}
                    </span>
                    <p className="font-display text-lg font-semibold text-[var(--color-text-primary)] tracking-[-0.01em] mb-4">
                        {t.contact.headline}
                    </p>
                    <a
                        href={`mailto:${t.contact.email}`}
                        className="text-sm text-[var(--color-accent)] hover:opacity-70 transition-opacity duration-200 block mb-5"
                    >
                        {t.contact.email}
                    </a>
                    <div className="flex gap-4">
                        {SOCIAL.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]
                           hover:text-[var(--color-text-primary)] transition-colors duration-200"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div>

        </div>
    )
}