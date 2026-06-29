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
    why: "Por quê",

    status: {
      live: "Em produção",
      inDevelopment: "Em desenvolvimento",
      concept: "Conceito",
    },
  },

  menu: {
    home: "Início",
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

    body: "Sou um Full Stack / Product Engineer. Construo produtos claros, intencionais e úteis — unindo engenharia, experiência e decisões de produto que fazem sentido para pessoas.",

    currentlyBuilding: "Construindo atualmente",
  },

  contact: {
    headline: "Vamos construir algo relevante.",
    cta: "Enviar um e-mail",
  },

  assistant: {
    placeholder: "Pergunte qualquer coisa sobre este projeto...",
    send: "Enviar",
    thinking: "Pensando...",
    error: "Algo deu errado. Tente novamente.",
    clearChat: "Limpar conversa",
    outOfScope: "Eu só posso responder a perguntas relacionadas a este projeto. Para outros assuntos, por favor fale diretamente com o Pedro ou envie um e-mail para pedrorf.dev@gmail.com.",
  },

  loader: {
    role: "Product Engineer",
  },
  actions: {
    viewDemo: "Experimentar",
  },
};
