// hooks/use-card-position.ts
// ============================================================
// Returns a stable screen position for the floating project card.
// Position is seeded by project index so it's always consistent
// for the same project, but visually varied across projects.
// Values are constrained to a safe zone that avoids the nav,
// the project list on the left, and the screen edges.
// ============================================================

import { useMemo } from "react"

interface CardPosition {
    top: string
    left: string
}

// Seeded pseudo-random — same seed always returns same value
function seededRandom(seed: number): number {
    const x = Math.sin(seed + 1) * 10000
    return x - Math.floor(x)
}

// Safe zone — keeps cards away from edges, nav, and project list
const SAFE_ZONE = {
    // Vertical: 15% from top (below nav), 20% from bottom
    topMin: 15,
    topMax: 60,
    // Horizontal: 38% from left (clear of project list), 15% from right
    leftMin: 38,
    leftMax: 72,
}

export function useCardPosition(index: number): CardPosition {
    return useMemo(() => {
        const topRange = SAFE_ZONE.topMax - SAFE_ZONE.topMin
        const leftRange = SAFE_ZONE.leftMax - SAFE_ZONE.leftMin

        const top = SAFE_ZONE.topMin + seededRandom(index * 2) * topRange
        const left = SAFE_ZONE.leftMin + seededRandom(index * 2 + 1) * leftRange

        return {
            top: `${top.toFixed(1)}%`,
            left: `${left.toFixed(1)}%`,
        }
    }, [index])
}