// components/ui/media-placeholder.tsx
// ============================================================
// Placeholder visual para imagens e vídeos ainda não prontos.
// Usa as cores do projeto (via CSS vars) para manter identidade.
// Remove quando tiver mídia real.
// ============================================================

import { cn } from "@/lib/cn"

interface Props {
    label?: string
    aspect?: string   // tailwind aspect class
    className?: string
    variant?: "bg" | "hero" | "card"
}

export function MediaPlaceholder({ label, aspect = "aspect-video", className, variant = "hero" }: Props) {
    return (
        <div className={cn(
            aspect,
            "relative overflow-hidden flex items-center justify-center",
            "bg-(--color-bg-secondary)",
            className
        )}>
            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
            linear-gradient(var(--color-accent) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)
          `,
                    backgroundSize: variant === "bg" ? "60px 60px" : "32px 32px",
                }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-(--color-accent)/5 to-transparent" />

            {/* Center content */}
            {label && (
                <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-8 h-px bg-(--color-accent)/40" />
                    <span className="text-[10px] uppercase tracking-[0.18em] text-(--color-text-tertiary)">
                        {label}
                    </span>
                    <div className="w-8 h-px bg-(--color-accent)/40" />
                </div>
            )}
        </div>
    )
}