import { motion } from "framer-motion";

import type { PulsoProject } from "@/types/projects/pulso";

import { TextureLayer } from "./background/texture-layer";

interface Props {
  project: PulsoProject;
}

export function Hero({ project }: Props) {
  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden

        flex
        items-center
        justify-center
      "
    >
      <TextureLayer />

      <div
        className="
          relative
          z-20

          text-center

          px-8
          max-w-5xl
        "
      >
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
          className="
            mx-auto
            mb-8

            size-4

            rounded-full

            bg-(--color-pulso-primary)
          "
        />

        <h1
          className="
            text-7xl
            md:text-[10rem]

            font-black

            tracking-[-0.08em]

            text-(--color-text-primary)
          "
        >
          PULSO
        </h1>

        <p
          className="
            mt-8

            text-xl
            md:text-2xl

            text-(--color-text-secondary)
          "
        >
          {project.tagline}
        </p>
      </div>
    </section>
  );
}
