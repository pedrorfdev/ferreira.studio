import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import { I18nProvider } from "@/lib/i18n-context"
import { App } from './app.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>
)