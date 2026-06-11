import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useMenuStore } from "@/store/use-menu-store";
import { useAppStore } from "@/store/use-app-store";
import { useI18n } from "@/lib/i18n-context";
import { useThemeStore } from "@/store/use-theme-store";
import { projects } from "@/data/projects";
import { menuColumnLeft, menuColumnRight, menuScrim } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { AnyProject } from "@/data/projects";
import { Moon, Sun } from "lucide-react";

const STACK = [
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "Framer Motion",
  "Zustand",
  "Gemini API",
];
const SOCIAL = [
  { label: "GitHub", href: "https://github.com/pedrorfdev" },
  { label: "LinkedIn", href: "https://linkedin.com/in/pedroff" },
];

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { opacity: 0, y: "100%", transition: { duration: 0.3 } },
};

export function MenuOverlay() {
  const close = useMenuStore((s) => s.close);
  const openProject = useAppStore((s) => s.openProject);
  const { t, lang, toggle: toggleLang } = useI18n();
  const { theme, toggle: toggleTheme } = useThemeStore();
  const [_preview, setPreview] = useState<AnyProject | null>(null);

  function handleProjectClick(project: AnyProject) {
    // Abre imediatamente para evitar o flash/piscada.
    openProject(project, {
      top: window.innerHeight / 2 - 112, // H: 224 / 2
      left: window.innerWidth / 2 - 160, // W: 320 / 2
      width: 320,
      height: 224,
    });
    close();
  }

  return (
    <div className="fixed inset-0 z-80 flex overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-(--color-scrim)"
        variants={menuScrim}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={close}
        aria-hidden
      />

      <motion.div
        className="md:hidden absolute inset-x-0 bottom-0 z-10 flex flex-col
                   bg-(--color-bg-primary) rounded-t-3xl overflow-hidden"
        style={{ maxHeight: "92dvh" }}
        variants={mobileMenuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Handle */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-10 h-1 rounded-full bg-(--color-border-strong)" />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-8">
          {/* Lang + Theme */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => lang !== "en" && toggleLang()}
                title="English"
                className={cn(
                  "text-xl cursor-pointer transition-opacity select-none",
                  lang === "en" ? "opacity-100" : "opacity-35",
                )}
              >
                🇺🇸
              </button>
              <button
                onClick={() => lang !== "pt" && toggleLang()}
                title="Português"
                className={cn(
                  "text-xl cursor-pointer transition-opacity select-none",
                  lang === "pt" ? "opacity-100" : "opacity-35",
                )}
              >
                🇧🇷
              </button>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-xs text-(--color-text-secondary) hover:text-(--color-text-primary) cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
              <span className="uppercase tracking-widest">
                {theme === "dark" ? "Light" : "Dark"}
              </span>
            </button>
          </div>

          {/* Projetos */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-(--color-text-tertiary) block mb-4">
              {t.menu.sections.projects}
            </span>
            <div className="flex flex-col">
              {projects.map((project, i) => (
                <button
                  key={project.id}
                  onClick={() => handleProjectClick(project as AnyProject)}
                  className={cn(
                    "flex items-center justify-between w-full text-left py-4 cursor-pointer",
                    i !== 0 && "border-t border-(--color-border-subtle)",
                  )}
                >
                  <span className="font-display text-2xl font-semibold text-(--color-text-primary) tracking-[-0.02em]">
                    {project.title}
                  </span>
                  <span className="text-xs text-(--color-text-tertiary) tabular-nums">
                    {project.year}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Frase + email — MOBILE */}
          <div className="flex flex-col gap-3 py-4 border-t border-(--color-border-subtle)">
            <p className="font-display text-xl font-semibold tracking-[-0.02em] text-(--color-text-primary) leading-snug">
              {t.contact.headline}
            </p>
            <a
              href={`mailto:${t.contact.email}`}
              className="text-sm text-(--color-accent) hover:opacity-70 transition-opacity"
            >
              {t.contact.email}
            </a>
          </div>

          {/* Social */}
          <div className="flex gap-5 pb-6">
            {SOCIAL.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.12em] text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="hidden md:flex flex-col justify-between w-full max-w-xs h-full
                   px-8 py-8 pt-20 overflow-y-auto
                   bg-(--color-bg-primary) border-r border-(--color-border-subtle) relative z-10"
        variants={menuColumnLeft}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col gap-4">
          <button
            onClick={close}
            className="text-xs uppercase tracking-[0.15em] text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-colors cursor-pointer text-left"
          >
            ← Home
          </button>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-(--color-text-tertiary) mb-4 block">
            {t.menu.sections.projects}
          </span>
          <nav className="flex flex-col">
            {projects.map((project, i) => (
              <button
                key={project.id}
                onClick={() => handleProjectClick(project as AnyProject)}
                onMouseEnter={() => setPreview(project as AnyProject)}
                onMouseLeave={() => setPreview(null)}
                className={cn(
                  "flex items-baseline justify-between gap-4 w-full text-left py-3 cursor-pointer group",
                  i !== 0 && "border-t border-(--color-border-subtle)",
                )}
              >
                <span className="font-display text-lg font-semibold tracking-[-0.01em] text-(--color-text-primary) group-hover:text-(--color-accent) transition-colors">
                  {project.title}
                </span>
                <span className="text-xs text-(--color-text-tertiary) tabular-nums shrink-0">
                  {project.year}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Preview Central (Desktop) */}
      <div className="hidden md:flex flex-1 items-center justify-center pointer-events-none z-10">
        <AnimatePresence mode="wait">
          {_preview && (
            <motion.div
              key={_preview.id}
              className="relative w-80 h-56 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={_preview.media.src}
                alt={_preview.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="hidden md:flex flex-col justify-between ml-auto w-full max-w-xs h-full
                   px-8 py-8 pt-20 overflow-y-auto
                   bg-(--color-bg-primary) border-l border-(--color-border-subtle) relative z-10"
        variants={menuColumnRight}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-(--color-text-tertiary) mb-4 block">
              {t.menu.about}
            </span>
            <p className="font-display text-lg font-semibold tracking-[-0.02em] leading-snug text-(--color-text-primary) mb-3">
              {t.about.headline}
            </p>
            <p className="text-sm text-(--color-text-secondary) leading-relaxed">
              {t.about.body}
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-(--color-text-tertiary) mb-3 block">
              {t.menu.stack}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {STACK.map((item) => (
                <span
                  key={item}
                  className="text-xs text-(--color-text-secondary) border border-(--color-border) rounded-full px-2.5 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <span className="text-[10px] uppercase tracking-[0.18em] text-(--color-text-tertiary) mb-3 block">
            {t.menu.contact}
          </span>
          <p className="font-display text-lg font-semibold text-(--color-text-primary) tracking-[-0.01em] mb-4">
            {t.contact.headline}
          </p>
          <a
            href={`mailto:${t.contact.email}`}
            className="text-sm text-(--color-accent) hover:opacity-70 transition-opacity block mb-5"
          >
            {t.contact.email}
          </a>
          <div className="flex gap-4">
            {SOCIAL.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.12em] hover:text-(--color-text-tertiary) text-(--color-text-primary) transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
