// App.tsx
// ============================================================
// Entry point da aplicação.
// Apenas monta o AppShell — toda a lógica de estado e
// orquestração de camadas vive dentro dele.
// ============================================================

import { AppShell } from "@/components/shell/app-shell"

export function App() {
  return <AppShell />
}