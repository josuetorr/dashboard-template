<script lang="ts">
	export let href: string;
</script>

<a {href} class="text-sm text-blue-700 hover:underline dark:text-blue-500">
	<slot />
</a>
