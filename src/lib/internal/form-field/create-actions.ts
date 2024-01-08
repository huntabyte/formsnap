import { get, type Writable } from "svelte/store";
import { effect, addEventListener, setAttributes } from "$lib/internal/index.js";
import type { CreateFieldActionsProps, FieldActions, FieldAttrStore, FieldIds } from "./types.js";

export function createFieldActions(props: CreateFieldActionsProps): FieldActions {
	const { ids, attrs, hasValidation, hasDescription, value, name } = props;

	const controlAttrs = {
		ids,
		value,
		name,
		attrs
	};

	return {
		label: createLabelAction({
			ids
		}),
		description: createDescriptionAction({ ids, hasDescription }),
		validation: createValidationAction({
			ids,
			hasValidation,
			attrs: {
				"aria-live": "assertive"
			}
		}),
		input: createInputAction({ ...controlAttrs }),
		textarea: createTextareaAction({ ...controlAttrs }),
		radio: createRadioAction({ ...controlAttrs }),
		select: createSelectAction({ ...controlAttrs }),
		checkbox: createCheckboxAction({ ...controlAttrs })
	};
}

type CreateLabelActionProps = {
	ids: Writable<FieldIds>;
};
function createLabelAction(props: CreateLabelActionProps) {
	const { ids } = props;

	return (node: HTMLLabelElement) => {
		node.htmlFor = get(ids).input;
		const handleMouseDown = (e: MouseEvent) => {
			e.preventDefault();
		};

		const unsubEffect = effect(ids, ($ids) => {
			node.htmlFor = $ids.input;
		});

		const unsubEvent = addEventListener(node, "mousedown", handleMouseDown);

		return {
			destroy() {
				unsubEvent();
				unsubEffect();
			}
		};
	};
}

type CreateValidationActionProps = {
	ids: Writable<FieldIds>;
	hasValidation: Writable<boolean>;
	attrs: Record<string, string>;
};

function createValidationAction(props: CreateValidationActionProps) {
	const { ids, hasValidation, attrs } = props;
	return (node: HTMLElement) => {
		node.id = get(ids).validation;
		setAttributes(node, attrs);
		hasValidation.set(true);

		const unsubEffect = effect(ids, ($ids) => {
			node.id = $ids.validation;
		});

		return {
			destroy() {
				hasValidation.set(false);
				unsubEffect();
			}
		};
	};
}

type CreateDescriptionActionProps = {
	ids: Writable<FieldIds>;
	hasDescription: Writable<boolean>;
};

function createDescriptionAction(props: CreateDescriptionActionProps) {
	const { ids, hasDescription } = props;
	return (node: HTMLElement) => {
		node.id = get(ids).description;
		hasDescription.set(true);

		const unsubEffect = effect(ids, ($ids) => {
			node.id = $ids.description;
		});
		return {
			destroy() {
				hasDescription.set(false);
				unsubEffect();
			}
		};
	};
}

type CreateActionProps = {
	ids: Writable<FieldIds>;
	value: Writable<unknown>;
	name: string;
	attrs: FieldAttrStore;
};

function createInputAction(props: CreateActionProps) {
	const { ids, value, name, attrs } = props;
	return (node: HTMLInputElement) => {
		node.id = get(ids).input;
		node.value = (get(value) as string) ?? "";
		node.name = name;

		const unsubAttrs = effect(attrs, ($attrs) => {
			setAttributes(node, $attrs);
		});

		const unsubEffect = effect(ids, ($ids) => {
			node.id = $ids.input;
		});

		const handleInput = () => {
			value.set(node.value);
		};

		const unsubEvent = addEventListener(node, "input", handleInput);

		return {
			destroy() {
				unsubEvent();
				unsubAttrs();
				unsubEffect();
			}
		};
	};
}

function createTextareaAction(props: CreateActionProps) {
	const { ids, value, name, attrs } = props;
	return (node: HTMLTextAreaElement) => {
		node.id = get(ids).input;
		node.value = (get(value) as string) ?? "";
		node.name = name;

		const unsubAttrs = effect(attrs, ($attrs) => {
			setAttributes(node, $attrs);
		});

		const unsubEffect = effect(ids, ($ids) => {
			node.id = $ids.input;
		});

		const handleInput = () => {
			value.set(node.value);
		};

		const unsubEvent = addEventListener(node, "input", handleInput);

		return {
			destroy() {
				unsubEvent();
				unsubAttrs();
				unsubEffect();
			}
		};
	};
}

function createCheckboxAction(props: CreateActionProps) {
	const { ids, value, name, attrs } = props;
	return (node: HTMLInputElement) => {
		node.id = get(ids).input;
		node.checked = (get(value) as boolean) ?? false;
		node.name = name;

		const handleChange = () => {
			value.set(node.checked);
		};

		const unsubAttrs = effect(attrs, ($attrs) => {
			setAttributes(node, $attrs);
		});
		const unsubEffect = effect(ids, ($ids) => {
			node.id = $ids.validation;
		});

		const unsubEvent = addEventListener(node, "change", handleChange);

		return {
			destroy() {
				unsubEvent();
				unsubAttrs();
				unsubEffect();
			}
		};
	};
}

export function createRadioAction(props: CreateActionProps) {
	const { ids, value, name, attrs } = props;
	return (node: HTMLInputElement) => {
		node.id = get(ids).input;
		node.name = name;

		const $value = get(value);
		if (node.value === $value) {
			node.checked = true;
		} else {
			node.checked = false;
		}

		const unsubAttrs = effect(attrs, ($attrs) => {
			delete $attrs.value;
			setAttributes(node, $attrs);
		});

		const unsubEffect = effect(ids, ($ids) => {
			node.id = $ids.input;
		});

		const handleChange = () => {
			if (node.checked) {
				value.set(node.value);
			}
		};

		const unsubEvent = addEventListener(node, "change", handleChange);

		return {
			destroy() {
				unsubEvent();
				unsubAttrs();
				unsubEffect();
			}
		};
	};
}

function createSelectAction(props: CreateActionProps) {
	const { ids, value, name, attrs } = props;
	return (node: HTMLSelectElement) => {
		node.id = get(ids).input;
		node.value = (get(value) as string) ?? "";
		node.name = name;

		const handleChange = () => {
			value.set(node.value);
		};
		const unsubEffect = effect(ids, ($ids) => {
			node.id = $ids.input;
		});

		const unsubAttrs = effect(attrs, ($attrs) => {
			setAttributes(node, $attrs);
		});

		const unsubEvent = addEventListener(node, "change", handleChange);

		return {
			destroy() {
				unsubEvent();
				unsubAttrs();
				unsubEffect();
			}
		};
	};
}
