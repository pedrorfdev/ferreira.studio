// components/project/sections/section-technical-decisions.tsx
// ============================================================
// Renders each technical decision as an expandable card.
// Title + "why" always visible, "trade" revealed on expand.
// ============================================================

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionReveal } from "@/components/project/section-reveal"
import { cn } from "@/lib/cn"
import type { ProjectData, TechnicalDecision } from "@/types/project"

interface Props { project: ProjectData }

function DecisionCard({ decision, index }: { decision: TechnicalDecision; index: number }) {
    const [open, setOpen] = useState(false)

    return (
        <SectionReveal delay={index * 0.08}>
            <button
                onClick={() => setOpen((v) => !v)}
                className={cn(
                    "w-full text-left p-6 rounded-xl border transition-colors duration-200 cursor-pointer",
                    "border-[var(--color-border)] hover:border-[var(--color-border-strong)]",
                    "bg-[var(--color-bg-secondary)]",
                )}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)] mb-2 block">
                            Decision {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] tracking-[-0.01em] mb-3">
                            {decision.title}
                        </h3>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            {decision.why}
                        </p>
                    </div>

                    {/* Expand indicator */}
                    {decision.trade && (
                        <motion.span
                            className="text-[var(--color-text-tertiary)] text-lg shrink-0 mt-1"
                            animate={{ rotate: open ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            aria-hidden
                        >
                            +
                        </motion.span>
                    )}
                </div>

                {/* Tradeoff — expanded */}
                <AnimatePresence>
                    {open && decision.trade && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4 pt-4 border-t border-[var(--color-border-subtle)]">
                                <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-accent)] mb-2 block">
                                    Tradeoff
                                </span>
                                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                    {decision.trade}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </SectionReveal>
    )
}

export function SectionTechnicalDecisions({ project }: Props) {
    const data = project.sections.technicalDecisions
    if (!data) return null

    return (
        <section className="py-24 px-8 md:px-16 max-w-5xl mx-auto w-full border-t border-[var(--color-border-subtle)]">
            <SectionReveal>
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-6 block">
                    Technical Decisions
                </span>
            </SectionReveal>

            <SectionReveal delay={0.05}>
                <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight text-[var(--color-text-primary)] mb-12 max-w-xl">
                    {data.headline}
                </h2>
            </SectionReveal>

            <div className="flex flex-col gap-4">
                {data.decisions.map((decision, i) => (
                    <DecisionCard key={i} decision={decision} index={i} />
                ))}
            </div>
        </section>
    )
}