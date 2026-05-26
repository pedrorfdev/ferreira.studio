// lib/i18n-context.tsx
// ============================================================
// EN é a fonte completa e imutável.
// PT é parcial — merge profundo sobre EN garante que nenhuma
// chave fica undefined mesmo se PT não sobrescrever tudo.
// ============================================================

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react"
import type { ReactNode } from "react"
import { en } from "@/data/i18n/en"
import { pt } from "@/data/i18n/pt"

export type Lang = "en" | "pt"
export type Translations = typeof en

// Merge profundo: PT só sobrescreve o que definir, resto vem do EN
function deepMerge<T extends object>(base: T, override: object): T {
    const result = { ...base } as Record<string, unknown>
    for (const key of Object.keys(override)) {
        const val = (override as Record<string, unknown>)[key]
        if (val && typeof val === "object" && !Array.isArray(val)) {
            result[key] = deepMerge(
                result[key] as object ?? {},
                val as object
            )
        } else if (val !== undefined) {
            result[key] = val
        }
    }
    return result as T
}

const translations: Record<Lang, Translations> = {
    en,
    pt: deepMerge(en, pt),
}

interface I18nContextValue {
    lang: Lang
    t: Translations
    toggle: () => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = "ferreira.studio:lang"

export function I18nProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>(() => {
        if (typeof window === "undefined") return "en"
        return (localStorage.getItem(STORAGE_KEY) as Lang) ?? "en"
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, lang)
        document.documentElement.lang = lang
    }, [lang])

    const toggle = useCallback(() => {
        setLang((l) => (l === "en" ? "pt" : "en"))
    }, [])

    return (
        <I18nContext.Provider value={{ lang, t: translations[lang], toggle }}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n(): I18nContextValue {
    const ctx = useContext(I18nContext)
    if (!ctx) throw new Error("useI18n must be used inside I18nProvider")
    return ctx
}