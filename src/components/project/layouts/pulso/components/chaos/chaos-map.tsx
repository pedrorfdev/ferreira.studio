import { motion } from "framer-motion";

import { ChaosNode } from "./chaos-node";
import { ChaosEdge } from "./chaos-edge";
import type { PulsoSections } from "@/types/projects";

interface Props {
  section: PulsoSections["chaos"];
}

export function ChaosMap({ section }: Props) {
  const nodes = [
    [12, 20],
    [34, 70],
    [52, 28],
    [72, 80],
    [88, 34],
  ];

  return (
    <section
      className="
        h-screen
        relative
        overflow-hidden
      "
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          x: [-40, 40, -40],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
      >
        {nodes.map(([x, y], index) => (
          <ChaosNode key={index} x={x} y={y} />
        ))}

        <ChaosEdge x1={12} y1={20} x2={52} y2={28} />

        <ChaosEdge x1={52} y1={28} x2={88} y2={34} />

        <ChaosEdge x1={34} y1={70} x2={72} y2={80} />
      </motion.div>

      <div
        className="
          absolute
          bottom-24
          left-24
          max-w-xl
        "
      >
        <h2 className="text-5xl">{section.headline}</h2>

        <p className="mt-6 text-(--color-text-secondary)">{section.body}</p>
      </div>
    </section>
  );
}
