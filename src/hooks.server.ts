import { logout } from "$lib/server/auth";
import { auth } from "$lib/server/lucia";
import { Role } from "@prisma/client";
import { redirect, type Handle } from "@sveltejs/kit";

const API_ROUTE = "/api";

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	const { session, user } = await event.locals.auth.validateUser();

	const { pathname } = event.url;

	if (pathname.startsWith(API_ROUTE)) {
		return await resolve(event);
	}

	const isStaff = user?.role === Role.GYM_LEADER || user?.role === Role.LEGENDARY;
	const isMe = user?.role === Role.MYTHICAL;
	const isNotAllowed = user?.role === Role.POKEMON;

	if (pathname === "/") {
		if (!session) {
			throw redirect(303, "/login");
		}

		if (isStaff || isMe) {
			throw redirect(303, "/dashboard");
		}

		logout({ locals: event.locals });
		throw redirect(303, "/unauthorized");
	}

	if (pathname.startsWith("/login")) {
		if (isStaff || isMe) {
			throw redirect(303, "/dashboard");
		}

		if (session) logout({ locals: event.locals });
	}

	if (pathname.startsWith("/dashboard")) {
		if (!session) {
			throw redirect(303, "/login");
		}

		if (isNotAllowed) {
			logout({ locals: event.locals });
			throw redirect(303, "/unauthorized");
		}
	}

	if (pathname.startsWith("/thevoid")) {
		if (!session) {
			throw redirect(303, "/login");
		}

		if (isStaff && !isMe) {
			throw redirect(303, "/dashboard");
		}

		if (isNotAllowed) {
			logout({ locals: event.locals });
			throw redirect(303, "/login");
		}
	}

	return await resolve(event);
};
