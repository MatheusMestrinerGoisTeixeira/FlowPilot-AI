export type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
export type InteractionChannel = "gmail" | "whatsapp" | "manual";
export type FollowUpStatus = "queued" | "sent" | "failed" | "skipped";
export type IntegrationProvider = "gmail" | "whatsapp";

export interface TenantScoped {
  tenantId: string;
}

export interface Lead extends TenantScoped {
  id: string;
  ownerId: string;
  name: string;
  company: string;
  email?: string;
  phone?: string;
  status: LeadStatus;
  urgencyScore: number;
  lastInteractionAt?: string;
  nextFollowUpAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Interaction extends TenantScoped {
  id: string;
  leadId: string;
  channel: InteractionChannel;
  direction: "inbound" | "outbound";
  subject?: string;
  body: string;
  occurredAt: string;
  externalId?: string;
}

export interface ConversationSummary {
  leadId: string;
  summary: string;
  sentiment: "positive" | "neutral" | "negative";
  objections: string[];
  nextBestAction: string;
  urgencyScore: number;
}

export interface FollowUpJob extends TenantScoped {
  leadId: string;
  channel: Exclude<InteractionChannel, "manual">;
  scheduledFor: string;
  reason: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  trend: string;
}
