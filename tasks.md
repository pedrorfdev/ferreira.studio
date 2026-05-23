# ferreira.studio — Task Board

> Single source of truth for development progress.
> Format: `- [ ]` todo · `- [x]` done · `- [-]` in progress

---

## Phase 0 — Scaffold & Foundation

- [x] Init Vite + React + TypeScript (`npm create vite@latest`)
- [x] Install deps: `framer-motion`, `zustand`, `tailwindcss@next`, `@tailwindcss/vite`
- [x] Configure `tsconfig.json` (strict: true, path aliases `@/*`)
- [x] Tailwind v4 — `globals.css` with `@theme` tokens (colors, fonts, spacing)
- [x] Create full folder structure (see architecture docs)
- [x] `types/project.ts` — `ProjectData`, `AppState` enum, `CardPosition`
- [x] `types/index.ts` — re-exports
- [x] `data/projects.ts` — full schema for all 4 projects (Praxis, Vambora.ai, Agro, RSVP)
- [x] `lib/motion.ts` — shared animation variants (fadeIn, slideUp, clipExpand, stagger)
- [x] `lib/cn.ts` — classnames utility

---

## Phase 1 — App Shell & State Machine

- [ ] `store/useAppStore.ts` — AppState enum, activeProject, hoveredProject, actions
- [ ] `store/useMenuStore.ts` — isOpen, toggle
- [ ] `store/useAssistantStore.ts` — isOpen, activePrompt, messages
- [ ] `components/shell/AppShell.tsx` — root persistent wrapper
- [ ] `components/shell/BackgroundLayer.tsx` — crossfade on project change
- [ ] `components/loader/IntroLoader.tsx` — ~1.5s entry animation, unmounts after
- [ ] `components/navigation/Nav.tsx` — logo left, menu button right (persistent)

---

## Phase 2 — Home View

- [ ] `components/home/ProjectList.tsx` — vertical list left, hover updates store
- [ ] `hooks/useCardPosition.ts` — seeded random position per project (consistent)
- [ ] `components/home/ProjectCard.tsx` — floating card, AnimatePresence, preview image
- [ ] Home headline — identity text, typographic, subtle positioning

---

## Phase 3 — Clip-path Expansion & Case Study

- [ ] `hooks/useClipPathTransition.ts` — capture card coords, animate to fullscreen
- [ ] `components/project/ProjectView.tsx` — fullscreen container, receives active project
- [ ] `components/project/sections/Hero.tsx`
- [ ] `components/project/sections/Problem.tsx`
- [ ] `components/project/sections/Idea.tsx`
- [ ] `components/project/sections/Solution.tsx`
- [ ] `components/project/sections/Analysis.tsx`
- [ ] `components/project/sections/TechnicalDecisions.tsx`
- [ ] `components/project/sections/Result.tsx`
- [ ] Close button — reverse clip-path animation back to card origin

---

## Phase 4 — Menu, Assistant & Polish

- [ ] `components/menu/MenuOverlay.tsx` — two columns sliding from edges
- [ ] `components/menu/MenuColumn.tsx` — reusable column (About/Skills | Contact/Links)
- [ ] `data/i18n/en.ts` + `data/i18n/pt.ts` — all copy
- [ ] i18n context + `useTranslation` hook
- [ ] EN/PT toggle in Nav
- [ ] `components/assistant/AskAbout.tsx` — contextual side panel
- [ ] `components/assistant/QuickPrompts.tsx` — suggested questions per project
- [ ] Anthropic API integration (claude-sonnet-4-6, context per project)
- [ ] Mobile responsiveness pass — reduce motion, adapt layouts
- [ ] Performance audit (Lighthouse) — lazy load media, optimize bundle
- [ ] Deploy to Vercel
- [ ] Connect ferreira.studio domain

---

## Icebox (future / nice to have)

- [ ] React Three Fiber object — upgrade background from static to 3D
- [ ] Dark/light toggle
- [ ] Blog / writing section
- [ ] Analytics (privacy-first, e.g. Plausible)
- [ ] OG image generation per project

---

_Last updated: Phase 0 starting_