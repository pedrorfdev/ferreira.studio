import { motion } from "framer-motion";

interface ChaosItem {
  title: string;
}

interface Props {
  eyebrow: string;
  headline: string;
  body: string;

  items: ChaosItem[];
}

export function ChaosMap({ eyebrow, headline, body, items }: Props) {
  return (
    <section className="min-h-screen flex flex-col justify-center py-32 overflow-hidden">
      <div className="max-w-4xl mb-20">
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold)">
          {eyebrow}
        </p>

        <h2 className="mt-5 text-4xl md:text-6xl tracking-[-0.06em] leading-[1.02] text-(--color-text-primary)">
          {headline}
        </h2>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-(--color-text-secondary)">
          {body}
        </p>
      </div>

      <div className="relative h-[520px]">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{
              opacity: 0,
              rotate: index % 2 ? -18 : 18,
              scale: 0.8,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
            }}
            className="
              absolute
              rounded-[28px]
              border border-(--color-border)
              bg-(--color-bg-secondary)
              px-6 py-5
              backdrop-blur-md
            "
            style={{
              left: `${10 + ((index * 13) % 70)}%`,
              top: `${20 + ((index * 90) % 260)}px`,
            }}
          >
            <p className="text-sm text-(--color-text-secondary)">
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
