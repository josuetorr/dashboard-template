<script lang="ts">
	import "../app.css";
	import "iconify-icon";

	import Toast from "$lib/components/Toast.svelte";

	import { toast } from "$lib/stores/toast";
</script>

<Toast {...$toast} >
  {$toast.message}
</Toast>
<slot />
