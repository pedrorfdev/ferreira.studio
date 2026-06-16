// solution-grid.tsx — hideHeader prop suprime eyebrow e headline
// Quando vem logo após o SpectrumReveal, não precisa repetir o título
import { motion } from "framer-motion";
import type { PulsoSolutionSection } from "@/types/projects/pulso";
import { ArrowRight, ArrowDown } from "lucide-react";

interface Props {
  section: PulsoSolutionSection;
  eyebrow?: string;
  hideHeader?: boolean; // ← novo — suprime título quando vem após SpectrumReveal
}

function Card({
  item,
  delay,
}: {
  item: { title: string; description: string };
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="p-7 rounded-[20px] border border-(--color-border) bg-(--color-bg-secondary)
                 h-full flex flex-col gap-4
                 hover:border-(--color-accent)/40 transition-colors duration-300"
    >
      <h3 className="text-base font-bold text-(--color-text-primary) leading-snug">
        {item.title}
      </h3>
      <p className="text-sm text-(--color-text-secondary) leading-relaxed flex-1">
        {item.description}
      </p>
    </motion.div>
  );
}

function Arrow({ dir }: { dir: "right" | "down" }) {
  return (
    <div
      className="flex items-center justify-center w-7 h-7 rounded-full
                    bg-(--color-bg-primary) border border-(--color-border) shrink-0"
    >
      {dir === "right" ? (
        <ArrowRight size={13} className="text-(--color-accent)/50" />
      ) : (
        <ArrowDown size={13} className="text-(--color-accent)/50" />
      )}
    </div>
  );
}

export function SolutionGrid({ section, eyebrow, hideHeader = false }: Props) {
  const items = section.items ?? [];
  const row0 = items.slice(0, 3);
  const row1 = items.slice(3, 6).reverse();

  return (
    <section className="py-10 md:py-16 px-8 md:px-16 max-w-7xl mx-auto">
      {/* Header — omitido quando hideHeader=true */}
      {!hideHeader && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent) font-semibold mb-4">
              {eyebrow}
            </p>
          )}
          <h2 className="text-4xl md:text-6xl font-black tracking-[-0.04em] leading-tight text-(--color-text-primary)">
            {section.headline}
          </h2>
          {section.body && (
            <p className="mt-6 max-w-2xl text-lg text-(--color-text-secondary) leading-relaxed">
              {section.body}
            </p>
          )}
        </motion.div>
      )}

      {/* Desktop snake */}
      <div className="hidden md:block">
        <div className="flex items-stretch gap-0 mb-0">
          {row0.map((item, col) => (
            <div key={item.title} className="flex items-center flex-1 min-w-0">
              <div className="flex-1">
                <Card item={item} delay={col * 0.08} />
              </div>
              {col < 2 && (
                <div className="px-3 shrink-0">
                  <Arrow dir="right" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end pr-0 py-3">
          <Arrow dir="down" />
        </div>

        <div className="flex items-stretch gap-0">
          {row1.map((item, col) => (
            <div key={item.title} className="flex items-center flex-1 min-w-0">
              <div className="flex-1">
                <Card item={item} delay={0.3 + col * 0.08} />
              </div>
              {col < 2 && (
                <div className="px-3 shrink-0 rotate-180">
                  <Arrow dir="right" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile — coluna com setas para baixo */}
      <div className="flex flex-col md:hidden gap-0">
        {items.map((item, i) => (
          <div key={item.title} className="flex flex-col">
            <Card item={item} delay={i * 0.06} />
            {i < items.length - 1 && (
              <div className="flex justify-center py-3">
                <Arrow dir="down" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
