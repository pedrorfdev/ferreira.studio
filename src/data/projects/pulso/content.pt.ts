import type { DeepPartial } from "@/types/utils";
import type { PulsoSections } from "@/types/projects/pulso";

export const pulsoPt: DeepPartial<PulsoSections> = {
  before: {
    headline:
      "A maioria das equipes não sofre para criar escalas. Sofre para mantê-las funcionando.",

    body: "Conforme a equipe cresce, disponibilidades mudam, substituições acontecem e as informações se espalham entre conversas, planilhas e memória.",
  },

  chaos: {
    headline: "Cada novo voluntário adiciona uma nova camada de coordenação",

    body: "O problema real não é escalar pessoas. É manter todos alinhados quando a realidade muda toda semana.",

    items: [
      {
        title: "Confirmações por WhatsApp",
      },
      {
        title: "Múltiplas versões da planilha",
      },
      {
        title: "Substituições de última hora",
      },
      {
        title: "Disponibilidade desconhecida",
      },
      {
        title: "Responsabilidades pouco claras",
      },
      {
        title: "Cobranças manuais",
      },
      {
        title: "Falta de visibilidade da liderança",
      },
      {
        title: "Incerteza operacional",
      },
    ],
  },

  solution: {
    headline: "Um único pulso operacional para todas as equipes",

    body: "O Pulso centraliza escalas, disponibilidade e confirmações em um fluxo previsível para operações voluntárias.",

    items: [
      {
        title: "Gestão de equipes",
        description:
          "Organize pessoas através de equipes e responsabilidades definidas.",
      },

      {
        title: "Disponibilidade",
        description:
          "Os membros informam disponibilidade antes das atribuições.",
      },

      {
        title: "Criação de escalas",
        description: "Monte escalas com visibilidade operacional completa.",
      },

      {
        title: "Fluxo de confirmação",
        description: "Reduza incertezas através de confirmações explícitas.",
      },

      {
        title: "Visibilidade para liderança",
        description: "Identifique lacunas antes que problemas aconteçam.",
      },

      {
        title: "Experiência mobile-first",
        description:
          "Projetado para equipes que operam principalmente pelo celular.",
      },
    ],
  },

  technicalDecisions: {
    headline: "Decisões técnicas",

    decisions: [
      {
        title: "RBAC desde o início",
        why: "Líderes, coordenadores e membros possuem necessidades diferentes de acesso.",
        trade: "A gestão de permissões se torna mais complexa logo no começo.",
      },

      {
        title: "Infraestrutura enxuta",
        why: "Velocidade de validação importa mais do que otimização prematura.",
        trade: "Limitações aparecem mais cedo conforme a adoção cresce.",
      },

      {
        title: "Simplicidade operacional",
        why: "O produto evita se tornar mais um sistema sobrecarregado.",
        trade: "Fluxos avançados permanecem intencionalmente adiados.",
      },
    ],
  },

  impact: {
    headline:
      "Uma única fonte de verdade para pessoas, escalas e disponibilidade",

    body: "O Pulso transforma coordenação de um processo reativo em um sistema operacional previsível.",

    metrics: [
      {
        label: "Coordenação",
        value: "Centralizada",
      },

      {
        label: "Disponibilidade",
        value: "Visível",
      },

      {
        label: "Escalas",
        value: "Confiáveis",
      },
    ],
  },

  future: {
    headline:
      "Construído para equipes voluntárias hoje. Preparado para operações maiores amanhã.",

    body: "O mesmo modelo pode atender igrejas, eventos, escolas, ONGs e qualquer operação que dependa de escalas confiáveis.",
  },
};
