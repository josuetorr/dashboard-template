<script lang="ts">
	import { page } from "$app/stores";
	import type { PageData } from "./$types";

	import { superForm } from "sveltekit-superforms/client";

	import { Button } from "flowbite-svelte";
	import Input from "$lib/components/Input.svelte";
	import Select from "$lib/components/Select.svelte";

	import { password as passwordPlaceholder } from "$lib/utils/placeholders.js";
	import { toast } from "$lib/stores/toast";

	const roles = [
		{ value: "GYM_LEADER", name: "Staff" },
		{ value: "LEGENDARY", name: "Admin" },
	];

	export let data: PageData;
	const { errors, message, enhance } = superForm(data.form);

	$: if ($page.status === 200 && $message) {
		toast.open({ color: "green", icon: "mdi:success", message: $message });
	} else if ($message) {
		toast.open({ color: "red", icon: "mdi:alert", message: $message });
	}
</script>

<h1 class="lg:m-10 text-2xl">Créer Administrateur</h1>

<form method="POST" use:enhance class="flex flex-col gap-6">
	<Input
		id="firstname"
		type="text"
		placeholder="Ash"
		label="Prénom"
		error={$errors.firstname ? $errors.firstname[0] : ""}
	/>
	<Input
		id="lastname"
		type="text"
		placeholder="Ketchum"
		label="Nom"
		error={$errors.lastname ? $errors.lastname[0] : ""}
	/>
	<Input id="email" type="email" label="Courriel" error={$errors.email ? $errors.email[0] : ""} />
	<Input
		id="phone"
		type="text"
		placeholder="123-456-7890"
		label="Téléphone"
		optional
		error={$errors.phone ? $errors.phone[0] : ""}
	/>
	<Select items={roles} label="Role" />
	<Input
		id="password"
		type="password"
		label="Mot de passe"
		placeholder={passwordPlaceholder}
		error={$errors.password ? $errors.password[0] : ""}
	/>
	<Input
		id="confirm"
		type="password"
		label="Confirmation mot de passe"
		placeholder={passwordPlaceholder}
		error={$errors.confirmation ? $errors.confirmation[0] : ""}
	/>
	<div class="text-end">
		<Button type="submit">Soumettre</Button>
	</div>
</form>
