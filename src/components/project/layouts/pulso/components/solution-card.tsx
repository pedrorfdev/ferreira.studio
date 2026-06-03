import { motion } from "framer-motion";

import type { PulsoFeatureItem } from "@/types/projects/pulso";

interface Props {
  item: PulsoFeatureItem;
}

export function SolutionCard({ item }: Props) {
  return (
    <motion.div
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
      className="
        rounded-3xl
        border
        border-(--color-border)
        bg-(--color-bg-secondary)
        p-8
      "
    >
      <h3
        className="
          text-xl
          text-(--color-text-primary)
        "
      >
        {item.title}
      </h3>

      <p
        className="
          mt-4
          leading-relaxed
          text-(--color-text-secondary)
        "
      >
        {item.description}
      </p>
    </motion.div>
  );
}
