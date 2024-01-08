<script lang="ts" context="module">
	import { z } from "zod";
	export const schema = z.object({
		latitude: z.coerce.number(),
		longitude: z.coerce.number(),
		num: z.coerce.number()
	});
</script>

<script lang="ts">
	import { Form } from "$lib/index.js";
	import type { PageData } from "./$types.js";
	import { Button } from "@/components/ui/button/index.js";
	import { onMount } from "svelte";
	import { superForm } from "sveltekit-superforms/client";
	export let data: PageData;

	const superFrm = superForm(data.form, {
		validators: schema
	});

	onMount(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			superFrm.form.update((curr) => {
				return {
					...curr,
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				};
			});
		});
	});

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
		<Form.Field {config} name="latitude">
			<Form.Label>Latitude</Form.Label>
			<Form.Input type="number" />
			<Form.Validation />
		</Form.Field>
		<Form.Field {config} name="longitude">
			<Form.Label>Longitude</Form.Label>
			<Form.Input type="number" />
			<Form.Validation />
		</Form.Field>
		<Form.Field {config} name="num">
			<Form.Label>Random Num</Form.Label>
			<Form.Input type="number" />
			<Form.Validation />
		</Form.Field>
		<Button type="submit">Submit</Button>
	</Form.Root>
</div>
