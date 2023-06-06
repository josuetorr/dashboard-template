<script lang="ts">
	import { Input, Label, Helper } from "flowbite-svelte";
	import type { InputType } from "flowbite-svelte/dist/types";

	export let error: string = "";
	export let id: string = "";
	export let name: string = id;
	export let type: InputType = "text";
	export let wrapperClass: string = "";
	export let placeholder: string = "";
	export let label: string = "";
	export let optional = false;
</script>

<div class={wrapperClass}>
	<Label for={id} class="my-1"
		>{label}
		{#if optional}
			<span class="text-slate-600 mx-2">Optionel</span>
		{/if}
	</Label>
	<Input {type} {id} {name} {placeholder} />
	{#if error}
		<Helper color="red">{error}</Helper>
	{/if}
	<Helper />
</div>
