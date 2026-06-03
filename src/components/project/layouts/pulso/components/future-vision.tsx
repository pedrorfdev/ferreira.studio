import { motion } from "framer-motion";

interface Props {
  title: string;
  steps: string[];
}

export function FutureVision({ title, steps }: Props) {
  return (
    <section className="py-40">
      <h2 className="text-5xl font-bold mb-20">{title}</h2>

      <div
        className="
          flex
          overflow-x-auto
          gap-24
          pb-10
        "
      >
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            className="
                relative
                min-w-[240px]
              "
          >
            <div
              className="
                  size-5
                  rounded-full
                  bg-(--color-pulso-primary)
                  shadow-lg
                "
            />

            {index < steps.length - 1 && (
              <div
                className="
                    absolute
                    top-2
                    left-5
                    w-32
                    h-px
                    bg-(--color-border)
                  "
              />
            )}

            <p className="mt-8 text-xl">{step}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
