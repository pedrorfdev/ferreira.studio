import { motion } from "framer-motion";

interface Props {
  className?: string;
}

const PATHS = [
  {
    color: "#D9485F",
    opacity: 0.35,
    duration: 18,
    pathA:
      "M-100 140 C150 40 350 240 550 140 S950 40 1150 140 S1550 240 1750 140",
    pathB:
      "M-100 120 C150 260 350 40 550 160 S950 260 1150 120 S1550 40 1750 160",
  },

  {
    color: "#A83EF0",
    opacity: 0.28,
    duration: 22,
    pathA:
      "M-100 260 C150 160 350 360 550 260 S950 160 1150 260 S1550 360 1750 260",
    pathB:
      "M-100 240 C150 420 350 120 550 300 S950 420 1150 220 S1550 120 1750 300",
  },

  {
    color: "#F5B942",
    opacity: 0.24,
    duration: 16,
    pathA:
      "M-100 380 C150 280 350 480 550 380 S950 280 1150 380 S1550 480 1750 380",
    pathB:
      "M-100 420 C150 180 350 620 550 320 S950 180 1150 420 S1550 620 1750 320",
  },

  {
    color: "#D9485F",
    opacity: 0.15,
    duration: 25,
    pathA:
      "M-100 520 C150 420 350 620 550 520 S950 420 1150 520 S1550 620 1750 520",
    pathB:
      "M-100 500 C150 700 350 340 550 560 S950 700 1150 460 S1550 340 1750 560",
  },

  {
    color: "#A83EF0",
    opacity: 0.12,
    duration: 28,
    pathA:
      "M-100 660 C150 560 350 760 550 660 S950 560 1150 660 S1550 760 1750 660",
    pathB:
      "M-100 620 C150 840 350 420 550 720 S950 840 1150 620 S1550 420 1750 720",
  },
];

function TextureSvg() {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      className="
        absolute
        inset-0
        h-full
        w-full
      "
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {PATHS.map((line, index) => (
        <motion.path
          key={index}
          stroke={line.color}
          strokeWidth={4} // aumentado para 4 para maior destaque
          strokeLinecap="round"
          opacity={line.opacity * 1.5} // opacidade aumentada
          initial={{
            d: line.pathA,
          }}
          animate={{
            d: [line.pathA, line.pathB, line.pathA],
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

export function TextureLayer({ className }: Props) {
  return (
    <div
      className={`
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
        ${className ?? ""}
      `}
    >
      {/* Movimento geral */}
      <motion.div
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.75, 1, 0.75],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          inset-[-8%]
        "
      >
        <TextureSvg />
      </motion.div>

      {/* Glow vermelho central */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          h-[900px]
          w-[900px]

          bg-(--color-pulso-primary)
        "
      />
    </div>
  );
}
