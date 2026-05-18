import type { IntegrationProvider, Interaction } from "@followflow/types";

export interface IntegrationConnection {
  tenantId: string;
  provider: IntegrationProvider;
  externalAccountId: string;
  connectedAt: string;
  health: "healthy" | "degraded" | "disconnected";
}

export interface MessageSyncResult {
  provider: IntegrationProvider;
  importedInteractions: Pick<Interaction, "externalId" | "body" | "occurredAt" | "direction" | "channel">[];
  cursor?: string;
}

export interface ConversationIntegration {
  provider: IntegrationProvider;
  syncMessages(tenantId: string, cursor?: string): Promise<MessageSyncResult>;
  sendFollowUp(input: { tenantId: string; leadId: string; recipient: string; body: string }): Promise<{ externalId: string }>;
}

export function assertSupportedProvider(provider: string): IntegrationProvider {
  if (provider === "gmail" || provider === "whatsapp") {
    return provider;
  }

  throw new Error(`Unsupported integration provider: ${provider}`);
}
