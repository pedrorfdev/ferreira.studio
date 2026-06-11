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
    <section className="min-h-screen flex items-center justify-center py-32 md:py-40">
      <div className="max-w-4xl mx-auto text-center px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.24em] text-(--color-text-tertiary) mb-8">
            {eyebrow}
          </p>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.06em] leading-[0.95] text-(--color-gold) drop-shadow-[0_0_24px_var(--color-gold)]">
            {section.headline}
          </h2>

          <p className="mt-12 text-lg md:text-2xl leading-relaxed text-(--color-text-secondary) max-w-2xl mx-auto">
            {section.body}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
