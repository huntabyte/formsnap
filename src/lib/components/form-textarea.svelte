<script lang="ts">
	import { getFormField, type TextareaProps } from "$lib/index.js";

	type $$Props = TextareaProps;
	const { actions, errors, attrStore } = getFormField();
	$: attrs = {
		"data-fs-textarea": "",
		"data-fs-error": $errors ? "" : undefined,
		...$attrStore
	};
</script>

<textarea {...$$restProps} use:actions.textarea {...attrs} />
