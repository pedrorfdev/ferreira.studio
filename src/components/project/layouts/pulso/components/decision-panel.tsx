import { motion } from "framer-motion";

import type { TechnicalDecision } from "@/types/project";

interface Props {
  decision: TechnicalDecision;
}

export function DecisionPanel({ decision }: Props) {
  return (
    <motion.div
      key={decision.title}
      initial={{
        opacity: 0,
        x: 40,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="
        rounded-3xl
        border
        border-(--color-border)
        p-8
      "
    >
      <h3 className="text-2xl">{decision.title}</h3>

      <div className="mt-8">
        <p className="text-sm uppercase mb-2">WHY</p>

        <p>{decision.why}</p>
      </div>

      <div className="mt-8">
        <p className="text-sm uppercase mb-2">TRADEOFF</p>

        <p>{decision.trade}</p>
      </div>
    </motion.div>
  );
}
