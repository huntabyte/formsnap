<script lang="ts">
	import { formFieldProxy } from "sveltekit-superforms/client";
	import { writable } from "svelte/store";
	import { createFormField, createIds } from "@/lib/internal/index.js";

	import type {
		FieldAttrStore,
		Form,
		FormFieldName,
		FormValidation
	} from "@/lib/internal/index.js";
	import type { AnyZodObject } from "zod";

	type T = $$Generic<AnyZodObject | FormValidation>;
	type Path = $$Generic<FormFieldName<T>>;

	type $$Props = {
		/**
		 * The configuration object received as a slot
		 * prop from the parent `<Form.Root />` element.
		 */
		config: Form<T>;

		/**
		 * The name of the field, which corresponds to the
		 * path/property name in the schema.
		 */
		name: Path;

		/**
		 * A custom ID to use for the input element. If not
		 * provided, one will be generated for you.
		 */
		inputId?: string;
	};

	export let config: Form<T>;
	export let name: Path;
	export let inputId: $$Props["inputId"] = undefined;

	const attrStore: FieldAttrStore = writable({});
	$: ({ errors, value, constraints, tainted } = formFieldProxy<T, Path>(config.form, name));

	const ids = writable(createIds(inputId));

	$: inputId !== undefined && ids.set(createIds(inputId));

	$: ({ getFieldAttrs, actions, hasValidation, hasDescription, handlers, setValue } =
		createFormField<T, Path>(name, attrStore, value, errors, ids));

	$: inputAttrs = getFieldAttrs({
		val: $value,
		errors: $errors,
		constraints: $constraints,
		hasValidation: $hasValidation,
		hasDescription: $hasDescription
	});

	$: ({ value: _, ...groupAttrs } = inputAttrs);

	$: attrs = {
		input: inputAttrs,
		group: groupAttrs,
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
		constraints,
		tainted
	};

	$: slotProps = {
		stores,
		errors: $errors,
		value: $value,
		constraints: $constraints,
		tainted: $tainted,
		handlers,
		attrs,
		actions,
		setValue
	};
</script>

<slot {...slotProps} />
