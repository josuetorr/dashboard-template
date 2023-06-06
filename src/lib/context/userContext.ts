import type { AuthUser } from "@prisma/client";

const userKey = Symbol();

export type UserContext = {
	getUser: () => AuthUser;
	getDisplayName: () => string;
};

export { userKey };
