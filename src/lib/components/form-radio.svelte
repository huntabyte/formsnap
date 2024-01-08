<script lang="ts">
	import { getFormField, type RadioProps } from "$lib/index.js";

	type $$Props = RadioProps;
	const { actions, errors, attrStore } = getFormField();
	$: attrs = {
		"data-fs-radio": "",
		"data-fs-error": $errors ? "" : undefined,
		...$attrStore
	};
</script>

<input type="radio" {...$$restProps} use:actions.radio {...attrs} />
