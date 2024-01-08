<script lang="ts" context="module">
	import type { UnwrapEffects, ZodValidation } from "sveltekit-superforms";
	import type { AnyZodObject } from "zod";
	import type { Form } from "$lib/internal/index.js";

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type Validation = ZodValidation<AnyZodObject>;
	type T = unknown;
	type M = unknown;
</script>

<script lang="ts" generics="T extends Validation = Validation, M = any">
	import { FORM_FIELD_SCHEMA } from "../helpers/get-form-schema.js";
	import type { HTMLFormAttributes } from "svelte/elements";
	import { setContext } from "svelte";
	import type { FormEvents, FormOptions } from "$lib/types.js";
	import { FORM_CONTEXT } from "$lib/internal/index.js";
	import { superForm, type SuperForm } from "sveltekit-superforms/client";
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
	import type { SuperValidated } from "sveltekit-superforms";

	type $$Events = FormEvents;

	type BaseProps = {
		/**
		 * The schema representing the structure of the form, used to provide
		 * validation by default (uncontrolled), and type information to the form.
		 *
		 * @see https://zod.dev
		 */
		schema: T;

		/**
		 * Whether to delegate rendering the `form` element which enables
		 * you to use your own `<form />` element. You can then leverage the
		 * `enhance` and `attrs` slot props to bring your form element to life.
		 * @default false
		 *
		 * @example
		 * ```svelte
		 * <Form.Root {schema} form={data.form} asChild let:enhance let:attrs>
		 * 	<form use:enhance {...attrs}>
		 * 		<!-- ... -->
		 * 	</form>
		 * </Form.Root>
		 * ```
		 *
		 * @see https://formsnap.dev/docs/headless-usage
		 */
		asChild?: boolean;

		/**
		 * Optionally display the `SuperDebug` component beneath your
		 * form for debugging purposes.
		 *
		 * @see https://formsnap.dev/docs/debug-mode
		 */
		debug?: boolean;
	};

	type ControlledProps = {
		/**
		 * Whether the form is controlled or not. Controlled forms
		 * are used when you want to initialize the `superForm` yourself.
		 *
		 * When set to true, you need to pass the object returned from the
		 * `superForm` function as the `form` prop. When false, you just pass
		 * the `SuperValidated` (data.form) object as the `form` prop.
		 *
		 * @example <caption>Example of controlled usage</caption>
		 * ```typescript
		 * // script tag
		 * import { superForm } from "sveltekit-superforms/client";
		 * import { schema } from "./schema";
		 * export let data;
		 * const superFrm = superForm(data.form, { validators: schema })
		 * // closing script tag
		 * ```
		 *
		 * ```svelte
		 * <Form.Root form={superFrm} controlled>
		 * 	<!-- ... -->
		 * </Form.Root>
		 * ```
		 *
		 * @example <caption>Example of uncontrolled (default) usage</caption>
		 *  ```svelte
		 * <Form.Root form={data.form}>
		 * 	<!-- ... -->
		 * </Form.Root>
		 * ```
		 */
		controlled: true;

		/**
		 * The `SuperForm` object returned from the `superForm` function when
		 * the `controlled` prop is set to true. Otherwise, you pass the form
		 * returned from the load function.
		 *
		 * @example <caption>Example of controlled usage</caption>
		 * ```typescript
		 * // script tag
		 * import { superForm } from "sveltekit-superforms/client";
		 * import { schema } from "./schema";
		 * export let data;
		 * const superFrm = superForm(data.form, { validators: schema })
		 * // closing script tag
		 * ```
		 *
		 * ```svelte
		 * <Form.Root form={superFrm} controlled>
		 * 	<!-- ... -->
		 * </Form.Root>
		 * ```
		 *
		 * @example <caption>Example of uncontrolled (default) usage</caption>
		 *  ```svelte
		 * <Form.Root form={data.form}>
		 * 	<!-- ... -->
		 * </Form.Root>
		 * ```
		 */
		form: SuperForm<UnwrapEffects<T>, M>;
	};

	type UncontrolledProps = {
		/**
		 * Whether the form is controlled or not. Controlled forms
		 * are used when you want to initialize the `superForm` yourself.
		 *
		 * When set to true, you need to pass the object returned from the
		 * `superForm` function as the `form` prop. When false, you just pass
		 * the `SuperValidated` (data.form) object as the `form` prop.
		 *
		 * @example <caption>Example of controlled usage</caption>
		 * ```typescript
		 * // script tag
		 * import { superForm } from "sveltekit-superforms/client";
		 * import { schema } from "./schema";
		 * export let data;
		 * const superFrm = superForm(data.form, { validators: schema })
		 * // closing script tag
		 * ```
		 *
		 * ```svelte
		 * <Form.Root form={superFrm} controlled>
		 * 	<!-- ... -->
		 * </Form.Root>
		 * ```
		 *
		 * @example <caption>Example of uncontrolled (default) usage</caption>
		 *  ```svelte
		 * <Form.Root form={data.form} controlled>
		 * 	<!-- ... -->
		 * </Form.Root>
		 * ```
		 */
		controlled?: false;

		/**
		 * The `SuperForm` object returned from the `superForm` function when
		 * the `controlled` prop is set to true. Otherwise, you pass the form
		 * returned from the load function.
		 *
		 * @example <caption>Example of default usage</caption>
		 * ```svelte
		 * <Form.Root form={data.form} controlled>
		 * 	<!-- ... -->
		 * </Form.Root>
		 * ```
		 *
		 * @example <caption>Example of controlled usage</caption>
		 * ```typescript
		 * // script tag
		 * import { superForm } from "sveltekit-superforms/client";
		 * import { schema } from "./schema";
		 * export let data;
		 * const superFrm = superForm(data.form, { validators: schema })
		 * // closing script tag
		 * ```
		 *
		 * ```svelte
		 * <Form.Root form={superFrm} controlled>
		 * 	<!-- ... -->
		 * </Form.Root>
		 * ```
		 *
		 */
		form: SuperValidated<T, M>;

		/**
		 * When uncontrolled, you can optionally pass any options
		 * that you would normally pass to the `superForm` function.
		 *
		 * @see https://superforms.rocks/api#superform-options
		 */
		options?: FormOptions<T, M>;
	};

	type $$Props = BaseProps & (ControlledProps | UncontrolledProps) & HTMLFormAttributes;

	/* The schema which defines the form */
	export let schema: T;
	export let form: $$Props["form"];
	export let options: FormOptions<T, M> = {};
	export let controlled: $$Props["controlled"] = false;

	const defaultOptions = {
		validators: schema as FormOptions<T, M>["validators"],
		taintedMessage: null
	};

	const optionsWithDefaults = {
		...defaultOptions,
		...options
	};

	export let asChild = false;
	export let debug = false;

	function getSuperForm(
		controlled: boolean | undefined,
		form: SuperForm<UnwrapEffects<T>, M> | SuperValidated<T, M>,
		options: FormOptions<T, M>
	): SuperForm<UnwrapEffects<T>, M> {
		if (controlled) {
			return form as SuperForm<UnwrapEffects<T>, M>;
		}
		return superForm(form as SuperValidated<T, M>, options);
	}

	const superFrm = getSuperForm(controlled, form, optionsWithDefaults);

	setContext(FORM_CONTEXT, superFrm);
	setContext(FORM_FIELD_SCHEMA, schema);

	const {
		enhance,
		form: formStore,
		allErrors,
		delayed,
		errors,
		reset,
		submitting,
		tainted,
		timeout,
		validate,
		posted,
		fields,
		message,
		formId,
		restore,
		capture
	} = superFrm;

	let config: Form<T> = {
		form: superFrm,
		schema
	};

	$: config = {
		form: superFrm,
		schema
	};

	$: attrs = {
		"data-fs-form": "",
		"data-fs-error": $errors ? "" : undefined
	};
</script>

{#if asChild}
	<slot
		{config}
		formValues={$formStore}
		{formStore}
		form={superFrm}
		{enhance}
		allErrors={$allErrors}
		delayed={$delayed}
		errors={$errors}
		{reset}
		submitting={$submitting}
		tainted={$tainted}
		timeout={$timeout}
		{validate}
		posted={$posted}
		{fields}
		formId={$formId}
		{restore}
		{capture}
		message={$message}
	/>
{:else}
	<form
		method="POST"
		{...$$restProps}
		use:enhance
		on:input
		on:change
		on:formdata
		on:submit
		on:reset
		{...attrs}
	>
		<slot
			{config}
			{formStore}
			formValues={$formStore}
			form={superFrm}
			{enhance}
			{attrs}
			allErrors={$allErrors}
			delayed={$delayed}
			errors={$errors}
			{reset}
			submitting={$submitting}
			tainted={$tainted}
			timeout={$timeout}
			{validate}
			posted={$posted}
			{fields}
			formId={$formId}
			{restore}
			{capture}
			message={$message}
		/>
		{#if debug}
			<SuperDebug data={$formStore} />
		{/if}
	</form>
{/if}
