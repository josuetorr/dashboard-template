<script lang="ts">
	import { Button, Heading } from "flowbite-svelte";
	import Input from "$lib/components/Input.svelte";
	import Link from "$lib/components/Link.svelte";
	import type { ActionData, PageData } from "./$types";
	import { toast } from "$lib/stores/toast";

	export let data: PageData;
	export let form: ActionData;

	$: if (form?.success) {
		toast.open({
			color: "green",
			icon: "mdi:success",
			position: "top-left",
			message: form.message,
		});
	} else if (form?.error) {
		toast.open({
			color: "red",
			icon: "mdi:alert",
			position: "top-left",
			message: form.error,
		});
	}
</script>

<form method="post" class="flex flex-col gap-4 w-fit px-4 sm:px-0">
	<Heading tag="h5" class="my-6"
		><p class="text-center">Salut {data.displayName}</p>
		<p class="text-center">Veuillez entrer votre nouveau mot de passe</p>
	</Heading>
	<Input id="password" type="password" placeholder="nouveau mot de passe" />
	<Input id="confirm" type="password" placeholder="confirmation" />
	<Button type="submit" disabled={form?.success}>Soumettre</Button>
	{#if form?.success}
		<Link href="/login">Connectez vous</Link>
	{/if}
</form>
