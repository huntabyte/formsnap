import type { UnwrapEffects } from "sveltekit-superforms";
import type { SuperForm } from "sveltekit-superforms/client";
import type { FormValidation } from "$lib/internal/index.js";

export type FormContext<T extends FormValidation = FormValidation> = SuperForm<
	UnwrapEffects<T>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	any
>;

export const FORM_CONTEXT = "Form";
