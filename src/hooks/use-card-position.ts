const SLOTS = [
  { top: "18%", left: "56%" }, // topo direita
  { top: "38%", left: "62%" }, // centro direita
  { top: "55%", left: "50%" }, // baixo centro-esquerda
  { top: "66%", left: "60%" }, // baixo direita
  { top: "28%", left: "54%" }, // fallback para 5o projeto
];

export interface CardSlot {
  top: string;
  left: string;
}

/**
 * Retorna o slot fixo para um projeto dado seu índice.
 * O slot nunca muda para o mesmo projeto — consistência garantida.
 */
export function useCardPosition(index: number): CardSlot {
  return SLOTS[index % SLOTS.length];
}
