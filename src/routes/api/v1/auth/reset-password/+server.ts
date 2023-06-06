import { json } from "@sveltejs/kit";
import { z } from "zod";
import { nanoid } from "nanoid";

import type { RequestHandler } from "./$types";

import prisma from "$lib/db";
import { sendEmail } from "$lib/server/sendgrid";

const postSchema = z.object({ email: z.string().email({ message: "Courriel invalide" }) });

function html(url: string, email: string) {
	return `
<h1>Castro FL</h1>
<p>
Diriger vous vers ce lien afin de changer votre mot de passe: <a href="http://localhost:5173/password/reset/${url}?email=${email}">${url}</a>
</p>
`;
}

export const POST: RequestHandler = async ({ request }) => {
	const rawData = await request.json();

	const result = postSchema.safeParse(rawData);

	if (!result.success) {
		return json({ error: result.error.message }, { status: 400 });
	}

	const {
		data: { email },
	} = result;

	const user = await prisma.authUser.findUnique({ where: { email } });

	if (!user) {
		return json({ error: "Utilisateur inexistant" }, { status: 400 });
	}

	const twoMinutesLater = new Date(Date.now() + 2 * 1000 * 60);
	const pwUrl = await prisma.passwordResetUrl.create({
		data: { user_id: user.id, url: nanoid(64), expires_at: twoMinutesLater },
	});

	return await sendEmail({
		opt: {
			to: email,
			subject: "Castro FR - changer mot de passe",
			text: "No idea where this will show up",
			html: html(pwUrl.url, user.email),
		},
		onSuccess: () => {
			return json(
				{ success: true, result: { message: `Verifiez votre courriel (${email})` } },
				{ status: 200 },
			);
		},
		onError: (e) => {
			console.error(e.response.body);
			return json({ error: e.response.body }, { status: 500 });
		},
	});
};
