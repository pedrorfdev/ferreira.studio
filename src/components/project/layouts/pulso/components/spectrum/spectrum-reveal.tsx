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
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: "100svh" }}
    >
      {/* Spectrum — tela inteira, sem fades laterais */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0"
        style={{
          maskImage: `linear-gradient(to bottom, transparent 0%, black 18%, black 72%, transparent 100%)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, black 18%, black 72%, transparent 100%)`,
        }}
      >
        <OperationalSpectrum />
      </motion.div>

      {/* Texto sobre o spectrum */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-20 text-center max-w-4xl px-8"
      >
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-(--color-text-primary) mb-4">
          {headline}
        </h2>
        <p className="text-lg md:text-xl text-(--color-text-secondary)">
          {sub}
        </p>
      </motion.div>
    </section>
  );
}
