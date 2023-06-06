import { z } from "zod";
import isMobilePhone from "validator/lib/isMobilePhone";
import { requiredMessage } from "../utils";

import { args, passwordMatchSchema } from "./password";

export const userCreationSchema = z
	.object({
		firstname: z.string().nonempty({ message: requiredMessage("prénom") }),
		lastname: z.string().nonempty({ message: requiredMessage("nom") }),
		email: z.string().email({ message: "Courriel invalide" }),
		phone: z.string().refine(isMobilePhone).optional(),
		role: z.string().nonempty({ message: requiredMessage("role") }),
	})
	.merge(passwordMatchSchema)
	.refine.apply(null, args);
