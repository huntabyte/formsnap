import type { FormPath, ZodValidation } from "sveltekit-superforms";
import type { AnyZodObject, z } from "zod";
import { get, writable, type Writable } from "svelte/store";
import {
	FORM_FIELD_CONTEXT,
	createFieldActions,
	createFieldHandlers
} from "@/lib/internal/index.js";
import type { ErrorsStore, GetFieldAttrsProps } from "@/lib/internal/index.js";
import type { CreateFormFieldReturn, FieldAttrStore, FieldContext, FieldIds } from "./types.js";
import { setContext } from "svelte";

export const FORM_MULTIFIELD_CONTEXT = "MultiField";

export function createMultiField<
	T extends ZodValidation<AnyZodObject>,
	Path extends FormPath<z.infer<T>>
>(
	name: Path,
	attrStore: FieldAttrStore,
	value: Writable<unknown>,
	errors: ErrorsStore,
	ids: Writable<FieldIds>
): CreateFormFieldReturn {
	const hasValidation = writable(false);
	const hasDescription = writable(false);

	const actions = createFieldActions({
		ids,
		attrs: attrStore,
		hasValidation,
		hasDescription,
		value,
		name
	});

	const setValue = (v: unknown) => {
		value.set(v);
	};

	const handlers = createFieldHandlers(setValue);

	const context: FieldContext = {
		ids,
		name,
		errors,
		value,
		hasValidation,
		hasDescription,
		attrStore,
		actions,
		setValue,
		handlers
	};

	setContext(FORM_FIELD_CONTEXT, context);
	setContext(FORM_MULTIFIELD_CONTEXT, context);

	function getFieldAttrs<T>(props: GetFieldAttrsProps<T>) {
		const { val, errors, constraints, hasValidation, hasDescription } = props;
		const $ids = get(ids);
		const describedBy = errors
			? `${hasValidation ? $ids.validation : ""} ${hasDescription ? $ids.description : ""}`
			: hasDescription
			? $ids.description
			: undefined;

		const attrs = {
			"aria-invalid": errors ? true : undefined,
			"aria-describedby": describedBy,
			"aria-required": !!constraints?.required,
			"data-invalid": errors ? true : undefined,
			"data-valid": errors ? undefined : true,
			name,
			id: $ids.input,
			value: val
		} as const;

		attrStore.set(attrs);

		return attrs;
	}

	return {
		getFieldAttrs,
		actions,
		attrStore,
		hasDescription,
		hasValidation,
		handlers,
		setValue,
		context
	};
}
