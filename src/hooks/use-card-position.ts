// hooks/use-card-position.ts
// ============================================================
// Sistema de slots fixos — 4 posições definidas na área direita
// da tela. Cada projeto recebe um slot pelo seu índice.
// Os slots ficam sempre dentro da viewport, nunca saindo.
//
// Layout visual (área direita, fora da lista de projetos):
//
//  [ nav - 64px ]
//  ┌─────────────────────────────┐
//  │  lista    │  [slot-0 topo ] │  ← 20% top, 58% left
//  │  projetos │                 │
//  │           │  [slot-1 meio ] │  ← 38% top, 62% left
//  │           │                 │
//  │           │  [slot-2 baixo]│  ← 55% top, 52% left
//  │           │                 │
//  │           │  [slot-3 base ]│  ← 68% top, 60% left
//  └─────────────────────────────┘
//  [ identidade - bottom ]
//
// As posições são em % do viewport, garantindo
// que os cards nunca saem da tela.
// ============================================================

// Slots fixos — ajustados para ficarem sempre visíveis
// left em % do viewport, calculado para a área direita da lista
const SLOTS = [
    { top: "18%", left: "56%" },   // topo direita
    { top: "38%", left: "62%" },   // centro direita
    { top: "55%", left: "50%" },   // baixo centro-esquerda
    { top: "66%", left: "60%" },   // baixo direita
    { top: "28%", left: "54%" },   // fallback para 5o projeto
]

export interface CardSlot {
    top: string
    left: string
}

/**
 * Retorna o slot fixo para um projeto dado seu índice.
 * O slot nunca muda para o mesmo projeto — consistência garantida.
 */
export function useCardPosition(index: number): CardSlot {
    return SLOTS[index % SLOTS.length]
}