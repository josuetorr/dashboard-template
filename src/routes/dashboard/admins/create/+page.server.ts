import { auth } from "$lib/server/lucia";
import { fail } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import type { Actions, RequestEvent } from "./$types";

import { userCreationSchema } from "$lib/validation/user/create";

export async function load(event: RequestEvent) {
	const userCreationForm = await superValidate(event, userCreationSchema);

	return { form: userCreationForm };
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(await request.formData(), userCreationSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { password, confirmation: confirmation, ...rest } = form.data;
			const user = await auth.createUser({
				primaryKey: {
					providerId: "email",
					providerUserId: form.data.email,
					password: form.data.password,
				},
				attributes: rest,
			});

			const session = await auth.createSession(user.id);
			locals.auth.setSession(session);
			return message(form, "Utilisateur créé");

		} catch (error) {

			console.error(error);
			return message(form, "Impossible de créer utilisateur. Ce courriel est déja utilisé", {
				status: 400,
			});

		}
	},
};
