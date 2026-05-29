import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { useAssistantStore } from "@/store/use-assistant-store";

interface Props {
  target: React.RefObject<HTMLDivElement | null>;
}

export function BackToTop({ target }: Props) {
  const isAssistantOpen = useAssistantStore((s) => s.isOpen);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = target.current;
    if (!el) return;

    function handleScroll() {
      setVisible(el.scrollTop > 500);
    }

    el.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [target]);

  function scrollToTop() {
    target.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      onClick={scrollToTop}
      className={`
  fixed right-6
  z-60
  w-12 h-12
  rounded-full
  border border-(--color-border)
  bg-(--color-bg-secondary)/90
  backdrop-blur-xl
  flex items-center justify-center
  transition-all duration-500
  hover:border-(--color-accent)
  hover:-translate-y-1

  ${isAssistantOpen ? "bottom-106 md:bottom-100" : "bottom-24 md:bottom-20"}

  ${
    visible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-4 pointer-events-none"
  }
`}
    >
      <ChevronUp size={18} className="text-(--color-text-primary)" />
    </button>
  );
}
