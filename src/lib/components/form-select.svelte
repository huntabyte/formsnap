<script lang="ts">
	import { getFormField, type SelectProps } from "$lib/index.js";

	type $$Props = SelectProps;
	const { actions, errors, attrStore } = getFormField();
	$: attrs = {
		"data-fs-select": "",
		"data-fs-error": $errors ? "" : undefined,
		...$attrStore
	};
</script>

<select {...$$restProps} use:actions.select {...attrs}>
	<slot />
</select>
