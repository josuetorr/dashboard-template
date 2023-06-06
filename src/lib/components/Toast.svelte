<script lang="ts">
	import type { ToastColor, ToastPosition } from "$lib/types/toast";
	import { Toast } from "flowbite-svelte";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

	export let color: ToastColor = "primary";
	export let simple = false;
	export let open = true;
	export let icon: string = "mdi:alert";
	export let position: ToastPosition = "none";
	export let showTimer = false;
	export let startCounter = 5;

	let counter = startCounter;

	function timeout() {
		const delay = 1000;
		if (--counter > 0) {
			setTimeout(timeout, delay);
			return;
		}

		open = false;
	}

	function trigger() {
		counter = startCounter;
		timeout();
	}

	onMount(trigger);
</script>

<Toast transition={fly} {simple} {color} bind:open {position} class="max-w-max">
	<svelte:fragment slot="icon">
		{#if icon}
			<iconify-icon {icon} />
		{/if}
	</svelte:fragment>
	<div class="flex place-content-around items-center">
		<slot />
		{#if showTimer}
			<span class="mx-2">{counter}s</span>
		{/if}
	</div>
</Toast>
