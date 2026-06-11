// spectrum-reveal.tsx
import { motion } from "framer-motion";
import { OperationalSpectrum } from "./operational-spectrum";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  headline: string;
}

export function SpectrumReveal({ headline }: Props) {
  const { lang } = useI18n();
  const sub =
    lang === "pt" ? "Pulso torna isso visível." : "Pulso makes it visible.";

  return (
    <section className="h-screen relative flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0"
      >
        <OperationalSpectrum />
      </motion.div>

      {/* Fades apenas verticais */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `
               linear-gradient(to bottom, var(--color-bg-primary) 0%, transparent 20%, transparent 80%, var(--color-bg-primary) 100%)
             `,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="relative z-20 text-center max-w-4xl px-8 md:px-12 py-10 rounded-[2.5rem] bg-(--color-bg-primary)/60 backdrop-blur-md border border-(--color-border)"
      >
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-(--color-text-primary) mb-5">
          {headline}
        </h2>
        <p className="text-xl text-(--color-text-secondary)">{sub}</p>
      </motion.div>
    </section>
  );
}
