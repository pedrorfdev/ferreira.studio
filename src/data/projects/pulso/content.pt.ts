import type { DeepPartial } from "@/types/utils";
import type { PulsoSections } from "@/types/projects/pulso";

export const pulsoPt: DeepPartial<PulsoSections> = {
  problem: {
    headline: "Coordenação de equipes quebra quando a comunicação se fragmenta",

    body: "Escalas, confirmações, ausências e organização operacional ainda acontecem através de mensagens espalhadas e planilhas improvisadas.",
  },

  idea: {
    headline: "Substituir caos operacional por rotinas sincronizadas",

    body: "O Pulso nasceu de uma dor organizacional real dentro de equipes voluntárias e grupos operacionais.",
  },

  analysis: {
    headline: "A decisão mais difícil é o que não construir",

    body: "Ferramentas operacionais naturalmente tendem ao excesso de funcionalidades. O Pulso prioriza simplicidade intencionalmente.",
  },

  solution: {
    headline: "Escalas, confirmações e operações em um único lugar",

    body: "O Pulso centraliza coordenação de equipes, confirmações, visibilidade e acompanhamento operacional.",

    items: [
      "Gestão de escalas",
      "Confirmação de presença",
      "Controle de ausências e trocas",
      "Dashboard para liderança",
      "Acompanhamento financeiro",
    ],
  },

  technicalDecisions: {
    headline: "Decisões técnicas",

    decisions: [
      {
        title: "RBAC desde o início",

        why: "Liderança e membros operacionais possuem necessidades diferentes de visibilidade.",

        trade: "Permissões e autenticação ficam mais complexas logo cedo.",
      },

      {
        title: "Infraestrutura enxuta com serviços free-tier",

        why: "Velocidade de validação importa mais do que otimização de escala inicialmente.",

        trade:
          "Limitações de infraestrutura aparecem mais cedo conforme a adoção cresce.",
      },

      {
        title: "Simplicidade operacional acima de densidade de funcionalidades",

        why: "O produto evita se tornar outro dashboard operacional sobrecarregado.",

        trade: "Fluxos avançados são adiados intencionalmente.",
      },
    ],
  },

  result: {
    headline: "Arquitetura e direção do produto já definidas",

    body: "O Pulso está sendo estruturado em cima de rotinas operacionais reais observadas em equipes voluntárias e organizacionais.",
  },
};
