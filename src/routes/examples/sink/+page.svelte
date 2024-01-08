<script lang="ts" context="module">
	import { z } from "zod";

	export const schema = z.object({
		num: z.coerce.number(),
		items: z.array(z.string()).refine((value) => value.some((item) => item), {
			message: "You must select at least one item"
		}),
		numbers: z.array(z.number())
	});
</script>

<script lang="ts">
	import { Form } from "@/lib/index.js";
	import type { PageData } from "./$types.js";
	import { Button } from "@/components/ui/button/index.js";
	import { superForm } from "sveltekit-superforms/client";
	export let data: PageData;

	const superFrm = superForm(data.form, {
		validators: schema,
		taintedMessage: null
	});

	const { form, tainted, errors } = superFrm;
	const items = ["Apple", "Orange", "Pineapple", "Grapes", "Watermelon"];

	function getRandomNumber() {
		superFrm.form.update((curr) => {
			return {
				...curr,
				num: Math.random() * 100
			};
		});
	}
</script>

<div class="flex flex-col h-full min-h-screen w-full items-center py-28">
	<h1 class="text-3xl font-semibold tracking-tight pb-8">Account Settings</h1>
	<Button on:click={getRandomNumber}>Random num</Button>
	<Form.Root
		{schema}
		form={superFrm}
		controlled
		debug
		let:config
		class="container max-w-[750px] mx-auto flex flex-col gap-8"
	>
		<Form.Field {config} name="num">
			<Form.Label>Random Num</Form.Label>
			<Form.Input type="number" />
			<Form.Validation />
		</Form.Field>
		<Form.MultiField {config} name="numbers">
			<Form.Label>Random Num</Form.Label>
			<Form.MultiSelect>
				<option value={1}>1</option>
				<option value={2}>2</option>
				<option value={3}>3</option>
				<option value={4}>4</option>
			</Form.MultiSelect>
			<Form.Validation />
		</Form.MultiField>
		<Form.MultiField {config} name="items">
			<Form.Label>Select Items</Form.Label>
			<div class="flex flex-col gap-4">
				{#each items as item, i (i)}
					<Form.Field {config} name="items[{i}]" let:attrs>
						<div class="flex items-center gap-2">
							<input
								{...attrs.group}
								type="checkbox"
								bind:group={$form.items}
								value={item}
								name="items"
							/>
							<Form.Label>{item}</Form.Label>
						</div>
					</Form.Field>
				{/each}
			</div>
			<Form.Validation />
			<Form.Description>Select the items you want</Form.Description>
		</Form.MultiField>

		<Button type="submit">Submit</Button>
	</Form.Root>
</div>
