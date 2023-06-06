import lucia from "lucia-auth";
import { sveltekit } from "lucia-auth/middleware";
import prisma from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import prismaClient from "../db";
import type { AuthUser } from "@prisma/client";

export const auth = lucia({
	adapter: prisma(prismaClient),
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),
	transformDatabaseUser: (userData) => {
		return { ...userData } as AuthUser;
	},
});

export type Auth = typeof auth;
