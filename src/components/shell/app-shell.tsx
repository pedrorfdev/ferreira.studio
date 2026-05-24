// components/shell/app-shell.tsx
// ============================================================
// Root persistent wrapper — never unmounts.
// All layers live here and stay mounted throughout the session.
// Only the content layer (HomeView / ProjectView) changes.
// ============================================================

import { useEffect } from "react"
import { AnimatePresence } from "framer-motion"

import { BackgroundLayer } from "@/components/shell/background-layer"
import { IntroLoader } from "@/components/loader/intro-loader"
import { HomeView } from "@/components/home/home-view"
import { ProjectView } from "@/components/project/project-view"
import { MenuOverlay } from "@/components/menu/menu-overlay"
import { AssistantLayer } from "@/components/assistant/assistant-layer"

import { useAppStore } from "@/store/use-app-store"
import { useMenuStore } from "@/store/use-menu-store"
import { AppState } from "@/types/project"
import { Nav } from "@/components/navigation/nav"

export function AppShell() {
    const appState = useAppStore((s) => s.appState)
    const activeProject = useAppStore((s) => s.activeProject)
    const isMenuOpen = useMenuStore((s) => s.isOpen)

    // Lock body scroll when a project or menu is open
    useEffect(() => {
        const shouldLock =
            appState === AppState.PROJECT ||
            appState === AppState.EXPANDING ||
            isMenuOpen

        document.body.style.overflow = shouldLock ? "hidden" : ""

        return () => {
            document.body.style.overflow = ""
        }
    }, [appState, isMenuOpen])

    const isLoading = appState === AppState.LOADING
    const isProjectOpen =
        appState === AppState.PROJECT ||
        appState === AppState.EXPANDING

    return (
        <div className="relative w-full h-dvh overflow-hidden" >
            {/* z-0 — Background media layer, always mounted */}
            < BackgroundLayer />
            {/* z-50 — Navigation, always visible */}
            < Nav />
            {/* z-10 — Main content — HOME or PROJECT */}
            < AnimatePresence mode="wait" >
                {!isProjectOpen && (<HomeView key="home" />)
                }
            </AnimatePresence>

            <AnimatePresence>
                {isProjectOpen && activeProject && (<ProjectView key={activeProject.id} project={activeProject} />)}
            </AnimatePresence>

            {/* z-70 — AI Assistant panel — only inside project view */}
            <AnimatePresence>
                {appState === AppState.PROJECT && activeProject && (<AssistantLayer project={activeProject} />)
                }
            </AnimatePresence>

            {/* z-80 — Menu overlay */}
            <AnimatePresence>
                {isMenuOpen && <MenuOverlay />}
            </AnimatePresence>

            {/* z-100 — Intro loader — renders on top of everything, unmounts after entry */}
            <AnimatePresence>
                {isLoading && <IntroLoader />}
            </AnimatePresence>
        </div>
    )
}