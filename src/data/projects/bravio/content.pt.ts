import type { DeepPartial } from "@/types/utils";
import type { BravioSections } from "@/types/projects/bravio";

export const bravioPt: DeepPartial<BravioSections> = {
  problem: {
    headline:
      "Perdas operacionais ficam invisíveis sem visibilidade centralizada",

    body: "Operações agrícolas de pequeno e médio porte ainda dependem fortemente de controles manuais, comunicação fragmentada e registros informais.",
  },

  idea: {
    headline: "Criar clareza operacional antes de complexidade operacional",

    body: "O objetivo não é replicar um ERP tradicional. O Bravio foca em criar uma camada operacional leve para logística agrícola.",
  },

  analysis: {
    headline:
      "Usabilidade em campo importa mais que quantidade de funcionalidades",

    body: "Operadores em campo não estão pensando em software enquanto trabalham. Cada interação precisa ser rápida, resiliente e óbvia.",
  },

  solution: {
    headline: "Uma plataforma logística mobile-first",

    body: "O Bravio centraliza registro operacional, rastreamento, incidentes e visibilidade financeira.",

    items: [
      "Cadastro e rastreamento de cargas",
      "Histórico operacional de incidentes",
      "Visibilidade financeira por operação",
      "Arquitetura offline-first",
      "Fluxos mobile-first",
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
        title: "IndexedDB para persistência local",

        why: "Os dados operacionais precisam sobreviver a conectividade instável.",

        trade: "Sincronização de estado se torna mais difícil.",
      },

      {
        title: "Web mobile-first ao invés de apps nativos",

        why: "Evita fricção de instalação e funciona imediatamente em qualquer dispositivo.",

        trade: "Algumas capacidades nativas ficam mais difíceis de acessar.",
      },
    ],
  },

  result: {
    headline: "Arquitetura operacional atualmente em desenvolvimento",

    body: "O Bravio está sendo estruturado em cima de fluxos operacionais reais do agronegócio.",
  },
};
