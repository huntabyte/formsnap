import type { Writable } from "svelte/store";
import { FORM_CONTROL_CONTEXT } from "../internal/index.js";
import { getContext } from "svelte";

export function getFormControl() {
	return getContext<Writable<string | undefined>>(FORM_CONTROL_CONTEXT);
}
