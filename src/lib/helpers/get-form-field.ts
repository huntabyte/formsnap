import { getContext } from "svelte";
import { FORM_FIELD_CONTEXT, type FieldContext } from "$lib/internal/index.js";

export function getFormField() {
	return getContext<FieldContext>(FORM_FIELD_CONTEXT);
}

export type { FieldContext };
