import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nProvider } from "@/lib/i18n-context"
import { App } from './app.tsx'
import '@/styles/globals.css'
import '@/store/use-theme-store.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>
)