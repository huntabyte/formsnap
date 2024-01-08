<script lang="ts">
	import { formFieldProxy } from "sveltekit-superforms/client";
	import { writable } from "svelte/store";
	import { createFormField, createIds } from "$lib/internal/index.js";

	import type { FieldAttrStore, Form, FormFieldName, FormValidation } from "$lib/internal/index.js";
	import type { AnyZodObject } from "zod";

	type T = $$Generic<AnyZodObject | FormValidation>;
	type Path = $$Generic<FormFieldName<T>>;

	export let config: Form<T>;
	export let name: Path;

	const attrStore: FieldAttrStore = writable({});
	$: ({ errors, value, constraints } = formFieldProxy<T, Path>(config.form, name));

	const ids = writable(createIds());

	$: ({ getFieldAttrs, actions, hasValidation, hasDescription, handlers, setValue } =
		createFormField<T, Path>(name, attrStore, value, errors, ids));

	$: inputAttrs = getFieldAttrs({
		val: $value,
		errors: $errors,
		constraints: $constraints,
		hasValidation: $hasValidation,
		hasDescription: $hasDescription
	});

	$: attrs = {
		input: inputAttrs,
		label: {
			for: $ids.input
		},
		description: {
			id: $ids.description
		},
		validation: {
			id: $ids.validation,
			"aria-live": "assertive"
		} as const
	};

	const stores = {
		errors,
		value,
		constraints
	};
</script>

<slot
	{stores}
	errors={$errors}
	value={$value}
	constraints={$constraints}
	{handlers}
	{attrs}
	{actions}
	{setValue}
/>
