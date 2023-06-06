import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { auth } from "$lib/server/lucia";

//TODO: remove this when in production
export const GET: RequestHandler = async () => {
	const me = {
		email: "josue.dtorres@gmail.com",
		firstname: "Josué",
		lastname: "Torres",
		role: "MYTHICAL",
		phone: "514-609-9619",
	};

	try {
		await auth.createUser({
			primaryKey: { providerId: "email", providerUserId: me.email, password: "aaaaaaaa" },
			attributes: me,
		});
	} catch (error) {
		console.error(error);
		return json({ error: "could not create me" }, { status: 500 });
	}
	return json({ success: true }, { status: 200 });
};
