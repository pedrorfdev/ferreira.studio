import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
interface Props {
  title: string;
  why: string;
  trade?: string;
}
export function DecisionAccordion({ title, why, trade }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-3xl border border-(--color-border) bg-(--color-bg-secondary) overflow-hidden">
      {" "}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
      >
        {" "}
        <span className="text-(--color-text-primary)"> {title} </span>{" "}
        <ChevronDown
          className={` w-4 h-4 text-(--color-text-secondary) transition-transform duration-300 ${open ? "rotate-180" : ""} `}
        />{" "}
      </button>{" "}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden"
      >
        {" "}
        <div className="px-6 pb-6 space-y-6">
          {" "}
          <div>
            {" "}
            <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent) mb-2">
              {" "}
              Why{" "}
            </p>{" "}
            <p className="text-(--color-text-secondary) leading-relaxed">
              {" "}
              {why}{" "}
            </p>{" "}
          </div>{" "}
          {trade && (
            <div>
              {" "}
              <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent) mb-2">
                {" "}
                Tradeoff{" "}
              </p>{" "}
              <p className="text-(--color-text-secondary) leading-relaxed">
                {" "}
                {trade}{" "}
              </p>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </motion.div>{" "}
    </div>
  );
}
