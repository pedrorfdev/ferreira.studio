// lib/motion.ts
// ============================================================
// Centralized Framer Motion variants and transition presets.
// Import from here — never define variants inline in components.
// This keeps motion behavior consistent and easy to tune globally.
// ============================================================

import type { Transition, Variants } from "framer-motion"

// ----------------------------------------------------------
// Transition presets
// ----------------------------------------------------------

export const transitions = {
    /** Default smooth — most UI transitions */
    smooth: {
        type: "tween",
        ease: [0.4, 0, 0.2, 1],
        duration: 0.4,
    } satisfies Transition,

    /** Snappy — fast feedback (hover states, small elements) */
    snappy: {
        type: "tween",
        ease: [0.4, 0, 0.2, 1],
        duration: 0.2,
    } satisfies Transition,

    /** Cinematic — large reveals, page-level transitions */
    cinematic: {
        type: "tween",
        ease: [0.76, 0, 0.24, 1],
        duration: 0.8,
    } satisfies Transition,

    /** Slow reveal — editorial sections scrolling in */
    editorial: {
        type: "tween",
        ease: [0.4, 0, 0.2, 1],
        duration: 0.6,
    } satisfies Transition,

    /** Spring — physical feel, used sparingly */
    spring: {
        type: "spring",
        stiffness: 260,
        damping: 28,
        mass: 1,
    } satisfies Transition,
} as const

// ----------------------------------------------------------
// Fade variants
// ----------------------------------------------------------

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: transitions.smooth },
    exit: { opacity: 0, transition: transitions.snappy },
}

export const fadeInSlow: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: transitions.editorial },
    exit: { opacity: 0, transition: transitions.snappy },
}

// ----------------------------------------------------------
// Slide + fade variants — editorial content reveals
// ----------------------------------------------------------

export const slideUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: transitions.editorial },
    exit: { opacity: 0, y: -12, transition: transitions.snappy },
}

export const slideUpSubtle: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: transitions.smooth },
    exit: { opacity: 0, y: -8, transition: transitions.snappy },
}

export const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: transitions.cinematic },
    exit: { opacity: 0, x: -40, transition: transitions.smooth },
}

export const slideInRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: transitions.cinematic },
    exit: { opacity: 0, x: 40, transition: transitions.smooth },
}

// ----------------------------------------------------------
// Stagger — parent variant that staggers children
// Use with staggerChildren on the parent,
// any slide/fade variant on the children
// ----------------------------------------------------------

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
    exit: {
        transition: {
            staggerChildren: 0.04,
            staggerDirection: -1,
        },
    },
}

export const staggerContainerSlow: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.14,
            delayChildren: 0.2,
        },
    },
}

// ----------------------------------------------------------
// Background crossfade — project background media swap
// ----------------------------------------------------------

export const backgroundCrossfade: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
}

// ----------------------------------------------------------
// Project card — hover card appearing at fixed position
// ----------------------------------------------------------

export const cardReveal: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.94,
        y: 8,
        filter: "blur(4px)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            ...transitions.smooth,
            duration: 0.35,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.96,
        y: 4,
        filter: "blur(2px)",
        transition: transitions.snappy,
    },
}

// ----------------------------------------------------------
// Clip-path expansion — card → fullscreen project view
// The actual clipPath values are computed at runtime
// from the card's DOMRect. These variants are the shape.
// ----------------------------------------------------------

export const clipExpand: Variants = {
    collapsed: (origin: string) => ({
        clipPath: origin,
        transition: transitions.cinematic,
    }),
    expanded: {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        transition: transitions.cinematic,
    },
    exit: (origin: string) => ({
        clipPath: origin,
        transition: transitions.cinematic,
    }),
}

// ----------------------------------------------------------
// Menu overlay — two columns sliding in from edges
// ----------------------------------------------------------

export const menuColumnLeft: Variants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
        x: "0%",
        opacity: 1,
        transition: transitions.cinematic,
    },
    exit: {
        x: "-100%",
        opacity: 0,
        transition: transitions.smooth,
    },
}

export const menuColumnRight: Variants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
        x: "0%",
        opacity: 1,
        transition: transitions.cinematic,
    },
    exit: {
        x: "100%",
        opacity: 0,
        transition: transitions.smooth,
    },
}

export const menuScrim: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
}

// ----------------------------------------------------------
// Loader — intro animation
// ----------------------------------------------------------

export const loaderReveal: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
}

export const loaderExit: Variants = {
    visible: { opacity: 1 },
    exit: {
        opacity: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 1, 1], delay: 0.2 },
    },
}

// ----------------------------------------------------------
// Assistant panel
// ----------------------------------------------------------

export const assistantPanel: Variants = {
    hidden: {
        opacity: 0,
        x: 24,
        scale: 0.98,
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: transitions.smooth,
    },
    exit: {
        opacity: 0,
        x: 16,
        transition: transitions.snappy,
    },
}

// ----------------------------------------------------------
// Utility — build a custom transition on the fly
// when presets don't fit
// ----------------------------------------------------------

export function buildTransition(
    duration: number,
    delay = 0,
    ease: [number, number, number, number] = [0.4, 0, 0.2, 1]
): Transition {
    return { type: "tween", duration, delay, ease }
}