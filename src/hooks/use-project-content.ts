// hooks/use-project-content.ts
// ============================================================
// Retorna o conteúdo do projeto no idioma atual.
// Faz merge profundo PT sobre EN campo a campo.
// Compatível com o formato do projects.ts atualizado.
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
                (base[key] as object) ?? {},
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
        // EN — retorna direto, sem merge
        if (lang === "en" || !project.pt) {
            return { tagline: project.tagline, sections: project.sections }
        }

        // PT — merge sections se existirem
        const ptSections = project.pt.sections as Partial<CaseStudySection> | undefined

        return {
            tagline: project.pt.tagline ?? project.tagline,
            sections: ptSections
                ? deepMerge(project.sections, ptSections)
                : project.sections,
        }
    }, [lang, project])
}