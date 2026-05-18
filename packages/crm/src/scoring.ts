import type { Interaction, Lead } from "@followflow/types";

const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;

export interface ScoreLeadInput {
  lead: Pick<Lead, "status" | "lastInteractionAt" | "nextFollowUpAt">;
  interactions: Pick<Interaction, "direction" | "occurredAt" | "body">[];
  now?: Date;
}

export function calculateUrgencyScore(input: ScoreLeadInput): number {
  const now = input.now ?? new Date();
  const lastInteractionAt = input.lead.lastInteractionAt ? new Date(input.lead.lastInteractionAt) : undefined;
  const nextFollowUpAt = input.lead.nextFollowUpAt ? new Date(input.lead.nextFollowUpAt) : undefined;

  let score = input.lead.status === "proposal" ? 35 : 20;

  if (!lastInteractionAt) {
    score += 30;
  } else {
    const idleDays = Math.max(0, Math.floor((now.getTime() - lastInteractionAt.getTime()) / DAY_IN_MS));
    score += Math.min(35, idleDays * 7);
  }

  if (nextFollowUpAt && nextFollowUpAt.getTime() < now.getTime()) {
    const overdueHours = Math.floor((now.getTime() - nextFollowUpAt.getTime()) / HOUR_IN_MS);
    score += Math.min(30, 10 + overdueHours);
  }

  const recentInbound = input.interactions.some((interaction) => {
    if (interaction.direction !== "inbound") {
      return false;
    }

    const occurredAt = new Date(interaction.occurredAt);
    return now.getTime() - occurredAt.getTime() <= DAY_IN_MS;
  });

  if (recentInbound) {
    score += 15;
  }

  return Math.min(100, Math.max(0, score));
}
