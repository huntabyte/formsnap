/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
	Form,
	FormChangeEvent,
	FormEvent,
	FormFieldName,
	FormInputEvent,
	SuperFormOptions
} from "@/lib/internal/types.js";
import type {
	HTMLAttributes,
	HTMLFormAttributes,
	HTMLInputAttributes,
	HTMLLabelAttributes,
	HTMLSelectAttributes,
	HTMLTextareaAttributes
} from "svelte/elements";
import type { SuperValidated, UnwrapEffects, ZodValidation } from "sveltekit-superforms";
import type { AnyZodObject } from "zod";

export type FormOptions<T extends ZodValidation<AnyZodObject>, M = any> = SuperFormOptions<
	UnwrapEffects<T>,
	M
>;

export type HelperEventHandler = (e: Event) => void;

export type FormProps<T extends ZodValidation<AnyZodObject>, M = any> = {
	schema: T;
	form: SuperValidated<T, M>;
	options?: FormOptions<UnwrapEffects<T>, M>;
	debug?: boolean;
	asChild?: boolean;
} & HTMLFormAttributes;

export type FieldProps<T extends AnyZodObject = AnyZodObject, Path = FormFieldName<T>> = {
	config: Form<T>;
	name: Path;
};

export type InputProps = HTMLInputAttributes;
export type ControlProps = {
	/*
	 * Optionally provide a custom ID for the form control,
	 * which is used to link the label, description, and validation
	 * messages to the form control.
	 *
	 * If no ID is provided, a random ID will be generated.
	 */
	id?: string;
};
export type CheckboxProps = HTMLInputAttributes;

export type DescriptionProps = {
	/**
	 * The tag to use for the description element.
	 *
	 * @default "p"
	 */
	tag?: keyof HTMLElementTagNameMap;
} & HTMLAttributes<HTMLElement>;

export type ValidationProps = {
	/**
	 * The tag to use for the validation message element.
	 *
	 * @default "p"
	 */
	tag?: keyof HTMLElementTagNameMap;
} & HTMLAttributes<HTMLElement>;

export type RadioProps = HTMLInputAttributes;

type SingleSelectError<T> = T extends true
	? "[FORMSNAP ERROR]: USE THE <Form.MultiSelect> COMPONENT INSTEAD DUE TO SVELTE 2-WAY BINDING LIMITATIONS"
	: T;

export type SelectProps<T extends boolean = boolean> = Omit<HTMLSelectAttributes, "multiple"> & {
	multiple?: T extends boolean ? SingleSelectError<T> : T;
};

export type MultiSelectProps = Omit<HTMLSelectAttributes, "multiple">;

export type TextareaProps = HTMLTextareaAttributes;
export type LabelProps = HTMLLabelAttributes;

export type FormEvents = {
	change: FormChangeEvent;
	input: FormInputEvent;
	submit: FormEvent;
	formdata: FormEvent;
	reset: FormEvent;
};
