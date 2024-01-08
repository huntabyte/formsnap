<script lang="ts">
	import { getFormField, type ValidationProps } from "$lib/index.js";

	type $$Props = ValidationProps;
	export let tag = "p";
	const { actions, errors, ids } = getFormField();
	$: attrs = {
		"data-fs-validation": "",
		"data-fs-error": $errors ? "" : undefined,
		id: $ids.validation
	};
</script>

<svelte:element this={tag} use:actions.validation {...attrs} {...$$restProps}>
	{#if $errors}
		{$errors}
	{/if}
</svelte:element>
