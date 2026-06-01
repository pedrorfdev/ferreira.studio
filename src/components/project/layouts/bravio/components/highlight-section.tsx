import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  headline: string;
  body: string;
  variant?: "accent" | "outline" | "glass";
}

export function HighlightSection({
  eyebrow,
  headline,
  body,
  variant = "accent",
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`
        relative overflow-hidden rounded-[32px] border p-8 md:p-10
        ${
          variant === "accent"
            ? "bg-(--color-accent) border-(--color-accent-muted)"
            : ""
        }

        ${variant === "outline" ? "bg-transparent border-(--color-border)" : ""}

        ${
          variant === "glass"
            ? "bg-(--color-bg-secondary)/70 backdrop-blur-xl border-(--color-border)"
            : ""
        }
      `}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-52 h-52 rounded-full bg-(--color-project-glow) blur-3xl opacity-70" />
      </div>

      <div className="relative">
        <p className="text-[11px] uppercase tracking-[0.22em] text-(--color-gold) mb-5">
          {eyebrow}
        </p>

        <h2 className="max-w-2xl text-2xl md:text-4xl tracking-[-0.06em] leading-[1.02] text-(--color-text-primary)">
          {headline}
        </h2>

        <p className="mt-6 max-w-2xl text-sm md:text-base leading-relaxed text-(--color-text-secondary)">
          {body}
        </p>
      </div>
    </motion.section>
  );
}
