import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { auth } from "$lib/server/lucia";
import { logout } from "$lib/server/auth";

export const POST: RequestHandler = async ({ locals }) =>
	logout({
		locals,
		noSessionCallback: () => json({ status: 301, redirectUrl: "/login" }),
		afterLogout: () => json({ status: 200, redirectUrl: "/login" }),
	});
