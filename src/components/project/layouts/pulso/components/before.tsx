import { motion } from "framer-motion";

import type { BaseSection } from "@/types/project";

interface Props {
  section: BaseSection;
  eyebrow: string;
}

const cards = [
  {
    title: "WhatsApp",
    state: "84 mensagens",
  },
  {
    title: "Planilha",
    state: "3 versões",
  },
  {
    title: "Escala PDF",
    state: "desatualizada",
  },
  {
    title: "Fulano",
    state: "não confirmou",
  },
];

export function BeforePulso({ section, eyebrow }: Props) {
  return (
    <section className="py-40">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-pulso-primary)">
          {eyebrow}
        </p>

        <h2 className="mt-6 text-5xl md:text-7xl tracking-[-0.08em] text-(--color-text-primary)">
          {section.headline}
        </h2>

        <p className="mt-8 max-w-3xl text-lg text-(--color-text-secondary)">
          {section.body}
        </p>

        <div className="mt-20 grid md:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{
                opacity: 0,
                rotateX: 90,
                y: 120,
              }}
              whileInView={{
                opacity: 1,
                rotateX: 0,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
                duration: 0.7,
              }}
              className="
                rounded-[28px]
                border
                border-(--color-border)
                bg-(--color-bg-secondary)
                p-8
              "
            >
              <p className="text-lg text-(--color-text-primary)">
                {card.title}
              </p>

              <p className="mt-8 text-sm text-(--color-pulso-primary)">
                {card.state}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
