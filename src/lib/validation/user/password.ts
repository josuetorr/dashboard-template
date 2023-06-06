import { z } from "zod";

// HUGE hack to allow for refine to be reused when validating password matching
// this requires to use .refine.apply(null, args)
type PasswordMatch = { password: string; confirm: string };
type PasswordMatchError = { message: string; path: string[] };
type PasswordMatchReturn = [(data: PasswordMatch) => boolean, PasswordMatchError];

export const passwordSchema = z
	.string()
	.min(8, { message: "Mot de passe doit avoir un minimum de 8 caractères" });

export const confirmationSchema = z.string();

export const passwordMatchSchema = z.object({
	password: passwordSchema,
	confirmation: confirmationSchema,
});

const passwordMatchError = {
	message: "Mots de passe ne concordent pas",
	path: ["confirm"],
};
function isMatch(data: PasswordMatch) {
	return data.password === data.confirm;
}

export const args = [isMatch, passwordMatchError] as PasswordMatchReturn;
