import { motion } from "framer-motion";

import type { BaseSection } from "@/types/project";

interface Props {
  section: BaseSection;
  eyebrow: string;
}

const itemVariants = {
  hidden: {
    opacity: 0,
    rotateX: -25,
    y: 60,
  },

  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

export function Experience({ section, eyebrow }: Props) {
  return (
    <section
      className="
        min-h-screen
        flex
        items-center
        py-40
      "
    >
      <div
        className="
          grid
          lg:grid-cols-[0.9fr_1.1fr]
          gap-20
          w-full
        "
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={itemVariants}
        >
          <p
            className="
              text-xs
              uppercase
              tracking-[0.18em]
              text-(--color-gold)
              mb-10
            "
          >
            {eyebrow}
          </p>

          <div
            className="
              font-semibold
              tracking-[-0.12em]
              leading-[0.82]
              select-none

              bg-linear-to-b
              from-(--color-text-primary)
              via-(--color-gold)
              to-(--color-text-secondary)

              bg-clip-text
              text-transparent
              flex flex-col gap-10
            "
          >
            <div className="text-[120px] md:text-[160px] lg:text-[180px]">
              EXP
            </div>

            <div className="text-[120px] md:text-[160px] lg:text-[180px]">
              ERI
            </div>

            <div className="text-[120px] md:text-[160px] lg:text-[180px]">
              ÊNC
            </div>

            <div className="text-[120px] md:text-[160px] lg:text-[180px]">
              IA
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            flex
            items-center
          "
        >
          <div>
            <h2
              className="
                text-5xl
                md:text-6xl
                lg:text-7xl
                tracking-[-0.08em]
                leading-[0.98]
                text-(--color-text-primary)
              "
            >
              {section.headline}
            </h2>

            <p
              className="
                mt-10
                text-lg
                md:text-xl
                leading-relaxed
                text-(--color-text-secondary)
                max-w-2xl
              "
            >
              {section.body}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
