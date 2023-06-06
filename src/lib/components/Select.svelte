<script lang="ts">
	import { Select, Label, Helper } from "flowbite-svelte";
	import type { SelectOptionType } from "flowbite-svelte/dist/types";

	export let items: SelectOptionType[] = [];
	export let error: string = "";
	export let label: string = "";

	let value: string;
</script>

<div>
	<Label for="role" class="my-1">{label}</Label>
	<Select id="role" {items} name="role" bind:value />
	{#if error}
		<Helper color="red">{error}</Helper>
	{/if}
</div>
