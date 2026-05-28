import type { DeepPartial } from "@/types/utils";
import type { VellorSections } from "@/types/projects/vellor";

export const vellorPt: DeepPartial<VellorSections> = {
  problem: {
    headline: "Eventos privados ainda dependem de WhatsApp e planilhas",

    body: "Eventos emocionalmente importantes normalmente são organizados através de confirmações fragmentadas e fluxos improvisados.",
  },

  idea: {
    headline: "Fazer o convite parecer parte da experiência",

    body: "O Vellor nasceu da ideia de que convites digitais deveriam parecer intencionais, elegantes e pessoais.",
  },

  analysis: {
    headline: "Sofisticação sem excesso visual",

    body: "O desafio não era adicionar efeitos — era criar algo elegante sem aumentar a fricção.",
  },

  solution: {
    headline: "Gestão de eventos privados com uma camada digital premium",

    body: "Cada evento recebe um ambiente personalizado de RSVP com gerenciamento centralizado de convidados.",

    items: [
      "Páginas personalizadas por evento",
      "Fluxos privados de RSVP",
      "Gestão de convidados",
      "Experiência premium mobile-first",
      "Google Sheets como backend operacional",
    ],
  },

  technicalDecisions: {
    headline: "Decisões técnicas",

    decisions: [
      {
        title: "Google Sheets como backend operacional",

        why: "Os anfitriões já possuem familiaridade com planilhas.",

        trade: "Escalabilidade se torna limitada com o crescimento.",
      },

      {
        title: "Acesso baseado em senha",

        why: "Cria uma sensação leve de exclusividade.",

        trade: "As senhas ainda podem ser compartilhadas manualmente.",
      },

      {
        title: "Experiências personalizadas por evento",

        why: "Percepção emocional importa nessa categoria de produto.",

        trade: "Maior esforço visual e de design por evento.",
      },
    ],
  },

  result: {
    headline: "Fluxo principal de RSVP já validado",

    body: "O Vellor já suporta fluxos reais de convite e confirmação.",
  },
};
