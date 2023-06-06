<script lang="ts">
	import Centered from "$lib/components/layouts/Centered.svelte";
	import Banner from "$lib/components/company/Banner.svelte";
	import { Heading } from "flowbite-svelte";

	import { page } from "$app/stores";
</script>

<Centered fullScreen>
	<div>
		<Banner />
	</div>
	<div>
		<Heading>{$page?.error?.message}</Heading>
	</div>
</Centered>
