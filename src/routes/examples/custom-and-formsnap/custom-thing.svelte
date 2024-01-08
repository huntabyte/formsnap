<script lang="ts">
	import { getForm } from "$lib/index.js";

	const { delayed } = getForm();
</script>

{#if $delayed}
	<h1>Hello world</h1>
{/if}
