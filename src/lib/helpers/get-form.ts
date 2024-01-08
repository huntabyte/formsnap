import { getContext } from "svelte";
import { FORM_CONTEXT, type FormValidation, type FormContext } from "$lib/internal/index.js";
/**
 * Get the form context from the current component.
 * Must be called within component initialization that is
 * a descendant of a Form component.
 *
 * @template T - The form schema.
 */
export function getForm<T extends FormValidation = FormValidation>(): FormContext<T> {
	return getContext<FormContext<T>>(FORM_CONTEXT);
}
