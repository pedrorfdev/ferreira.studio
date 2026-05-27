// components/project/sections/section-hero.tsx
import { motion } from "framer-motion"
import { SectionReveal } from "@/components/project/section-reveal"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { cn } from "@/lib/cn"
import { fadeInSlow } from "@/lib/motion"
import { useI18n } from "@/lib/i18n-context"
import { useProjectContent } from "@/hooks/use-project-content"
import { ExternalLink, GitBranch, Clock, CheckCircle2, Zap, Circle } from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props { project: ProjectData }

// Inclui "live" (novo) e mantém "shipped" (legado)
const STATUS_CONFIG: Record<string, { Icon: typeof CheckCircle2; accent: boolean }> = {
    "live": { Icon: CheckCircle2, accent: true },
    "in development": { Icon: Zap, accent: false },
    "concept": { Icon: Circle, accent: false },
}

export function SectionHero({ project }: Props) {
    const { t } = useI18n()
    const content = useProjectContent(project)
    const status = STATUS_CONFIG[project.status] ?? STATUS_CONFIG["concept"]

    // Label traduzido do status — lê do t.project.status
    const statusLabel = (() => {
        if (project.status === "live")
            return t.project.status.live
        if (project.status === "in development")
            return t.project.status.inDevelopment
        return t.project.status.concept
    })()

    const bgSrc = project.media?.src

    return (
        <section className="relative min-h-[95vh] flex flex-col">
            {/* Fundo — mesma imagem do hover na home */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {bgSrc ? (
                    <motion.div className="absolute inset-0" variants={fadeInSlow} initial="hidden" animate="visible">
                        {project.media.type === "video"
                            ? <video src={bgSrc} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-25" />
                            : <img src={bgSrc} alt="" aria-hidden className="w-full h-full object-cover opacity-20" loading="lazy" decoding="async" draggable={false} />
                        }
                    </motion.div>
                ) : (
                    <MediaPlaceholder variant="bg" aspect="" className="absolute inset-0 w-full h-full opacity-15" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-(--color-bg-primary) via-(--color-bg-primary)/75 to-(--color-bg-primary)/20" />
            </div>

            <div className="relative z-10 flex flex-col justify-end flex-1 px-6 md:px-16 pb-10 pt-8 max-w-6xl w-full mx-auto">
                {/* Meta */}
                <SectionReveal className="flex items-center gap-3 flex-wrap mb-7">
                    <div className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium",
                        status.accent
                            ? "border-(--color-accent) text-(--color-accent) bg-(--color-accent-muted)"
                            : "border-(--color-border) text-(--color-text-tertiary)"
                    )}>
                        <status.Icon size={11} />
                        <span className="uppercase tracking-widest">{statusLabel}</span>
                    </div>
                    <span className="text-(--color-border-strong)">·</span>
                    <span className="text-xs tabular-nums text-(--color-text-tertiary)">{project.year}</span>
                    <span className="text-(--color-border-strong)">·</span>
                    <div className="flex gap-1.5 flex-wrap">
                        {project.tags.map((tag) => (
                            <span key={tag} className="text-[10px] uppercase tracking-[0.08em] text-(--color-text-tertiary) border border-(--color-border-subtle) rounded-full px-2 py-0.5">
                                {tag}
                            </span>
                        ))}
                    </div>
                </SectionReveal>

                {/* Título */}
                <SectionReveal delay={0.06}>
                    <h1 className="font-display font-semibold tracking-[-0.03em] leading-none mb-5"
                        style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}>
                        <span className="text-(--color-accent)">{project.title.split(" ")[0]}</span>
                        {project.title.includes(" ") && (
                            <span className="text-(--color-text-primary)"> {project.title.split(" ").slice(1).join(" ")}</span>
                        )}
                    </h1>
                </SectionReveal>

                {/* Tagline */}
                <SectionReveal delay={0.1}>
                    <p className="text-base md:text-xl text-(--color-text-secondary) max-w-2xl leading-relaxed mb-8">
                        {content.tagline}
                    </p>
                </SectionReveal>

                {/* Links */}
                <SectionReveal delay={0.14} className="flex items-center gap-4 flex-wrap mb-10">
                    {project.links?.demo && (
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-(--color-accent) text-white hover:opacity-85 transition-opacity">
                            <ExternalLink size={13} /> Live demo
                        </a>
                    )}
                    {project.links?.github && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-(--color-border) text-(--color-text-secondary) hover:border-(--color-border-strong) hover:text-(--color-text-primary) transition-all duration-200">
                            <GitBranch size={13} /> GitHub
                        </a>
                    )}
                    <div className="flex items-center gap-2 text-(--color-text-tertiary) ml-auto md:flex">
                        <Clock size={11} />
                        <span className="text-xs uppercase tracking-[0.15em]">{t.project.scrollHint}</span>
                    </div>
                </SectionReveal>

                {/* Card grande de mídia */}
                <SectionReveal delay={0.18}>
                    <div className="w-full rounded-2xl overflow-hidden border border-(--color-border-subtle) shadow-2xl">
                        {project.heroVideo
                            ? <video src={project.heroVideo} autoPlay muted loop playsInline poster={project.heroImage} className="w-full aspect-video object-cover" />
                            : project.heroImage
                                ? <img src={project.heroImage} alt={project.title} className="w-full aspect-video object-cover" loading="lazy" decoding="async" />
                                : <MediaPlaceholder variant="hero" aspect="aspect-video" label={`${project.title} — Interface`} />
                        }
                    </div>
                </SectionReveal>
            </div>
        </section>
    )
}