import sg, { type ClientResponse, type ResponseError } from "@sendgrid/mail";
import { env } from "$env/dynamic/private";

sg.setApiKey(env.SEND_GRID_API_KEY);

export type SendGridOptions = {
	to: string;
	from: string;
	subject: string;
	text: string;
	html: string;
};

export type SendGridRestrictedOptions = Omit<SendGridOptions, "from">;

export type SendGridOnSuccess = (res: [ClientResponse, {}]) => Response;
export type SendGridOnError = (error: ResponseError) => Response;

export type SendEmailOptions = {
	opt: Omit<SendGridRestrictedOptions, "from">;
	onSuccess: SendGridOnSuccess;
	onError: SendGridOnError;
};
export async function sendEmail({ opt, onSuccess, onError }: SendEmailOptions) {
	try {
		const res = await sg.send({ from: env.SEND_GRID_FROM_EMAIL, ...opt });
		return onSuccess(res);
	} catch (error) {
		return onError(error as ResponseError);
	}
}

export type { ClientResponse, ResponseError } from "@sendgrid/mail";
