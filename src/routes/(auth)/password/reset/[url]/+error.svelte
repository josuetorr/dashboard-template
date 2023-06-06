<script lang="ts">
	import { Heading } from "flowbite-svelte";
	import Link from "$lib/components/Link.svelte";

	import { page } from "$app/stores";
</script>

<Heading>{$page?.error?.message}</Heading>
<Link href="/password/reset">Oublier mot de passe?</Link>
