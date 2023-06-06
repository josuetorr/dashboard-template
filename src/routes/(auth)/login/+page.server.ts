import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types.js";
import { message, superValidate } from "sveltekit-superforms/server";
import { loginSchema } from "$lib/validation/user/login.js";
import { auth } from "$lib/server/lucia.js";

export const load: PageServerLoad = async (event) => {
	const form = await superValidate(event, loginSchema);

	return { form };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(await request.formData(), loginSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { email, password } = form.data;

			const key = await auth.useKey("email", email, password);
			const session = await auth.createSession(key.userId);
			locals.auth.setSession(session);
		} catch (error) {
			console.error(error);
			return message(form, "Informations d'identication non valides", { status: 400 });
		}

		throw redirect(300, "/dashboard");
	},
};
