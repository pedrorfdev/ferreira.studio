// store/use-app-store.ts
// ============================================================
// Usa unknown para TSections — o store não precisa conhecer
// o tipo interno das seções de cada projeto. Os layouts
// recebem o projeto já tipado e fazem o cast correto.
// ============================================================

import { create } from "zustand";
import { AppState } from "@/types/project";
import type { LocalizedProjectData } from "@/types/project";

// O store usa unknown para sections — agnóstico ao projeto
type AnyProject = LocalizedProjectData<unknown>;

interface CardOrigin {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface AppStore {
  appState: AppState;
  activeProject: AnyProject | null;
  hoveredProject: AnyProject | null;
  cardOrigin: CardOrigin | null;

  setHovered: (project: AnyProject | null) => void;
  openProject: (project: AnyProject, origin: CardOrigin) => void;
  closeProject: () => void;
  setAppState: (state: AppState) => void;
  finishLoading: () => void;
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
          ? project
            ? AppState.HOVERING
            : AppState.HOME
          : s.appState,
    })),

  openProject: (project, origin) =>
    set({
      activeProject: project,
      cardOrigin: origin,
      appState: AppState.EXPANDING,
    }),

  closeProject: () =>
    set({
      appState: AppState.HOME,
      activeProject: null,
      cardOrigin: null,
      hoveredProject: null,
    }),

  setAppState: (state) => set({ appState: state }),
  finishLoading: () => set({ appState: AppState.HOME }),
}));
