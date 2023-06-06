import type { AuthUser } from "@prisma/client";
export type UserData = Omit<AuthUser, "id" | "createdAt" | "updatedAt">;
