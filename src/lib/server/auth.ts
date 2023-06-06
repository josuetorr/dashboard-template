import { auth } from "./lucia";

export async function logout({
	locals,
	noSessionCallback,
	afterLogout,
}: {
	locals: App.Locals;
	noSessionCallback?: () => Response;
	afterLogout?: () => Response;
}) {
	const { session } = await locals.auth.validateUser();

	if (!session) {
		return noSessionCallback ? noSessionCallback() : new Response();
	}

	await auth.invalidateSession(session?.sessionId);
	locals.auth.setSession(null);

	return afterLogout ? afterLogout() : new Response();
}
