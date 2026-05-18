import type { FollowUpJob } from "@followflow/types";

export interface QueuePublisher {
  enqueueFollowUp(job: FollowUpJob): Promise<{ jobId: string }>;
}

export function validateFollowUpJob(job: FollowUpJob): FollowUpJob {
  assertUuid(job.tenantId, "tenantId");
  assertUuid(job.leadId, "leadId");

  if (job.channel !== "gmail" && job.channel !== "whatsapp") {
    throw new Error("Follow-up channel must be gmail or whatsapp.");
  }

  if (Number.isNaN(Date.parse(job.scheduledFor))) {
    throw new Error("Follow-up scheduledFor must be a valid ISO datetime.");
  }

  if (job.reason.trim().length < 8 || job.reason.length > 500) {
    throw new Error("Follow-up reason must have between 8 and 500 characters.");
  }

  return job;
}

function assertUuid(value: string, field: string): void {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidPattern.test(value)) {
    throw new Error(`Follow-up ${field} must be a UUID.`);
  }
}
