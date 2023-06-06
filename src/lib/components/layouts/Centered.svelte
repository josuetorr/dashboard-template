<script lang="ts">
	export let fullScreen = false;
</script>

<div class={`${fullScreen ? "h-screen" : "h-full"} flex flex-col items-center justify-center`}>
	<slot />
</div>
