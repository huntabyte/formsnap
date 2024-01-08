<script lang="ts">
	import { Form } from "$lib/index.js";
	import type { PageData } from "./$types.js";
	import { someFormSchema } from "../schemas.js";
	import { Button } from "@/components/ui/button/index.js";
	import * as Select from "@/components/ui/select/index.js";
	import { Input } from "@/components/ui/input/index.js";
	import { Textarea } from "@/components/ui/textarea/index.js";
	import { Checkbox } from "@/components/ui/checkbox/index.js";
	import CustomThing from "./custom-thing.svelte";
	export let data: PageData;

	const languages = {
		en: "English",
		es: "Spanish",
		fr: "French"
	} as const;
</script>

<div class="flex flex-col h-full min-h-screen w-full items-center py-28">
	<h1 class="text-3xl font-semibold tracking-tight pb-8">Account Settings</h1>
	<Form.Root
		schema={someFormSchema}
		form={data.form}
		debug={true}
		let:config
		class="container max-w-[750px] mx-auto flex flex-col gap-8"
	>
		<CustomThing />
		<Form.Field {config} name="email" let:handlers let:attrs>
			<div class="grid gap-2">
				<Form.Label>Email</Form.Label>
				<Input {...attrs.input} on:input={handlers.input} />
				<Form.Validation class="text-destructive" />
			</div>
		</Form.Field>
		<Form.Field {config} name="username" let:handlers let:attrs>
			<div class="grid gap-2">
				<Form.Label>Username</Form.Label>
				<Input {...attrs.input} on:input={handlers.input} />
				<Form.Validation class="text-destructive" />
			</div>
		</Form.Field>
		<Form.Field {config} name="bio" let:handlers let:attrs>
			<div class="grid gap-2">
				<Form.Label>Bio</Form.Label>
				<Textarea {...attrs.input} on:input={handlers.input} />
				<Form.Validation class="text-destructive" />
			</div>
		</Form.Field>
		<Form.Field {config} name="website" let:handlers let:attrs>
			<div class="grid gap-2">
				<Form.Label>Website</Form.Label>
				<Input {...attrs.input} on:input={handlers.input} />
				<Form.Validation class="text-destructive" />
			</div>
		</Form.Field>
		<Form.Field {config} name="notifications" let:handlers let:attrs>
			<div class="grid gap-2">
				<Form.Label>Notifications</Form.Label>
				<select {...attrs.input} on:change={handlers.select}>
					<option value="all">All</option>
					<option value="mentions">Mentions</option>
					<option value="none">None</option>
				</select>
				<Form.Validation class="text-destructive" />
			</div>
		</Form.Field>
		<Form.Field {config} name="language" let:attrs let:setValue>
			{@const { value } = attrs.input}
			<div class="grid gap-2">
				<Form.Label>Language</Form.Label>
				<Select.Root
					let:ids
					selected={{ value, label: languages[value] }}
					onSelectedChange={(v) => setValue(v?.value)}
				>
					<Form.Control id={ids.trigger} let:attrs>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Select a language" />
						</Select.Trigger>
					</Form.Control>
					<Select.Content>
						{#each Object.entries(languages) as [value, lang]}
							<Select.Item {value}>{lang}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
				<Form.Validation />
			</div>
		</Form.Field>
		<Form.Field {config} name="usage" let:attrs let:setValue>
			{@const { value, ...rest } = attrs.input}
			<div class="flex items-center gap-4">
				<Checkbox
					checked={value}
					onCheckedChange={(v) => {
						setValue(v);
					}}
					{...rest}
				/>
				<Form.Label>Send bugs and crash statistics</Form.Label>
			</div>
		</Form.Field>
		<Button type="submit">Submit</Button>
	</Form.Root>
</div>
