import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email({ message: "Courriel invalide." }),
	password: z.string().min(8, { message: "Minimum de 8 caractères" }),
	stayConnected: z.boolean(),
});
