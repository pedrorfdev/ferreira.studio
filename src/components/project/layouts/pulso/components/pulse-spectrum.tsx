import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  headline: string;
  body: string;
}

const BARS = Array.from({ length: 40 });

export function PulseSpectrum({ eyebrow, headline, body }: Props) {
  return (
    <section
      className="
        relative
        min-h-screen
        flex
        items-center
        overflow-hidden
      "
    >
      <div
        className="
          absolute inset-0
          pointer-events-none
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-radial
            from-(--color-project-glow)
            to-transparent
            opacity-30
          "
        />
      </div>

      <div className="relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold)">
            {eyebrow}
          </p>

          <h2 className="mt-6 text-5xl md:text-7xl tracking-[-0.08em] leading-[0.94] text-(--color-text-primary)">
            {headline}
          </h2>

          <p className="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-(--color-text-secondary)">
            {body}
          </p>
        </div>

        <div
          className="
            mt-28
            h-[360px]
            flex
            items-center
            justify-center
            gap-[6px]
            px-10
          "
        >
          {BARS.map((_, index) => (
            <motion.div
              key={index}
              initial={{
                height: 40 + Math.random() * 220,
                opacity: 0.5,
                rotate: Math.random() * 10 - 5,
              }}
              whileInView={{
                height: [60 + Math.random() * 120, 180, 180, 180],
                opacity: [0.4, 0.7, 1],
                rotate: [5, 0, 0],
              }}
              transition={{
                duration: 3.5,
                delay: index * 0.03,
                ease: "easeInOut",
              }}
              viewport={{ once: true }}
              className="
                w-3
                rounded-full
                bg-(--color-gold)
                shadow-[0_0_20px_var(--color-project-glow)]
              "
            />
          ))}
        </div>

        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.4,
            delay: 2,
          }}
          className="
            origin-center
            mx-auto
            mt-10
            h-px
            max-w-5xl
            bg-(--color-gold)
          "
        />
      </div>
    </section>
  );
}
