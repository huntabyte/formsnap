<script lang="ts">
	import { getFormField, type CheckboxProps } from "$lib/index.js";

	type $$Props = CheckboxProps;
	const { actions, errors, attrStore } = getFormField();
	$: attrs = {
		"data-fs-checkbox": "",
		"data-fs-error": $errors ? "" : undefined,
		...$attrStore
	};
</script>

<input type="checkbox" use:actions.checkbox {...attrs} {...$$restProps} />
