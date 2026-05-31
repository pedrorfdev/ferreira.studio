import { motion } from "framer-motion";

interface Props {
  height: number;
  delay: number;
}

export function SpectrumBar({ height, delay }: Props) {
  return (
    <motion.div
      animate={{
        height: [height * 0.7, height, height * 0.5, height],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
      }}
      className="
        w-2
        rounded-full
        bg-(--color-pulso-primary)
      "
    />
  );
}
