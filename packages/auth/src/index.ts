export interface SessionUser {
  id: string;
  tenantId: string;
  email: string;
  role: "owner" | "admin" | "member";
}

export function canAccessAdmin(user: SessionUser): boolean {
  return user.role === "owner" || user.role === "admin";
}
