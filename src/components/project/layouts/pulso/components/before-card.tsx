import { motion } from "framer-motion";

interface Props {
  title: string;
  status: string;

  variant: "accent" | "gold" | "purple" | "neutral";

  index: number;
}

export function BeforeCard({ title, status, variant, index }: Props) {
  const colors = {
    accent: {
      border: "var(--color-accent)",
      background: "var(--color-accent-muted)",
      glow: "var(--color-project-glow)",
    },

    gold: {
      border: "var(--color-gold)",
      background: "var(--color-gold-muted)",
      glow: "var(--color-gold-muted)",
    },

    purple: {
      border: "var(--color-spectrum-purple)",
      background:
        "color-mix(in srgb, var(--color-spectrum-purple) 12%, transparent)",
      glow: "color-mix(in srgb, var(--color-spectrum-purple) 25%, transparent)",
    },

    neutral: {
      border: "var(--color-border)",
      background: "var(--color-bg-secondary)",
      glow: "transparent",
    },
  };

  const color = colors[variant];

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 32,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: false,
        amount: 0.15,
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.04,
        ease: "easeOut",
      }}
      style={{
        borderColor: color.border,
        background: color.background,
      }}
      className="
        group
        relative

        min-h-[240px]

        rounded-[32px]
        border

        p-8

        overflow-hidden

        transition-all
        duration-300

        hover:-translate-y-1
      "
    >
      <div
        className="
          absolute
          inset-0

          opacity-0
          group-hover:opacity-100

          transition-opacity
          duration-300

          pointer-events-none
        "
        style={{
          boxShadow: `0 0 60px ${color.glow}`,
        }}
      />

      <h3
        className="
          mt-10

          text-3xl
          md:text-4xl

          font-semibold

          tracking-tighter

          text-(--color-text-primary)
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-5

          text-lg

          text-(--color-text-secondary)
        "
      >
        {status}
      </p>
    </motion.article>
  );
}
