import { useMemo } from "react";
import { useI18n } from "@/lib/i18n-context";
import type { LocalizedProjectData } from "@/types/project";

function deepMerge<T extends object>(base: T, override: Partial<T>): T {
  const result = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(override) as (keyof T)[]) {
    const val = override[key];
    if (
      val !== null &&
      val !== undefined &&
      typeof val === "object" &&
      !Array.isArray(val)
    ) {
      result[key as string] = deepMerge(
        (base[key] as object) ?? {},
        val as object,
      );
    } else if (val !== undefined) {
      result[key as string] = val;
    }
  }
  return result as T;
}

export interface ProjectContent<TSections> {
  tagline: string;
  sections: TSections;
}

export function useProjectContent<TSections extends object>(
  project: LocalizedProjectData<TSections>,
): ProjectContent<TSections> {
  const { lang } = useI18n();

  return useMemo(() => {
    if (lang === "en" || !project.pt) {
      return { tagline: project.tagline, sections: project.sections };
    }

    const ptSections = project.pt.sections as Partial<TSections> | undefined;

    return {
      tagline: project.pt.tagline ?? project.tagline,
      sections: ptSections
        ? deepMerge(project.sections, ptSections)
        : project.sections,
    };
  }, [lang, project]);
}
