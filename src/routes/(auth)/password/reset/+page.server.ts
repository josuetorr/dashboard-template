import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import prisma from "$lib/db";

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get("email")?.toString();

		if (!email) return fail(400, { error: "Veuillez fournir un courriel" });
		try {
			const dbUser = await prisma.authUser.findUnique({ where: { email } });
		} catch (error) {
			console.error(error);
			return fail(500, { error: "Erreur interner. Contacter votre admin" });
		}
	},
};
