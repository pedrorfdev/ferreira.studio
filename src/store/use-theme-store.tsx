// store/use-theme-store.ts
// ============================================================
// Controla dark / light / system.
// Persiste no localStorage e aplica classe no <html>.
// ============================================================

import { create } from "zustand"

export type Theme = "dark" | "light" | "system"

function applyTheme(theme: Theme) {
    const root = document.documentElement
    root.classList.remove("dark", "light")
    if (theme !== "system") root.classList.add(theme)
}

function getInitialTheme(): Theme {
    if (typeof window === "undefined") return "dark"
    return (localStorage.getItem("ferreira.studio:theme") as Theme) ?? "dark"
}

interface ThemeStore {
    theme: Theme
    toggle: () => void
    set: (t: Theme) => void
}

export const useThemeStore = create<ThemeStore>((setState) => {
    const initial = getInitialTheme()
    // Apply immediately on store creation
    if (typeof window !== "undefined") applyTheme(initial)

    return {
        theme: initial,

        toggle: () =>
            setState((s) => {
                const next = s.theme === "dark" ? "light" : "dark"
                localStorage.setItem("ferreira.studio:theme", next)
                applyTheme(next)
                return { theme: next }
            }),

        set: (t) =>
            setState(() => {
                localStorage.setItem("ferreira.studio:theme", t)
                applyTheme(t)
                return { theme: t }
            }),
    }
})