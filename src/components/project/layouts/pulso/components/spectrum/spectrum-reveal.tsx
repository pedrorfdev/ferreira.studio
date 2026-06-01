import { motion } from "framer-motion";

import { OperationalSpectrum } from "./operational-spectrum";

interface Props {
  headline: string;
}

export function SpectrumReveal({ headline }: Props) {
  return (
    <section
      className="
        h-screen
        relative
        flex
        items-center
        justify-center
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        className="
          absolute
          inset-0
        "
      >
        <OperationalSpectrum />
      </motion.div>

      <div
        className="
          relative
          z-20
          text-center
          max-w-4xl
        "
      >
        <h2
          className="
            text-6xl
            md:text-8xl
            font-black
          "
        >
          {headline}
        </h2>
      </div>
    </section>
  );
}
