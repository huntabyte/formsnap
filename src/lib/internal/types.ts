/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormPathLeaves, UnwrapEffects, ZodValidation } from "sveltekit-superforms";
import type { SuperForm, formFieldProxy } from "sveltekit-superforms/client";
import type { AnyZodObject, z } from "zod";
import type { SuperFormOptions, Validators as SuperFormValidators } from "./super-form-patch";
import type { ActionResult, Page } from "@sveltejs/kit";
import type { Writable } from "svelte/store";

export type { SuperFormOptions };

export type Expand<T> = T extends object
	? T extends infer O
		? { [K in keyof O]: O[K] }
		: never
	: T;

export type ExpandDeep<T> = T extends object
	? T extends infer O
		? { [K in keyof O]: ExpandDeep<O[K]> }
		: never
	: T;

export type Form<T extends FormValidation> = {
	schema: T;
	form: SuperForm<T>;
};

export type Arrayable<T> = T | T[];

export type ArrayKeys<T> = {
	[K in keyof T]: T[K] extends any[] ? K : never;
}[keyof T];

export type ArrayProperties<T> = {
	[K in keyof T]: T[K] extends any[] ? T[K] : never;
};

export type FormValidation = ZodValidation<AnyZodObject>;
export type FormFieldName<T extends FormValidation> = FormPathLeaves<z.infer<T>>;

export type FieldAttrs<T> = {
	"aria-invalid"?: boolean;
	"aria-describedby"?: string;
	name: string;
	id: string;
	value: T;
};

export type ControlFieldAttrs<T> = {
	control: Omit<FieldAttrs<T>, "name">;
	input: Pick<FieldAttrs<T>, "value" | "name">;
};

export type FormStores<
	T extends ZodValidation<AnyZodObject>,
	Path extends FormPathLeaves<z.infer<UnwrapEffects<T>>>
> = ReturnType<typeof formFieldProxy<T, Path>>;

export type FormInputEvent = Event & {
	currentTarget: HTMLInputElement | HTMLTextAreaElement;
};

export type FormChangeEvent = Event & {
	currentTarget: HTMLInputElement | HTMLSelectElement;
};

export type FormEvent = Event & {
	currentTarget: HTMLFormElement;
};

export type FormCheckboxEvent = Event & {
	currentTarget: HTMLInputElement;
};

export type GetFieldAttrsProps<T> = {
	val: T;
	errors: string[] | undefined;
	constraints: Record<string, unknown> | undefined;
	hasValidation: boolean;
	hasDescription: boolean;
};

export type Validators<T> =
	| false
	| SuperFormValidators<UnwrapEffects<T>>
	| ZodValidation<UnwrapEffects<T>>;

export type SvelteActionResult<
	Success extends Record<string, unknown> | undefined = Record<string, any>,
	Failure extends Record<string, unknown> | undefined = Record<string, any>
> = ActionResult<Success, Failure>;

export type SveltePage<
	Params extends Record<string, string> = Record<string, string>,
	RouteId extends string | null = string | null
> = Page<Params, RouteId>;

export type ConstraintsStore = Writable<
	| Partial<{
			pattern: string;
			min: string | number;
			max: string | number;
			required: boolean;
			step: number | "any";
			minlength: number;
			maxlength: number;
	  }>
	| undefined
>;

export type ErrorsStore = Writable<string[] | undefined>;
