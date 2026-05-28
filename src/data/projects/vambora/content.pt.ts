import type { DeepPartial } from "@/types/utils";
import type { VamboraSections } from "@/types/projects/vambora";

export const vamboraPt: DeepPartial<VamboraSections> = {
  problem: {
    headline: "Planejar uma viagem ainda é cansativo demais",

    body: "Mesmo viagens simples exigem horas de pesquisa entre blogs, vídeos, mapas e plataformas de reserva. A maior parte das pessoas gasta mais tempo organizando informação do que decidindo o que realmente quer viver.",
  },

  idea: {
    headline: "Validar a utilidade da IA antes de polir a interface",

    body: "O foco inicial não era design visual ou quantidade de funcionalidades. A verdadeira pergunta era se a IA conseguiria gerar roteiros coerentes, úteis e práticos.",
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

        why: "O Gemini oferecia uma free tier forte para experimentação e geração estruturada.",

        trade:
          "Ecossistema menor e algumas instabilidades exigiram lógica adicional de fallback.",
      },

      {
        title: "Sem Next.js — simplicidade intencional",

        why: "O produto se comporta mais como uma aplicação client-side fluida do que como um site orientado a conteúdo.",

        trade:
          "Menos flexibilidade para SEO e renderização server-side futuramente.",
      },

      {
        title: "Navegação baseada em estado ao invés de rotas",

        why: "A experiência foi desenhada para parecer contínua e conversacional.",

        trade: "Mais difícil criar deep-links ou persistir estados complexos.",
      },

      {
        title: "Geração estruturada em vez de prompts livres",

        why: "Prompts abertos produziam roteiros visualmente convincentes, mas operacionalmente inconsistentes.",

        trade: "A arquitetura de prompts ficou muito mais complexa de manter.",
      },
    ],
  },

  result: {
    headline: "De excesso de pesquisa para planejamento acionável",

    body: "O Vambora transformou um processo fragmentado em uma interação rápida e objetiva.",

    metrics: [
      {
        label: "Fluxo",
        value: "Estruturado",
      },

      {
        label: "Tempo de geração",
        value: "< 8s",
      },

      {
        label: "Status",
        value: "Publicado",
      },
    ],
  },
};
