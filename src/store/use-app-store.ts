// store/use-app-store.ts
import { create } from "zustand"
import { AppState } from "@/types/project"
import type { ProjectData } from "@/types/project"

interface CardOrigin {
    top: number
    left: number
    width: number
    height: number
}

interface AppStore {
    appState: AppState
    activeProject: ProjectData | null
    hoveredProject: ProjectData | null
    cardOrigin: CardOrigin | null

    setHovered: (project: ProjectData | null) => void
    openProject: (project: ProjectData, origin: CardOrigin) => void
    closeProject: () => void
    setAppState: (state: AppState) => void
    finishLoading: () => void
}

export const useAppStore = create<AppStore>((set) => ({
    appState: AppState.LOADING,
    activeProject: null,
    hoveredProject: null,
    cardOrigin: null,

    setHovered: (project) =>
        set((s) => ({
            hoveredProject: project,
            appState:
                s.appState === AppState.HOME || s.appState === AppState.HOVERING
                    ? project ? AppState.HOVERING : AppState.HOME
                    : s.appState,
        })),

    openProject: (project, origin) =>
        set({ activeProject: project, cardOrigin: origin, appState: AppState.EXPANDING }),

    closeProject: () =>
        set({ appState: AppState.HOME, activeProject: null, cardOrigin: null, hoveredProject: null }),

    setAppState: (state) => set({ appState: state }),

    finishLoading: () => set({ appState: AppState.HOME }),
}))