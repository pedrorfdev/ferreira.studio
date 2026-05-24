// hooks/use-card-position.ts
// ============================================================
// Posições mais espalhadas, garantindo que os cards de projetos
// diferentes fiquem bem separados visualmente.
// Usa uma distribuição em zonas para evitar sobreposição.
// ============================================================

import { useMemo } from "react"

interface CardPosition {
    top: string
    left: string
}

// Divide a tela em zonas para garantir espalhamento
// Cada projeto cai numa zona diferente
const ZONES = [
    { topMin: 15, topMax: 35, leftMin: 42, leftMax: 58 },  // centro-topo
    { topMin: 50, topMax: 68, leftMin: 30, leftMax: 48 },  // esquerda-baixo
    { topMin: 20, topMax: 40, leftMin: 58, leftMax: 74 },  // direita-topo
    { topMin: 55, topMax: 72, leftMin: 52, leftMax: 70 },  // direita-baixo
    { topMin: 35, topMax: 52, leftMin: 38, leftMax: 56 },  // centro-meio
]

function seededRandom(seed: number): number {
    const x = Math.sin(seed + 1) * 10000
    return x - Math.floor(x)
}

export function useCardPosition(index: number): CardPosition {
    return useMemo(() => {
        const zone = ZONES[index % ZONES.length]
        const topRange = zone.topMax - zone.topMin
        const leftRange = zone.leftMax - zone.leftMin

        const top = zone.topMin + seededRandom(index * 3) * topRange
        const left = zone.leftMin + seededRandom(index * 3 + 1) * leftRange

        return {
            top: `${top.toFixed(1)}%`,
            left: `${left.toFixed(1)}%`,
        }
    }, [index])
}