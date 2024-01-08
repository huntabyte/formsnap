<script lang="ts">
	import { getFormField, type DescriptionProps } from "$lib/index.js";

	type $$Props = DescriptionProps;
	export let tag = "p";
	const { actions, errors, ids } = getFormField();
	$: attrs = {
		"data-fs-description": "",
		"data-fs-error": $errors ? "" : undefined,
		id: $ids.description
	};
</script>

<svelte:element this={tag} use:actions.description {...$$restProps} {...attrs}>
	<slot />
</svelte:element>
