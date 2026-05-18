import type { LeadStatus } from "@followflow/types";

const leadStatuses: readonly LeadStatus[] = ["new", "contacted", "qualified", "proposal", "won", "lost"];

export interface LeadInput {
  name: string;
  company: string;
  email?: string;
  phone?: string;
  status: LeadStatus;
}

export interface RawLeadInput {
  name: string;
  company: string;
  email?: string;
  phone?: string;
  status?: LeadStatus;
}

export function validateLeadInput(input: RawLeadInput): LeadInput {
  const name = input.name.trim();
  const company = input.company.trim();

  if (name.length < 2 || name.length > 120) {
    throw new Error("Lead name must have between 2 and 120 characters.");
  }

  if (company.length < 2 || company.length > 120) {
    throw new Error("Company must have between 2 and 120 characters.");
  }

  if (input.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email)) {
    throw new Error("Lead email is invalid.");
  }

  if (input.phone) {
    const phone = input.phone.trim();
    if (phone.length < 8 || phone.length > 32) {
      throw new Error("Lead phone must have between 8 and 32 characters.");
    }
  }

  const status = input.status ?? "new";
  if (!leadStatuses.includes(status)) {
    throw new Error("Lead status is invalid.");
  }

  const validated: LeadInput = { name, company, status };

  if (input.email) {
    validated.email = input.email;
  }

  if (input.phone) {
    validated.phone = input.phone.trim();
  }

  return validated;
}
