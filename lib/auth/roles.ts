import { db } from "@/lib/store/memory";
import type { SessionUser, UserRole } from "@/lib/types";

export function hasRole(session: SessionUser | null, role: UserRole): boolean {
  return Boolean(session?.roles.includes(role) || session?.roles.includes("admin"));
}

export function rolesOf(profileId: string): UserRole[] {
  return db().roles[profileId] ?? ["user"];
}
