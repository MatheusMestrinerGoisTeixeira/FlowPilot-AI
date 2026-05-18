import type { ConversationSummary, Interaction } from "@followflow/types";

export interface SummarizerModel {
  generateSummary(prompt: string): Promise<unknown>;
}

export function buildConversationPrompt(leadName: string, interactions: Pick<Interaction, "channel" | "direction" | "body" | "occurredAt">[]): string {
  const timeline = interactions
    .map((interaction) => `${interaction.occurredAt} | ${interaction.channel} | ${interaction.direction}: ${interaction.body}`)
    .join("\n");

  return [
    "Contexto: operação comercial do FollowFlow AI.",
    "Resuma a conversa e retorne JSON válido com summary, sentiment, objections, nextBestAction e urgencyScore.",
    `Lead: ${leadName}`,
    "Histórico:",
    timeline,
  ].join("\n");
}

export function parseConversationSummary(leadId: string, response: unknown): ConversationSummary {
  if (!isRecord(response)) {
    throw new Error("Summary response must be an object.");
  }

  const summary = getString(response, "summary");
  const sentiment = getString(response, "sentiment");
  const nextBestAction = getString(response, "nextBestAction");
  const urgencyScore = getNumber(response, "urgencyScore");
  const objections = getStringArray(response, "objections");

  if (summary.length < 20) {
    throw new Error("Summary is too short.");
  }

  if (sentiment !== "positive" && sentiment !== "neutral" && sentiment !== "negative") {
    throw new Error("Summary sentiment is invalid.");
  }

  if (nextBestAction.length < 8) {
    throw new Error("Next best action is too short.");
  }

  if (!Number.isInteger(urgencyScore) || urgencyScore < 0 || urgencyScore > 100) {
    throw new Error("Urgency score must be an integer between 0 and 100.");
  }

  return { leadId, summary, sentiment, objections, nextBestAction, urgencyScore };
}

export async function summarizeConversation(model: SummarizerModel, leadId: string, leadName: string, interactions: Interaction[]): Promise<ConversationSummary> {
  const prompt = buildConversationPrompt(leadName, interactions);
  const response = await model.generateSummary(prompt);
  return parseConversationSummary(leadId, response);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getString(record: Record<string, unknown>, key: string): string {
  const value = record[key];
  if (typeof value !== "string") {
    throw new Error(`Summary response field ${key} must be a string.`);
  }
  return value;
}

function getNumber(record: Record<string, unknown>, key: string): number {
  const value = record[key];
  if (typeof value !== "number") {
    throw new Error(`Summary response field ${key} must be a number.`);
  }
  return value;
}

function getStringArray(record: Record<string, unknown>, key: string): string[] {
  const value = record[key];
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
    throw new Error(`Summary response field ${key} must be a string array.`);
  }
  return value;
}
