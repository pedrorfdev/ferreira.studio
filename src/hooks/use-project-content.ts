// hooks/use-project-content.ts
// ============================================================
// Retorna o conteúdo do projeto no idioma atual.
// Quando lang === "pt" e o projeto tem project.pt.sections,
// faz merge profundo: PT sobrescreve EN campo a campo.
// Assim cada section recebe automaticamente o texto correto.
// ============================================================

import { useMemo } from "react"
import { useI18n } from "@/lib/i18n-context"
import type { ProjectData, CaseStudySection } from "@/types/project"

function deepMerge<T extends object>(base: T, override: Partial<T>): T {
    const result = { ...base } as Record<string, unknown>
    for (const key of Object.keys(override) as (keyof T)[]) {
        const val = override[key]
        if (val && typeof val === "object" && !Array.isArray(val)) {
            result[key as string] = deepMerge(
                base[key] as object ?? {},
                val as object
            )
        } else if (val !== undefined) {
            result[key as string] = val
        }
    }
    return result as T
}

export interface ProjectContent {
    tagline: string
    sections: CaseStudySection
}

export function useProjectContent(project: ProjectData): ProjectContent {
    const { lang } = useI18n()

    return useMemo(() => {
        if (lang === "en" || !project.pt) {
            return {
                tagline: project.tagline,
                sections: project.sections,
            }
        }

        return {
            tagline: project.pt.tagline ?? project.tagline,
            sections: project.pt.sections
                ? deepMerge(project.sections, project.pt.sections as Partial<CaseStudySection>)
                : project.sections,
        }
    }, [lang, project])
}