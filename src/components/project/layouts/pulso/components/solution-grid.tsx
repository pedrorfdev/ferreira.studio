import { motion } from "framer-motion";

import type { PulsoSolutionSection } from "@/types/projects/pulso";

interface Props {
  section: PulsoSolutionSection;
  eyebrow: string;
}

export function SolutionGrid({ section, eyebrow }: Props) {
  return (
    <section className="py-40">
      <div className="text-center mb-24">
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-pulso-primary)">
          {eyebrow}
        </p>

        <h2 className="mt-6 text-5xl md:text-7xl font-bold tracking-[-0.06em]">
          {section.headline}
        </h2>

        <p className="mt-8 max-w-3xl mx-auto text-(--color-text-secondary)">
          {section.body}
        </p>
      </div>

      <div
        className="
          relative
          max-w-6xl
          mx-auto
          grid
          md:grid-cols-3
          gap-8
        "
      >
        {section.items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{
              opacity: 0,
              y: 80,
              rotateX: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotateX: 0,
            }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.08,
            }}
            className="
              rounded-[32px]
              border
              border-(--color-border)
              bg-(--color-bg-secondary)
              p-8
              hover:border-(--color-pulso-primary)
              transition-all
            "
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>

            <p className="mt-4 text-(--color-text-secondary)">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
