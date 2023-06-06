<script lang="ts">
	import type { PageData } from "./$types";
	import { Checkbox, Button } from "flowbite-svelte";
	import Link from "$lib/components/Link.svelte";
	import Input from "$lib/components/Input.svelte";

	import { toast } from "$lib/stores/toast";

	import {
		password as passwordPlaceholder,
		email as emailPlaceholder,
	} from "$lib/utils/placeholders";
	import { superForm } from "sveltekit-superforms/client";
	import { page } from "$app/stores";

	export let data: PageData;
	const { errors, enhance, message } = superForm(data.form);

	$: if ($page.status === 400 && $message) {
		toast.open({ color: "red", position: "top-left", message: $message as string });
	} else {
		toast.close();
	}
</script>

<form method="POST" class="flex flex-col space-y-6" use:enhance>
	<Input
		error={$errors.email ? $errors.email[0] : ""}
		id="email"
		type="email"
		label="Courriel"
		placeholder={emailPlaceholder}
	/>
	<Input
		error={$errors.email ? $errors.email[0] : ""}
		id="password"
		type="password"
		label="Mot de passe"
		placeholder={passwordPlaceholder}
	/>
	<div class="flex flex-col space-y-2">
		<Checkbox>Rester connecter</Checkbox>
		<Link href="/password/reset">Oublier votre mot de passe?</Link>
	</div>
	<Button class="w-full" type="submit">Se connecter</Button>
</form>
