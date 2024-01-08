<script lang="ts">
	import { getFormField, type LabelProps } from "$lib/index.js";

	type $$Props = LabelProps;
	const { actions, errors, ids } = getFormField();
	$: attrs = {
		"data-fs-label": "",
		"data-fs-error": $errors ? "" : undefined,
		for: $ids.input
	};
</script>

<label use:actions.label {...$$restProps} {...attrs}>
	<slot />
</label>
