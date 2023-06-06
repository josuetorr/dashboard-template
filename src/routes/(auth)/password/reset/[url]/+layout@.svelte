<script lang="ts">
	import Centered from "$lib/components/layouts/Centered.svelte";
	import Banner from "$lib/components/company/Banner.svelte";
</script>

<Centered fullScreen>
	<div>
		<Banner />
	</div>
	<div>
		<slot />
	</div>
</Centered>
