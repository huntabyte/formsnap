<script lang="ts">
	import { getForm, getFormField, type InputProps } from "$lib/index.js";
	import type { HTMLInputTypeAttribute } from "svelte/elements";
	import { dateProxy } from "sveltekit-superforms/client";

	type type = Extract<HTMLInputTypeAttribute, "date" | "datetime-local" | "time">;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Props = InputProps & { type?: type | undefined };

	export let type: type = "date";

	const { form } = getForm();
	const { errors, setValue, name } = getFormField();
	const attrs = {
		"data-fs-input": "",
		"data-fs-error": $errors ? "" : undefined
	};

	const format = type === "date" ? "date" : type === "datetime-local" ? "datetime-local" : "time";
	const proxyDate = dateProxy(form, name, { format });

	function onChange(e: Event) {
		const target = e.target as HTMLInputElement;
		setValue(target.value);
	}
</script>

<input {...$$restProps} {type} on:change={onChange} class="input" {...attrs} value={$proxyDate} />
