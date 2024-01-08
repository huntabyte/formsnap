<script lang="ts">
	import type { FormPath, UnwrapEffects } from "sveltekit-superforms";
	import { fieldProxy } from "sveltekit-superforms/client";
	import { writable, type StoresValues } from "svelte/store";
	import type { AnyZodObject, z } from "zod";

	import { createIds, createMultiField } from "@/lib/internal/index.js";
	import type { ErrorsStore, FieldAttrStore, Form, FormValidation } from "@/lib/internal/index.js";

	type T = $$Generic<AnyZodObject | FormValidation>;
	type Path = $$Generic<FormPath<z.infer<UnwrapEffects<T>>>>;

	export let config: Form<T>;
	export let name: Path;

	const errorsPath = `${name}._errors` as Path;

	const attrStore: FieldAttrStore = writable({});

	$: value = fieldProxy(config.form.form, name);
	$: errors = fieldProxy(config.form.errors, errorsPath);
	$: constraints = fieldProxy(config.form.constraints, name);

	const ids = writable(createIds());

	$: ({ getFieldAttrs, actions, hasValidation, hasDescription, handlers, setValue } =
		createMultiField<T, Path>(name, attrStore, value, errors as ErrorsStore, ids));

	$: inputAttrs = getFieldAttrs({
		val: $value,
		errors: $errors as StoresValues<ErrorsStore>,
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
