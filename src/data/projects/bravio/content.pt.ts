import type { DeepPartial } from "@/types/utils";
import type { BravioSections } from "@/types/projects/bravio";

export const bravioPt: DeepPartial<BravioSections> = {
  problem: {
    headline:
      "Perdas operacionais ficam invisíveis sem visibilidade centralizada",

    body: "Operações agrícolas de pequeno e médio porte ainda dependem fortemente de controles manuais, comunicação fragmentada e registros informais.",
  },

  idea: {
    headline: "Criar clareza operacional antes da complexidade operacional",

    body: "O Bravio foca em criar uma camada operacional leve para logística e visibilidade em campo antes da complexidade de um ERP tradicional.",
  },

  analysis: {
    headline:
      "Usabilidade em campo importa mais do que quantidade de funcionalidades",

    body: "Operadores não estão pensando em software enquanto trabalham. Cada interação precisa ser imediata, resiliente e óbvia.",
  },

  solution: {
    headline: "Uma plataforma operacional reliability-first",

    body: "O Bravio centraliza visibilidade logística, rastreamento operacional e monitoramento financeiro em um único fluxo mobile-first.",

    items: [
      {
        title: "Rastreamento de cargas",
        description:
          "Acompanhamento operacional com visibilidade centralizada.",
      },

      {
        title: "Histórico de incidentes",
        description:
          "Registro estruturado de falhas e interrupções operacionais.",
      },

      {
        title: "Visibilidade financeira",
        description:
          "Monitoramento de custos e rentabilidade por operação logística.",
      },

      {
        title: "Fluxos offline-first",
        description:
          "Operações continuam funcionando mesmo sob conectividade instável.",
      },

      {
        title: "Execução mobile-first",
        description:
          "Experiência desenhada prioritariamente para operadores em campo.",
      },
    ],
  },

  technicalDecisions: {
    headline: "Decisões técnicas",

    decisions: [
      {
        title: "Arquitetura offline-first",

        why: "Internet estável não pode ser assumida em ambientes rurais.",

        trade: "A sincronização se torna significativamente mais complexa.",
      },

      {
        title: "Persistência com IndexedDB",

        why: "Os dados operacionais precisam sobreviver a conexões instáveis.",

        trade: "A sincronização client-side se torna mais difícil.",
      },

      {
        title: "Web mobile-first ao invés de nativo",

        why: "Reduz fricção de instalação e funciona imediatamente em qualquer dispositivo.",

        trade: "Algumas capacidades nativas ficam mais difíceis de acessar.",
      },
    ],
  },

  result: {
    headline: "Infraestrutura operacional atualmente em construção",

    body: "O Bravio está sendo estruturado em cima de fluxos reais do agronegócio antes de escalar implementação.",

    metrics: [
      {
        label: "Operações",
        value: "Tempo real",
      },

      {
        label: "Conectividade",
        value: "Offline-first",
      },

      {
        label: "Status",
        value: "Em desenvolvimento",
      },
    ],
  },
};
