import type { en } from "./en";

type DeepWritablePartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepWritablePartial<T[P]> : string;
};

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

    problem: "Qual era o problema?",
    idea: "Por que esse projeto nasceu?",
    solution: "Como pensei a solução?",
    analysis: "O que realmente importava?",

    vision: "Visão do produto",
    experience: "Experiência",
    highlights: "Principais capacidades",
    workflow: "Fluxo operacional",
    architecture: "Arquitetura",
    market: "Contexto de mercado",
    future: "Próximos passos",
    before: "Antes do Pulso",
    chaos: "Caos Operacional",
    spectrum: "Ritmo Operacional",
    impact: "Impacto",

    technical: "Decisões técnicas",
    result: "Resultado",

    decision: "Decisão",
    tradeoff: "Tradeoff",

    status: {
      live: "Em produção",
      inDevelopment: "Em desenvolvimento",
      concept: "Conceito",
    },
  },

  menu: {
    about: "Sobre",
    work: "Projetos",
    contact: "Contato",
    stack: "Stack",

    sections: {
      projects: "Case Studies",
      pages: "Páginas",
      social: "Social",
    },
  },

  about: {
    headline:
      "Construindo produtos digitais com profundidade técnica e visão de produto.",

    body: "Sou um Full Stack / Product Engineer baseado no Brasil. Gosto de construir produtos claros, intencionais e úteis — unindo engenharia, experiência e decisões de produto que fazem sentido para pessoas reais.",

    currentlyBuilding: "Construindo atualmente",
  },

  contact: {
    headline: "Vamos construir algo relevante.",
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
  actions: {
    viewDemo: "Ver Projeto",
    github: "Ver Código",
  },
};
