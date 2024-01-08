<script lang="ts">
	import { getFormField } from "@/lib/index.js";
	import type { SelectProps } from "../types.js";

	type $$Props = SelectProps;

	const { errors, attrStore, value } = getFormField();
	$: attrs = {
		"data-fs-select": "",
		"data-fs-error": $errors ? "" : undefined,
		...$attrStore
	};
</script>

<select {...$$restProps} multiple bind:value={$value} {...attrs}>
	<slot />
</select>
