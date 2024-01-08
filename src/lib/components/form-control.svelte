<script lang="ts">
	import { getFormField } from "@/lib/index.js";
	import type { ControlProps } from "../types.js";
	import { hiddenInputStyles } from "../internal/style.js";

	type $$Props = ControlProps;

	export let id: string | undefined = undefined;

	const { errors, attrStore, value, name, ids } = getFormField();

	$: if (id) {
		ids.update((curr) => {
			if (id) {
				return {
					...curr,
					input: id
				};
			}
			return curr;
		});
	}

	$: attrs = {
		"data-fs-control": "",
		"data-fs-error": $errors ? "" : undefined,
		value: $attrStore.value,
		...$attrStore
	};
</script>

<slot {attrs} />
<input {name} bind:value={$value} style={hiddenInputStyles} />
