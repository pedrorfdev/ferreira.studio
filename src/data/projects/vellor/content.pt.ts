import type { DeepPartial } from "@/types/utils";
import type { VellorSections } from "@/types/projects/vellor";

export const vellorPt: DeepPartial<VellorSections> = {
  problem: {
    headline:
      "Eventos privados ainda dependem de comunicação fragmentada e coordenação manual",

    body: "Anfitriões frequentemente organizam confirmações através de WhatsApp, planilhas e conversas dispersas, criando fricção operacional e uma experiência inferior para convidados.",
  },

  vision: {
    headline: "O convite deve parecer parte da própria experiência",

    body: "O Vellor trata RSVP não como administração, mas como o primeiro contato do convidado com o evento.",
  },

  experience: {
    headline: "Sofisticação nasce da clareza, não do excesso visual",

    body: "O objetivo nunca foi criar interfaces chamativas. O desafio foi construir algo elegante e sem atrito.",
  },

  highlights: {
    headline: "Projetado para anfitriões e convidados",

    items: [
      {
        title: "Páginas exclusivas por evento",
        description:
          "Cada evento recebe uma experiência própria alinhada à sua identidade.",
      },
      {
        title: "Fluxos privados de RSVP",
        description: "Confirmações simples com sensação de exclusividade.",
      },
      {
        title: "Gestão centralizada de convidados",
        description: "Visibilidade operacional sem complexidade desnecessária.",
      },
      {
        title: "Experiência mobile-first",
        description: "A maioria dos convidados acessa pelo celular.",
      },
    ],
  },

  technicalDecisions: {
    headline: "Decisões técnicas",

    decisions: [
      {
        title: "Google Sheets como backend operacional",
        why: "Anfitriões já dominam planilhas.",
        trade: "Escalabilidade limitada no longo prazo.",
      },
      {
        title: "Eventos protegidos por senha",
        why: "Cria exclusividade sem aumentar atrito.",
        trade: "Senhas ainda podem ser compartilhadas.",
      },
      {
        title: "Experiências personalizadas",
        why: "Percepção emocional importa.",
        trade: "Maior esforço visual por evento.",
      },
    ],
  },

  result: {
    headline: "Validado através de fluxos reais de eventos",

    body: "O Vellor já suporta convites, confirmações e gestão de convidados em cenários reais.",
  },
};
