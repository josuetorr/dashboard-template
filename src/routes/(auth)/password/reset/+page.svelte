<script lang="ts">
	import { Label, Input, Button, Helper } from "flowbite-svelte";
	import Link from "$lib/components/Link.svelte";
	import { toast } from "$lib/stores/toast";

	const resetPasswordUrl = "/api/v1/auth/reset-password";

	let response: any;
	async function handleSubmit() {
		const formElement = this as HTMLFormElement;

		const formData = new FormData(formElement);
		const res = await fetch(resetPasswordUrl, {
			method: "POST",
			body: JSON.stringify({ email: formData.get("email") }),
		});

		response = await res.json();
	}

	$: disabled = response?.success;

	$: if (response?.error) {
		toast.open({
			color: "red",
			position: "top-left",
			startCounter: 10,
			icon: "mdi:alert",
			message: response.error,
		});
	} else if (response?.success) {
		toast.open({
			color: "green",
			position: "top-left",
			startCounter: 10,
			icon: "mdi:success",
			message: `Un courriel a été envoyé à ${response?.result.message}`,
		});
	}
</script>

<form method="post" class="flex flex-col space-y-6" on:submit|preventDefault={handleSubmit}>
	<Label class="space-y-2">
		<span>Courriel</span>
		<Input type="email" name="email" placeholder="nom@exemple.com" {disabled} required />
		<Helper
			><span class="text-xs text-slate-400">
				Un courriel vous sera envoyé avec les informations nécessaire
			</span></Helper
		>
	</Label>
	<Link href="/login">Se connecter</Link>
	<Button class="w-full" type="submit" {disabled}>Envoyer courriel</Button>
</form>
