<script lang="ts">
	import { Card } from "flowbite-svelte";
	import Logo from "$lib/components/Logo.svelte";

	let width: number;
	const breakPoint = 899;
</script>

<svelte:window bind:innerWidth={width} />

<div class="overflow-hidden">
	{#if width >= breakPoint}
		<div class="flex items-center">
			<Card class="flex gap-3 items-center justify-center h-screen min-w-max  p-10">
				<Logo imgClass="max-w-xs" />
				<slot />
			</Card>
			<img
				class="visible h-screen w-full object-cover"
				src="https://images.pexels.com/photos/1192031/pexels-photo-1192031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
				alt="Stock fruits and vegetables"
			/>
		</div>
	{:else}
		<div class="flex flex-col gap-10 justify-center items-center h-screen md:p-10 p-20">
			<Logo imgClass="md:max-h-64 sm:max-h-min" />
			<slot />
		</div>
	{/if}
</div>
