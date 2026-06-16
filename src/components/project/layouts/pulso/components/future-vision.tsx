// future-vision.tsx
// Anima quando entra na tela — sem scroll lock
// Usa whileInView com threshold alto para só animar quando bem visível
// Nodes aparecem staggered, revertem ao sair (once: false)
import { motion } from "framer-motion";
import type { FutureSection } from "@/types/projects/pulso";

interface Props {
  section: FutureSection;
}

const ANGLES = [0, 60, 120, 180, 240, 300];

function getOrbitPos(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: 50 + Math.cos(rad) * radius,
    y: 50 + Math.sin(rad) * radius,
  };
}

export function FutureVision({ section }: Props) {
  const steps = section.steps ?? [];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-8 py-24">
      {/* Header — entra de baixo */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 max-w-3xl"
      >
        <h2 className="text-3xl md:text-5xl font-black tracking-[-0.04em] leading-tight text-(--color-text-primary) mb-4">
          {section.headline}
        </h2>
        <p className="text-base text-(--color-text-secondary) leading-relaxed">
          {section.body}
        </p>
      </motion.div>

      {/* Orbital diagram */}
      <div className="relative w-full max-w-md aspect-square">
        {/* Anel externo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 0.12, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="absolute inset-0 rounded-full border border-(--color-accent)"
        />

        {/* Nó central */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 22,
            delay: 0.15,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                     flex flex-col items-center gap-2"
        >
          <div
            className="w-16 h-16 rounded-full bg-(--color-accent) flex items-center justify-center
                          shadow-lg shadow-(--color-accent)/30"
          >
            <span className="text-white font-black text-lg">P</span>
          </div>
          <span className="text-xs font-bold text-(--color-text-primary) uppercase tracking-widest">
            Pulso
          </span>
        </motion.div>

        {/* Linhas SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {steps.map((_, i) => {
            const pos = getOrbitPos(ANGLES[i % ANGLES.length], 38);
            return (
              <motion.line
                key={i}
                x1="50"
                y1="50"
                x2={pos.x}
                y2={pos.y}
                stroke="var(--color-accent)"
                strokeWidth="0.4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.3 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              />
            );
          })}
        </svg>

        {/* Nodes orbitais — staggered */}
        {steps.map((step, i) => {
          const pos = getOrbitPos(ANGLES[i % ANGLES.length], 38);
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
              whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 24,
                delay: 0.25 + i * 0.12,
              }}
              className="absolute w-3 h-3"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
            >
              <div
                className="w-full h-full rounded-full bg-(--color-accent) opacity-80
                              shadow-sm shadow-(--color-accent)/40"
              />
              <span
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 text-sm font-medium text-(--color-text-secondary)
                               whitespace-nowrap text-center leading-tight"
              >
                {step.title}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
