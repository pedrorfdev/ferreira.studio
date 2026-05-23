// data/projects.ts
// ============================================================
// Single source of truth for all project data.
// Add, edit, or reorder projects here — nothing else changes.
// ============================================================

import type { ProjectData } from "@/types"

export const projects: ProjectData[] = [
    // ----------------------------------------------------------
    // 01 — Praxis
    // Clinical management system for Occupational Therapists
    // ----------------------------------------------------------
    {
        id: "praxis",
        title: "Praxis",
        tagline: "Clinical management system that centralizes an OT's entire workflow",
        tags: ["React", "Node.js", "PostgreSQL", "TypeScript", "Healthcare", "Full Stack"],
        year: 2024,
        status: "shipped",

        cardPosition: { top: "28%", left: "54%" },

        media: {
            type: "image",
            src: "/media/praxis-bg.jpg",
            alt: "Praxis clinical system",
        },

        heroImage: "/media/praxis-hero.jpg",

        sections: {
            problem: {
                headline: "Patient data living in five different places",
                body: "Occupational Therapists had no dedicated tool built for how they actually work. Patient records, clinical notes, anamneses, and session evolutions were scattered across WhatsApp, Google Drive, loose documents, and handwritten notebooks. Every hour of care came with another hour of administrative work — most of it done after the workday ended.",
            },
            idea: {
                headline: "Centralize first. Automate later.",
                body: "The goal wasn't to build a complex health platform. It was to build something simple, fast, and practical — a single place where an OT could find everything about a patient in seconds. The AI layer (semantic search, clinical summaries) was planned from day one but deliberately left for a later phase. Getting the foundation right came first.",
            },
            solution: {
                headline: "A complete operational system for clinical practice",
                body: "Praxis covers the full OT workflow: patient intake and management, session tracking, structured anamneses, and rich-text clinical evolution notes — all in one place, already in production use.",
                items: [
                    "Full patient and guardian CRUD",
                    "Structured anamnesis with medical, family, school, and clinical history",
                    "Rich-text clinical evolution editor (Tiptap)",
                    "Session tracking and history",
                    "Designed as a scalable base for future AI integration",
                ],
            },
            analysis: {
                headline: "The hardest part was modeling clinical data correctly",
                body: "Semi-structured clinical data is genuinely difficult to model. The anamnesis needed to feel like multiple organized fields for the OT — medical history, family history, school context, observations — while being stored efficiently and consistently in the database. Getting that transformation right took significant iteration. The rich-text editor (Tiptap) added another layer of complexity: content persistence, serialization, and database integration were all first-time territory. It became one of the most valuable learning experiences of the project.",
            },
            technicalDecisions: {
                headline: "Key technical decisions",
                decisions: [
                    {
                        title: "PostgreSQL + PGVector from day one",
                        why: "The database was structured with the future product in mind. PGVector was included early to support embeddings, semantic search, and intelligent clinical summaries when the AI layer arrives — avoiding a structural migration later.",
                        trade: "More upfront schema complexity, but the foundation for AI is already in place.",
                    },
                    {
                        title: "JSONB for structured anamneses",
                        why: "Clinical anamnesis data is structured but not fully relational — it varies per patient and per specialty. JSONB gives the flexibility to store complex, nested clinical fields while keeping them queryable and consistent.",
                        trade: "Less rigid than a fully normalized schema, but a much better fit for the domain.",
                    },
                    {
                        title: "shadcn/ui for component standardization",
                        why: "As an administrative system with many views and interactions, visual consistency was critical. shadcn/ui provided a solid base of components that could be customized and extended — reducing the time spent on UI primitives and keeping the focus on clinical flows.",
                        trade: "Some opinionated defaults that required overriding, but the consistency gain was worth it.",
                    },
                    {
                        title: "Tiptap for rich-text clinical notes",
                        why: "Clinical evolutions needed to feel like natural writing — not form fields. Tiptap provided a flexible rich-text experience that approximates how OTs actually document sessions, with full control over serialization and storage.",
                        trade: "First experience with this class of editor; the learning curve around content persistence was steep.",
                    },
                ],
            },
            result: {
                headline: "Already in production use",
                body: "Praxis is actively used in a real clinical practice. Qualitatively, it has reduced the time spent organizing clinical information, centralized patient data that was previously scattered, and eliminated most of the administrative work that used to happen after the workday ended. Quantitative metrics are still being collected.",
                metrics: [
                    { label: "Status", value: "In production" },
                    { label: "Post-shift admin", value: "Significantly reduced" },
                    { label: "Patient data access", value: "Centralized" },
                ],
            },
        },

        assistant: {
            context: `You are a technical assistant embedded in Pedro Ferreira's portfolio. The visitor is asking about Praxis — a clinical management system Pedro built for Occupational Therapists in Brazil.

Real context about this project:
- Built to replace a scattered workflow across WhatsApp, Google Drive, and notebooks
- Stack: React, Node.js, PostgreSQL with PGVector, TypeScript, Tailwind, shadcn/ui, Tiptap
- Already in production use at a real clinical practice
- Core challenge: modeling semi-structured clinical data (anamneses) in a way that's friendly for OTs but consistent in the database
- JSONB used for flexible anamnesis fields; PGVector included now to avoid a future migration when AI is added
- Rich-text editor (Tiptap) was a significant learning experience — content persistence, serialization, DB integration
- Biggest "would do differently": start with product specs, technical specs, and behavioral specs instead of exploring as you go
- AI layer (semantic search, clinical summaries, patient evolution highlights) is the planned next major phase
- Pedro built this from observation of a real professional's workflow — not a hypothetical problem

Answer questions about architecture, product decisions, technical tradeoffs, and honest challenges. Be specific. Speak as if you have deep knowledge of this project.`,
            quickPrompts: [
                "Why PostgreSQL with PGVector instead of a simpler setup?",
                "How did you model the anamnesis data structure?",
                "What was the hardest technical challenge?",
                "How does the rich-text editor persist data?",
                "What's the plan for the AI layer?",
                "What would you do differently if starting today?",
            ],
        },

        pt: {
            tagline: "Sistema de gestão clínica que centraliza todo o fluxo de trabalho de um TO",
        },
    },

    // ----------------------------------------------------------
    // 02 — Vambora.ai
    // AI-powered travel itinerary generator
    // ----------------------------------------------------------
    {
        id: "vambora",
        title: "Vambora.ai",
        tagline: "AI travel guide that turns hours of research into minutes",
        tags: ["React", "Node.js", "AI", "Gemini", "TypeScript", "Full Stack"],
        year: 2024,
        status: "shipped",

        cardPosition: { top: "58%", left: "36%" },

        media: {
            type: "image",
            src: "/media/vambora-bg.jpg",
            alt: "Vambora.ai travel planner",
        },

        heroImage: "/media/vambora-hero.jpg",

        sections: {
            problem: {
                headline: "Planning a trip opens twelve tabs and closes none",
                body: "Even simple trips demand hours of work: researching destinations, comparing prices, finding attractions, calculating budgets, and trying to assemble it all into a coherent plan. The cognitive load is disproportionate to the actual trip. Most people either over-research and still feel uncertain, or under-plan and figure it out as they go.",
            },
            idea: {
                headline: "Validate the AI quality before building anything else",
                body: "The bet was simple: if the AI can produce a genuinely useful, logistically coherent itinerary, the rest of the product will follow. So the first phase was entirely focused on prompt engineering and generation quality — not UI, not landing page, not features. The experience layer came only after the core was solid.",
            },
            solution: {
                headline: "Context-aware itineraries in under a minute",
                body: "The user provides destination, budget, group size, duration, and preferences. Vambora generates a structured, day-by-day travel guide with activity suggestions, estimated costs, and practical tips — already functioning as a shippable MVP.",
                items: [
                    "Conversational input — no forms, no friction",
                    "Structured AI output with day-by-day breakdown",
                    "Budget-aware activity suggestions",
                    "State-based navigation — no page reloads, fluid experience",
                    "Model fallback system for reliability",
                ],
            },
            analysis: {
                headline: "The real problem is prompt architecture, not model choice",
                body: "Free-form prompting consistently produced impressive-sounding but logistically broken itineraries. The fix was structural: instead of asking the model to write a travel guide, the prompt forces step-by-step reasoning about logistics, timing, distances, and budget before assembling the output. The model matters less than the architecture around it. The other major learning was component coupling — parts of the UI grew without clear boundaries and became difficult to extend. Today the approach would be modular from the start.",
            },
            technicalDecisions: {
                headline: "Key technical decisions",
                decisions: [
                    {
                        title: "Gemini API over GPT",
                        why: "Accessible free tier made rapid prototyping possible without early cost pressure. Good performance on structured generation tasks. Also a deliberate choice to explore a different API ecosystem and build familiarity beyond OpenAI.",
                        trade: "Smaller community and fewer examples available at the time; some model instability required fallback logic.",
                    },
                    {
                        title: "No Next.js — deliberate simplicity",
                        why: "The application is essentially a client-side experience: a landing page, a conversational input flow, and AI-generated output. No SSR requirement, no SEO priority at this stage. Adding Next.js would have introduced overhead without benefit.",
                        trade: "Less infrastructure flexibility if the product expands to need SSR — but premature optimization avoided.",
                    },
                    {
                        title: "State-based navigation, no routes",
                        why: "The experience needed to feel fluid and continuous — like a product, not a website. Routing would have introduced visual breaks between steps. State-based navigation allowed smooth transitions throughout the flow.",
                        trade: "Harder to deep-link to specific states, but the right tradeoff for the UX goal.",
                    },
                    {
                        title: "Model fallback instead of exponential backoff",
                        why: "Initial implementation had exponential backoff with retries across the same model. Simplified to a fallback between Gemini models — faster recovery, simpler code, better user experience when a model is unstable.",
                        trade: "Less exhaustive retry logic, but meaningfully more reliable in practice.",
                    },
                ],
            },
            result: {
                headline: "Hours of planning compressed into minutes",
                body: "Vambora.ai ships as a functional, end-to-end MVP. Qualitatively, what previously required hours of manual research and tab management is resolved in a single session. The structured generation approach produces significantly more coherent itineraries than free-form prompting experiments.",
                metrics: [
                    { label: "Planning time", value: "Hours → minutes" },
                    { label: "Status", value: "Shipped MVP" },
                    { label: "Generation", value: "Structured JSON → clean UI" },
                ],
            },
        },

        assistant: {
            context: `You are a technical assistant embedded in Pedro Ferreira's portfolio. The visitor is asking about Vambora.ai — an AI travel itinerary generator Pedro built.

Real context about this project:
- Built to eliminate the friction of travel planning (multiple tabs, manual research, budget confusion)
- Stack: React, Node.js, TypeScript, Gemini API
- Key insight: prompt architecture matters more than model selection
- Structured prompt chain forces the model to reason about logistics before generating output
- State-based navigation (no routes) for a fluid, app-like experience
- Gemini chosen over GPT for free tier access and to explore a different ecosystem
- Model fallback system replaced exponential backoff — simpler and more reliable
- Biggest lesson: component coupling grew out of control; would modularize from day one today
- The core (prompt quality) was validated before any UI work — deliberate sequencing
- Planned next features: itinerary persistence, sharing, PDF export, social library

Answer questions about the AI integration, prompt engineering, technical architecture, and product decisions honestly. Be specific about tradeoffs.`,
            quickPrompts: [
                "How does the prompt architecture work?",
                "Why Gemini instead of GPT?",
                "Why no Next.js?",
                "How did you handle model instability?",
                "What does 'state-based navigation' mean in practice?",
                "What would you build next?",
            ],
        },

        pt: {
            tagline: "Guia de viagens com IA que transforma horas de pesquisa em minutos",
        },
    },

    // ----------------------------------------------------------
    // 03 — Carga
    // Agricultural logistics management platform
    // ----------------------------------------------------------
    {
        id: "carga",
        title: "Carga",
        tagline: "Operational platform that makes agricultural logistics visible and trackable",
        tags: ["React", "Node.js", "PostgreSQL", "TypeScript", "Agro", "Full Stack"],
        year: 2025,
        status: "in progress",

        cardPosition: { top: "42%", left: "60%" },

        media: {
            type: "image",
            src: "/media/carga-bg.jpg",
            alt: "Carga agricultural logistics platform",
        },

        sections: {
            problem: {
                headline: "Small losses stay invisible without a consolidated view",
                body: "Small and mid-size agricultural operations — initially focused on watermelon export logistics — run almost entirely on manual controls: handwritten notes, scattered messages, and informal calculations. There's no way to see real profit, track operational losses, or understand the financial impact of incidents. Small losses that would be manageable if visible compound silently into significant damage.",
            },
            idea: {
                headline: "Operational clarity before complexity",
                body: "The goal is not to build an ERP. The goal is to give producers and operators a simple, clear view of what's happening with each load — profit, losses, logistics movement, and operational history. Validate usefulness with a pragmatic MVP before expanding the system.",
            },
            solution: {
                headline: "From chaotic notes to a consolidated operational view",
                body: "A mobile-first web application designed for field use. Core flows: load registration, loss tracking, operational history, financial consolidation, and monthly reports.",
                items: [
                    "Load registration and tracking",
                    "Loss management with financial impact calculation",
                    "Operational history per load",
                    "Financial consolidation and reporting",
                    "Offline-first architecture for rural connectivity",
                ],
            },
            analysis: {
                headline: "Designing for users who aren't thinking about software",
                body: "The core challenge isn't technical — it's UX. Operators and producers in field conditions need an interface so clear and fast that recording a load or logging a loss takes seconds, not minutes. Any friction gets skipped. The interface has to earn its place in an already busy operational workflow. The offline-first requirement adds meaningful technical complexity: IndexedDB for local persistence, conflict resolution on sync, and a clear mental model for users about what's saved and what's pending.",
            },
            technicalDecisions: {
                headline: "Key technical decisions",
                decisions: [
                    {
                        title: "Mobile-first web app over native",
                        why: "Avoids app store complexity, reduces development overhead, and works on any device with a browser. Field operators don't need to install anything.",
                        trade: "Some native capabilities (push notifications, background sync) require workarounds — acceptable for the MVP scope.",
                    },
                    {
                        title: "Offline-first with IndexedDB",
                        why: "Rural connectivity is unreliable. The app needs to work fully without internet and sync when connection is restored. Data can't be lost because of a dropped signal.",
                        trade: "Significantly more complex state management and conflict resolution logic. Worth it for the use case.",
                    },
                    {
                        title: "Pragmatic MVP scope",
                        why: "This project starts with lessons from previous ones. No overengineering — only what's needed to validate the core value: making agricultural operational data visible and trackable.",
                        trade: "Some features that would be nice (dashboards, analytics) are explicitly deferred.",
                    },
                ],
            },
            result: {
                headline: "Architecture defined, build in progress",
                body: "Carga is in active development. Core operational flows are mapped, the data model is defined, and the MVP is being structured. This project benefits from accumulated learning across previous products — starting with specs, not exploration.",
            },
        },

        assistant: {
            context: `You are a technical assistant embedded in Pedro Ferreira's portfolio. The visitor is asking about Carga — an agricultural logistics management platform Pedro is building.

Real context about this project:
- Built for small and mid-size agricultural operations (initially watermelon export logistics in Brazil)
- Problem: operations run on manual notes, scattered messages, and informal calculations — losses stay invisible
- Stack: React, Node.js, PostgreSQL, TypeScript
- Mobile-first web app (no native app — avoids store complexity)
- Offline-first architecture using IndexedDB — rural connectivity is unreliable
- Status: in progress — architecture defined, MVP being built
- Core design challenge: interface must be fast and clear enough for field operators who aren't thinking about software
- This project starts with proper specs, not exploration — learned from Praxis
- Scope is deliberately narrow: validate the core value before expanding

Be honest that this is in progress. Focus on the problem clarity, technical approach, and product thinking.`,
            quickPrompts: [
                "Why mobile-first instead of a native app?",
                "How does the offline-first architecture work?",
                "Who is the actual target user?",
                "What makes this different from generic management software?",
                "What's the current development status?",
            ],
        },

        pt: {
            tagline: "Plataforma operacional que torna a logística agrícola visível e rastreável",
        },
    },

    // ----------------------------------------------------------
    // 04 — Cerée
    // Private event RSVP and digital experience platform
    // ----------------------------------------------------------
    {
        id: "ceree",
        title: "Cerée",
        tagline: "Private event RSVP platform built for social gatherings that deserve more than a WhatsApp group",
        tags: ["React", "Node.js", "TypeScript", "Events", "Product"],
        year: 2025,
        status: "in progress",

        cardPosition: { top: "65%", left: "44%" },

        media: {
            type: "image",
            src: "/media/ceree-bg.jpg",
            alt: "Cerée private event platform",
        },

        sections: {
            problem: {
                headline: "Private events managed on WhatsApp and improvised spreadsheets",
                body: "Intimate social events — family gatherings, private dinners, celebrations — are still organized through WhatsApp confirmations, manual headcounts, and improvised spreadsheets. The experience is completely mismatched with the care put into the event itself. Most digital event tools are built for public events, ticket sales, and large productions — not refined private social experiences.",
            },
            idea: {
                headline: "An invitation that feels like part of the event",
                body: "Cerée started as a solution for a specific family event and quickly revealed potential as a product. The idea: each event gets its own digital experience — a personalized page with its own visual identity, private access, and an RSVP flow that actually consolidates information automatically.",
            },
            solution: {
                headline: "Exclusive access, effortless organization",
                body: "Each event has a customized landing page, a password-protected access system, and a centralized RSVP flow. Guest data is automatically consolidated — no manual list management.",
                items: [
                    "Personalized event page with custom identity",
                    "Password-based private access per invitation",
                    "RSVP with guest count, dietary restrictions, and notes",
                    "Automatic consolidation via Google Sheets + Apps Script",
                    "Mobile-first, premium UX",
                ],
            },
            analysis: {
                headline: "Premium experience without visual excess",
                body: "The core design challenge was balancing sophistication with simplicity. The product needs to feel elegant and exclusive — but the guest experience has to be effortless. Too much visual complexity and it feels like a tech demo. Too plain and it loses the premium positioning. The tension between those two requirements drives every design decision. The Google Sheets integration was a deliberate pragmatic choice: operators already know how to use it, setup is fast, and it requires no custom backend for data management at this stage.",
            },
            technicalDecisions: {
                headline: "Key technical decisions",
                decisions: [
                    {
                        title: "Password-based private access",
                        why: "Each invitation is linked to a password. Only people who were actually invited can access the event environment. Simple, understandable, and matches the exclusive positioning of the product.",
                        trade: "Passwords can be shared — mitigated by single-use design and guest tracking.",
                    },
                    {
                        title: "Google Sheets + Apps Script for data",
                        why: "Hosts already know how to use spreadsheets. Zero learning curve for managing guest lists. Fast to implement, low cost, easy to hand off. The right tool for the current scale.",
                        trade: "Not scalable to large volumes or complex analytics — acceptable for the MVP and initial product stage.",
                    },
                    {
                        title: "Experience-first product thinking",
                        why: "The product was designed as an experience before it was designed as a system. The visual and emotional quality of the guest-facing experience is the product's core value proposition.",
                        trade: "More upfront design investment, but directly drives the differentiation.",
                    },
                ],
            },
            result: {
                headline: "Core experience shipped, platform evolving",
                body: "Cerée has a working RSVP flow, personalized event page, Google Sheets integration, and password-based access — already used for a real event. The platform layer (admin panel, analytics, QR codes, multimedia) is being built.",
                metrics: [
                    { label: "Status", value: "In progress" },
                    { label: "Core flow", value: "Shipped & used" },
                    { label: "Manual lists", value: "Eliminated" },
                ],
            },
        },

        assistant: {
            context: `You are a technical assistant embedded in Pedro Ferreira's portfolio. The visitor is asking about Cerée — a private event RSVP platform Pedro is building.

Real context about this project:
- Started as a solution for a real family event, revealed product potential
- Problem: private social events managed via WhatsApp groups and improvised spreadsheets
- Stack: React, Node.js, TypeScript
- Core UX: personalized event page + password-based private access + centralized RSVP
- Google Sheets + Apps Script for data consolidation — pragmatic choice, hosts already know spreadsheets
- Key design tension: sophisticated and exclusive without visual excess
- Status: core RSVP flow shipped and used in a real event; platform features in progress
- Planned next: admin panel, guest analytics, QR codes, multimedia galleries, automated communications
- This is intentionally different from Eventbrite/Luma — those are for public events and ticket sales

Answer questions about product thinking, technical decisions, and the design approach.`,
            quickPrompts: [
                "How does the private access system work?",
                "Why Google Sheets instead of a real database?",
                "What makes this different from Eventbrite or Luma?",
                "How did a family event become a product idea?",
                "What's the monetization vision?",
            ],
        },

        pt: {
            tagline: "Plataforma de RSVP para eventos privados que merecem mais que um grupo de WhatsApp",
        },
    },

    // ----------------------------------------------------------
    // 05 — Pulso
    // Internal team operations platform
    // ----------------------------------------------------------
    {
        id: "pulso",
        title: "Pulso",
        tagline: "Internal operations platform that keeps teams synchronized without the WhatsApp chaos",
        tags: ["React", "Node.js", "PostgreSQL", "TypeScript", "Product", "Full Stack"],
        year: 2025,
        status: "in progress",

        cardPosition: { top: "35%", left: "62%" },

        media: {
            type: "image",
            src: "/media/pulso-bg.jpg",
            alt: "Pulso team operations platform",
        },

        sections: {
            problem: {
                headline: "Team coordination running through scattered messages",
                body: "Operational teams — departments, service groups, coordinated teams — manage schedules, confirmations, absences, and financial organization through WhatsApp, improvised spreadsheets, and manual confirmation chains. Small communication failures at scale become real operational problems: last-minute swaps, missed shifts, no financial visibility, no leadership overview.",
            },
            idea: {
                headline: "Always present, synchronized with people's routines",
                body: "Pulso — the name comes from the idea of something always alive, present, and in sync — started as a voluntary solution to a real organizational problem. The goal is to replace the WhatsApp chaos with a simple, centralized operational experience that people actually want to use.",
            },
            solution: {
                headline: "Scheduling, confirmations, and finances in one place",
                body: "An internal platform covering the full operational loop: schedule management, presence confirmation, absence handling, swap requests, leadership visibility, and basic financial tracking.",
                items: [
                    "Schedule management with confirmation flows",
                    "Absence justification and swap requests",
                    "Leadership dashboard with full team visibility",
                    "Financial tracking for events and team expenses",
                    "Notification system (planned)",
                ],
            },
            analysis: {
                headline: "Simplicity is harder than complexity",
                body: "The core challenge with Pulso is restraint. It's easy to add features — notifications, integrations, analytics — but every addition increases the cognitive load for users who aren't technical and are already managing a demanding operational routine. The hardest product decision is deciding what not to build. The platform needs to be so simple and fast that it replaces WhatsApp for coordination tasks — not because it forces people, but because it's genuinely easier.",
            },
            technicalDecisions: {
                headline: "Key technical decisions",
                decisions: [
                    {
                        title: "Accessible infrastructure stack",
                        why: "Vercel, Supabase, Render, Neon — using free tiers to keep operational cost near zero during validation. The product needs to prove its value before infrastructure investment.",
                        trade: "Free tier limits create constraints at scale — acceptable and expected for this stage.",
                    },
                    {
                        title: "Multi-user permissions from the start",
                        why: "The platform serves both team members and leadership, with different views and permissions. Retrofitting RBAC after the fact is painful — building it correctly from day one.",
                        trade: "More upfront complexity in the auth and permission layer.",
                    },
                    {
                        title: "Starting with specs, not exploration",
                        why: "This project applies lessons from every previous one. Product specs, technical specs, and behavioral specs before any code. Modular architecture, consistent componentization, focused MVP scope.",
                        trade: "Slower start, but the right investment given accumulated experience.",
                    },
                ],
            },
            result: {
                headline: "Concept defined, architecture in progress",
                body: "Pulso is in the ideation and initial architecture phase. Core flows are defined conceptually, the permission model is being designed, and the MVP is being scoped. This is the most spec-driven project Pedro has started.",
            },
        },

        assistant: {
            context: `You are a technical assistant embedded in Pedro Ferreira's portfolio. The visitor is asking about Pulso — an internal team operations platform Pedro is building.

Real context about this project:
- Started as a voluntary solution to a real organizational problem Pedro observed
- Problem: team coordination running through WhatsApp groups, improvised spreadsheets, manual confirmations
- Stack: React, Node.js, PostgreSQL, TypeScript; infrastructure on Vercel + Supabase + Neon (free tiers)
- Core flows: schedule management, presence confirmation, absence handling, swap requests, leadership dashboard, financial tracking
- Status: concept defined, architecture in progress — most spec-driven project Pedro has started
- The name "Pulso" means pulse — always present, alive, synchronized with routines
- Key product challenge: restraint — resist adding features, keep it simpler than users might expect
- Building RBAC (multi-user permissions) from day one, not retrofitting
- Applies lessons from all previous projects: specs first, modular architecture, focused MVP

Be honest that this is early stage. Focus on the product thinking, the real problem, and the architectural approach.`,
            quickPrompts: [
                "Why build this instead of using Slack or an existing tool?",
                "How are you handling multi-user permissions?",
                "What's the hardest product decision here?",
                "Why start with free-tier infrastructure?",
                "What's the current stage of development?",
            ],
        },

        pt: {
            tagline: "Plataforma de operações internas que mantém equipes sincronizadas sem o caos do WhatsApp",
        },
    },
]

// ----------------------------------------------------------
// Helpers
// ----------------------------------------------------------

/** Find a project by id — throws if not found */
export function getProject(id: string): ProjectData {
    const project = projects.find((p) => p.id === id)
    if (!project) throw new Error(`Project "${id}" not found in data/projects.ts`)
    return project
}

/** Shipped projects first, then in-progress, preserving insertion order within groups */
export const sortedProjects = [...projects].sort((a, b) => {
    if (a.status === "shipped" && b.status !== "shipped") return -1
    if (a.status !== "shipped" && b.status === "shipped") return 1
    return 0
})