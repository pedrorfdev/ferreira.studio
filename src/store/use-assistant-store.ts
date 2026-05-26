// store/use-assistant-store.ts
// Fix: clearMessages também reseta o estado de open
// para que o painel feche ao trocar de projeto
import { create } from "zustand"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface AssistantStore {
  isOpen: boolean
  messages: Message[]
  open: () => void
  close: () => void
  toggle: () => void
  addMessage: (message: Message) => void
  clearMessages: () => void
}

export const useAssistantStore = create<AssistantStore>((set) => ({
  isOpen: false,
  messages: [],
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  addMessage: (message) => set((s) => ({ messages: [...s.messages, message] })),
  clearMessages: () => set({ messages: [], isOpen: false }),
}))