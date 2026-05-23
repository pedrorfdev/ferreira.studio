// data/i18n/en.ts
// ============================================================
// English copy — source of truth.
// All keys must exist here. PT only needs to override.
// ============================================================

export const en = {
    nav: {
        menu: "Menu",
        close: "Close",
    },

    home: {
        role: "Full Stack · Product Engineer",
        location: "Based in Brazil",
    },

    project: {
        scrollHint: "Scroll to explore",
        close: "Close",
        askAbout: "Ask about this project",
        sections: {
            problem: "The Problem",
            idea: "The Idea",
            solution: "The Solution",
            analysis: "Analysis",
            technical: "Technical Decisions",
            result: "Result",
        },
        status: {
            shipped: "Shipped",
            inProgress: "In Progress",
            concept: "Concept",
        },
        decision: "Decision",
        tradeoff: "Tradeoff",
    },

    menu: {
        about: "About",
        work: "Work",
        contact: "Contact",
        stack: "Stack",
        sections: {
            projects: "Case Studies",
            pages: "Pages",
            social: "Social",
        },
    },

    about: {
        headline: "Building products with technical depth and product maturity.",
        body:
            "I'm a Full Stack / Product Engineer based in Brazil. I work across the entire stack — from database schema to UI motion — with a focus on shipping things that actually work and feel considered.",
        currentlyBuilding: "Currently building",
    },

    contact: {
        headline: "Let's work together.",
        email: "hello@ferreira.studio",
        cta: "Send an email",
    },

    assistant: {
        placeholder: "Ask anything about this project...",
        send: "Send",
        thinking: "Thinking...",
        error: "Something went wrong. Try again.",
        clearChat: "Clear chat",
    },

    loader: {
        role: "Product Engineer",
    },
} as const