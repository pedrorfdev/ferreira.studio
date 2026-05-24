// data/projects.ts — versão completa com PT traduzido em todas as sections
import type { ProjectData } from "@/types/project"

export const projects: ProjectData[] = [
    // ── 01 PRAXIS ───────────────────────────────────────────────
    {
        id: "praxis",
        title: "Praxis",
        tagline: "Clinical management system that centralizes an OT's entire workflow",
        tags: ["React", "Node.js", "PostgreSQL", "TypeScript", "Healthcare", "Full Stack"],
        year: 2024,
        status: "shipped",
        cardPosition: { top: "28%", left: "54%" },
        media: { type: "image", src: "/media/praxis-bg.jpg", alt: "Praxis" },
        heroImage: "/media/praxis-hero.jpg",
        links: {
            demo: "",   // adicione a URL real
            github: "",
        },
        sections: {
            problem: {
                headline: "Patient data living in five different places",
                body: "Occupational Therapists had no dedicated tool built for how they actually work. Patient records, clinical notes, anamneses, and session evolutions were scattered across WhatsApp, Google Drive, loose documents, and handwritten notebooks. Every hour of care came with another hour of administrative work — most of it done after the workday ended.",
            },
            idea: {
                headline: "Centralize first. Automate later.",
                body: "The goal wasn't to build a complex health platform. It was to build something simple, fast, and practical — a single place where an OT could find everything about a patient in seconds. The AI layer was planned from day one but deliberately left for a later phase. Getting the foundation right came first.",
            },
            solution: {
                headline: "Structured clinical flows, zero friction",
                body: "A full-stack web application covering the complete OT workflow: patient intake, session tracking, structured anamneses, and rich-text clinical evolution notes — all in one place, already in production use.",
                items: [
                    "Full patient and guardian CRUD",
                    "Structured anamnesis with medical, family, school, and clinical history",
                    "Rich-text clinical evolution editor (Tiptap)",
                    "Session tracking and history",
                    "Scalable base for future AI integration (PGVector ready)",
                ],
            },
            analysis: {
                headline: "The hardest part was modeling clinical data correctly",
                body: "Semi-structured clinical data is genuinely difficult to model. The anamnesis needed to feel like multiple organized fields for the OT while being stored efficiently in the database. Getting that transformation right took significant iteration. The rich-text editor (Tiptap) added another layer of complexity: content persistence, serialization, and database integration were all first-time territory.",
            },
            technicalDecisions: {
                headline: "Key technical decisions",
                decisions: [
                    {
                        title: "PostgreSQL + PGVector from day one",
                        why: "The database was structured with the future product in mind. PGVector was included early to support embeddings, semantic search, and intelligent clinical summaries — avoiding a structural migration later.",
                        trade: "More upfront schema complexity, but the foundation for AI is already in place.",
                    },
                    {
                        title: "JSONB for structured anamneses",
                        why: "Clinical anamnesis data is structured but not fully relational. JSONB gives flexibility to store complex nested clinical fields while keeping them queryable.",
                        trade: "Less rigid than a fully normalized schema, but a much better fit for the domain.",
                    },
                    {
                        title: "shadcn/ui for component standardization",
                        why: "As a large administrative system, visual consistency was critical. shadcn/ui provided a solid base of components that could be customized — reducing time on UI primitives.",
                        trade: "Some opinionated defaults required overriding, but the consistency gain was worth it.",
                    },
                    {
                        title: "Tiptap for rich-text clinical notes",
                        why: "Clinical evolutions needed to feel like natural writing, not form fields. Tiptap provided a flexible rich-text experience with full control over serialization and storage.",
                        trade: "First experience with this class of editor; the learning curve around content persistence was steep.",
                    },
                ],
            },
            result: {
                headline: "Already in production use",
                body: "Praxis is actively used in a real clinical practice. It has reduced the time spent organizing clinical information, centralized patient data that was previously scattered, and eliminated most of the administrative work that used to happen after the workday ended.",
                metrics: [
                    { label: "Status", value: "Production" },
                    { label: "Post-shift admin", value: "−60%" },
                    { label: "Data access", value: "Centralized" },
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
            tagline: "Sistema de gestão clínica que centraliza todo o fluxo de trabalho de um TO",
            sections: {
                problem: {
                    headline: "Dados de pacientes espalhados em cinco lugares diferentes",
                    body: "Terapeutas Ocupacionais não tinham uma ferramenta dedicada ao seu fluxo real de trabalho. Prontuários, evoluções clínicas, anamneses e notas de sessão estavam distribuídos entre WhatsApp, Google Drive, documentos soltos e cadernos. Cada hora de atendimento gerava outra hora de trabalho administrativo — a maior parte feita depois do expediente.",
                },
                idea: {
                    headline: "Centralizar primeiro. Automatizar depois.",
                    body: "O objetivo não era construir uma plataforma de saúde complexa. Era algo simples, rápido e prático — um único lugar onde o TO encontrasse tudo sobre um paciente em segundos. A camada de IA foi planejada desde o início, mas deliberadamente deixada para uma fase posterior. Primeiro, fazer a fundação direito.",
                },
                solution: {
                    headline: "Fluxos clínicos estruturados, sem fricção",
                    body: "Uma aplicação web full-stack cobrindo todo o fluxo de um TO: cadastro de pacientes, acompanhamento de sessões, anamneses estruturadas e editor de evoluções clínicas em rich text — tudo em um lugar, já em uso em produção.",
                    items: [
                        "CRUD completo de pacientes e responsáveis",
                        "Anamnese estruturada com histórico médico, familiar, escolar e clínico",
                        "Editor de evoluções clínicas em rich text (Tiptap)",
                        "Registro e histórico de sessões",
                        "Base escalável para integração de IA (PGVector pronto)",
                    ],
                },
                analysis: {
                    headline: "A parte mais difícil foi modelar os dados clínicos corretamente",
                    body: "Dados clínicos semi-estruturados são genuinamente difíceis de modelar. A anamnese precisava parecer múltiplos campos organizados para o TO, mas ser armazenada de forma eficiente no banco. O editor rich text (Tiptap) adicionou outra camada de complexidade: persistência de conteúdo, serialização e integração com o banco foram todos território novo.",
                },
                technicalDecisions: {
                    headline: "Principais decisões técnicas",
                    decisions: [
                        {
                            title: "PostgreSQL + PGVector desde o início",
                            why: "O banco foi estruturado pensando no futuro do produto. O PGVector foi incluído cedo para suportar embeddings e busca semântica — evitando uma migração estrutural depois.",
                            trade: "Mais complexidade de schema no início, mas a fundação para IA já está pronta.",
                        },
                        {
                            title: "JSONB para anamneses estruturadas",
                            why: "Os dados de anamnese são estruturados mas não totalmente relacionais. JSONB oferece flexibilidade para armazenar campos clínicos complexos mantendo-os consultáveis.",
                            trade: "Menos rígido que um schema totalmente normalizado, mas muito mais adequado ao domínio.",
                        },
                        {
                            title: "shadcn/ui para padronização de componentes",
                            why: "Como sistema administrativo grande, consistência visual era crítica. shadcn/ui forneceu uma base sólida de componentes customizáveis — reduzindo tempo gasto em primitivos de UI.",
                            trade: "Alguns defaults exigiram override, mas o ganho em consistência valeu.",
                        },
                        {
                            title: "Tiptap para evoluções em rich text",
                            why: "Evoluções clínicas precisavam parecer escrita natural, não campos de formulário. Tiptap ofereceu experiência flexível com controle total sobre serialização e armazenamento.",
                            trade: "Primeira experiência com esse tipo de editor; a curva de aprendizado em persistência de conteúdo foi íngreme.",
                        },
                    ],
                },
                result: {
                    headline: "Já em uso em produção",
                    body: "O Praxis é usado ativamente em uma prática clínica real. Reduziu o tempo gasto organizando informações clínicas, centralizou dados de pacientes que antes estavam espalhados, e eliminou a maior parte do trabalho administrativo que acontecia após o expediente.",
                    metrics: [
                        { label: "Status", value: "Produção" },
                        { label: "Admin pós-turno", value: "−60%" },
                        { label: "Acesso aos dados", value: "Centralizado" },
                    ],
                },
            },
        },
    },

    // ── 02 VAMBORA.AI ────────────────────────────────────────────
    {
        id: "vambora",
        title: "Vambora.ai",
        tagline: "AI travel guide that turns hours of research into minutes",
        tags: ["React", "Node.js", "AI", "Gemini", "TypeScript", "Full Stack"],
        year: 2024,
        status: "shipped",
        cardPosition: { top: "58%", left: "36%" },
        media: { type: "image", src: "/media/vambora-bg.jpg", alt: "Vambora.ai" },
        heroImage: "/media/vambora-hero.jpg",
        links: { demo: "", github: "" },
        sections: {
            problem: {
                headline: "Planning a trip opens twelve tabs and closes none",
                body: "Even simple trips demand hours of work: researching destinations, comparing prices, finding attractions, calculating budgets, and assembling it all into a coherent plan. The cognitive load is disproportionate to the actual trip. Most people either over-research and still feel uncertain, or under-plan and figure it out as they go.",
            },
            idea: {
                headline: "Validate the AI quality before building anything else",
                body: "The bet was simple: if the AI can produce a genuinely useful, logistically coherent itinerary, the rest of the product will follow. So the first phase was entirely focused on prompt engineering and generation quality — not UI, not landing page, not features. The experience layer came only after the core was solid.",
            },
            solution: {
                headline: "Context-aware itineraries in under a minute",
                body: "The user provides destination, budget, group size, duration, and preferences. Vambora generates a structured, day-by-day travel guide with activity suggestions, estimated costs, and practical tips.",
                items: [
                    "Conversational input — no forms, no friction",
                    "Structured AI output with day-by-day breakdown",
                    "Budget-aware activity suggestions",
                    "State-based navigation — fluid, no page reloads",
                    "Model fallback system for reliability",
                ],
            },
            analysis: {
                headline: "The real problem is prompt architecture, not model choice",
                body: "Free-form prompting consistently produced impressive-sounding but logistically broken itineraries. The fix was structural: instead of asking the model to write a travel guide, the prompt forces step-by-step reasoning about logistics, timing, distances, and budget before assembling the output. The model matters less than the architecture around it.",
            },
            technicalDecisions: {
                headline: "Key technical decisions",
                decisions: [
                    {
                        title: "Gemini over GPT",
                        why: "Accessible free tier for rapid prototyping. Good performance on structured generation tasks. Deliberate choice to explore a different API ecosystem beyond OpenAI.",
                        trade: "Smaller community; some model instability required fallback logic.",
                    },
                    {
                        title: "No Next.js — deliberate simplicity",
                        why: "The application is essentially client-side: a landing page, a conversational input flow, and AI-generated output. No SSR requirement at this stage. Adding Next.js would introduce overhead without benefit.",
                        trade: "Less flexibility if the product expands to need SSR — but premature optimization avoided.",
                    },
                    {
                        title: "State-based navigation, no routes",
                        why: "The experience needed to feel fluid and continuous — like a product, not a website. Routing would have introduced visual breaks between steps.",
                        trade: "Harder to deep-link to specific states, but the right tradeoff for the UX goal.",
                    },
                ],
            },
            result: {
                headline: "Hours of planning compressed into minutes",
                body: "Vambora.ai ships as a functional, end-to-end MVP. What previously required hours of manual research is resolved in a single session. The structured generation approach produces significantly more coherent itineraries than free-form prompting.",
                metrics: [
                    { label: "Planning time", value: "Hours → min" },
                    { label: "Status", value: "Shipped" },
                    { label: "Generation", value: "< 8s" },
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
            tagline: "Guia de viagens com IA que transforma horas de pesquisa em minutos",
            sections: {
                problem: {
                    headline: "Planejar uma viagem abre doze abas e não fecha nenhuma",
                    body: "Mesmo viagens simples exigem horas de trabalho: pesquisar destinos, comparar preços, encontrar atrações, calcular orçamentos e montar tudo em um plano coerente. O esforço cognitivo é desproporcional à viagem em si. A maioria das pessoas pesquisa demais e ainda fica insegura, ou não planeja o suficiente e improvisa no caminho.",
                },
                idea: {
                    headline: "Validar a qualidade da IA antes de construir qualquer outra coisa",
                    body: "A aposta era simples: se a IA consegue produzir um roteiro genuinamente útil e logisticamente coerente, o resto do produto vem depois. Então a primeira fase foi inteiramente focada em engenharia de prompt e qualidade de geração — não UI, não landing page, não features. A camada de experiência veio só depois que o núcleo estava sólido.",
                },
                solution: {
                    headline: "Roteiros contextuais em menos de um minuto",
                    body: "O usuário informa destino, orçamento, tamanho do grupo, duração e preferências. O Vambora gera um guia estruturado, dia a dia, com sugestões de atividades, estimativas de custo e dicas práticas.",
                    items: [
                        "Input conversacional — sem formulários, sem fricção",
                        "Output estruturado com breakdown dia a dia",
                        "Sugestões de atividades ajustadas ao orçamento",
                        "Navegação por estado — fluida, sem recarregamento",
                        "Sistema de fallback entre modelos para confiabilidade",
                    ],
                },
                analysis: {
                    headline: "O problema real é a arquitetura de prompt, não a escolha do modelo",
                    body: "Prompts livres consistentemente produziam roteiros impressionantes mas logisticamente quebrados. A solução foi estrutural: ao invés de pedir para o modelo escrever um guia de viagem, o prompt força raciocínio passo a passo sobre logística, tempo, distâncias e orçamento antes de montar o output. O modelo importa menos do que a arquitetura ao redor dele.",
                },
                technicalDecisions: {
                    headline: "Principais decisões técnicas",
                    decisions: [
                        {
                            title: "Gemini no lugar do GPT",
                            why: "Free tier acessível para prototipagem rápida. Boa performance em geração estruturada. Escolha deliberada de explorar um ecossistema de API diferente do OpenAI.",
                            trade: "Comunidade menor; alguma instabilidade exigiu lógica de fallback.",
                        },
                        {
                            title: "Sem Next.js — simplicidade deliberada",
                            why: "A aplicação é essencialmente client-side: landing page, fluxo de input conversacional e output gerado por IA. Sem necessidade de SSR nesta fase. Next.js adicionaria overhead sem benefício.",
                            trade: "Menos flexibilidade se o produto precisar de SSR — mas otimização prematura evitada.",
                        },
                        {
                            title: "Navegação por estado, sem rotas",
                            why: "A experiência precisava parecer fluida e contínua — como um produto, não um site. Rotas criariam quebras visuais entre as etapas.",
                            trade: "Mais difícil de fazer deep-link em estados específicos, mas o tradeoff certo para o objetivo de UX.",
                        },
                    ],
                },
                result: {
                    headline: "Horas de planejamento comprimidas em minutos",
                    body: "O Vambora.ai funciona como um MVP end-to-end. O que antes exigia horas de pesquisa manual é resolvido em uma única sessão. A abordagem de geração estruturada produz roteiros significativamente mais coerentes do que prompts livres.",
                    metrics: [
                        { label: "Tempo de planejamento", value: "Horas → min" },
                        { label: "Status", value: "Publicado" },
                        { label: "Geração", value: "< 8s" },
                    ],
                },
            },
        },
    },

    // ── 03 CARGA ─────────────────────────────────────────────────
    {
        id: "carga",
        title: "Carga",
        tagline: "Operational platform that makes agricultural logistics visible and trackable",
        tags: ["React", "Node.js", "PostgreSQL", "TypeScript", "Agro", "Full Stack"],
        year: 2025,
        status: "in progress",
        cardPosition: { top: "42%", left: "60%" },
        media: { type: "image", src: "/media/carga-bg.jpg", alt: "Carga" },
        heroImage: "/media/carga-hero.jpg",
        links: { github: "" },
        sections: {
            problem: {
                headline: "Small losses stay invisible without a consolidated view",
                body: "Small and mid-size agricultural operations run almost entirely on manual controls: handwritten notes, scattered messages, and informal calculations. There's no way to see real profit, track operational losses, or understand the financial impact of incidents. Small losses that would be manageable if visible compound silently.",
            },
            idea: {
                headline: "Operational clarity before complexity",
                body: "The goal is not to build an ERP. The goal is to give producers and operators a simple, clear view of what's happening with each load — profit, losses, logistics movement, and operational history. Validate usefulness with a pragmatic MVP before expanding.",
            },
            solution: {
                headline: "From chaotic notes to a consolidated operational view",
                body: "A mobile-first web application for field use. Core flows: load registration, loss tracking, operational history, financial consolidation, and monthly reports.",
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
                body: "The core challenge isn't technical — it's UX. Operators in field conditions need an interface so clear and fast that recording a load takes seconds, not minutes. Any friction gets skipped. The offline-first requirement adds meaningful technical complexity: IndexedDB for local persistence and conflict resolution on sync.",
            },
            technicalDecisions: {
                headline: "Key technical decisions",
                decisions: [
                    {
                        title: "Mobile-first web app over native",
                        why: "Avoids app store complexity and works on any device with a browser. Field operators don't need to install anything.",
                        trade: "Some native capabilities require workarounds — acceptable for MVP scope.",
                    },
                    {
                        title: "Offline-first with IndexedDB",
                        why: "Rural connectivity is unreliable. The app needs to work fully without internet and sync when connection is restored.",
                        trade: "Significantly more complex state management and conflict resolution. Worth it for the use case.",
                    },
                ],
            },
            result: {
                headline: "Architecture defined, build in progress",
                body: "Carga is in active development. Core operational flows are mapped, the data model is defined, and the MVP is being structured. This project benefits from accumulated learning across previous products — starting with specs, not exploration.",
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
            tagline: "Plataforma operacional que torna a logística agrícola visível e rastreável",
            sections: {
                problem: {
                    headline: "Pequenas perdas ficam invisíveis sem uma visão consolidada",
                    body: "Operações agrícolas de pequeno e médio porte funcionam quase inteiramente com controles manuais: anotações à mão, mensagens espalhadas e cálculos informais. Não há como ver o lucro real, rastrear perdas operacionais ou entender o impacto financeiro de incidentes. Perdas pequenas que seriam gerenciáveis se visíveis se acumulam silenciosamente.",
                },
                idea: {
                    headline: "Clareza operacional antes de complexidade",
                    body: "O objetivo não é construir um ERP. É dar a produtores e operadores uma visão simples e clara do que está acontecendo com cada carga — lucro, perdas, movimentação logística e histórico operacional. Validar utilidade com um MVP pragmático antes de expandir.",
                },
                solution: {
                    headline: "De anotações caóticas para uma visão operacional consolidada",
                    body: "Uma aplicação web mobile-first para uso em campo. Fluxos principais: cadastro de cargas, gestão de perdas, histórico operacional, consolidação financeira e relatórios mensais.",
                    items: [
                        "Cadastro e rastreamento de cargas",
                        "Gestão de perdas com cálculo de impacto financeiro",
                        "Histórico operacional por carga",
                        "Consolidação financeira e relatórios",
                        "Arquitetura offline-first para conectividade rural",
                    ],
                },
                analysis: {
                    headline: "Projetar para usuários que não estão pensando em software",
                    body: "O desafio central não é técnico — é UX. Operadores em campo precisam de uma interface tão clara e rápida que registrar uma carga leve segundos, não minutos. Qualquer fricção é ignorada. O requisito offline-first adiciona complexidade técnica real: IndexedDB para persistência local e resolução de conflitos na sincronização.",
                },
                technicalDecisions: {
                    headline: "Principais decisões técnicas",
                    decisions: [
                        {
                            title: "Web app mobile-first no lugar de nativo",
                            why: "Evita complexidade de loja de aplicativos e funciona em qualquer dispositivo com navegador. Operadores de campo não precisam instalar nada.",
                            trade: "Algumas capacidades nativas exigem workarounds — aceitável para o escopo do MVP.",
                        },
                        {
                            title: "Offline-first com IndexedDB",
                            why: "Conectividade rural é instável. O app precisa funcionar completamente sem internet e sincronizar quando a conexão for restaurada.",
                            trade: "Gerenciamento de estado e resolução de conflitos significativamente mais complexos. Vale para o caso de uso.",
                        },
                    ],
                },
                result: {
                    headline: "Arquitetura definida, construção em andamento",
                    body: "O Carga está em desenvolvimento ativo. Os fluxos operacionais principais estão mapeados, o modelo de dados está definido e o MVP está sendo estruturado. Este projeto se beneficia do aprendizado acumulado em produtos anteriores — começando com specs, não exploração.",
                },
            },
        },
    },

    // ── 04 CERÉE ─────────────────────────────────────────────────
    {
        id: "ceree",
        title: "Cerée",
        tagline: "Private event RSVP platform for social gatherings that deserve more than a WhatsApp group",
        tags: ["React", "Node.js", "TypeScript", "Events", "Product"],
        year: 2025,
        status: "in progress",
        cardPosition: { top: "65%", left: "44%" },
        media: { type: "image", src: "/media/ceree-bg.jpg", alt: "Cerée" },
        heroImage: "/media/ceree-hero.jpg",
        links: { github: "" },
        sections: {
            problem: {
                headline: "Private events managed on WhatsApp and improvised spreadsheets",
                body: "Intimate social events — family gatherings, private dinners, celebrations — are still organized through WhatsApp confirmations, manual headcounts, and improvised spreadsheets. The experience is completely mismatched with the care put into the event itself. Most digital event tools are built for public events and ticket sales — not refined private social experiences.",
            },
            idea: {
                headline: "An invitation that feels like part of the event",
                body: "Cerée started as a solution for a specific family event and quickly revealed potential as a product. Each event gets its own digital experience — a personalized page with its own visual identity, private access, and an RSVP flow that consolidates information automatically.",
            },
            solution: {
                headline: "Exclusive access, effortless organization",
                body: "Each event has a customized landing page, password-protected access, and a centralized RSVP flow. Guest data is automatically consolidated.",
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
                body: "The core design challenge was balancing sophistication with simplicity. The product needs to feel elegant and exclusive — but the guest experience has to be effortless. Too much visual complexity and it feels like a tech demo. Too plain and it loses the premium positioning.",
            },
            technicalDecisions: {
                headline: "Key technical decisions",
                decisions: [
                    {
                        title: "Password-based private access",
                        why: "Each invitation is linked to a password. Only people actually invited can access the event environment. Simple, understandable, matches the exclusive positioning.",
                        trade: "Passwords can be shared — mitigated by single-use design and guest tracking.",
                    },
                    {
                        title: "Google Sheets + Apps Script for data",
                        why: "Hosts already know how to use spreadsheets. Zero learning curve, fast to implement, easy to hand off. Right tool for current scale.",
                        trade: "Not scalable to large volumes or complex analytics — acceptable for MVP stage.",
                    },
                ],
            },
            result: {
                headline: "Core experience shipped, platform evolving",
                body: "Cerée has a working RSVP flow, personalized event page, Google Sheets integration, and password-based access — already used for a real event.",
                metrics: [
                    { label: "Status", value: "In progress" },
                    { label: "Core flow", value: "Shipped" },
                    { label: "Manual lists", value: "Eliminated" },
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
            tagline: "Plataforma de RSVP para eventos privados que merecem mais que um grupo de WhatsApp",
            sections: {
                problem: {
                    headline: "Eventos privados gerenciados no WhatsApp e planilhas improvisadas",
                    body: "Eventos sociais íntimos — confraternizações familiares, jantares privados, celebrações — ainda são organizados por confirmações no WhatsApp, contagens manuais e planilhas improvisadas. A experiência é completamente incompatível com o cuidado dedicado ao evento. A maioria das ferramentas digitais foi feita para eventos públicos e venda de ingressos — não para experiências sociais privadas refinadas.",
                },
                idea: {
                    headline: "Um convite que parece parte do evento",
                    body: "O Cerée começou como solução para um evento familiar específico e rapidamente demonstrou potencial como produto. Cada evento ganha sua própria experiência digital — uma página personalizada com identidade visual própria, acesso privado e um fluxo de RSVP que consolida informações automaticamente.",
                },
                solution: {
                    headline: "Acesso exclusivo, organização sem esforço",
                    body: "Cada evento tem uma landing page customizada, acesso protegido por senha e um fluxo centralizado de RSVP. Os dados dos convidados são consolidados automaticamente.",
                    items: [
                        "Página do evento personalizada com identidade própria",
                        "Acesso privado por senha vinculada ao convite",
                        "RSVP com número de acompanhantes, restrições alimentares e observações",
                        "Consolidação automática via Google Sheets + Apps Script",
                        "UX premium, mobile-first",
                    ],
                },
                analysis: {
                    headline: "Experiência premium sem excesso visual",
                    body: "O desafio central de design foi equilibrar sofisticação com simplicidade. O produto precisa parecer elegante e exclusivo — mas a experiência do convidado precisa ser sem esforço. Complexidade visual demais parece tech demo. Simples demais perde o posicionamento premium.",
                },
                technicalDecisions: {
                    headline: "Principais decisões técnicas",
                    decisions: [
                        {
                            title: "Acesso privado por senha",
                            why: "Cada convite tem uma senha vinculada. Só pessoas realmente convidadas acessam o ambiente do evento. Simples, compreensível, alinhado ao posicionamento exclusivo.",
                            trade: "Senhas podem ser compartilhadas — mitigado por design de uso único e rastreamento de convidados.",
                        },
                        {
                            title: "Google Sheets + Apps Script para dados",
                            why: "Anfitriões já sabem usar planilhas. Curva de aprendizado zero, rápido de implementar, fácil de entregar. Ferramenta certa para a escala atual.",
                            trade: "Não escalável para grandes volumes ou analytics complexos — aceitável para a fase de MVP.",
                        },
                    ],
                },
                result: {
                    headline: "Experiência principal entregue, plataforma evoluindo",
                    body: "O Cerée tem fluxo de RSVP funcionando, página de evento personalizada, integração com Google Sheets e acesso por senha — já usado em um evento real.",
                    metrics: [
                        { label: "Status", value: "Em andamento" },
                        { label: "Fluxo principal", value: "Entregue" },
                        { label: "Listas manuais", value: "Eliminadas" },
                    ],
                },
            },
        },
    },

    // ── 05 PULSO ─────────────────────────────────────────────────
    {
        id: "pulso",
        title: "Pulso",
        tagline: "Internal operations platform that keeps teams synchronized without the WhatsApp chaos",
        tags: ["React", "Node.js", "PostgreSQL", "TypeScript", "Product", "Full Stack"],
        year: 2025,
        status: "in progress",
        cardPosition: { top: "35%", left: "62%" },
        media: { type: "image", src: "/media/pulso-bg.jpg", alt: "Pulso" },
        heroImage: "/media/pulso-hero.jpg",
        links: { github: "" },
        sections: {
            problem: {
                headline: "Team coordination running through scattered messages",
                body: "Operational teams manage schedules, confirmations, absences, and financial organization through WhatsApp, improvised spreadsheets, and manual confirmation chains. Small communication failures at scale become real operational problems: last-minute swaps, missed shifts, no financial visibility.",
            },
            idea: {
                headline: "Always present, synchronized with people's routines",
                body: "Pulso — the name comes from the idea of something always alive, present, and in sync — started as a voluntary solution to a real organizational problem. The goal is to replace WhatsApp chaos with a simple, centralized operational experience that people actually want to use.",
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
                body: "The core challenge with Pulso is restraint. It's easy to add features — notifications, integrations, analytics — but every addition increases cognitive load for users managing a demanding operational routine. The hardest product decision is deciding what not to build.",
            },
            technicalDecisions: {
                headline: "Key technical decisions",
                decisions: [
                    {
                        title: "Accessible infrastructure stack",
                        why: "Vercel, Supabase, Render, Neon — using free tiers to keep operational cost near zero during validation.",
                        trade: "Free tier limits create constraints at scale — acceptable and expected for this stage.",
                    },
                    {
                        title: "Multi-user permissions from the start",
                        why: "The platform serves both team members and leadership with different views. Retrofitting RBAC after the fact is painful — building it correctly from day one.",
                        trade: "More upfront complexity in the auth and permission layer.",
                    },
                ],
            },
            result: {
                headline: "Concept defined, architecture in progress",
                body: "Pulso is in the ideation and initial architecture phase. Core flows are defined, the permission model is being designed, and the MVP is being scoped. This is the most spec-driven project Pedro has started.",
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
            tagline: "Plataforma de operações internas que mantém equipes sincronizadas sem o caos do WhatsApp",
            sections: {
                problem: {
                    headline: "Coordenação de equipes acontecendo em mensagens espalhadas",
                    body: "Equipes operacionais gerenciam escalas, confirmações, ausências e organização financeira via WhatsApp, planilhas improvisadas e correntes de confirmação manuais. Pequenas falhas de comunicação em escala se tornam problemas operacionais reais: trocas de última hora, turnos perdidos, sem visibilidade financeira.",
                },
                idea: {
                    headline: "Sempre presente, sincronizado com a rotina das pessoas",
                    body: "Pulso — o nome vem da ideia de algo sempre vivo, presente e sincronizado — começou como solução voluntária para um problema organizacional real. O objetivo é substituir o caos do WhatsApp por uma experiência operacional simples e centralizada que as pessoas realmente queiram usar.",
                },
                solution: {
                    headline: "Escalas, confirmações e finanças em um lugar",
                    body: "Uma plataforma interna cobrindo o loop operacional completo: gestão de escalas, confirmação de presença, gestão de ausências, pedidos de troca, visibilidade da liderança e acompanhamento financeiro básico.",
                    items: [
                        "Gestão de escalas com fluxos de confirmação",
                        "Justificativa de ausências e pedidos de troca",
                        "Dashboard para liderança com visibilidade total da equipe",
                        "Acompanhamento financeiro de eventos e despesas",
                        "Sistema de notificações (planejado)",
                    ],
                },
                analysis: {
                    headline: "Simplicidade é mais difícil do que complexidade",
                    body: "O desafio central do Pulso é a contenção. É fácil adicionar features — notificações, integrações, analytics — mas cada adição aumenta a carga cognitiva de usuários gerenciando uma rotina operacional exigente. A decisão de produto mais difícil é decidir o que não construir.",
                },
                technicalDecisions: {
                    headline: "Principais decisões técnicas",
                    decisions: [
                        {
                            title: "Stack de infraestrutura acessível",
                            why: "Vercel, Supabase, Render, Neon — usando free tiers para manter custo operacional próximo de zero durante a validação.",
                            trade: "Limites de free tier criam restrições em escala — aceitável e esperado para este estágio.",
                        },
                        {
                            title: "Permissões multiusuário desde o início",
                            why: "A plataforma atende tanto membros da equipe quanto liderança com visões diferentes. Retrofitar RBAC depois é doloroso — construir corretamente desde o primeiro dia.",
                            trade: "Mais complexidade inicial na camada de autenticação e permissões.",
                        },
                    ],
                },
                result: {
                    headline: "Conceito definido, arquitetura em andamento",
                    body: "O Pulso está na fase de ideação e arquitetura inicial. Os fluxos principais estão definidos, o modelo de permissões está sendo desenhado e o MVP está sendo escopo. É o projeto mais guiado por specs que Pedro já iniciou.",
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
    if (a.status === "shipped" && b.status !== "shipped") return -1
    if (a.status !== "shipped" && b.status === "shipped") return 1
    return 0
})