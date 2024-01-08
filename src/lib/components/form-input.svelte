<script lang="ts">
	import { getFormField, type InputProps } from "$lib/index.js";

	type $$Props = InputProps;
	const { actions, errors, attrStore } = getFormField();
	$: attrs = {
		"data-fs-input": "",
		"data-fs-error": $errors ? "" : undefined,
		...$attrStore
	};
</script>

<input {...$$restProps} use:actions.input {...attrs} />
