// data/i18n/pt.ts
// ============================================================
// Portuguese translations.
// Tipado como DeepPartial do EN — só sobrescreve o necessário.
// ============================================================

import type { en } from "./en"

// Utility — torna todos os valores string opcionais e mutáveis
type DeepWritablePartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepWritablePartial<T[P]> : string
}

export const pt: DeepWritablePartial<typeof en> = {
    nav: {
        menu: "Menu",
        close: "Fechar",
    },

    home: {
        role: "Full Stack · Product Engineer",
        location: "Brasil",
    },

    project: {
        scrollHint: "Role para explorar",
        close: "Fechar",
        askAbout: "Perguntar sobre este projeto",
        sections: {
            problem: "O Problema",
            idea: "A Ideia",
            solution: "A Solução",
            analysis: "Análise",
            technical: "Decisões Técnicas",
            result: "Resultado",
        },
        status: {
            shipped: "Publicado",
            inProgress: "Em desenvolvimento",
            concept: "Conceito",
        },
        decision: "Decisão",
        tradeoff: "Tradeoff",
    },

    menu: {
        about: "Sobre",
        work: "Projetos",
        contact: "Contato",
        stack: "Stack",
        sections: {
            projects: "Cases",
            pages: "Páginas",
            social: "Social",
        },
    },

    about: {
        headline: "Construindo produtos com profundidade técnica e maturidade de produto.",
        body: "Sou um Product Engineer Full Stack baseado no Brasil. Trabalho em toda a stack — do schema do banco à motion da UI — com foco em entregar coisas que funcionam de verdade e são bem pensadas.",
        currentlyBuilding: "Construindo atualmente",
    },

    contact: {
        headline: "Vamos trabalhar juntos.",
        email: "hello@ferreira.studio",
        cta: "Enviar um e-mail",
    },

    assistant: {
        placeholder: "Pergunte qualquer coisa sobre este projeto...",
        send: "Enviar",
        thinking: "Pensando...",
        error: "Algo deu errado. Tente novamente.",
        clearChat: "Limpar conversa",
    },

    loader: {
        role: "Product Engineer",
    },
}