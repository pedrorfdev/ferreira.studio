import type { ListSection } from "@/types/project";
import { Database, MapPinned, Smartphone, WifiOff, Wallet } from "lucide-react";
const ICONS = [MapPinned, Database, Wallet, WifiOff, Smartphone];
interface Props {
  section: ListSection;
}
export function SolutionGrid({ section }: Props) {
  return (
    <section className="space-y-12">
      {" "}
      <div className="space-y-6">
        {" "}
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent)">
          {" "}
          SOLUTION{" "}
        </p>{" "}
        <h2 className="max-w-3xl text-3xl md:text-5xl tracking-[-0.06em] leading-[1.04] text-(--color-text-primary)">
          {" "}
          {section.headline}{" "}
        </h2>{" "}
        {section.body && (
          <p className="max-w-2xl text-lg leading-relaxed text-(--color-text-secondary)">
            {" "}
            {section.body}{" "}
          </p>
        )}{" "}
      </div>{" "}
      <div className="grid md:grid-cols-2 gap-5">
        {" "}
        {section.items?.map((item, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <div
              key={item}
              className=" rounded-3xl border border-(--color-border) bg-(--color-bg-secondary) p-7 "
            >
              {" "}
              <div className="w-12 h-12 rounded-2xl bg-(--color-accent-muted) flex items-center justify-center mb-6">
                {" "}
                <Icon size={18} className="text-(--color-accent)" />{" "}
              </div>{" "}
              <p className="text-base leading-relaxed text-(--color-text-secondary)">
                {" "}
                {item}{" "}
              </p>{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
    </section>
  );
}
