import {
	isHTMLInputElement,
	isHTMLSelectElement,
	isHTMLTextareaElement
} from "$lib/internal/index.js";
import type { FieldHandlers, FieldValueSetter } from "./types.js";

/**
 * Creates an object of event handler functions for native form elements.
 */
export function createFieldHandlers(setValue: FieldValueSetter): FieldHandlers {
	return {
		input: (e: Event) => {
			const target = e.target;
			if (!isHTMLInputElement(target) && !isHTMLTextareaElement(target)) return;
			setValue(target.value);
		},
		checkbox: (e: Event) => {
			const target = e.target;
			if (!isHTMLInputElement(target)) return;
			setValue(target.checked);
		},
		radio: (e: Event) => {
			const target = e.target;
			if (!isHTMLInputElement(target)) return;
			if (target.checked) setValue(target.value);
		},
		select: (e: Event) => {
			const target = e.target;
			if (!isHTMLSelectElement(target)) return;
			setValue(target.value);
		}
	};
}
