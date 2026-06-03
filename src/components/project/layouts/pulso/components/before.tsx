import { motion } from "framer-motion";

import type { BeforeSection } from "@/types/projects/pulso";

import { BeforeCard } from "./before-card";

interface Props {
  section: BeforeSection;
}

export function BeforePulso({ section }: Props) {
  return (
    <section className="py-40">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.15,
          }}
        >
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-(--color-accent) mb-8">
            {section.eyebrow}
          </p>

          <h2 className="text-5xl md:text-7xl font-black tracking-[-0.08em] leading-[0.95] text-(--color-text-primary)">
            {section.headline}
          </h2>

          <p className="mt-12 max-w-5xl text-3xl md:text-3xl font-bold tracking-tighter leading-[1.05] text-(--color-text-secondary)">
            {section.body}
          </p>
        </motion.div>

        <div
          className="
            mt-24
            grid
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >
          {section.cards.map((card, index) => (
            <BeforeCard
              key={card.title}
              title={card.title}
              status={card.status}
              variant={card.variant}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
