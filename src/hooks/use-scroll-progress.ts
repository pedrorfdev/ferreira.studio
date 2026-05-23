// hooks/use-scroll-progress.ts
// ============================================================
// Tracks scroll progress (0 to 1) of a scrollable container ref.
// Used by case study sections for progressive reveal and
// sticky storytelling effects.
// ============================================================

import { useState, useEffect, useRef, useCallback } from "react"

interface ScrollProgress {
    progress: number        // 0 → 1, overall scroll position
    scrollY: number        // raw px
    containerRef: React.RefObject<HTMLDivElement | null>
}

export function useScrollProgress(): ScrollProgress {
    const containerRef = useRef<HTMLDivElement>(null)
    const [progress, setProgress] = useState(0)
    const [scrollY, setScrollY] = useState(0)

    const handleScroll = useCallback(() => {
        const el = containerRef.current
        if (!el) return

        const { scrollTop, scrollHeight, clientHeight } = el
        const max = scrollHeight - clientHeight

        setScrollY(scrollTop)
        setProgress(max > 0 ? scrollTop / max : 0)
    }, [])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        el.addEventListener("scroll", handleScroll, { passive: true })
        return () => el.removeEventListener("scroll", handleScroll)
    }, [handleScroll])

    return { progress, scrollY, containerRef }
}