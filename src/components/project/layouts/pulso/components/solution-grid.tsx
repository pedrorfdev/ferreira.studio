// solution-grid.tsx
// Snake flow: row0 → → →  row1 ← ← ←
// Setas corretas: dentro da row, a seta aponta pro próximo card na direção do fluxo
// Row 0 (índices 0,1,2): seta direita exceto no último (2) que aponta pra baixo
// Row 1 (índices 3,4,5 exibidos como 5,4,3): seta esquerda exceto no primeiro visual (índice 5) que aponta pra baixo
import { motion }                   from "framer-motion"
import type { PulsoSolutionSection } from "@/types/projects/pulso"
import { ArrowRight, ArrowDown, ArrowLeft } from "lucide-react"

interface Props { section: PulsoSolutionSection; eyebrow: string }

export function SolutionGrid({ section, eyebrow }: Props) {
  const items = section.items ?? []

  // Row 0: items 0,1,2 — fluxo esquerda→direita
  // Row 1: items 3,4,5 — fluxo direita→esquerda, então exibimos invertido: 5,4,3
  const row0 = items.slice(0, 3)
  const row1 = items.slice(3, 6).reverse() // exibe 5,4,3

  // Para cada posição visual, sabemos qual seta mostrar:
  // Row0: [→, →, ↓]  (no card visual 2, seta pra baixo)
  // Row1: [null, ←, ←] (no card visual 0 = índice real 5, seta pra baixo já foi no row0)
  // Na prática: row1[0]=item5 não tem seta (é o começo da row após a virada)
  //             row1[1]=item4 tem ←
  //             row1[2]=item3 tem ← (último, sem seta pois é o fim)

  type Arrow = "right" | "down" | "left" | null

  const row0Arrows: Arrow[] = ["right", "right", "down"]
  const row1Arrows: Arrow[] = [null, "left", "left"]

  function ArrowIcon({ dir }: { dir: Arrow }) {
    if (!dir) return null
    const cls = "text-(--color-accent)/50"
    return (
      <div className="absolute z-10 hidden md:flex items-center justify-center">
        <div className="w-7 h-7 rounded-full bg-(--color-bg-primary) border border-(--color-border) flex items-center justify-center">
          {dir === "right" && <ArrowRight size={13} className={cls} />}
          {dir === "down"  && <ArrowDown  size={13} className={cls} />}
          {dir === "left"  && <ArrowLeft  size={13} className={cls} />}
        </div>
      </div>
    )
  }

  function Card({ item, delay }: { item: { title: string; description: string }; delay: number }) {
    return (
      <motion.div
        initial={{ opacity: 0, rotateY: 50 }}
        whileInView={{ opacity: 1, rotateY: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformPerspective: 900 }}
        className="p-7 rounded-[24px] border border-(--color-border) bg-(--color-bg-secondary)
                   h-[180px] flex flex-col justify-between
                   hover:border-(--color-accent)/40 transition-colors duration-300"
      >
        <div>
          <h3 className="text-base font-bold text-(--color-text-primary) mb-3">{item.title}</h3>
          <p className="text-sm text-(--color-text-secondary) leading-relaxed line-clamp-2">{item.description}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-20"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent) font-semibold mb-4">{eyebrow}</p>
        <h2 className="text-4xl md:text-6xl font-black tracking-[-0.04em] leading-tight text-(--color-text-primary)">
          {section.headline}
        </h2>
        {section.body && (
          <p className="mt-6 max-w-2xl text-lg text-(--color-text-secondary) leading-relaxed">{section.body}</p>
        )}
      </motion.div>

      {/* Row 0 — fluxo → */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2 relative">
        {row0.map((item, col) => (
          <div key={item.title} className="relative">
            <Card item={item} delay={col * 0.08} />
            {/* Seta direita — entre cards */}
            {row0Arrows[col] === "right" && (
              <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 hidden md:flex">
                <ArrowIcon dir="right" />
              </div>
            )}
            {/* Seta baixo — no último da row, centralizada embaixo */}
            {row0Arrows[col] === "down" && (
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 hidden md:flex">
                <ArrowIcon dir="down" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Row 1 — fluxo ← (exibido invertido: item5, item4, item3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 relative">
        {row1.map((item, col) => (
          <div key={item.title} className="relative">
            <Card item={item} delay={0.24 + col * 0.08} />
            {/* Seta esquerda — col 1 e 2 têm seta apontando para a esquerda */}
            {row1Arrows[col] === "left" && (
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 hidden md:flex">
                <ArrowIcon dir="left" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}