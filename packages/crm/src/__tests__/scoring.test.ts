import { describe, expect, it } from "vitest";
import { calculateUrgencyScore } from "../scoring";

const now = new Date("2026-05-18T12:00:00.000Z");

describe("calculateUrgencyScore", () => {
  it("prioritizes stale proposal leads with overdue follow-up", () => {
    const score = calculateUrgencyScore({
      now,
      lead: {
        status: "proposal",
        lastInteractionAt: "2026-05-11T12:00:00.000Z",
        nextFollowUpAt: "2026-05-18T08:00:00.000Z",
      },
      interactions: [],
    });

    expect(score).toBe(100);
  });

  it("adds urgency when there is a recent inbound reply", () => {
    const score = calculateUrgencyScore({
      now,
      lead: {
        status: "contacted",
        lastInteractionAt: "2026-05-18T10:00:00.000Z",
      },
      interactions: [
        {
          direction: "inbound",
          occurredAt: "2026-05-18T11:00:00.000Z",
          body: "Pode me enviar uma proposta hoje?",
        },
      ],
    });

    expect(score).toBe(35);
  });
});
