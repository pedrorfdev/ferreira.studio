import type { DeepPartial } from "@/types/utils";
import type { PraxisSections } from "@/types/projects/praxis";

export const praxisPt: DeepPartial<PraxisSections> = {
  discovery: {
    headline:
      "As operações clínicas estavam fragmentadas entre ferramentas desconectadas",

    body: "Prontuários, evoluções, anamneses, acompanhamentos e comunicação operacional viviam entre WhatsApp, cadernos físicos, Google Drive e documentos soltos. O problema não era falta de informação — era ausência de um fluxo operacional estruturado.",
  },

  perspective: {
    headline: "A prioridade inicial não era IA — era clareza operacional",

    body: "Antes de adicionar inteligência, automações ou análises, o sistema precisava centralizar rotinas clínicas em algo confiável o suficiente para suportar o trabalho diário real.",
  },

  workflow: {
    headline: "Desenhado em torno da rotina real dos terapeutas",

    items: [
      "Gestão de pacientes e responsáveis",
      "Anamneses estruturadas com campos clínicos flexíveis",
      "Histórico de evoluções clínicas",
      "Fluxo de escrita clínica em rich-text",
      "Acompanhamento operacional contínuo",
      "Base preparada para futuras camadas semânticas e IA",
    ],
  },

  architecture: {
    headline:
      "Modelar a realidade clínica foi mais difícil do que construir telas",

    body: "Informações clínicas são parcialmente estruturadas, parcialmente narrativas e constantemente mutáveis. O desafio não era complexidade visual — era criar um modelo de dados flexível o suficiente para fluxos terapêuticos reais sem perder consistência e manutenção futura.",
  },

  technicalDecisions: {
    headline: "Decisões técnicas",

    decisions: [
      {
        title: "PostgreSQL + PGVector desde o início",

        why: "A arquitetura foi planejada intencionalmente para futuros fluxos semânticos, embeddings e recuperação contextual.",

        trade:
          "Mais complexidade inicial, mas evita reconstruir a camada de dados futuramente.",
      },

      {
        title: "JSONB para anamneses e dados semi-estruturados",

        why: "Avaliações clínicas raramente se encaixam perfeitamente em schemas relacionais rígidos.",

        trade:
          "Mais flexibilidade operacional, mas exige validações mais fortes.",
      },

      {
        title: "Tiptap para escrita clínica",

        why: "Os terapeutas precisavam de uma experiência natural de escrita ao invés de formulários rígidos.",

        trade: "Introduziu complexidade de serialização e persistência.",
      },

      {
        title: "Hierarquia visual minimalista ao invés de dashboards densos",

        why: "A interface prioriza fluxo de leitura e continuidade operacional acima de telas carregadas de métricas.",

        trade: "Algumas informações ficam menos imediatas visualmente.",
      },
    ],
  },

  outcome: {
    headline: "Já apoiando rotinas clínicas reais",

    body: "O Praxis já está sendo utilizado em produção dentro de um ambiente real de Terapia Ocupacional.",

    metrics: [
      {
        label: "Status",
        value: "Produção",
      },

      {
        label: "Fricção operacional",
        value: "-60%",
      },

      {
        label: "Fluxo clínico",
        value: "Centralizado",
      },
    ],
  },

  future: {
    headline: "A direção de longo prazo é inteligência clínica contextual",

    body: "A plataforma atual foca primeiro em estrutura operacional. A próxima camada envolve busca semântica, recuperação contextual, embeddings e fluxos clínicos assistidos por IA.",
  },
};
