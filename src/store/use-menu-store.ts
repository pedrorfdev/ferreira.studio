// store/use-menu-store.ts
// ============================================================
// Menu overlay state.
// Kept separate from useAppStore so the menu can open
// from any app state without coupling concerns.
// ============================================================

import { create } from "zustand"

interface MenuStore {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
}

export const useMenuStore = create<MenuStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}))