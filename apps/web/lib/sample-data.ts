import type { DashboardMetric, Interaction, Lead } from "@followflow/types";

export const dashboardMetrics: DashboardMetric[] = [
  { label: "Follow-ups executados", value: "1.284", trend: "+18% em 7 dias" },
  { label: "Leads resgatados", value: "342", trend: "+41 oportunidades" },
  { label: "Receita em risco", value: "R$ 248k", trend: "sob acompanhamento" },
  { label: "Tempo médio resposta", value: "7 min", trend: "SLA operacional" },
];

export const leads: Lead[] = [
  {
    id: "6fdf96e6-2027-45ec-b504-a55e3316f8c9",
    tenantId: "0b74eb76-344a-41b5-a6c4-2a86c30a2b9e",
    ownerId: "d6d9b69d-29e6-49e8-9db1-66e98217d369",
    name: "Marina Lopes",
    company: "Atlas Cloud",
    email: "marina@atlas.example",
    status: "proposal",
    urgencyScore: 94,
    lastInteractionAt: "2026-05-16T14:30:00.000Z",
    nextFollowUpAt: "2026-05-18T09:00:00.000Z",
    createdAt: "2026-05-10T11:00:00.000Z",
    updatedAt: "2026-05-18T09:30:00.000Z",
  },
  {
    id: "ec05faf8-a3c8-449d-8ee9-6d280060bb6f",
    tenantId: "0b74eb76-344a-41b5-a6c4-2a86c30a2b9e",
    ownerId: "d6d9b69d-29e6-49e8-9db1-66e98217d369",
    name: "Rafael Costa",
    company: "Nimbus Retail",
    phone: "+5511999999999",
    status: "qualified",
    urgencyScore: 81,
    lastInteractionAt: "2026-05-15T18:15:00.000Z",
    nextFollowUpAt: "2026-05-18T16:00:00.000Z",
    createdAt: "2026-05-12T11:00:00.000Z",
    updatedAt: "2026-05-18T08:10:00.000Z",
  },
  {
    id: "bb3daec0-78ec-4c14-a271-c985275d0e1c",
    tenantId: "0b74eb76-344a-41b5-a6c4-2a86c30a2b9e",
    ownerId: "d6d9b69d-29e6-49e8-9db1-66e98217d369",
    name: "Bianca Rocha",
    company: "Vertex Health",
    email: "bianca@vertex.example",
    status: "contacted",
    urgencyScore: 67,
    lastInteractionAt: "2026-05-17T12:15:00.000Z",
    createdAt: "2026-05-14T11:00:00.000Z",
    updatedAt: "2026-05-18T07:55:00.000Z",
  },
];

export const interactions: Interaction[] = [
  {
    id: "bd1d7fe0-a2b6-4d14-9ff8-c1d9996e6b08",
    tenantId: "0b74eb76-344a-41b5-a6c4-2a86c30a2b9e",
    leadId: "6fdf96e6-2027-45ec-b504-a55e3316f8c9",
    channel: "gmail",
    direction: "inbound",
    subject: "Re: proposta FollowFlow",
    body: "Gostei da proposta, mas preciso validar prazo de implantação com diretoria.",
    occurredAt: "2026-05-16T14:30:00.000Z",
  },
  {
    id: "e3e3a6c1-0a31-4f64-a547-1fa1632114ee",
    tenantId: "0b74eb76-344a-41b5-a6c4-2a86c30a2b9e",
    leadId: "ec05faf8-a3c8-449d-8ee9-6d280060bb6f",
    channel: "whatsapp",
    direction: "inbound",
    body: "Podemos falar hoje às 17h?",
    occurredAt: "2026-05-18T10:05:00.000Z",
  },
];
