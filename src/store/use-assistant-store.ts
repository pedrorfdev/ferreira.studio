// store/use-assistant-store.ts
// ============================================================
// AI Assistant panel state.
// Tracks open/close state, the active prompt, and
// the conversation messages per project session.
// ============================================================

import { create } from "zustand"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface AssistantStore {
  isOpen: boolean
  activePrompt: string | null
  messages: Message[]

  open: () => void
  close: () => void
  toggle: () => void
  setPrompt: (prompt: string) => void
  addMessage: (message: Message) => void
  clearMessages: () => void
}

export const useAssistantStore = create<AssistantStore>((set) => ({
  isOpen: false,
  activePrompt: null,
  messages: [],

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),

  setPrompt: (prompt) => set({ activePrompt: prompt }),

  addMessage: (message) =>
    set((s) => ({ messages: [...s.messages, message] })),

  // Call this when switching projects so context resets
  clearMessages: () => set({ messages: [], activePrompt: null }),
}))