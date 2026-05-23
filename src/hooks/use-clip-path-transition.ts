// hooks/use-clip-path-transition.ts
// ============================================================
// Controls the clip-path expansion animation from card → fullscreen.
// 
// How it works:
// 1. The store holds cardOrigin — the DOMRect of the clicked card
// 2. This hook converts that rect into a CSS inset() clip-path string
// 3. Framer Motion animates from that origin to inset(0% 0% 0% 0%)
// 4. On close, it animates back to the origin rect
//
// inset(top right bottom left) — all values from viewport edges
// ============================================================

import { useMemo } from "react"
import { useAppStore } from "@/store/use-app-store"

interface ClipPathValues {
    origin: string  // clip-path string of the card position
    expanded: string  // fullscreen — inset(0% 0% 0% 0%)
}

export function useClipPathTransition(): ClipPathValues {
    const cardOrigin = useAppStore((s) => s.cardOrigin)

    const origin = useMemo(() => {
        if (!cardOrigin) return "inset(50% 50% 50% 50% round 12px)"

        const { top, left, width, height } = cardOrigin
        const vw = window.innerWidth
        const vh = window.innerHeight

        const insetTop = top
        const insetRight = vw - (left + width)
        const insetBottom = vh - (top + height)
        const insetLeft = left

        return `inset(${insetTop}px ${insetRight}px ${insetBottom}px ${insetLeft}px round 12px)`
    }, [cardOrigin])

    return {
        origin,
        expanded: "inset(0% 0% 0% 0% round 0px)",
    }
}