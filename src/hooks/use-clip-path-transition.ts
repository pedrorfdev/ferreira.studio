// hooks/use-clip-path-transition.ts
// ============================================================
// Converte o DOMRect do card em valores de clip-path CSS.
//
// inset(top right bottom left round radius)
// Todos os valores são calculados a partir das bordas do viewport.
//
// origin  → clip-path no tamanho/posição do card
// expanded → inset(0% 0% 0% 0%) — fullscreen
// ============================================================

import { useMemo } from "react"
import { useAppStore } from "@/store/use-app-store"

interface ClipPathValues {
    origin: string
    expanded: string
}

export function useClipPathTransition(): ClipPathValues {
    const cardOrigin = useAppStore((s) => s.cardOrigin)

    const origin = useMemo(() => {
        if (!cardOrigin) {
            // Fallback — centro da tela
            const vw = window.innerWidth
            const vh = window.innerHeight
            const w = 320, h = 200
            const t = vh / 2 - h / 2
            const l = vw / 2 - w / 2
            return `inset(${t}px ${vw - l - w}px ${vh - t - h}px ${l}px round 8px)`
        }

        const { top, left, width, height } = cardOrigin
        const vw = window.innerWidth
        const vh = window.innerHeight

        const insetTop = Math.max(0, top)
        const insetRight = Math.max(0, vw - (left + width))
        const insetBottom = Math.max(0, vh - (top + height))
        const insetLeft = Math.max(0, left)

        return `inset(${insetTop}px ${insetRight}px ${insetBottom}px ${insetLeft}px round 8px)`
    }, [cardOrigin])

    return {
        origin,
        expanded: "inset(0px 0px 0px 0px round 0px)",
    }
}