import { type Actions, error, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import prisma from "$lib/db";
import { capitalizeWords } from "$lib/utils/string";
import { auth } from "$lib/server/lucia";

type ResetPasswordData = { email: string; displayName: string };
export const load: PageServerLoad = async ({ params }) => {
	const { url } = params;

	const pwResetUrl = await prisma.passwordResetUrl.findUnique({ where: { url } });

	if (!pwResetUrl) throw error(404, { message: "Lien n'existe pas" });

	const today = new Date();
	if (today > pwResetUrl.expires_at) throw error(404, { message: "Oops! Le lien à expirer" });

	const user = await prisma.authUser.findUnique({ where: { id: pwResetUrl.user_id } });

	return {
		email: user?.role,
		displayName: capitalizeWords(`${user?.firstname} ${user?.lastname}`),
	} as ResetPasswordData;
};

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const password = formData.get("password")?.toString();
		const confirm = formData.get("confirm")?.toString();

		const email = url.searchParams.get("email");

		if (!email) {
			return fail(400, { error: "Aucun courriel fourni. Cette erreur ne devrait pas se produire" });
		}

		if (!password || !confirm || password !== confirm) {
			return fail(400, { error: "Mots de passe de concordent pas" });
		}

		// update user email
		const dbUser = await prisma.authUser.findUnique({ where: { email } });

		if (!dbUser) {
			return fail(400, { error: "Utilisateur inexistant" });
		}

		await auth.invalidateAllUserSessions(dbUser.id);
		await auth.updateKeyPassword("email", dbUser.email, password);
		const session = await auth.createSession(dbUser.id);
		locals.auth.setSession(session);

		return { success: true, message: "Mot de passe modifié" };
	},
};
