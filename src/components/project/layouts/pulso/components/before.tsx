// layouts/pulso/components/before.tsx
// Fix: card "Voluntário" com variant gold em dourado real
// Fix: mobile — grid 1 coluna
import { motion } from "framer-motion";
import type { BeforeSection, BeforeCard } from "@/types/projects/pulso";

interface Props {
  section: BeforeSection;
}

const VARIANT_STYLES: Record<BeforeCard["variant"], string> = {
  accent: "bg-(--color-accent) border-(--color-accent) text-white",
  purple: "bg-[#7c3aed] border-[#7c3aed] text-white",
  // gold: dourado real — não muted
  gold: "bg-(--color-gold) border-(--color-gold) text-white",
  neutral:
    "bg-(--color-bg-secondary) border-(--color-border) text-(--color-text-secondary)",
};

function Card({ card, index }: { card: BeforeCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ transformPerspective: 800 }}
      className={[
        "rounded-2xl border p-6 flex flex-col gap-3",
        VARIANT_STYLES[card.variant],
      ].join(" ")}
    >
      <p className="text-base font-bold leading-snug">{card.title}</p>
      <p className="text-sm opacity-75">{card.status}</p>
    </motion.div>
  );
}

export function BeforePulso({ section }: Props) {
  return (
    <section className="py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
        >
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-(--color-accent) mb-8">
            {section.eyebrow}
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.06em] leading-[0.95] text-(--color-text-primary)">
            {section.headline}
          </h2>
          <p className="mt-10 max-w-4xl text-xl md:text-2xl font-bold tracking-tight leading-[1.1] text-(--color-text-secondary)">
            {section.body}
          </p>
        </motion.div>

        {/* Mobile: 1 col | sm: 2 col | xl: 4 col */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {section.cards.map((card, index) => (
            <Card key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
