// data/projects.ts — versão completa com PT traduzido em todas as sections
import type { ProjectData } from "@/types/project"

export const projects: ProjectData[] = [
    // ── 01 PRAXIS ───────────────────────────────────────────────
    {
        id: "praxis",
        title: "Praxis",
        tagline: "Clinical operations platform built around how Occupational Therapists actually work",
        tags: ["React", "Node.js", "PostgreSQL", "TypeScript", "Healthcare", "Full Stack"],
        year: 2024,
        status: "live",
        cardPosition: { top: "28%", left: "54%" },
        media: { type: "image", src: "/media/praxis-bg.jpg", alt: "Praxis" },
        heroImage: "/media/praxis-hero.jpg",
        links: {
            demo: "",   // adicione a URL real
            github: "",
        },
        sections: {
            problem: {
                headline: "Clinical information spread across five different places",
                body: "Occupational Therapists were managing patient records, session notes, anamneses, and follow-ups across WhatsApp, Google Drive, loose documents, and handwritten notebooks. Every hour of care generated another hour of administrative work — usually done after the workday ended.",
            },
            idea: {
                headline: "Build the operational foundation before adding intelligence",
                body: "The first goal wasn't to create a complex health platform. It was to remove fragmentation and make clinical information instantly accessible. AI was considered from the beginning, but intentionally postponed until the operational workflow became reliable and structured.",
            },
            analysis: {
                headline: "The challenge wasn't the UI — it was modeling clinical reality",
                body: "Clinical data rarely fits perfectly into relational structures. The hardest part was designing a system flexible enough for real-world therapeutic routines while still maintaining consistency, queryability, and long-term scalability.",
            },
            solution: {
                headline: "A centralized clinical workflow designed around real routines",
                body: "Praxis consolidates the full Occupational Therapy workflow into a single environment: patient intake, structured anamneses, session tracking, and rich-text clinical evolution notes.",
                items: [
                    "Patient and guardian management",
                    "Structured anamneses with medical and behavioral history",
                    "Rich-text clinical evolution editor",
                    "Session history and follow-up tracking",
                    "Database architecture prepared for future AI features",
                ],
            },
            technicalDecisions: {
                headline: "Key technical decisions",
                decisions: [
                    {
                        title: "PostgreSQL + PGVector from the beginning",
                        why: "The database architecture was designed with future AI workflows in mind. PGVector was introduced early to support embeddings, semantic search, and future clinical intelligence features without requiring structural migrations later.",
                        trade: "Higher upfront complexity in schema design, but avoids rebuilding the foundation when AI capabilities are introduced.",
                    },
                    {
                        title: "JSONB for semi-structured clinical data",
                        why: "Clinical anamneses contain deeply nested and partially variable information. JSONB provided flexibility without sacrificing queryability or long-term maintainability.",
                        trade: "Less rigid than a fully normalized relational model, but significantly better aligned with the real clinical workflow.",
                    },
                    {
                        title: "Tiptap for clinical evolution notes",
                        why: "Clinical professionals needed a writing experience that felt natural instead of rigid form fields. Tiptap enabled rich-text editing with serialization control and structured persistence.",
                        trade: "Introduced additional complexity around persistence, formatting consistency, and content serialization.",
                    },
                    {
                        title: "shadcn/ui as the component foundation",
                        why: "Large operational systems require strong visual consistency. shadcn/ui accelerated development while still allowing complete customization of the interface layer.",
                        trade: "Some internal patterns required overriding opinionated defaults, but the consistency gain outweighed the friction.",
                    },
                ],
            },
            result: {
                headline: "Already supporting a real clinical routine",
                body: "Praxis is currently used in production inside a real Occupational Therapy practice. Information that was previously fragmented is now centralized, reducing operational friction and making patient follow-up significantly easier.",
                metrics: [
                    { label: "Status", value: "Production" },
                    { label: "Administrative overhead", value: "-60%" },
                    { label: "Patient data", value: "Centralized" },
                ],
            },
        },
        assistant: {
            context: `You are a technical assistant embedded in Pedro Ferreira's portfolio. Answer questions about Praxis — a clinical management system built for Occupational Therapists in Brazil. Stack: React, Node.js, PostgreSQL + PGVector, TypeScript, Tailwind, shadcn/ui, Tiptap. In production. Key decisions: JSONB for anamneses, PGVector for future AI layer, Tiptap for rich-text notes. Be specific, honest about challenges, speak as if you know this project deeply.`,
            quickPrompts: [
                "Why PostgreSQL with PGVector instead of a simpler setup?",
                "How did you model the anamnesis data structure?",
                "What was the hardest technical challenge?",
                "What's the plan for the AI layer?",
                "What would you do differently if starting today?",
            ],
        },
        pt: {
            tagline: "Plataforma de operações clínicas construída em torno do fluxo real de trabalho de Terapeutas Ocupacionais",
            sections: {
                problem: {
                    headline: "Informações clínicas espalhadas em cinco lugares diferentes",
                    body: "Terapeutas Ocupacionais gerenciavam prontuários, evoluções, anamneses e acompanhamentos entre WhatsApp, Google Drive, documentos soltos e cadernos físicos. Cada hora de atendimento gerava outra hora de trabalho administrativo — normalmente feita depois do expediente.",
                },
                idea: {
                    headline: "Construir a base operacional antes de adicionar inteligência",
                    body: "O primeiro objetivo não era criar uma plataforma de saúde complexa. Era eliminar fragmentação e tornar informações clínicas acessíveis instantaneamente. A camada de IA foi considerada desde o início, mas propositalmente deixada para depois, quando o fluxo operacional estivesse sólido.",
                },
                analysis: {
                    headline: "O desafio não era a interface — era modelar a realidade clínica",
                    body: "Dados clínicos raramente se encaixam perfeitamente em estruturas relacionais. A parte mais difícil foi criar um sistema flexível o suficiente para a rotina terapêutica real sem perder consistência, capacidade de consulta e escalabilidade futura.",
                },
                solution: {
                    headline: "Um fluxo clínico centralizado pensado para a rotina real",
                    body: "O Praxis centraliza todo o fluxo de Terapia Ocupacional em um único ambiente: cadastro de pacientes, anamneses estruturadas, acompanhamento de sessões e evoluções clínicas em rich text.",
                    items: [
                        "Gestão de pacientes e responsáveis",
                        "Anamneses estruturadas com histórico médico e comportamental",
                        "Editor de evoluções clínicas em rich text",
                        "Histórico de sessões e acompanhamentos",
                        "Arquitetura preparada para futuras funcionalidades com IA",
                    ],
                },
                technicalDecisions: {
                    headline: "Principais decisões técnicas",
                    decisions: [
                        {
                            title: "PostgreSQL + PGVector desde o início",
                            why: "A arquitetura do banco foi planejada pensando em futuras funcionalidades com IA. O PGVector foi adicionado cedo para suportar embeddings, busca semântica e recursos inteligentes sem exigir migrações estruturais depois.",
                            trade: "Mais complexidade inicial no schema, mas evita reconstruir a fundação quando a camada de IA for adicionada.",
                        },
                        {
                            title: "JSONB para dados clínicos semi-estruturados",
                            why: "As anamneses clínicas possuem informações profundas e parcialmente variáveis. O JSONB trouxe flexibilidade sem perder capacidade de consulta ou manutenção futura.",
                            trade: "Menos rígido do que um modelo totalmente relacional, mas muito mais alinhado com a rotina clínica real.",
                        },
                        {
                            title: "Tiptap para evoluções clínicas",
                            why: "Os profissionais precisavam de uma experiência de escrita natural, e não de campos rígidos de formulário. O Tiptap permitiu rich text com controle de serialização e persistência estruturada.",
                            trade: "Adicionou complexidade em persistência, consistência visual e serialização de conteúdo.",
                        },
                        {
                            title: "shadcn/ui como base de componentes",
                            why: "Sistemas operacionais grandes exigem consistência visual forte. O shadcn/ui acelerou o desenvolvimento mantendo liberdade total de customização.",
                            trade: "Alguns padrões internos exigiram sobrescrever defaults opinativos, mas o ganho em consistência compensou.",
                        },
                    ],
                },
                result: {
                    headline: "Já apoiando uma rotina clínica real",
                    body: "O Praxis já é utilizado em produção dentro de uma clínica real de Terapia Ocupacional. Informações que antes estavam fragmentadas agora estão centralizadas, reduzindo fricção operacional e facilitando significativamente o acompanhamento dos pacientes.",
                    metrics: [
                        { label: "Status", value: "Produção" },
                        { label: "Carga administrativa", value: "-60%" },
                        { label: "Dados clínicos", value: "Centralizados" },
                    ],
                },
            },
        },
    },

    // ── 02 VAMBORA.AI ────────────────────────────────────────────
    {
        id: "vambora",
        title: "Vambora.ai",
        tagline: "AI-powered travel planning that compresses hours of research into minutes",
        tags: ["React", "Node.js", "AI", "Gemini", "TypeScript", "Full Stack"],
        year: 2024,
        status: "live",
        cardPosition: { top: "58%", left: "36%" },
        media: { type: "image", src: "/media/vambora-bg.jpg", alt: "Vambora.ai" },
        heroImage: "/media/vambora-hero.jpg",
        links: { demo: "", github: "" },
        sections: {
            problem: {
                headline: "Planning a trip still feels unnecessarily exhausting",
                body: "Even simple trips require hours of research across blogs, videos, maps, and booking platforms. Most people spend more time organizing information than actually deciding what they want to experience.",
            },
            idea: {
                headline: "Test the usefulness of AI before polishing the interface",
                body: "The initial focus wasn't visual design or feature quantity. The real question was whether AI could generate travel plans that felt coherent, practical, and genuinely useful. The product experience was built around validating that assumption first.",
            },
            analysis: {
                headline: "Prompt architecture mattered more than the model itself",
                body: "Early generations looked impressive but frequently broke in logistics, timing, and budgeting. The breakthrough came from restructuring prompts into guided reasoning flows instead of relying on open-ended generation.",
            },
            solution: {
                headline: "Travel planning compressed into a single conversation",
                body: "Users describe destination, budget, duration, and preferences. Vambora generates a contextual travel plan with activities, logistics, estimated costs, and day-by-day suggestions.",
                items: [
                    "Conversational trip planning flow",
                    "Structured itinerary generation",
                    "Budget-aware recommendations",
                    "Fast generation with fallback model handling",
                    "Fluid state-based navigation experience",
                ],
            },
            technicalDecisions: {
                headline: "Key technical decisions",
                decisions: [
                    {
                        title: "Gemini instead of GPT",
                        why: "Gemini provided a strong free tier for experimentation and structured generation tasks while allowing exploration outside the OpenAI ecosystem.",
                        trade: "Smaller ecosystem and occasional instability required additional fallback handling.",
                    },
                    {
                        title: "No Next.js — intentional simplicity",
                        why: "The product behaves more like a fluid client-side application than a content-heavy website. SSR would introduce complexity without solving a real problem at this stage.",
                        trade: "Less flexibility if the platform later requires SEO-heavy or server-rendered experiences.",
                    },
                    {
                        title: "State-driven navigation instead of routing",
                        why: "The experience was designed to feel continuous and conversational. State transitions created a more fluid interaction than traditional route changes.",
                        trade: "Harder to deep-link or persist complex navigation states.",
                    },
                    {
                        title: "Structured generation over free-form prompting",
                        why: "Open-ended prompts produced visually convincing but operationally inconsistent itineraries. Structured reasoning flows improved output reliability significantly.",
                        trade: "Prompt architecture became more complex and iterative to maintain.",
                    },
                ],
            },
            result: {
                headline: "From research overload to actionable planning",
                body: "Vambora transformed a fragmented planning experience into a fast and focused interaction. The product validates how structured AI flows can significantly reduce decision fatigue during travel planning.",
                metrics: [
                    { label: "Planning flow", value: "Structured" },
                    { label: "Generation time", value: "< 8s" },
                    { label: "Status", value: "Published" },
                ],
            },
        },
        assistant: {
            context: `You are a technical assistant in Pedro Ferreira's portfolio. Answer questions about Vambora.ai — an AI travel itinerary generator. Stack: React, Node.js, TypeScript, Gemini API. Key insight: prompt architecture matters more than model choice. Structured JSON output instead of prose. State-based navigation (no routes). Gemini chosen over GPT deliberately. Be specific about tradeoffs.`,
            quickPrompts: [
                "How does the prompt architecture work?",
                "Why Gemini instead of GPT?",
                "Why no Next.js?",
                "How did you handle model instability?",
                "What would you build next?",
            ],
        },
        pt: {
            tagline: "Planejamento de viagens com IA que transforma horas de pesquisa em minutos",
            sections: {
                problem: {
                    headline: "Planejar uma viagem ainda é cansativo demais",
                    body: "Mesmo viagens simples exigem horas de pesquisa entre blogs, vídeos, mapas e plataformas de reserva. A maior parte das pessoas gasta mais tempo organizando informação do que decidindo o que realmente quer viver.",
                },
                idea: {
                    headline: "Validar a utilidade da IA antes de polir a interface",
                    body: "O foco inicial não era design visual ou quantidade de funcionalidades. A verdadeira pergunta era se a IA conseguiria gerar roteiros coerentes, úteis e práticos. Toda a experiência do produto foi construída em volta dessa validação.",
                },
                analysis: {
                    headline: "A arquitetura de prompt importou mais do que o modelo",
                    body: "As primeiras gerações pareciam impressionantes, mas quebravam em logística, tempo e orçamento. O avanço veio ao transformar prompts livres em fluxos guiados de raciocínio estruturado.",
                },
                solution: {
                    headline: "Planejamento de viagem condensado em uma única conversa",
                    body: "O usuário descreve destino, orçamento, duração e preferências. O Vambora gera um roteiro contextual com atividades, logística, estimativas de custo e sugestões organizadas por dia.",
                    items: [
                        "Fluxo conversacional de planejamento",
                        "Geração estruturada de roteiros",
                        "Sugestões adaptadas ao orçamento",
                        "Fallback entre modelos para maior estabilidade",
                        "Experiência fluida baseada em estados",
                    ],
                },
                technicalDecisions: {
                    headline: "Principais decisões técnicas",
                    decisions: [
                        {
                            title: "Gemini no lugar do GPT",
                            why: "O Gemini oferecia uma free tier forte para experimentação e geração estruturada, além de permitir explorar um ecossistema diferente do OpenAI.",
                            trade: "Ecossistema menor e algumas instabilidades exigiram lógica adicional de fallback.",
                        },
                        {
                            title: "Sem Next.js — simplicidade intencional",
                            why: "O produto se comporta mais como uma aplicação client-side fluida do que como um site orientado a conteúdo. SSR adicionaria complexidade sem resolver um problema real neste estágio.",
                            trade: "Menos flexibilidade caso a plataforma precise de experiências mais dependentes de SEO ou renderização server-side futuramente.",
                        },
                        {
                            title: "Navegação baseada em estado ao invés de rotas",
                            why: "A experiência foi desenhada para parecer contínua e conversacional. Transições de estado criaram uma interação mais fluida do que mudanças tradicionais de rota.",
                            trade: "Mais difícil de criar deep-links ou persistir estados complexos de navegação.",
                        },
                        {
                            title: "Geração estruturada em vez de prompts livres",
                            why: "Prompts abertos produziam roteiros visualmente convincentes, mas operacionalmente inconsistentes. Fluxos estruturados de raciocínio aumentaram significativamente a confiabilidade.",
                            trade: "A arquitetura de prompts ficou mais complexa e iterativa de manter.",
                        },
                    ],
                },
                result: {
                    headline: "De excesso de pesquisa para planejamento acionável",
                    body: "O Vambora transformou um processo fragmentado em uma interação rápida e objetiva. O produto valida como fluxos estruturados com IA podem reduzir significativamente a fadiga de decisão durante o planejamento de viagens.",
                    metrics: [
                        { label: "Fluxo", value: "Estruturado" },
                        { label: "Tempo de geração", value: "< 8s" },
                        { label: "Status", value: "Publicado" },
                    ],
                },
            },
        },
    },

    // ── 03 CARGA ─────────────────────────────────────────────────
    {
        id: "carga",
        title: "Carga",
        tagline: "Operational visibility platform for small and mid-size agricultural logistics",
        tags: ["React", "Node.js", "PostgreSQL", "TypeScript", "Agro", "Full Stack"],
        year: 2026,
        status: "in progress",
        cardPosition: { top: "42%", left: "60%" },
        media: { type: "image", src: "/media/carga-bg.jpg", alt: "Carga" },
        heroImage: "/media/carga-hero.jpg",
        links: { github: "" },
        sections: {
            problem: {
                headline: "Operational losses stay invisible without centralized visibility",
                body: "Small and mid-sized agricultural operations still rely heavily on manual tracking, fragmented communication, and informal controls. Small operational losses accumulate silently because there is no consolidated operational view.",
            },
            idea: {
                headline: "Create operational clarity before operational complexity",
                body: "The goal is not to replicate a traditional ERP. It's to provide a simple operational layer where producers and operators can quickly understand what is happening with each load, movement, and loss.",
            },
            analysis: {
                headline: "The real challenge is usability under field conditions",
                body: "Field operators are not thinking about software while working. Every interaction needs to be fast, obvious, and resilient. Offline-first architecture became essential because stable internet cannot be assumed in rural environments.",
            },
            solution: {
                headline: "A field-first operational logistics platform",
                body: "Carga focuses on operational registration, load tracking, financial visibility, and incident history through a mobile-first experience designed for real field usage.",
                items: [
                    "Load registration and tracking",
                    "Loss and incident management",
                    "Financial consolidation per operation",
                    "Operational history and reporting",
                    "Offline-first architecture for unstable connectivity",
                ],
            },
            technicalDecisions: {
                headline: "Key technical decisions",
                decisions: [
                    {
                        title: "Mobile-first web architecture",
                        why: "Field operators primarily work through mobile devices. A web-based approach avoids installation barriers and works immediately on any device.",
                        trade: "Some native mobile capabilities become harder to access compared to a dedicated native application.",
                    },
                    {
                        title: "Offline-first operational flow",
                        why: "Stable internet connectivity cannot be assumed in rural environments. Core workflows need to remain functional even without network access.",
                        trade: "Synchronization, local persistence, and conflict resolution significantly increase implementation complexity.",
                    },
                    {
                        title: "IndexedDB for local persistence",
                        why: "Operational data must survive unstable connections and temporary offline sessions without losing reliability.",
                        trade: "State synchronization becomes substantially harder compared to traditional online-first systems.",
                    },
                ],
            },
            result: {
                headline: "Core operational architecture currently in development",
                body: "Carga is currently being structured around real operational flows from agricultural logistics. The product direction, architecture, and field requirements are already defined before implementation scaling begins.",
            },
        },
        assistant: {
            context: `You are a technical assistant in Pedro Ferreira's portfolio. Answer questions about Carga — an agricultural logistics management platform in progress. Stack: React, Node.js, PostgreSQL, TypeScript. Mobile-first, offline-first (IndexedDB). Target: small/mid Brazilian farms. Core challenge: UX simple enough for field operators. Status: in progress.`,
            quickPrompts: [
                "Why mobile-first instead of a native app?",
                "How does the offline-first architecture work?",
                "Who is the actual target user?",
                "What's the current development status?",
            ],
        },
        pt: {
            tagline: "Plataforma de visibilidade operacional para logística agrícola de pequeno e médio porte",
            sections: {
                problem: {
                    headline: "Perdas operacionais ficam invisíveis sem visibilidade centralizada",
                    body: "Operações agrícolas de pequeno e médio porte ainda dependem fortemente de controles manuais, comunicação fragmentada e registros informais. Pequenas perdas operacionais se acumulam silenciosamente porque não existe uma visão operacional consolidada.",
                },
                idea: {
                    headline: "Criar clareza operacional antes de complexidade operacional",
                    body: "O objetivo não é replicar um ERP tradicional. É criar uma camada operacional simples onde produtores e operadores consigam entender rapidamente o que está acontecendo com cada carga, movimentação e perda.",
                },
                analysis: {
                    headline: "O verdadeiro desafio é usabilidade em condições reais de campo",
                    body: "Operadores em campo não estão pensando em software enquanto trabalham. Cada interação precisa ser rápida, óbvia e resiliente. A arquitetura offline-first se tornou essencial porque internet estável não pode ser assumida em ambientes rurais.",
                },
                solution: {
                    headline: "Uma plataforma logística pensada para uso em campo",
                    body: "O Carga foca em registro operacional, rastreamento de cargas, visibilidade financeira e histórico de incidentes através de uma experiência mobile-first construída para uso real em campo.",
                    items: [
                        "Cadastro e rastreamento de cargas",
                        "Gestão de perdas e incidentes",
                        "Consolidação financeira por operação",
                        "Histórico operacional e relatórios",
                        "Arquitetura offline-first para conectividade instável",
                    ],
                },
                technicalDecisions: {
                    headline: "Principais decisões técnicas",
                    decisions: [
                        {
                            title: "Arquitetura web mobile-first",
                            why: "Operadores de campo trabalham principalmente via dispositivos móveis. A abordagem web evita barreiras de instalação e funciona imediatamente em qualquer aparelho.",
                            trade: "Algumas capacidades nativas mobile ficam mais difíceis de acessar comparado a um aplicativo nativo.",
                        },
                        {
                            title: "Fluxo operacional offline-first",
                            why: "Internet estável não pode ser assumida em ambientes rurais. Os fluxos principais precisam continuar funcionando mesmo sem conexão.",
                            trade: "Sincronização, persistência local e resolução de conflitos aumentam significativamente a complexidade da implementação.",
                        },
                        {
                            title: "IndexedDB para persistência local",
                            why: "Os dados operacionais precisam sobreviver a conexões instáveis e sessões offline sem perder confiabilidade.",
                            trade: "Sincronização de estado se torna muito mais difícil do que em sistemas tradicionais online-first.",
                        },
                    ],
                },
                result: {
                    headline: "Arquitetura operacional principal em desenvolvimento",
                    body: "O Carga está sendo estruturado em cima de fluxos operacionais reais da logística agrícola. A direção do produto, arquitetura e requisitos de campo já estão definidos antes da expansão da implementação.",
                },
            },
        },
    },

    // ── 04 CERÉE ─────────────────────────────────────────────────
    {
        id: "ceree",
        title: "Cerée",
        tagline: "Modern RSVP platform for private events and curated gatherings",
        tags: ["React", "Node.js", "TypeScript", "Events", "Product"],
        year: 2026,
        status: "in progress",
        cardPosition: { top: "65%", left: "44%" },
        media: { type: "image", src: "/media/ceree-bg.jpg", alt: "Cerée" },
        heroImage: "/media/ceree-hero.jpg",
        links: { github: "" },
        sections: {
            problem: {
                headline: "Private events still depend on WhatsApp and spreadsheets",
                body: "Small social events with high emotional value are usually managed through fragmented confirmations, manual guest lists, and improvised organization flows that don't match the care invested in the event itself.",
            },
            idea: {
                headline: "Make the invitation feel like part of the experience",
                body: "Cerée started from the idea that digital invitations should feel intentional, elegant, and personal — not transactional. The platform focuses on creating a refined RSVP experience for private gatherings.",
            },
            analysis: {
                headline: "Sophistication without visual overload",
                body: "The challenge wasn't adding visual effects — it was creating an experience that felt elegant without becoming difficult to use. The interface needed to feel premium while remaining lightweight and frictionless.",
            },
            solution: {
                headline: "Private event management with a premium digital layer",
                body: "Each event receives its own personalized environment with private access, RSVP handling, and centralized guest organization.",
                items: [
                    "Custom event pages",
                    "Password-protected guest access",
                    "Centralized RSVP management",
                    "Google Sheets integration for operational simplicity",
                    "Mobile-first premium experience",
                ],
            },
            technicalDecisions: {
                headline: "Key technical decisions",
                decisions: [
                    {
                        title: "Password-based private access",
                        why: "Each event invitation includes private access credentials, reinforcing the feeling of exclusivity while keeping implementation simple and understandable.",
                        trade: "Passwords can still be shared manually between guests.",
                    },
                    {
                        title: "Google Sheets + Apps Script as the operational backend",
                        why: "Event hosts are already comfortable with spreadsheets. Using familiar tooling reduced onboarding friction and accelerated implementation.",
                        trade: "Limited scalability and analytics flexibility compared to a dedicated backend architecture.",
                    },
                    {
                        title: "Custom event pages instead of generic templates",
                        why: "The product experience depends heavily on emotional perception and personalization.",
                        trade: "Higher design effort per event experience.",
                    },
                ],
            },
            result: {
                headline: "Core RSVP flow already validated in a real event",
                body: "Cerée already supports real invitation flows with personalized event pages, RSVP handling, and operational consolidation for private gatherings.",
                metrics: [
                    { label: "Core flow", value: "Validated" },
                    { label: "Experience", value: "Mobile-first" },
                    { label: "Status", value: "In progress" },
                ],
            },
        },
        assistant: {
            context: `You are a technical assistant in Pedro Ferreira's portfolio. Answer questions about Cerée — a private event RSVP platform. Stack: React, Node.js, TypeScript. Google Sheets + Apps Script for data. Password-based access. Status: core flow shipped, platform in progress. Focus on product thinking and design decisions.`,
            quickPrompts: [
                "How does the private access system work?",
                "Why Google Sheets instead of a real database?",
                "What makes this different from Eventbrite?",
                "What's the monetization vision?",
            ],
        },
        pt: {
            tagline: "Plataforma moderna de RSVP para eventos privados e experiências sociais refinadas",
            sections: {
                problem: {
                    headline: "Eventos privados ainda dependem de WhatsApp e planilhas",
                    body: "Eventos sociais pequenos e emocionalmente importantes normalmente são organizados através de confirmações fragmentadas, listas manuais e fluxos improvisados que não combinam com o cuidado investido no próprio evento.",
                },
                idea: {
                    headline: "Fazer o convite parecer parte da experiência",
                    body: "O Cerée nasceu da ideia de que convites digitais deveriam parecer intencionais, elegantes e pessoais — não transacionais. A plataforma foca em criar uma experiência refinada de RSVP para eventos privados.",
                },
                analysis: {
                    headline: "Sofisticação sem excesso visual",
                    body: "O desafio não era adicionar efeitos visuais — era criar uma experiência elegante sem dificultar o uso. A interface precisava parecer premium mantendo leveza e ausência de fricção.",
                },
                solution: {
                    headline: "Gestão de eventos privados com uma camada digital premium",
                    body: "Cada evento recebe seu próprio ambiente personalizado com acesso privado, gerenciamento de RSVP e organização centralizada de convidados.",
                    items: [
                        "Páginas personalizadas por evento",
                        "Acesso privado protegido por senha",
                        "Gestão centralizada de RSVP",
                        "Integração com Google Sheets para simplicidade operacional",
                        "Experiência premium mobile-first",
                    ],
                },
                technicalDecisions: {
                    headline: "Principais decisões técnicas",
                    decisions: [
                        {
                            title: "Acesso privado por senha",
                            why: "Cada convite possui credenciais privadas de acesso, reforçando a sensação de exclusividade enquanto mantém a implementação simples e compreensível.",
                            trade: "Senhas ainda podem ser compartilhadas manualmente entre convidados.",
                        },
                        {
                            title: "Google Sheets + Apps Script como backend operacional",
                            why: "Os anfitriões já possuem familiaridade com planilhas. Utilizar ferramentas conhecidas reduziu fricção de onboarding e acelerou a implementação.",
                            trade: "Escalabilidade e flexibilidade analítica limitadas comparadas a uma arquitetura dedicada.",
                        },
                        {
                            title: "Páginas personalizadas por evento",
                            why: "A experiência do produto depende fortemente de percepção emocional e personalização.",
                            trade: "Maior esforço visual e de design por experiência criada.",
                        },
                    ],
                },
                result: {
                    headline: "Fluxo principal de RSVP já validado em evento real",
                    body: "O Cerée já suporta fluxos reais de convite com páginas personalizadas, gerenciamento de RSVP e consolidação operacional para eventos privados.",
                    metrics: [
                        { label: "Fluxo principal", value: "Validado" },
                        { label: "Experiência", value: "Mobile-first" },
                        { label: "Status", value: "Em andamento" },
                    ],
                },
            },
        },
    },

    // ── 05 PULSO ─────────────────────────────────────────────────
    {
        id: "pulso",
        title: "Pulso",
        tagline: "Operational coordination platform for teams that still run on WhatsApp",
        tags: ["React", "Node.js", "PostgreSQL", "TypeScript", "Product", "Full Stack"],
        year: 2025,
        status: "in progress",
        cardPosition: { top: "35%", left: "62%" },
        media: { type: "image", src: "/media/pulso-bg.jpg", alt: "Pulso" },
        heroImage: "/media/pulso-hero.jpg",
        links: { github: "" },
        sections: {
            problem: {
                headline: "Team coordination breaks when communication becomes fragmented",
                body: "Schedules, confirmations, absences, and financial organization are still handled through scattered messages and improvised spreadsheets. Small communication failures quickly become operational problems.",
            },
            idea: {
                headline: "Replace operational chaos with synchronized routines",
                body: "Pulso started from a real organizational pain point inside volunteer teams. The idea is to create a centralized operational layer that feels lightweight enough to become part of people's routines instead of another management tool they avoid using.",
            },
            analysis: {
                headline: "The hardest product decision is what not to build",
                body: "Operational tools naturally tend toward feature overload. The challenge with Pulso is maintaining simplicity while solving genuinely operational problems without increasing cognitive load for the people using it daily.",
            },
            solution: {
                headline: "Schedules, confirmations, and team operations in one place",
                body: "Pulso centralizes team coordination through scheduling flows, presence confirmations, leadership visibility, and operational tracking.",
                items: [
                    "Schedule and confirmation management",
                    "Absence handling and swap requests",
                    "Leadership visibility dashboard",
                    "Financial tracking for events and teams",
                    "Notification infrastructure planned for future releases",
                ],
            },
            technicalDecisions: {
                headline: "Key technical decisions",
                decisions: [
                    {
                        title: "RBAC planned from the beginning",
                        why: "The platform serves both leadership and operational members with completely different visibility requirements.",
                        trade: "Authentication and permission logic become more complex early in development.",
                    },
                    {
                        title: "Lean infrastructure using free-tier services",
                        why: "The initial validation phase prioritizes speed and operational efficiency over scale optimization.",
                        trade: "Infrastructure limitations will appear earlier if adoption grows quickly.",
                    },
                    {
                        title: "Operational simplicity over feature density",
                        why: "The product intentionally avoids becoming another overloaded management dashboard.",
                        trade: "Some advanced workflows are intentionally postponed to preserve clarity.",
                    },
                ],
            },
            result: {
                headline: "Product direction defined and architecture in progress",
                body: "Pulso is currently being structured around real operational routines observed in volunteer and organizational teams. The MVP scope, permission structure, and primary flows are already mapped.",
            },
        },
        assistant: {
            context: `You are a technical assistant in Pedro Ferreira's portfolio. Answer questions about Pulso — an internal team operations platform. Stack: React, Node.js, PostgreSQL, TypeScript; Vercel + Supabase (free tiers). Solves WhatsApp-based team coordination. RBAC from day one. Status: early, most spec-driven project. Focus on product thinking and restraint decisions.`,
            quickPrompts: [
                "Why build this instead of using Slack?",
                "How are you handling multi-user permissions?",
                "What's the hardest product decision here?",
                "What's the current stage?",
            ],
        },
        pt: {
            tagline: "Plataforma de coordenação operacional para equipes que ainda funcionam pelo WhatsApp",
            sections: {
                problem: {
                    headline: "Coordenação de equipes quebra quando a comunicação se fragmenta",
                    body: "Escalas, confirmações, ausências e organização financeira ainda acontecem através de mensagens espalhadas e planilhas improvisadas. Pequenas falhas de comunicação rapidamente se transformam em problemas operacionais.",
                },
                idea: {
                    headline: "Substituir caos operacional por rotinas sincronizadas",
                    body: "O Pulso nasceu de uma dor organizacional real dentro de equipes voluntárias. A ideia é criar uma camada operacional centralizada que seja leve o suficiente para fazer parte da rotina das pessoas, e não apenas mais uma ferramenta de gestão ignorada.",
                },
                analysis: {
                    headline: "A decisão de produto mais difícil é o que não construir",
                    body: "Ferramentas operacionais naturalmente tendem ao excesso de funcionalidades. O desafio do Pulso é manter simplicidade enquanto resolve problemas reais sem aumentar a carga cognitiva das pessoas que usam o sistema diariamente.",
                },
                solution: {
                    headline: "Escalas, confirmações e operações de equipe em um único lugar",
                    body: "O Pulso centraliza coordenação de equipes através de fluxos de escala, confirmação de presença, visibilidade para liderança e acompanhamento operacional.",
                    items: [
                        "Gestão de escalas e confirmações",
                        "Controle de ausências e pedidos de troca",
                        "Dashboard de visibilidade para liderança",
                        "Acompanhamento financeiro para eventos e equipes",
                        "Infraestrutura de notificações planejada para futuras versões",
                    ],
                },
                technicalDecisions: {
                    headline: "Principais decisões técnicas",
                    decisions: [
                        {
                            title: "RBAC planejado desde o início",
                            why: "A plataforma atende liderança e membros operacionais com necessidades completamente diferentes de visibilidade.",
                            trade: "A lógica de autenticação e permissões se torna mais complexa logo no início do desenvolvimento.",
                        },
                        {
                            title: "Infraestrutura enxuta utilizando serviços free-tier",
                            why: "A fase inicial de validação prioriza velocidade e eficiência operacional acima de otimizações de escala.",
                            trade: "Limitações de infraestrutura aparecerão mais cedo caso a adoção cresça rapidamente.",
                        },
                        {
                            title: "Simplicidade operacional acima de densidade de funcionalidades",
                            why: "O produto evita intencionalmente se tornar outro dashboard de gestão sobrecarregado.",
                            trade: "Alguns fluxos avançados são propositalmente adiados para preservar clareza.",
                        },
                    ],
                },
                result: {
                    headline: "Direção do produto definida e arquitetura em andamento",
                    body: "O Pulso está sendo estruturado em cima de rotinas operacionais reais observadas em equipes voluntárias e organizacionais. O escopo inicial, estrutura de permissões e fluxos principais já estão mapeados.",
                },
            },
        },
    },
]

export function getProject(id: string): ProjectData {
    const project = projects.find((p) => p.id === id)
    if (!project) throw new Error(`Project "${id}" not found`)
    return project
}

export const sortedProjects = [...projects].sort((a, b) => {
    if (a.status === "live" && b.status !== "live") return -1
    if (a.status !== "live" && b.status === "live") return 1
    return 0
})