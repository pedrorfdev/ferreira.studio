// data/projects/pulso/content.pt.ts
import type { DeepPartial } from "@/types/utils";
import type { PulsoSections } from "@/types/projects/pulso";

export const pulsoPt: DeepPartial<PulsoSections> = {
  before: {
    eyebrow: "Antes do Pulso",
    headline:
      "A maioria das equipes não sofre para criar escalas. Sofre para mantê-las funcionando.",
    body: "Conforme a equipe cresce, disponibilidades mudam, substituições acontecem e as informações se espalham entre conversas, planilhas e memória.",
    cards: [
      { title: "WhatsApp", status: "84 mensagens", variant: "accent" },
      { title: "Planilha", status: "3 versões", variant: "purple" },
      { title: "Escala PDF", status: "Desatualizada", variant: "neutral" },
      { title: "Voluntário", status: "Não confirmou", variant: "gold" },
    ],
  },

  chaos: {
    eyebrow: "Caos operacional",
    headline: "Cada novo voluntário adiciona uma nova camada de coordenação",
    body: "O problema real não é escalar pessoas. É manter todos alinhados quando a realidade muda toda semana.",
    resolvedEyebrow: "Sincronizado",
    items: [
      { title: "WhatsApp" },
      { title: "Planilhas" },
      { title: "Substituições" },
      { title: "Disponibilidade" },
      { title: "Responsabilidades" },
      { title: "Cobranças" },
      { title: "Liderança" },
      { title: "Incerteza" },
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
        title: "Visibilidade liderança",
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
      { label: "Coordenação", value: "Centralizada" },
      { label: "Disponibilidade", value: "Visível" },
      { label: "Escalas", value: "Confiáveis" },
    ],
  },

  future: {
    headline:
      "Construído para equipes voluntárias hoje. Preparado para operações maiores amanhã.",
    body: "O mesmo modelo pode atender igrejas, eventos, escolas, ONGs e qualquer operação que dependa de escalas confiáveis.",
    steps: [
      { title: "Igrejas" },
      { title: "Múltiplas equipes" },
      { title: "Eventos" },
      { title: "ONGs" },
      { title: "Operações" },
    ],
  },
};
