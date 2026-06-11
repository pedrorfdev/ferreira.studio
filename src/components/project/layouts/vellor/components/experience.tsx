// layouts/vellor/components/experience.tsx
// Light fix: texto enorme "EXPERIÊNCIA" substituído por headline normal com cor do Vellor
// Mobile: tamanho reduzido, sem texto de 180px que não funciona
import { motion } from "framer-motion";
import type { BaseSection } from "@/types/project";

interface Props {
  section: BaseSection;
  eyebrow: string;
}

export function Experience({ section, eyebrow }: Props) {
  return (
    <section className="min-h-screen flex items-center py-32 md:py-40">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-16 md:gap-20 w-full items-center">
        {/* Esquerda — headline grande mas não absurda */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold) mb-8">
            {eyebrow}
          </p>

          {/* Palavra em gold — identidade Vellor */}
          <div className="font-black tracking-[-0.06em] leading-[0.9] select-none">
            <div
              className="text-(--color-gold)"
              style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
            >
              EXP
            </div>
            <div
              className="text-(--color-gold)"
              style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
            >
              ERI
            </div>
            <div
              className="text-(--color-gold)"
              style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
            >
              ÊNC
            </div>
            <div
              className="text-(--color-text-secondary)"
              style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
            >
              IA
            </div>
          </div>
        </motion.div>

        {/* Direita — corpo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="flex items-center"
        >
          <div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.06em] leading-none
                           text-(--color-text-primary)"
            >
              {section.headline}
            </h2>
            <p className="mt-8 text-base md:text-lg leading-relaxed text-(--color-text-secondary) max-w-xl">
              {section.body}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
