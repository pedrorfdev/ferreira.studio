import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { ChevronDown } from "lucide-react"
import type { ProjectData } from "@/types/project"

interface Props {
    project: ProjectData
    scrollY: number
}

export function PraxisLayout({ project }: Props) {
    const pt = false

    const sections = useMemo(() => {
        return pt && project.pt?.sections
            ? {
                ...project.sections,
                ...project.pt.sections,
            }
            : project.sections
    }, [project, pt])

    const discovery = sections.discovery
    const perspective = sections.perspective
    const workflow = sections.workflow
    const architecture = sections.architecture
    const technicalDecisions = sections.technicalDecisions
    const outcome = sections.outcome
    const future = sections.future

    return (
        <main className="relative w-full">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="
                        absolute top-0 left-1/2 -translate-x-1/2
                        w-[900px] h-[500px]
                        bg-[#D6FF3F]/6
                        blur-[140px]
                        rounded-full
                    "
                />
            </div>

            {/* HERO */}
            <section className="relative px-6 md:px-10 pt-20 md:pt-32 pb-24">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p
                            className="
                                text-[#D6FF3F]
                                uppercase
                                tracking-[0.28em]
                                text-xs
                                mb-6
                                font-medium
                            "
                        >
                            Clinical Operations Platform
                        </p>

                        <h1
                            className="
                                text-5xl
                                md:text-8xl
                                tracking-[-0.08em]
                                leading-none
                                font-semibold
                                text-white
                            "
                        >
                            {project.title}
                        </h1>

                        <p
                            className="
                                mt-8
                                max-w-2xl
                                text-base
                                md:text-xl
                                leading-relaxed
                                text-neutral-400
                            "
                        >
                            {pt && project.pt?.tagline
                                ? project.pt.tagline
                                : project.tagline}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CONTENT FLOW */}
            <div className="px-6 md:px-10">
                <div className="max-w-3xl mx-auto space-y-28">

                    {/* DISCOVERY */}
                    {discovery && (
                        <EditorialBlock
                            eyebrow="DISCOVERY"
                            headline={discovery.headline}
                            body={discovery.body}
                        />
                    )}

                    {/* PERSPECTIVE */}
                    {perspective && (
                        <EditorialBlock
                            eyebrow="PERSPECTIVE"
                            headline={perspective.headline}
                            body={perspective.body}
                        />
                    )}

                    {/* WORKFLOW */}
                    {workflow && (
                        <section className="space-y-10">
                            <SectionEyebrow>
                                WORKFLOW
                            </SectionEyebrow>

                            <div className="space-y-5">
                                <h2
                                    className="
                                        text-3xl
                                        md:text-5xl
                                        tracking-[-0.06em]
                                        leading-[1.05]
                                        text-white
                                        max-w-2xl
                                    "
                                >
                                    {workflow.headline}
                                </h2>

                                {workflow.items && (
                                    <div className="pt-6 space-y-4">
                                        {workflow.items.map((item, index) => (
                                            <motion.div
                                                key={item}
                                                initial={{ opacity: 0, y: 16 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    delay: index * 0.05,
                                                    duration: 0.4,
                                                }}
                                                className="
                                                    flex items-start gap-4
                                                    border-b border-white/5
                                                    pb-4
                                                "
                                            >
                                                <span
                                                    className="
                                                        text-[#D6FF3F]
                                                        text-sm
                                                        mt-1
                                                    "
                                                >
                                                    0{index + 1}
                                                </span>

                                                <p
                                                    className="
                                                        text-neutral-300
                                                        text-base
                                                        md:text-lg
                                                        leading-relaxed
                                                    "
                                                >
                                                    {item}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* ARCHITECTURE */}
                    {architecture && (
                        <EditorialBlock
                            eyebrow="ARCHITECTURE"
                            headline={architecture.headline}
                            body={architecture.body}
                        />
                    )}

                    {/* TECH DECISIONS */}
                    {technicalDecisions && (
                        <section className="space-y-10">
                            <SectionEyebrow>
                                TECHNICAL DECISIONS
                            </SectionEyebrow>

                            <div className="space-y-5">
                                <h2
                                    className="
                                        text-3xl
                                        md:text-5xl
                                        tracking-[-0.06em]
                                        leading-[1.05]
                                        text-white
                                    "
                                >
                                    {technicalDecisions.headline}
                                </h2>

                                <div className="pt-4 space-y-3">
                                    {technicalDecisions.decisions?.map((decision) => (
                                        <DecisionAccordion
                                            key={decision.title}
                                            title={decision.title}
                                            why={decision.why}
                                            trade={decision.trade}
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* OUTCOME */}
                    {outcome && (
                        <section className="space-y-10">
                            <SectionEyebrow>
                                OUTCOME
                            </SectionEyebrow>

                            <div className="space-y-6">
                                <h2
                                    className="
                                        text-3xl
                                        md:text-5xl
                                        tracking-[-0.06em]
                                        leading-[1.05]
                                        text-white
                                        max-w-2xl
                                    "
                                >
                                    {outcome.headline}
                                </h2>

                                <p
                                    className="
                                        text-neutral-400
                                        text-lg
                                        leading-relaxed
                                        max-w-2xl
                                    "
                                >
                                    {outcome.body}
                                </p>

                                {outcome.metrics && (
                                    <div
                                        className="
                                            grid
                                            grid-cols-1
                                            md:grid-cols-3
                                            gap-4
                                            pt-8
                                        "
                                    >
                                        {outcome.metrics.map((metric) => (
                                            <div
                                                key={metric.label}
                                                className="
                                                    border border-white/5
                                                    rounded-3xl
                                                    p-6
                                                    bg-white/2
                                                "
                                            >
                                                <p
                                                    className="
                                                        text-xs
                                                        uppercase
                                                        tracking-[0.18em]
                                                        text-neutral-500
                                                        mb-3
                                                    "
                                                >
                                                    {metric.label}
                                                </p>

                                                <p
                                                    className="
                                                        text-2xl
                                                        tracking-[-0.04em]
                                                        text-white
                                                    "
                                                >
                                                    {metric.value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* FUTURE */}
                    {future && (
                        <EditorialBlock
                            eyebrow="FUTURE"
                            headline={future.headline}
                            body={future.body}
                            bottomSpacing
                        />
                    )}
                </div>
            </div>
        </main>
    )
}

function EditorialBlock({
    eyebrow,
    headline,
    body,
    bottomSpacing = false,
}: {
    eyebrow: string
    headline: string
    body?: string
    bottomSpacing?: boolean
}) {
    return (
        <section className={bottomSpacing ? "pb-32" : ""}>
            <div className="space-y-6">
                <SectionEyebrow>
                    {eyebrow}
                </SectionEyebrow>

                <h2
                    className="
                        text-3xl
                        md:text-5xl
                        tracking-[-0.06em]
                        leading-[1.05]
                        text-white
                        max-w-2xl
                    "
                >
                    {headline}
                </h2>

                {body && (
                    <p
                        className="
                            text-neutral-400
                            text-lg
                            leading-relaxed
                            max-w-2xl
                        "
                    >
                        {body}
                    </p>
                )}
            </div>
        </section>
    )
}

function SectionEyebrow({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <p
            className="
                text-[11px]
                uppercase
                tracking-[0.22em]
                text-[#D6FF3F]
                font-medium
            "
        >
            {children}
        </p>
    )
}

function DecisionAccordion({
    title,
    why,
    trade,
}: {
    title: string
    why: string
    trade?: string
}) {
    const [open, setOpen] = useState(false)

    return (
        <div
            className="
                border border-white/5
                bg-white/2
                rounded-3xl
                overflow-hidden
            "
        >
            <button
                onClick={() => setOpen((v) => !v)}
                className="
                    w-full
                    flex items-center justify-between
                    gap-4
                    text-left
                    px-6 py-5
                "
            >
                <span
                    className="
                        text-white
                        text-base
                        md:text-lg
                    "
                >
                    {title}
                </span>

                <ChevronDown
                    className={`
                        w-4 h-4 text-neutral-500 transition-transform duration-300
                        ${open ? "rotate-180" : ""}
                    `}
                />
            </button>

            <motion.div
                initial={false}
                animate={{
                    height: open ? "auto" : 0,
                    opacity: open ? 1 : 0,
                }}
                transition={{
                    duration: 0.3,
                }}
                className="overflow-hidden"
            >
                <div className="px-6 pb-6 space-y-5">
                    <div>
                        <p className="text-xs                                uppercase
                                tracking-[0.18em]
                                text-[#D6FF3F]
                                mb-2
                            "
                        >
                            Why
                        </p>

                        <p
                            className="
                                text-neutral-300
                                leading-relaxed
                            "
                        >
                            {why}
                        </p>
                    </div>

                    {trade && (
                        <div>
                            <p
                                className="
                                    text-xs
                                    uppercase
                                    tracking-[0.18em]
                                    text-[#D6FF3F]
                                    mb-2
                                "
                            >
                                Tradeoff
                            </p>

                            <p
                                className="
                                    text-neutral-400
                                    leading-relaxed
                                "
                            >
                                {trade}
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}