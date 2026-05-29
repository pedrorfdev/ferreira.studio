import { useMenuStore } from "@/store/use-menu-store";
import { useThemeStore } from "@/store/use-theme-store";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";
import type { MinimalProject } from "@/types/project";

function SunIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

interface Props {
  project: MinimalProject;
  onClose: () => void;
}

export function ProjectNav({ project, onClose }: Props) {
  const toggleMenu = useMenuStore((s) => s.toggle);
  const { theme, toggle: toggleTheme } = useThemeStore();
  const { lang, toggle: toggleLang, t } = useI18n();

  return (
    <div className="fixed top-3 md:top-4 left-0 right-0 z-95 flex justify-center pointer-events-none px-4">
      <div
        className={cn(
          "pointer-events-auto flex items-center",
          "bg-(--color-bg-secondary)/90 backdrop-blur-xl",
          "border border-(--color-border) shadow-xl overflow-hidden",
          "rounded-2xl max-w-[calc(100vw-32px)]",
        )}
      >
        {/* Menu — sempre visível */}
        <button
          onClick={toggleMenu}
          aria-label="Open menu"
          className="flex items-center gap-2 h-9 md:h-10 px-3 md:px-4
                     text-(--color-text-tertiary) hover:text-(--color-text-primary)
                     transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
          <span className="text-xs uppercase tracking-[0.12em] hidden md:block">
            Menu
          </span>
        </button>

        <span className="w-px h-4 bg-(--color-border) shrink-0" />

        <div className="flex items-center px-3 md:px-4 h-9 md:h-10">
          <span
            className="font-display text-xs md:text-sm font-semibold tracking-[-0.01em]
                           text-(--color-text-primary) whitespace-nowrap"
          >
            {project.title}
          </span>
        </div>

        <span className="w-px h-4 bg-(--color-border) shrink-0" />

        <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 h-9 md:h-10">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-(--color-text-tertiary) hover:text-(--color-text-primary)
                       transition-colors cursor-pointer"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => lang !== "en" && toggleLang()}
              title="English"
              className={cn(
                "text-sm leading-none cursor-pointer transition-opacity select-none",
                lang === "en" ? "opacity-100" : "opacity-35 hover:opacity-70",
              )}
            >
              🇺🇸
            </button>
            <button
              onClick={() => lang !== "pt" && toggleLang()}
              title="Português"
              className={cn(
                "text-sm leading-none cursor-pointer transition-opacity select-none",
                lang === "pt" ? "opacity-100" : "opacity-35 hover:opacity-70",
              )}
            >
              🇧🇷
            </button>
          </div>

          <span className="w-px h-3.5 bg-(--color-border) shrink-0" />

          <button
            onClick={onClose}
            aria-label={t.project.close}
            className="text-[10px] md:text-xs uppercase tracking-[0.12em] md:tracking-[0.15em]
                       text-(--color-text-tertiary) hover:text-(--color-text-primary)
                       transition-colors cursor-pointer select-none whitespace-nowrap"
          >
            {t.project.close}
          </button>
        </div>
      </div>
    </div>
  );
}
