import { db } from "@/lib/db";
import type { Role } from "@/types";

export async function getCurrentUser(clerkId: string | null) {
  if (!clerkId) return null;
  return db.user.findUnique({ where: { clerkId } });
}

export async function requireRole(clerkId: string | null, roles: Role[]) {
  const user = await getCurrentUser(clerkId);
  if (!user || !roles.includes(user.role as Role)) {
    throw new Error("Unauthorized");
  }
  return user;
}

export function isAdmin(role: string): boolean {
  return role === "ADMIN";
}

export function isEditor(role: string): boolean {
  return role === "ADMIN" || role === "EDITOR";
}
