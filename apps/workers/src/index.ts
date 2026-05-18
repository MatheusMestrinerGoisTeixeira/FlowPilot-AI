import { logger } from "@followflow/observability";
import { validateFollowUpJob } from "@followflow/queues";
import type { FollowUpJob } from "@followflow/types";

export interface FollowUpExecutor {
  execute(job: FollowUpJob): Promise<{ status: "sent" | "skipped"; externalId?: string }>;
}

export async function processFollowUpJob(executor: FollowUpExecutor, rawJob: FollowUpJob): Promise<void> {
  const job = validateFollowUpJob(rawJob);
  logger.info("Processing follow-up job", { tenantId: job.tenantId, leadId: job.leadId });

  const result = await executor.execute(job);

  if (result.status === "skipped") {
    logger.warn("Follow-up skipped by policy", { tenantId: job.tenantId, leadId: job.leadId });
    return;
  }

  logger.info("Follow-up sent", { tenantId: job.tenantId, leadId: job.leadId });
}
