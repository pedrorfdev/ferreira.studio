// components/menu/menu-overlay.tsx
// ============================================================
// Menu overlay — substitui o stub da Phase 1.
// Duas colunas entram de fora pra dentro (left e right).
// Coluna esquerda: About + Stack.
// Coluna direita: Projetos (lista) + Contato + Social.
// Scrim fecha o menu ao clicar fora das colunas.
// ============================================================

import { motion } from "framer-motion"
import { useMenuStore } from "@/store/use-menu-store"
import { useI18n } from "@/lib/i18n-context"
import { projects } from "@/data/projects"
import { useAppStore } from "@/store/use-app-store"
import {
    menuColumnLeft,
    menuColumnRight,
    menuScrim,
} from "@/lib/motion"
import { cn } from "@/lib/cn"

// ── Tech stack list ──────────────────────────────────────────
const STACK = [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS",
    "Framer Motion",
    "Zustand",
    "Gemini API",
]

const SOCIAL = [
    { label: "GitHub", href: "https://github.com/pedroferreira" },
    { label: "LinkedIn", href: "https://linkedin.com/in/pedroferreira" },
    { label: "Email", href: "mailto:hello@ferreira.studio" },
]

export function MenuOverlay() {
    const close = useMenuStore((s) => s.close)
    const openProject = useAppStore((s) => s.openProject)
    const { t, lang, toggle } = useI18n()

    function handleProjectClick(projectId: string) {
        const project = projects.find((p) => p.id === projectId)
        if (!project) return
        close()
        // Small delay so menu exit animation doesn't collide with expansion
        setTimeout(() => {
            openProject(project, {
                top: window.innerHeight / 2 - 100,
                left: window.innerWidth / 2 - 150,
                width: 300,
                height: 200,
            })
        }, 300)
    }

    return (
        // Full-screen container
        <div className="fixed inset-0 z-[80] flex overflow-hidden">

            {/* Scrim — closes on click */}
            <motion.div
                className="absolute inset-0 bg-[var(--color-scrim)]"
                variants={menuScrim}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={close}
                aria-hidden
            />

            {/* Left column — About + Stack */}
            <motion.div
                className={cn(
                    "relative z-10 flex flex-col justify-between",
                    "w-full max-w-xs md:max-w-sm",
                    "h-full px-8 py-10 pt-20",
                    "bg-[var(--color-bg-primary)]",
                    "border-r border-[var(--color-border-subtle)]",
                    "overflow-y-auto"
                )}
                variants={menuColumnLeft}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {/* About */}
                <div>
                    <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-6 block">
                        {t.menu.about}
                    </span>

                    <p className="font-display text-xl font-semibold tracking-[-0.02em] leading-snug text-[var(--color-text-primary)] mb-4">
                        {t.about.headline}
                    </p>

                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-8">
                        {t.about.body}
                    </p>

                    {/* Stack */}
                    <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-4 block">
                        {t.menu.stack}
                    </span>

                    <div className="flex flex-wrap gap-2">
                        {STACK.map((item) => (
                            <span
                                key={item}
                                className="text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)] rounded-full px-3 py-1"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Lang toggle — bottom of left col */}
                <div className="mt-10">
                    <button
                        onClick={toggle}
                        className={cn(
                            "text-xs uppercase tracking-[0.15em]",
                            "text-[var(--color-text-tertiary)]",
                            "hover:text-[var(--color-text-primary)]",
                            "transition-colors duration-200 cursor-pointer"
                        )}
                    >
                        {lang === "en" ? "PT" : "EN"}
                    </button>
                </div>
            </motion.div>

            {/* Right column — Projects + Contact + Social */}
            <motion.div
                className={cn(
                    "relative z-10 flex flex-col justify-between ml-auto",
                    "w-full max-w-xs md:max-w-sm",
                    "h-full px-8 py-10 pt-20",
                    "bg-[var(--color-bg-primary)]",
                    "border-l border-[var(--color-border-subtle)]",
                    "overflow-y-auto"
                )}
                variants={menuColumnRight}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {/* Case studies */}
                <div>
                    <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-6 block">
                        {t.menu.sections.projects}
                    </span>

                    <nav className="flex flex-col gap-0">
                        {projects.map((project, i) => (
                            <button
                                key={project.id}
                                onClick={() => handleProjectClick(project.id)}
                                className={cn(
                                    "flex items-baseline justify-between gap-4 w-full text-left",
                                    "py-3 cursor-pointer",
                                    i !== 0 && "border-t border-[var(--color-border-subtle)]",
                                    "group"
                                )}
                            >
                                <span className="font-display text-lg font-semibold text-[var(--color-text-primary)] tracking-[-0.01em] group-hover:text-[var(--color-accent)] transition-colors duration-200">
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
                <div className="mt-10">
                    <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-4 block">
                        {t.menu.contact}
                    </span>

                    <p className="font-display text-xl font-semibold text-[var(--color-text-primary)] tracking-[-0.01em] mb-6">
                        {t.contact.headline}
                    </p>

                    <a
                        href={`mailto:${t.contact.email}`}
                        className="text-sm text-[var(--color-accent)] hover:opacity-70 transition-opacity duration-200 block mb-6"
                    >
                        {t.contact.email}
                    </a>

                    <div className="flex gap-5">
                        {SOCIAL.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
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