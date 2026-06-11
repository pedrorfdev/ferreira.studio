import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";
import { useMenuStore } from "@/store/use-menu-store";
import { useThemeStore } from "@/store/use-theme-store";
import { useI18n } from "@/lib/i18n-context";
import { AppState } from "@/types/project";
import { cn } from "@/lib/cn";
import { Moon, Sun } from "lucide-react";

// Cor âncora de cada projeto — sempre usada no título do nav
const PROJECT_COLORS: Record<string, string> = {
  praxis: "oklch(0.52 0.12 210)", // petróleo/cyan mais claro p/ legibilidade
  vambora: "oklch(0.62 0.18 265)", // indigo
  bravio: "oklch(0.52 0.14 145)", // verde operacional mais claro
  vellor: "oklch(0.72 0.10 72)", // gold
  pulso: "oklch(0.62 0.22 15)", // vermelho mais vibrante
};

export function Nav() {
  const appState = useAppStore((s) => s.appState);
  const activeProject = useAppStore((s) => s.activeProject);
  const closeProject = useAppStore((s) => s.closeProject);
  const isMenuOpen = useMenuStore((s) => s.isOpen);
  const toggleMenu = useMenuStore((s) => s.toggle);
  const closeMenu = useMenuStore((s) => s.close);
  const { theme, toggle: toggleTheme } = useThemeStore();
  const { lang, toggle: toggleLang, t } = useI18n();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement | Document;

      // Quando rola o container do projeto
      if (
        "hasAttribute" in target &&
        target.hasAttribute("data-scroll-container")
      ) {
        setIsScrolled(target.scrollTop > 20);
      }
    };

    // Usar capture: true para apanhar eventos de scroll de elementos filhos
    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });

    // Verificar estado inicial
    setIsScrolled(window.scrollY > 20);

    return () =>
      window.removeEventListener("scroll", handleScroll, { capture: true });
  }, []);

  const isProjectOpen =
    appState === AppState.PROJECT || appState === AppState.EXPANDING;

  // Garante que ao voltar para a home, se a janela estiver no topo, o fundo remove-se
  useEffect(() => {
    if (!isProjectOpen) {
      setIsScrolled(window.scrollY > 20);
    }
  }, [isProjectOpen]);

  const projectColor =
    activeProject?.id && PROJECT_COLORS[activeProject.id]
      ? PROJECT_COLORS[activeProject.id]
      : undefined;

  function handleClose() {
    closeMenu();
    closeProject();
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-90 flex items-center justify-between",
        "px-5 md:px-10 h-14 md:h-16 transition-all duration-300",
        // Fundo apenas quando rola para baixo
        isScrolled || isMenuOpen
          ? "bg-(--color-bg-primary)/80 backdrop-blur-md border-b border-(--color-border-subtle)/60"
          : "bg-transparent border-b-transparent",
      )}
    >
      {/* LEFT — hamburguer + nome */}
      <div className="flex items-center gap-3 md:gap-4">
        <motion.button
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="flex flex-col justify-center gap-[5px] w-5 h-5 cursor-pointer
                     select-none text-(--color-text-primary) shrink-0"
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            className="block h-px bg-current origin-center"
            animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          />
          <motion.span
            className="block h-px bg-current origin-center"
            animate={
              isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
            }
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-px bg-current origin-center"
            animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.button>

        <motion.button
          onClick={toggleMenu}
          className="font-display text-sm font-bold tracking-[-0.01em]
                     text-(--color-text-primary) hover:text-(--color-accent)
                     transition-colors duration-200 cursor-pointer select-none"
          whileTap={{ scale: 0.97 }}
        >
          Pedro Ferreira
        </motion.button>
      </div>

      {/* CENTER — nome do projeto + Close (só no modo projeto) */}
      {isProjectOpen && activeProject && (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-4">
          <span
            className="font-display text-xs md:text-sm font-semibold tracking-[-0.01em]
                       whitespace-nowrap transition-colors duration-300"
            style={projectColor ? { color: projectColor } : undefined}
          >
            {activeProject.title}
          </span>

          <span className="w-px h-3.5 bg-(--color-border) shrink-0" />

          <button
            onClick={handleClose}
            className={cn(
              "text-[10px] md:text-xs uppercase tracking-[0.12em] md:tracking-[0.15em]",
              "text-(--color-text-tertiary) hover:text-(--color-text-primary)",
              "transition-colors cursor-pointer select-none whitespace-nowrap",
            )}
          >
            {t.project.close}
          </button>
        </div>
      )}

      {/* RIGHT — tema + lang */}
      <div className="flex items-center gap-3 md:gap-4">
        <motion.button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex items-center gap-1.5 text-(--color-text-primary) hover:opacity-60
                     transition-opacity duration-200 cursor-pointer"
          whileTap={{ scale: 0.9 }}
        >
          {theme === "dark" ? (
            <Sun className="size-4 shrink-0" />
          ) : (
            <Moon className="size-4 shrink-0" />
          )}
          <span className="hidden md:block text-[10px] uppercase tracking-[0.12em] text-(--color-text-tertiary)">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </motion.button>

        <div className="hidden md:flex items-center gap-1.5">
          <button
            onClick={() => lang !== "en" && toggleLang()}
            title="English"
            className={cn(
              "text-base leading-none cursor-pointer transition-opacity duration-200 select-none",
              lang === "en" ? "opacity-100" : "opacity-40 hover:opacity-70",
            )}
          >
            🇺🇸
          </button>
          <button
            onClick={() => lang !== "pt" && toggleLang()}
            title="Português"
            className={cn(
              "text-base leading-none cursor-pointer transition-opacity duration-200 select-none",
              lang === "pt" ? "opacity-100" : "opacity-40 hover:opacity-70",
            )}
          >
            🇧🇷
          </button>
        </div>
      </div>
    </nav>
  );
}
