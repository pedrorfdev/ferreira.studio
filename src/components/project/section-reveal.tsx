// components/project/section-reveal.tsx
// ============================================================
// Wrapper that reveals children as they enter the viewport.
// Used by every case study section for progressive reveal.
// Uses IntersectionObserver — no scroll listener overhead.
// ============================================================

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { slideUp } from "@/lib/motion"
import { cn } from "@/lib/cn"

interface SectionRevealProps {
    children: React.ReactNode
    className?: string
    delay?: number   // stagger delay in seconds
    threshold?: number  // 0–1, how much of element must be visible
}

export function SectionReveal({
    children,
    className,
    delay = 0,
    threshold = 0.15,
}: SectionRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect() // reveal once, then stop observing
                }
            },
            { threshold }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold])

    return (
        <motion.div
            ref={ref}
            variants={slideUp}
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
            transition={{ delay }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    )
}